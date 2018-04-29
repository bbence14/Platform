from rest_framework.viewsets import ModelViewSet
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from django.http import HttpResponse


from rest_framework import permissions

from .models import Stock_GE
from .serializers import StockSerializer


class ListViewSet(ModelViewSet):
    queryset = Stock_GE.objects.all()
    serializer_class = StockSerializer
    permission_classes = (permissions.IsAuthenticated,)


class TestClass(ViewSet):

    def list(self, request, format=None):
        import json
        """
        Return a list of all users.
        """
        serializer_class = Stock_GE



        #return Response(serializer.data)
        queryset = Stock_GE.objects.all()
        ret = queryset[int(self.request.GET["q"])].dates
        
        return Response({
            "publish_updatetime": 1,
            "meeting_updatetime": "Pali",
            "training_updatetime": "Ezel occa",
            "exhibiting_updatetime": "Ez is ki van toltve",
            "query": str(ret)
        })


    def create(self, request, format=None, *args, **kwargs):
        """
        Return a list of all users.

        def init(request):
            rest_value = request.body
            rest_value


        """
        #queryset = Stock_GE.objects.all()
        #rest_value = queryset[init(request)].dates
        return Response({
            "Type": str(self.request.GET("q"))
            #"Many": int(request.body)

        })


