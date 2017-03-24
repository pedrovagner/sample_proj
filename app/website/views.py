import logging
from django.views.generic import TemplateView


logger = logging.getLogger(__name__)


class Home(TemplateView):
    template_name = 'website/home.html'
