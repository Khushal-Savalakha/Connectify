from django.contrib import admin
from user_profile.models import UserProfile

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'name', 'headline', 'location', 'email','password', 'connections', 'profile_img', 'background_img','password']
