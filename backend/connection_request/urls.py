from django.urls import path
from .views import create_connection_request, get_all_connection_requests,get_csrf_token,reject_connection_request

urlpatterns = [
    path('create-connection/', create_connection_request, name='create_connection_request'),
    path('get-connections/', get_all_connection_requests, name='get_all_connection_requests'),
    path('get-csrf-token/', get_csrf_token, name='get_csrf_token'),
    path('reject-request/', reject_connection_request, name='reject_connection_request'),
]
