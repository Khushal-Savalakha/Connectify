from django.db import models
from user_profile.models import UserProfile  # Adjust the import path as necessary

class PostData(models.Model):
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='posts')  # Linking to UserProfile using user_id
    name=models.CharField(max_length=200)
    message = models.CharField(max_length=900,null=True)
    post_img = models.ImageField(upload_to="post_images/", blank=True, null=True) 
    likes = models.CharField(max_length=900,default="",null=True)  
    time = models.DateTimeField(auto_now_add=True)
    profile_img = models.ImageField(upload_to="profile_images/", blank=True, null=True) 


