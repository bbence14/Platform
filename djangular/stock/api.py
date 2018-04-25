from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions

from .models import Stock_GE
from .serializers import StockSerializer


class ListViewSet(ModelViewSet):
    queryset = Stock_GE.objects.all()
    serializer_class = StockSerializer
    permission_classes = (permissions.IsAuthenticated,)