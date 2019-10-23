from django.urls import path, include

from . import views

urlpatterns = [
    path('boards/<int:pk>/', views.BoardRetrieveUpdateDestroyAPIView.as_view(), name='board_create'),
    path('boards/', views.BoardListCreateAPIView.as_view(), name='board_create'),
    path('rest-auth/login/', views.CustomAuthToken.as_view(), name='login'),
    path('rest-auth/', include('rest_auth.urls')),
]
