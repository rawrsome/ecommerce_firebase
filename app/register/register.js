'use strict';

var App = angular.module('myApp.register', ['ngRoute', 'firebase'])

// Declared route 
App.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'register/register.html',
        controller: 'RegisterCtrl'
    });
}])

// Register controller
App.controller('RegisterCtrl', ['$scope', '$firebaseAuth', function($scope, $firebaseAuth) {

	var ref = new Firebase("https://100purefirestorm.firebaseio.com");

	// storing user register info
	$scope.user = {};
	var newUser = $scope.user;
	$scope.signUp = function(e){ 
	    e.preventDefault();
	    var username = $scope.user.email;
	    var password = $scope.user.password;
	    console.log(username);
	    console.log(password);
    }
    console.log(newUser);
}]);