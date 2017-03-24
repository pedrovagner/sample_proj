/** Script executed on deployer machine. NODE_ENV=development */
import * as os from 'os';
import * as path from 'path';
import * as winston from 'winston';
import {NodeSsh} from '../lib/node-ssh-util';
import config from '../setting';
import {exec} from '../lib/child_process_util';


const logger = new winston.Logger({transports: [new winston.transports.Console({colorize: true})]});
const ssh = new NodeSsh();


function init() {
  return ssh.connect({
    host: config.remote_host,
    port: config.remote_port,
    username: config.remote_user,
    privateKey: path.join(os.homedir(), '.ssh', 'id_rsa')
  })
}

/** Deploy project located on developer's machine to the server. */
export async function deploy(npm = true) {
  try {
    await init();

    await ssh.exec(`mkdir -p ${config.remote_proj_dir}`);

    logger.info("Copying local project sources into remote host.");
    await exec(`rsync -avzh -e "ssh -p ${config.remote_port}" --exclude-from deploy/rsync_ignore.dat --delete ${config.proj_dir}/ ${config.remote_user}@${config.remote_host}:${config.remote_proj_dir}`);

    logger.info("Running deploy tasks on server side.");
    if (npm)
      await ssh.exec('NPM_CONFIG_PROGRESS=false npm run install-remote', {cwd: config.remote_proj_dir});
    else
      await ssh.exec('NPM_CONFIG_PROGRESS=false npm run install-remote-without-npm', {cwd: config.remote_proj_dir});
  }
  catch (e) { console.error(e); process.exit(1) }
  finally { process.exit() }
}
