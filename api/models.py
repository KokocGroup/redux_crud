from django.db import models
from django.contrib.auth.models import AbstractUser


class Task(models.Model):
    title = models.CharField('Название', max_length=256)
    description = models.TextField('Описание')

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'task'
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'


class User(AbstractUser):
    class Meta(AbstractUser.Meta):
        swappable = 'AUTH_USER_MODEL'
        db_table = 'user'


