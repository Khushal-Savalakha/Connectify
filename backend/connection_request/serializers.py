from rest_framework import serializers
from .models import ConnectionRequest

class ConnectionRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConnectionRequest
        fields = ['user', 'request_user', 'request_date', 'notification']  # List all fields you want to serialize
