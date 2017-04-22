from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    ROLE_CHOICES = (
        (1, 'Advisor'),
        (2, 'Staff'),
        (3, 'Executive Staff')
    )
    role = models.PositiveIntegerField(choices=ROLE_CHOICES, verbose_name='Role')

    def __str__(self):
        return '%s - %s' % (self.pk, self.username)
