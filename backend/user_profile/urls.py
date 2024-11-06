from django.urls import path
from user_profile import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('update/', views.update_user_profile, name='update_user_profile'), 
    path('login/', views.login, name='login'),
    path('csrf_token/', views.get_csrf_token, name='get_csrf_token'),
    path('get_user_profile/', views.get_user_profile, name='get_user_profile'),
    path('current_user/', views.current_user, name='current_user'),
]
