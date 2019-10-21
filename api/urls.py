from django.urls import path

from .views import BoardCreateAPIView

urlpatterns = [
    path('boards/', BoardCreateAPIView.as_view(), name='board_create'),
]
