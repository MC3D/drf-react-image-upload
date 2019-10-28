from django.urls import path, re_path

from .views import IndexView


urlpatterns = [
    # re_path(r'^(?:.*)/?$', IndexView.as_view(), name='frontend_routes'),
    path('', IndexView.as_view(), name='index'),
]
