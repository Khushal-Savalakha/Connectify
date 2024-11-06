from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from post_data.models import PostData
from post_data.serializers import PostDataSerializer
from user_profile.models import UserProfile  
from django.shortcuts import get_object_or_404


@api_view(['GET'])
def get_csrf_token(request):
    """
    Return CSRF token to the client.
    """
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

@api_view(['POST'])
def add_post(request):
    print(request.data)  # Log the incoming request data
    serializer = PostDataSerializer(data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def get_post(request):
#     # Retrieve all posts ordered by time (latest first)
#     posts = PostData.objects.all().order_by('-time')  # Order by 'time', descending (latest first)
#     serializer = PostDataSerializer(posts, many=True)
    
#     # Construct full URLs for image fields in each post
#     for post_data in serializer.data:
#         post_data['post_img'] = request.build_absolute_uri(post_data['post_img']) if post_data['post_img'] else None
#         post_data['profile_img'] = request.build_absolute_uri(post_data['profile_img']) if post_data['profile_img'] else None
    
#     return Response(serializer.data, status=status.HTTP_200_OK)
@api_view(['GET'])
def get_post(request):
    # Retrieve all posts ordered by time (latest first)
    posts = PostData.objects.all().order_by('-time')  # Order by 'time', descending (latest first)
    serializer = PostDataSerializer(posts, many=True)

    # Construct full URLs for image fields in each post
    for post_data in serializer.data:
        # Get the corresponding user profile using the user_id in the post data
        user_profile = get_object_or_404(UserProfile, user_id=post_data['user_id'])  # Assuming user_id is part of PostData

        # Build absolute URIs for post_img and profile_img
        post_data['post_img'] = request.build_absolute_uri(post_data['post_img']) if post_data['post_img'] else None
        post_data['profile_img'] = request.build_absolute_uri(user_profile.profile_img.url) if user_profile.profile_img else None

    return Response(serializer.data, status=status.HTTP_200_OK)