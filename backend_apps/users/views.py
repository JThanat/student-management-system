from rest_framework import filters
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

# from backend_apps.users.permissions import UserAccess
from backend_apps.users.models import User
from backend_apps.users.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = (IsAuthenticated, userAccess)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('id', 'username',)
