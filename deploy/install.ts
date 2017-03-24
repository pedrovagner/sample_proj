/**
 * Script executed on deploy machine. NODE_ENV=production
 */
import * as fsx from '../lib/fsx';
import fs = require('fs');
import path = require('path');
import {exec} from '../lib/child_process_util';
import config from '../setting';


/** Run deploy tasks on server side. Note: Execute this function only on server
 side.*/
export async function remote(npm = true) {
  try {
    if (npm) {
      await exec('NPM_CONFIG_PROGRESS=false npm install --prod', {cwd: config.proj_dir});
      await exec('bower install', {cwd: config.proj_dir});
    }
    await prepare_environment();
    await static_prepare();
    await supervisor_install();
    await nginx_install();
    await filter_install();
    await jail_install();
  }
  catch (e) { console.error(e); process.exit(1) }
  finally { process.exit() }
}

/** Prepare Python environment. */
async function prepare_environment() {
  if (!fsx.isDirSync(path.join(config.venv_dir, 'bin'))) {
    // Virtual env not found, creating.
    await exec(`virtualenv -p python3 ${config.venv_dir}`);
  }
  // Updating python dependencies
  await exec(`. ${config.venv_dir}/bin/activate && pip install -r requirements.txt -r deploy/requirements.txt`,
             {cwd: config.proj_dir});
  // Running django migrations
  await exec(`. ${config.venv_dir}/bin/activate && DJANGO_SETTINGS_MODULE=${config.proj_name}.settings_production python manage.py migrate`,
             {cwd: config.proj_dir});
  // Updating statics
  await exec(`. ${config.venv_dir}/bin/activate && DJANGO_SETTINGS_MODULE=${config.proj_name}.settings_production python manage.py collectstatic --no-input`,
             {cwd: config.proj_dir});
}

/** Prepare production statics assets. */
async function static_prepare() {
  await exec(`mkdir -p ${config.media_dir}`);
  // await exec(`sudo chown -R ${config.deploy_user}:${config.deploy_group} ${config.www_dir}`);
}

/** Fail2ban filter. */
async function filter_install() {
  // let src = path.join(config.proj_dir, 'deploy', 'gunicorn.conf');
  let src = await exec('mktemp');
  fs.writeFileSync(src, filter_template());

  let dest = path.join(path.sep, 'etc', 'fail2ban', 'filter.d',
                       config.proj_name + '.conf');
  await exec(`sudo mv ${src} ${dest}`);
}

function filter_template() {
  return `
[Definition]

failregex = <HOST>.*"\\ 403\\ .*
ignoreregex =
`
}

/** Fail2ban jail. */
async function jail_install() {
  // let src = path.join(config.proj_dir, 'deploy', 'gunicorn.conf');
  let src = await exec('mktemp');
  fs.writeFileSync(src, jail_template());

  let dest = path.join(path.sep, 'etc', 'fail2ban', 'jail.d',
                       config.proj_name + '.conf');
  await exec(`sudo mv ${src} ${dest}`);
  await exec(`sudo fail2ban-client reload ${config.proj_name}`);
}

function jail_template() {
  return `
[${config.proj_name}]

enabled = true
port    = http,https,8080,8443
logpath = /var/log/nginx/${config.proj_name}_access.log
filter  = ${config.proj_name}

# "bantime" is the number of seconds that a host is banned. Negative number for "permanent" ban.
# 2592000 s = 1 month
bantime = -1

# A host is banned if it has generated "maxretry" during the last "findtime"
# seconds.
# 1800 s = 30 min
findtime = 1800
maxretry = 3
`
}

/** Manage web aap process using supervisor. */
async function supervisor_install() {
  // let src = path.join(config.proj_dir, 'deploy', 'gunicorn.conf');
  let src = await exec('mktemp');
  fs.writeFileSync(src, supervisor_template());

  let dest = path.join(path.sep, 'etc', 'supervisor', 'conf.d',
                       config.proj_name + '.conf');
  await exec(`sudo mv ${src} ${dest}`);

  let msg = await exec(`sudo supervisorctl update`);
  if (!msg.includes('stopped')) {
    let message = await exec(`sudo supervisorctl restart ${config.proj_name}`);
    if (message.includes('ERROR (no such process)'))
      await exec(`sudo supervisorctl start ${config.proj_name}`);
  }
}

// Caution: Don't use "command = npm start --prod" or any other "npm" command
//           because it spawn several other process that cause supervisor
//           crash on restart (error: port already in use). And secondly, it's
//           much more fast to start and restart.
function supervisor_template() {
  return `[program:${config.proj_name}]
command = ${config.venv_dir}/bin/gunicorn --bind 127.0.0.1:${config.webapp_port} --workers 1 ${config.proj_name}.wsgi:application
directory = ${config.proj_dir}
user = ${config.deploy_user}
autostart = true
autorestart = true
startretries = 5
startsecs = 10
environment = DJANGO_SETTINGS_MODULE="${config.proj_name}.settings_production", PORT="${config.webapp_port}", SECRET="EdXbciPURaur4Jo5KBYTkZpkTaeAtNc2P3TADMPoy", NODE_ENV="production"
redirect_stderr = true
stdout_logfile = /var/log/supervisor/${config.proj_name}.log
stderr_logfile = /var/log/supervisor/${config.proj_name}_error.log
`
}

/** Install setup files for project. */
async function nginx_install() {
  // let src = path.join(config.proj_dir, 'deploy', 'nginx.conf');
  let src = await exec('mktemp');
  fs.writeFileSync(src, nginx_template());

  let available = path.join(path.sep, 'etc', 'nginx', 'sites-available', config.proj_name);
  let enabled = path.join(path.sep, 'etc', 'nginx', 'sites-enabled', config.proj_name);

  await exec(`sudo mv ${src} ${available}`);
  await exec(`sudo ln -sf ${available} ${enabled}`);
  await exec(`sudo nginx -s reload`);
}

// TODO: Create a script to auto renew ssl self certificate. Current certificate
//        valid until 20-Jan-2017 + 365 days

function nginx_template() {
  return `# The following directive is already set in docnet
# server_tokens off;

upstream ${config.proj_name} {
  server localhost:${config.webapp_port};
}

server {
  listen 8443 ssl;
  server_name ${config.proj_name_alt}.pedrovagner.com;

  ssl_certificate /etc/nginx/ssl/nginx.crt;
  ssl_certificate_key /etc/nginx/ssl/nginx.key;

  error_page 497 =301 https://$host:$server_port$request_uri;

  # For debugging purposes. There is no problem in having multiples access_log at same time
  # log_format debug '[$time_local] remote_addr: $remote_addr '
  #                  'proxy_add_x_forwarded_for: $proxy_add_x_forwarded_for';
  # access_log /var/log/nginx/${config.proj_name}_debug.log debug;
  
  access_log /var/log/nginx/${config.proj_name}_access.log;
  error_log /var/log/nginx/${config.proj_name}_error.log;
  
  root /var/www/${config.proj_name}/;

  location / {
      try_files $uri @webapp;
  }
  location ${config.static_url}/ {
      alias ${config.static_dir}/;
      try_files $uri @webapp;
  }
  location /internal${config.media_url}/ {
      internal;
      alias ${config.media_dir}/;
      error_page 401 403 404 = @webapp;
  }
  location @webapp {
    proxy_pass http://${config.proj_name};
    proxy_redirect off;
    proxy_read_timeout 5m;
    # Only if public port was equal to 80
    # proxy_set_header Host $host;
    proxy_set_header Host $host:$server_port;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
`
}
