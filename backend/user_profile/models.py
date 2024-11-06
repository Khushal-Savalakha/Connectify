from django.db import models

class UserProfile(models.Model):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    headline = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    email = models.EmailField(unique=True)  
    password = models.CharField(max_length=128) 
    connections = models.CharField(max_length=900)  # Storing a list as a string
    profile_img = models.ImageField(upload_to="profile_images/")
    background_img = models.ImageField(upload_to="background_images/")

