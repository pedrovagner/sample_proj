from django.utils.log import DEFAULT_LOGGING
from .settings_base import *


DEBUG = False

ALLOWED_HOSTS = ('sample.pedrovagner.com',)

# Enable 'debug' template context processor
if DEBUG:
    INTERNAL_IPS = ('127.0.0.1', '0.0.0.0', '::1')

# Use defaults as the basis for our logging setup
LOGGING = DEFAULT_LOGGING

# Used to log on supervisor
LOGGING['handlers']['console']['filters'] = ['require_debug_false']
LOGGING['loggers']['django.server']['propagate'] = True
