var app = angular.module('RegisterApp', ['ngAria', 'ngMaterial']);
app.controller('RegisterController', function ($scope, $http) {


    var fileInputTextDiv = document.getElementById('file_input_text_div');
    var fileInput = document.getElementById('file_input_file');

    $scope.user = {
        nombre: '',
        curp: '',
        rfc: '',
        claveDocente: '',
        turno: '',
        email: '',
        usuario: '',
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

    $scope.institucion = {
        IdEstado: '',
        Direccion: '',
        CP: '',
        Nombre: '',
        Clave: ''
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
});

app.filter('telephone', function () {
});
