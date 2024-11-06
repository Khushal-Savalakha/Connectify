from django.db import models
from django.utils import timezone
from user_profile.models import UserProfile

class ConnectionRequest(models.Model):
    user = models.ForeignKey(UserProfile, related_name='received_requests', on_delete=models.CASCADE)
    request_user = models.ForeignKey(UserProfile, related_name='sent_requests', on_delete=models.CASCADE)
    request_date = models.DateTimeField(default=timezone.now)
    notification = models.CharField(max_length=40)  

    def __str__(self):
        return f"Connection request from {self.request_user.name} to {self.user.name}"
