from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    # role = models.PositiveInterger()

    def __str__(self):
        return '%s - %s' % (self.pk, self.username)
