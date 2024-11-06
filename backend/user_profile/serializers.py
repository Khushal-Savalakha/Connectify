from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user_id', 'name', 'headline', 'location', 'email', 'password', 'connections', 'profile_img', 'background_img']
        extra_kwargs = {
            'headline': {'required': False},
            'location': {'required': False},
            'connections': {'required': False},
            'profile_img': {'required': False},
            'background_img': {'required': False},
        }

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.connections:
            representation['connections'] = instance.connections.split(',')
        return representation

    def validate_profile_img(self, value):
        return value

    def validate_background_img(self, value):
        return value
