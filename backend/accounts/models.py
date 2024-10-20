from django.db import models  # This line is necessary to use ManyToManyField
from django.contrib.auth.models import AbstractUser, Group, Permission

class CustomUser(AbstractUser):
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',  # Add a unique related_name for groups
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set_permissions',  # Add a unique related_name for permissions
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )