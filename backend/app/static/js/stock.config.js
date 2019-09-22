/**
 * Created by Babics Bence on 2018. 04. 20..
 */
angular.module('scrumboard.demo').config(['$routeProvider',
    function config($routeProvider) {

        $routeProvider
            .when('/stocks/', {
                templateUrl: '/static/html/stocks.html',
                controller: 'StockController',
            })
            .when('/login', {
                templateUrl: '/static/html/login.html',
                controller: 'LoginController',
            })
            .when('/', {
                templateUrl: '/static/html/stocks.html',
                controller: 'StockController',
            })
            .otherwise('/');
    }
]).run(run);

run.$inject = ['$http'];

/**
* @name run
* @desc Update xsrf $http headers to align with Django's defaults
*/
function run($http) {
  $http.defaults.xsrfHeaderName = 'X-CSRFToken';
  $http.defaults.xsrfCookieName = 'csrftoken';
};