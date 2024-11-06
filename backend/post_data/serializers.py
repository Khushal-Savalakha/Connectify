# post_data/serializers.py
from rest_framework import serializers
from post_data.models import PostData

class PostDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostData
        fields = '__all__'  # You can specify fields like ['id', 'name', 'message'] if you don't want to include all fields
        extra_kwargs = {
            'name': {'required': False},  # Mark as optional
            'message': {'required': False},  # Mark as optional
            'post_img': {'required': False},  # Optional
            'likes': {'required': False},  # Optional
            'profile_img': {'required': False}  # Optional
        }