var app = angular.module('RegisterApp', []);
app.controller('RegisterController', function ($scope, $http) {

    $scope.estados = [];
    $http({
        method: 'GET',
        url:'/API/Value/test'
    }).then(function succesCallback(response) {
        $scope.estados = response.data;
    }, function errorCallback(response) {
        console.log(response.data);
    }
    );
});