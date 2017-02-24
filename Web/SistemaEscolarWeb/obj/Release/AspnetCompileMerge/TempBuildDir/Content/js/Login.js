var app = angular.module('LoginApp', ['ngAnimate', 'angular-bn-modals', 'angular-service-modals']);

app.controller('LoginController', function ($scope, $http, modals) {
    
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

    function loginServer(message) {
        if (message === '')
            if ($scope.user.email === '' || $scope.user.password === '') {
                $scope.msg = 'Capture un usuario y contraseña valida';
                $scope.alertSomething();
            }
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



