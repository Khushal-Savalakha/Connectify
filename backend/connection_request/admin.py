from django.contrib import admin
from .models import ConnectionRequest

class ConnectionRequestAdmin(admin.ModelAdmin):
    fields = ['user', 'request_user', 'request_date', 'notification']

admin.site.register(ConnectionRequest, ConnectionRequestAdmin)
