# Generated by Django 3.2 on 2024-09-23 06:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('headline', models.CharField(max_length=200)),
                ('location', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=128)),
                ('connections', models.CharField(max_length=900)),
                ('profile_img', models.ImageField(upload_to='profile_images/')),
                ('background_img', models.ImageField(upload_to='background_images/')),
            ],
        ),
    ]