var app = angular.module('loginApp', ['ngMaterial']);

app.controller('loginController', function ($scope, $mdDialog, $window, $http) {
    $scope.userTitle = "Usuario";
    $scope.passTitle = "Contraseña";
    $scope.loginTitle = "Entrar";
    $scope.message = "";

    $scope.user = {
        name: '',
        password: ''
    };

    $("#userName").keypress(function (e) {
        if (e.which == 13) {
            $("#userPass").focus();
        }
    });

    $("#userPass").keypress(function (e) {
        if (e.which == 13) {
            loginServer('');
        }
    });

    $scope.doLogin = function (ev) {

        loginServer('');
    }



    function loginServer(message) {

        if (message == '') {
            if ($scope.user.name == ''
            || $scope.user.password == '') {
                displayDialog('Capture un usuario y contraseña validos.');
                return;
            }
        }

        $("#divcarga").css('visibility', 'visible');
        $("#bdyPrincipal").addClass("disabledbutton");

        url = 'http://172.16.131.109/Energia/IUSASOL/Porteo/api/',
        //url = 'http://172.16.118.200/APIS/';

        $http({
            method: 'POST',
            url: url + 'server/login',
            data: { user: $scope.user.name, password: $scope.user.password }
        }).then(function successCallback(response) {
            //$.isLoading("hide");

            if (response.data.status == true) {
                var type = '';
                $window.sessionStorage.setItem('usuario', JSON.stringify(response.data));
                type = 'Views/admin.aspx';
                $(location).attr('href', type);
            } else {
                displayDialog(response.data.message);
                //displayDialog('Error al validar usuario, favor de contactar a su administrador.');
                $("#divcarga").css('visibility', 'hidden');
                $("#bdyPrincipal").removeClass("disabledbutton");
            }
        }, function errorCallback(response) {
            //$.isLoading("hide");
            displayDialog(response.data || ' Request failed');
            $("#divcarga").css('visibility', 'hidden');
            $("#bdyPrincipal").removeClass("disabledbutton");
        });
    }

    function displayDialog(message) {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#mainForm')))
            .clickOutsideToClose(true)
            .title('IUSASOL')
            .textContent(message)
            .ok('Aceptar')
        );
    }

});

