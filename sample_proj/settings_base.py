"""
Common to production and development settings.
"""
from os import path
import sys
from .settings_default import *


sys.path.insert(0, os.path.join(BASE_DIR, 'app'))
sys.path.insert(0, os.path.join(BASE_DIR, 'lib'))

MEDIA_URL = '/media/'
MEDIA_ROOT = path.join(BASE_DIR, 'media') + path.sep
STATIC_ROOT = path.join(BASE_DIR, 'static_root') + path.sep

TEMPLATES[0]['DIRS'] = [os.path.join(BASE_DIR, 'templates')]

INSTALLED_APPS += [
    # Project's apps
    'credit_card',
    'website',
]

STATICFILES_DIRS = (
    path.join(BASE_DIR, 'static'),
    ('bower_components', path.join(BASE_DIR, 'bower_components')),
)
