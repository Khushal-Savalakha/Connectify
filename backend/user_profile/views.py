from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import get_object_or_404
import base64
from django.core.files.base import ContentFile


@api_view(['POST'])
def signup(request):
    """
    Handle user signup. Requires name, email, and password.
    """
    serializer = UserProfileSerializer(data=request.data)
    if serializer.is_valid():
        # Save user profile, no password hashing done here
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def get_user_profile(request):
    user_id = request.data.get('user_id')  # Extract user_id from the POST request
    try:
        user_profile = UserProfile.objects.get(user_id=user_id)  # Fetch the user profile by user_id
        serializer = UserProfileSerializer(user_profile)  # Serialize the user profile data
        
        # Construct full URLs for the image fields
        profile_img_url = request.build_absolute_uri(user_profile.profile_img.url) if user_profile.profile_img else None
        background_img_url = request.build_absolute_uri(user_profile.background_img.url) if user_profile.background_img else None

        # Modify the serializer data to include full image URLs
        data = serializer.data
        data['profile_img'] = profile_img_url
        data['background_img'] = background_img_url
        # print(data)
        return Response(data, status=status.HTTP_200_OK)
    except UserProfile.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PATCH','POST'])
def update_user_profile(request):
    print("Request Data:", request.data)
    user_id = request.data.get('user_id')

    if not user_id:
        return Response({"error": "user_id is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user_profile = UserProfile.objects.get(user_id=user_id)
    except UserProfile.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    """
    Handle user login. Requires email and password.
    """
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user_profile = UserProfile.objects.get(email=email)

        # Check the password; assuming it is not hashed in this case
        if user_profile.password == password:
            return Response({
                "user_id": user_profile.user_id,
                "name": user_profile.name,
                "email": user_profile.email,
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid password."}, status=status.HTTP_400_BAD_REQUEST)

    except UserProfile.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_csrf_token(request):
    """
    Return CSRF token to the client.
    """
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

@api_view(['GET'])
def current_user(request):
    # Fetch all user profiles
    users = UserProfile.objects.all()  # Get all UserProfile objects
    serializer = UserProfileSerializer(users, many=True)  # Serialize the queryset

    # Construct full URLs for the image fields for each user
    for user_data in serializer.data:
        user_instance = UserProfile.objects.get(user_id=user_data['user_id'])
        user_data['profile_img'] = request.build_absolute_uri(user_instance.profile_img.url) if user_instance.profile_img else None
        user_data['background_img'] = request.build_absolute_uri(user_instance.background_img.url) if user_instance.background_img else None

    return Response(serializer.data, status=status.HTTP_200_OK)