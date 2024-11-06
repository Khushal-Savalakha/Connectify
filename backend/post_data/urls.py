from django.urls import path
from post_data import views
urlpatterns = [
    path('add-post/',views.add_post, name='add-post'),
    path('get-post/',views.get_post, name='get-post'),
    path('get-csrf-token/',views.get_csrf_token, name='get-csrf-token'),  # Add this line
]
