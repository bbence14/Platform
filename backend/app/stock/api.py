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
    permission_classes = ()


class TestClass(ViewSet):

    def list(self, request, format=None):
        import json
        """
        Return a list of all users.
        """
        serializer_class = Stock_GE



        #return Response(serializer.data)
        #queryset = Stock_GE.objects.all()
        #ret = queryset[int(self.request.GET["q"])].dates

        return Response({
            "Test_Response":200
            #"query": str(ret)
        })


    def create(self, request, format=None, *args, **kwargs):

        """
        Implementing a machine learning algorithms
            - ARIMA
        """
        queryset = Stock_GE.objects.all()
        value = self.request.GET.get('q', 0)

        prices = list()
        for i in range(0, len(queryset)-int(value)):
            prices.append(queryset[i].close_price)

        def arima_prediction(prices):
            from statsmodels.tsa.arima_model import ARIMA
            from numpy import linalg as LA
            try:
                model = ARIMA(prices, order=(5, 1, 0))
                model_fit = model.fit(disp=0)
                output = model_fit.forecast()
                return output[0][0]
            except LA.LinAlgError:
                return -1

        next_day = 0
        try:
            next_day = queryset[(len(prices) - int(value) + 1)].close_price
        except BaseException:
            next_day = 0

        return Response({
            "before_arima": prices[-1],
            "arima": arima_prediction(prices),
            "close": next_day

            #"Predicted":
            #"Many": int(request.body)

        })


