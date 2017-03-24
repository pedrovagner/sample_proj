from os import path


# TODO: Change --python=python3 to --python=python3.4
MINIMAL_PY_VER = (3, 2)
PROJ_DIR = path.dirname(path.dirname(path.dirname(path.dirname(path.abspath(__file__)))))

HOME = path.expanduser('~')

PROJ_NAME = 'siga'
PROJ_DEV_DIR = path.join(HOME, 'dev', PROJ_NAME)
PROJ_INIT_PY = path.join(PROJ_DIR, 'util', 'init_py')

# TODO: $ echo $NODE_PATH
#       $ echo $VIRTUAL_ENV
ENV_DIR = path.join(PROJ_DEV_DIR, 'env')

ENVS = {
    'dev': {
        'py_version': 'python3',
        'requirements': (path.join(PROJ_DIR, 'requirements.txt'),
                         path.join(PROJ_DIR, 'dev', 'requirement', 'dev.txt'))},
    # 'fabric': {
    #     'py_version': 'python2',
    #     'requirements': (path.join(PROJ_DIR, 'dev', 'requirement', 'fabric.txt'),)},
}

DEV_MEDIA_ROOT = path.join(PROJ_DEV_DIR, 'media') + path.sep
DEV_STATIC_ROOT = path.join(PROJ_DEV_DIR, 'static') + path.sep

SERV_PROJ_DIR = path.join(path.sep, 'home', 'pi', 'program', PROJ_NAME)
SERV_USER = 'pi'
SERV_HOST = '192.168.1.108'
SERV_PORT = '2222'
SERV_ADDRESS = SERV_USER + '@' + SERV_HOST + ':' + SERV_PORT

DEPLOY_USER = 'pi'
DEPLOY_GROUP = 'www-data'

SERV_ENV_DIR = path.join(SERV_PROJ_DIR, 'env')
SERV_ENV_PROD_DIR = path.join(SERV_ENV_DIR, 'prod')

SERV_SRC_DIR = path.join(SERV_PROJ_DIR, 'proj')
SERV_SRC_PROD_DIR = path.join(SERV_SRC_DIR, 'prod')

SERV_WWW_DIR = path.join(path.sep, 'var', 'www')
SERV_WWW_PROJ = path.join(SERV_WWW_DIR, PROJ_NAME)
SERV_STATIC_DIR = path.join(SERV_WWW_PROJ, 'static') + path.sep
SERV_MEDIA_DIR = path.join(SERV_WWW_PROJ, 'media') + path.sep

DB_USER = PROJ_NAME

PROD_DB_NAME = PROJ_NAME + '_prod'
DEV_DB_NAME = PROJ_NAME + '_dev'

PGHOST = 'localhost'

SERV_PGPASSWORD = PROJ_NAME
DEV_PGPASSWORD = PROJ_NAME

SU_PGUSER = 'postgres'
SU_PGPASSWORD = 'postgres'

DEV_SQLITE_DIR = path.join(PROJ_DEV_DIR, 'db')
DEV_SQLITE_FILE = path.join(DEV_SQLITE_DIR, DEV_DB_NAME + '.sql3')

NGINX_AVAILABLE = path.join(path.sep, 'etc', 'nginx', 'sites-available', PROJ_NAME)
NGINX_ENABLED = path.join(path.sep, 'etc', 'nginx', 'sites-enabled', PROJ_NAME)
NGINX_CONF = path.join(PROJ_DIR, 'util', 'nginx.conf')
