from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin
from website.views import Home


urlpatterns = [
    url(r'^$', Home.as_view(), name='home'),
    url(r'^admin/', admin.site.urls),
    url(r'^credit-card/', include('credit_card.urls', namespace='credit_card')),
]

if settings.DEBUG:
    urlpatterns.extend(static(settings.STATIC_URL, document_root=settings.STATIC_ROOT))
