(function () {
    'use strict';

    angular
        .module('scrumboard.demo')
        .service('Login', Login);

    Login.$inject = ['$http', '$location'];

    function Login($http, $location) {
        this.login = login;
        this.isLoggedIn = isLoggedIn;
        this.logout = logout;
        this.currentUser = currentUser;
        console.log('Hello');
        function login(username, password) {
            console.log('Hello 1');
            return $http.post(
                '/auth_api/login/',
                {
                    username: username,
                    password: password
                }
            ).then(function (response) {
                sessionStorage.currentUser = JSON.stringify(response.data);
            });
        }

        function login(credentials) {
            console.log('Hello 2');
            console.log(credentials);
            return $http.post('/auth_api/login/', credentials)
                .then(function (response) {
                    sessionStorage.currentUser = JSON.stringify(response.data);
                });
        }

        function isLoggedIn () {
            return !!sessionStorage.currentUser;
        }


        function logout () {
            delete sessionStorage.currentUser;
            $http.get('/auth_api/logout/').then(function(){
                    $location.url('/login');
                });
        }


        function currentUser () {
            if(isLoggedIn()) {
                return JSON.parse(sessionStorage.currentUser);
            } else {
                return null;
            }
        }
    }
})();
