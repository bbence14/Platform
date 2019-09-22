/**
 * Created by Babics Bence on 2018. 04. 20..
 */
(function () {
    'use strict';

    angular.module('scrumboard.demo')
        .controller('StockController',
                    ['$scope', '$http', '$location', '$routeParams', 'Login', ScrumboardController]);

    function ScrumboardController($scope, $http, $location, $routeParams, Login) {
        $scope.actual = 11;
        activate();

        function activate(){
            if (!Login.isLoggedIn()) {
                $location.url('/login');
            }

            $scope.user = Login.currentUser();
            $scope.next_day = "Next Day";
            $http.get('/stocks/GE/')
                .then(function(response){
                    $scope.GE_price = response.data.slice(response.data.length-40,response.data.length);
                    console.log($scope.GE_price);
                        var ge_opens = [];
                        var ge_dates = [];
                        for(var i=0; i < $scope.GE_price.length; i++) {
                            ge_opens.push($scope.GE_price[i].open_price);
                            ge_dates.push($scope.GE_price[i].dates);
                        }
                        console.log(ge_opens);
                    $scope.ge_prices = ge_opens;
                    $scope.dates =ge_dates;

                });
               $scope.buy_or_sell = "Calculating";
               $scope.statuse = " - ";
               $scope.error = 0;
               $http.post('/stocks/Predict/?q='+$scope.actual)
                .then(function(response){
                    $scope.predicted_price = response.data.arima;
                    console.log($scope.predicted_price);
                    console.log($scope.GE_price[($scope.GE_price.length-$scope.actual)].close_price);
                    if ($scope.GE_price[($scope.GE_price.length-$scope.actual)].close_price <= response.data.arima){
                        $scope.buy_or_sell = "Buy";
                    }else{
                        $scope.buy_or_sell = "Sell";
                    }
                    $scope.actual--;


                });


        $scope.message = function message(){
            if($scope.actual >= 0){
                $http.post('/stocks/Predict/?q='+$scope.actual)
                .then(function(response){
                    $scope.predicted_price = response.data.arima;
                    console.log($scope.predicted_price);
                    if ($scope.GE_price[($scope.GE_price.length-$scope.actual)].close_price <= response.data.arima){
                        $scope.buy_or_sell = "Buy";
                    }else{
                        $scope.buy_or_sell = "Sell";
                    }
                    $scope.actual--;
                    $scope.error = (( response.data.close - response.data.arima ) / response.data.close )*100;
                    if( $scope.buy_or_sell == 'Buy' && response.data.before_close < response.close){
                        $scope.statuse = 'Wrong tip';
                    }else if ($scope.buy_or_sell == 'Sell' && response.data.before_close > response.data.close){
                        $scope.statuse = 'Wrong tip';
                    }else{
                         $scope.statuse = 'Good tip';
                    }
                });

            }

        };


        }





    }




}());
