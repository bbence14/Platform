from rest_framework import serializers

from .models import Stock_GE
from auth_api.serializers import UserSerializer

class StockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stock_GE
        fields = '__all__'
