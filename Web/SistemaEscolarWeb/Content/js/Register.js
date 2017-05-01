var app = angular.module('RegisterApp', ['ngAria', 'ngMaterial', 'angular-only-number', 'angular-max-length', 'ngAnimate', 'angular-bn-modals', 'angular-service-modals']);
app.controller('RegisterController', function ($scope, $http,modals) {


    var fileInputTextDiv = document.getElementById('file_input_text_div');
    var fileInput = document.getElementById('file_input_file');

    $scope.msg = '';

    $scope.user = {
        nombre: '',
        curp: '',
        rfc: '',
        claveDocente: '',
        turno: '',
        email: '',
        password: '',
        Cpassword: ''
    };

    $scope.userDir = {
        IdEstado: '',
        Municipio: '',
        Delegacion: '',
        Colonia: '',
        Calle: '',
        NumExterior: '',
        NumInterior: '',
        CP: ''
    };
    
    
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

    $scope.Register = function () {
        validate()
        
    }

    function validate() {
        if ($scope.user.nombre == '' || $scope.user.curp == '' || $scope.user.rfc == '' ||
            $scope.user.claveDocente == '' || $scope.user.turno == '' || $scope.user.email == '' ||
            $scope.user.usuario == '' || $scope.user.password == '' || $scope.user.Cpassword == '') {
            $scope.msg = 'Debe de llenar todos los campos de Datos de usuario';
            $scope.alertSomething('Debe de llenar todos los campos de Datos de usuario');
            return;
        }
        if ($scope.userDir.IdEstado == '' || $scope.userDir.Municipio == '' || $scope.userDir.Delegacion == '' ||
            $scope.userDir.Colonia == '' || $scope.userDir.Calle == '' || $scope.userDir.NumeroExterior == '' ||
            $scope.userDir.NumeroInterior == '' || $scope.userDir.CP == '') {
            $scope.msg = 'Debe de llenar todos los campos de Dirección de usuario';
            $scope.alertSomething('Debe de llenar todos los campos de Dirección de usuario');
            return;
        }
            
    }




    $scope.alertSomething = function (message) {
        var promise = modals.open("alert", {
            msg: message
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
});
