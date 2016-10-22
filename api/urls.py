from rest_framework import routers

from api.views import UserViewSet, TaskViewSet

router = routers.DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'users', UserViewSet)