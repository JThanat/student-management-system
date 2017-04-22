from rest_framework import serializers

from backend_apps.commons.serializers import CRUDAutomaticFieldSerializer
from backend_apps.users.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True
    )
    
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'role')

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            role=validated_data['role']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user