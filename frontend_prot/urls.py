"""frontend_prot URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from api.views import MenuAPI, FuelSpeedChartAPI, FuelSpeedReportAPI, VehiclesAPI


urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name="index.html")),
    url(r'^api/menu/$', MenuAPI.as_view()),
    url(r'^api/fuel_speed_chart/$', FuelSpeedChartAPI.as_view()),
    url(r'^api/fuel_speed_report/$', FuelSpeedReportAPI.as_view()),
    url(r'^api/vehicles/$', VehiclesAPI.as_view()),
    url(r'^admin/', admin.site.urls),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
