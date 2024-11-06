from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import ConnectionRequest
from .serializers import ConnectionRequestSerializer
from django.http import JsonResponse
from django.middleware.csrf import get_token

@api_view(['POST'])
def create_connection_request(request):
    serializer = ConnectionRequestSerializer(data=request.data)
    if serializer.is_valid():
        # Save the new connection request to the database
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_all_connection_requests(request):
    connection_requests = ConnectionRequest.objects.all()
    serializer = ConnectionRequestSerializer(connection_requests, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import ConnectionRequest
from .serializers import ConnectionRequestSerializer

@api_view(['POST'])
def reject_connection_request(request):
    try:
        # Get the user_id from the request body
        current_user_id = request.data.get('user')
        request_user_id = request.data.get('request_id')  # Assuming the sender's user ID is sent in the request body

        # Filter all connection requests that match the criteria
        connection_requests = ConnectionRequest.objects.filter(
            user=current_user_id, request_user=request_user_id
        )

        # Check if there are any matching requests
        if not connection_requests.exists():
            return Response({"error": "No matching connection requests found."}, status=status.HTTP_404_NOT_FOUND)

        # Update the notification field to 'rejected' for each matching request
        for connection_request in connection_requests:
            connection_request.notification = 'rejected'
            connection_request.save()

        return Response({"message": "Connection request(s) rejected."}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
