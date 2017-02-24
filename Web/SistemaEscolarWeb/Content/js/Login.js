var app = angular.module('LoginApp', ['ngAnimate', 'angular-bn-modals', 'angular-service-modals']);

app.controller('LoginController', function ($scope, $http, modals) {
    var GlobalUrl = '/ApiSistemaEscolar/';
    var TestApi = '/API/'
    
    $scope.user = {
        email: '',
        password: ''
    }

    $scope.msg = '';

    $("#UserEmail").keypress(function (e) {
        if (e.which === 13) 
            $("#UserPass").focus();
        
    });

    $("#UserPass").keypress(function (e) {
        if (e.which === 13)
            Login('');
    });

    $scope.Login = function (e) {
        loginServer('');
    };

    $http({
        method: 'GET',
        url: TestApi + 'Value/test'
       // data: data
    }).then(function succesCallback(response) {
        var data = response.data;
        $.each(data, function (key, data) {
            console.log(data.Nombre);
        })
    }, function errorCallback(response) {

    });

    function loginServer(message) {
        if (message === '')
            if ($scope.user.email === '' || $scope.user.password === '') {
                $scope.msg = 'Capture un usuario y contraseña valida';
                $scope.alertSomething();
                return;
            }
        var data = {
            usuario: $scope.user.email,
            password:$scope.user.password
        }
        $http({
            method:'GET',
            url: TestApi + 'Values/test',
            data:data
        }).then(function succesCallback(response) {

        }, function errorCallback(response) {

        })
    }

    $scope.alertSomething = function () {
        var promise = modals.open("alert", {
            msg: 'Capture un usuario y contraseña valida'
        });

        promise.then(
            function handleResolve(response) {
                console.log("Alert resolved");
            },
            function handleReject(error) {
                console.log("Alert Rejected!");
            }
            );
    };
});

app.controller("AlertModalController", function ($scope, modals) {
    $scope.message = (modals.params().msg);
    $scope.close = modals.resolve;
    $scope.jumpToConfirm = function () {
        modals.proceedTo(
            "confirm",
            {
                message: "I just came from Alert - doesn't that blow your mind?",
                confirmButton: "Eh, maybe a little",
                denyButton: "Oh please"
            }
            ).then(function handleResolve() {
                console.log("piped confirm resolved")
            }, function handleReject() {
                console.warn("Piped confirm Rejected");
            }
            );
    };
});



