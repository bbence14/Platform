/**
 * Created by Babics Bence on 2018. 04. 20..
 */
(function () {
    'use strict';

    angular.module('scrumboard.demo')
        .controller('StockController',
                    ['$scope', '$http', '$location', '$routeParams', 'Login', ScrumboardController]);

    function ScrumboardController($scope, $http, $location, $routeParams, Login) {
        activate();

        function activate(){
            if (!Login.isLoggedIn()) {
                $location.url('/login');
            }

            $scope.user = Login.currentUser();
            $scope.next_day = "Next Day";
            $http.get('/stocks/GE/')
                .then(function(response){
                    $scope.GE_price = response.data;
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

            $scope.predicted_price = 69;

        $scope.message = function message(){
            console.log("Clicked the button");
        }


        }





    }




}());
