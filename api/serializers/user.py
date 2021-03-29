from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

        depth = 1


class UserSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'username',
            'first_name',
            'last_name',
            'profile',
            'password'
        )


class UserReadSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
            'profile',
        )


class UserInfoSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    
    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
            'profile',
        )

        depth = 1
