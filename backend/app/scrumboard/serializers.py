from rest_framework import serializers

from .models import List, Card, Project
from auth_api.serializers import UserSerializer

class CardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Card
        fields = '__all__'

class ListSerializer(serializers.ModelSerializer):
    cards = CardSerializer(read_only=True, many=True)

    class Meta:
        model = List
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    lists = ListSerializer(read_only=True, many=True)
    members = UserSerializer(read_only=True, many=True)

    class Meta:
        model = Project
        fields = '__all__'

