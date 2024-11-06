from django.contrib import admin
from post_data.models import PostData
# Register your models here.

@admin.register(PostData)
class PostDataAdmin(admin.ModelAdmin):
    list_display=['user_id','name','message','post_img','likes','time','profile_img']