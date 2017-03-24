from .settings_base import *


DEBUG = True

# Required when DEBUG = False
ALLOWED_HOSTS = ['localhost', '0.0.0.0']

# Enable 'debug' template context processor
if DEBUG:
    INTERNAL_IPS = ('127.0.0.1', '0.0.0.0', '::1')
