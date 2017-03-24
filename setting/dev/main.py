from ..development import *
from dev.setting import deploy
from os import path


DEBUG = True
sys.path.insert(0, path.join(BASE_DIR, 'lib', 'dev'))

# Nos casos em que for necessário definir temporariamente
# DEBUG = False
ALLOWED_HOSTS = ['localhost', '0.0.0.0']

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': util.DEV_SQLITE_FILE,
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': deploy.DEV_DB_NAME,
        'USER': deploy.DB_USER,
        'PASSWORD': deploy.DEV_PGPASSWORD,
        'HOST': deploy.PGHOST,
        'PORT': '5432',
    }
}

# WebFaction
# # ssh -L 28806:localhost:28806 orbewebfaction
# DATABASES = {
#     # WebFaction
#     'default': {
#         # 'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'ENGINE': 'django.contrib.gis.db.backends.postgis',
#         'NAME': 'siga-homolog',
#         'USER': 'orbetecnolog',
#         'PASSWORD': 'RhEwbgOm}H/9',
#         'HOST': 'localhost',
#         'PORT': '28806',
#     }
# }

MEDIA_ROOT = deploy.DEV_MEDIA_ROOT
# WebFaction
# MEDIA_ROOT = path.join(deploy.DEV_MEDIA_ROOT, path.pardir, 'media_webfaction')
STATIC_ROOT = deploy.DEV_STATIC_ROOT

EMAIL_BACKEND = 'django.core.mail.backends.filebased.EmailBackend'
EMAIL_FILE_PATH = path.join(deploy.PROJ_DEV_DIR, 'email.log')

INSTALLED_APPS += (
    'debug_toolbar',
    'dev',
)

# debug_toolbar
if DEBUG:
    INTERNAL_IPS = ('127.0.0.1', '192.168.0.28', '::1')

DEBUG_TOOLBAR_CONFIG = {
    # TODO DOCUMENTAR: Utiliza jQuery da própria página, evitando que jQuery
    #                   seja carregado duas vezes.
    'JQUERY_URL': '',
}
