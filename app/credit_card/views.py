import logging
from django.contrib import messages
from django.shortcuts import render
from django.views import View
from .forms import ValidationForm


logger = logging.getLogger(__name__)


class Index(View):
    template_name = 'credit_card/index.html'

    def get_context_data(self, **kwargs):
        context = dict()
        return context

    def get(self, request, *args, **kwargs):
        context = self.get_context_data()
        context['form'] = ValidationForm()
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        form = ValidationForm(request.POST, request.FILES)
        if form.is_valid():
            messages.success(request, "Form submitted with success.")
            return render(request, 'credit_card/result.html', {'results': form.results})
        context = self.get_context_data()
        context['form'] = form
        return render(request, self.template_name, context)
