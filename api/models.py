from django.db import models
from django.contrib.auth.models import AbstractUser


class Task(models.Model):
    text = models.CharField('Название', max_length=256)
    complete = models.BooleanField('Завершена', default=False)

    def __str__(self):
        return self.text

    class Meta:
        db_table = 'task'
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'


class User(AbstractUser):
    class Meta(AbstractUser.Meta):
        swappable = 'AUTH_USER_MODEL'
        db_table = 'user'


