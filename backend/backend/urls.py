from django.contrib import admin
from django.urls import path,include
from django.conf.urls.static import static
from django.conf import settings
import user_profile
import post_data
import connection_request

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user_profile/', include('user_profile.urls')),
    path('post/',include('post_data.urls')),
    path('connection/',include('connection_request.urls'))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
