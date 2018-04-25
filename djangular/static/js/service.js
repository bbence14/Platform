/**
 * Created by Babics Bence on 2018. 04. 21..
 */
(function(){

    var stocks = function($http){

      var getUser = function(){
            return $http.get("https://api.github.com/users/bbence14")
                        .then(function(response){
                           return response.data;
                        });
      };



      return {
          getUser: getUser

      };

    };

    var module = angular.module("scrumboard.demo");
    module.factory("stock_details", stocks);

}());
