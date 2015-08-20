'use strict';

// *inject firebase.js module from cdn
var App = angular.module('myApp.home', ['ngRoute', 'firebase'])
   // ====> Declared route 
App.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
       templateUrl: 'home/home.html',
       controller: 'HomeCtrl'
    });
}])
// ====> Home controller
App.controller('HomeCtrl', [
   '$scope', '$rootScope', '$firebaseAuth',
   function($scope, $rootScope, $firebaseAuth) {
      var ref = new Firebase('https://purityfire.firebaseio.com/');

      var authClient = new FirebaseSimpleLogin(ref, function(error, user) {
          if (error !== null) {
            console.log("Error authenticating:", error);
          } else if (user !== null) {
            console.log("User is logged in:", user);
          } else {
            console.log("User is logged out");
          }
      });

      $rootScope.auth = $firebaseAuth(ref);

      $scope.signIn = function(e) {
          $rootScope.auth.$login('password', {
            email: $scope.email,
            password: $scope.password
          }).then(function(user) {
            $rootScope.alert.message = '';
          }, function(error) {
            if (error = 'INVALID_EMAIL') {
               console.log('email invalid or not signed up — trying to sign you up!');
               $scope.signUp();
            } else if (error = 'INVALID_PASSWORD') {
               console.log('wrong password!');
            } else {
               console.log(error);
            }
          });
      }
      $scope.signUp = function(e) {
         $rootScope.auth.$createUser($scope.email, $scope.password, function(error, user) {
            if (!error) {
               $rootScope.alert.message = '';
            } else {
               $rootScope.alert.class = 'danger';
               $rootScope.alert.message = 'The username and password combination you entered is invalid.';
            }
         });
      }
   }
]);

App.controller('AlertCtrl', [
   '$scope', '$rootScope',
   function($scope, $rootScope) {
      $rootScope.alert = {};
   }
]);
// <==== end Home controller