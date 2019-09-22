from rest_framework import serializers

from .models import Stock_GE
from .predict import Prediction

class StockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stock_GE
        fields = '__all__'

