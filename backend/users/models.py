from django.contrib.auth.models import AbstractUser
from django.db import models

class UserProfile(AbstractUser):
    github_id = models.IntegerField(unique=True, null=True, blank=True)
    avatar_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.username