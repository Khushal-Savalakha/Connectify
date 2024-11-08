# Generated by Django 3.2 on 2024-09-28 03:35

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user_profile', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ConnectionRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('request_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('notification', models.BooleanField(default=False)),
                ('request_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_requests', to='user_profile.userprofile')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_requests', to='user_profile.userprofile')),
            ],
        ),
    ]
