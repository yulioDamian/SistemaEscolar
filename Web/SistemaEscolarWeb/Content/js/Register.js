var app = angular.module('RegisterApp', ['ngAria', 'ngMaterial', 'angular-only-number', 'angular-max-length']);
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
    console.log($scope.userDir.CP);
    
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
app.directive('uiMaxlength', function() {
    return {
        require: 'ngModel',
        link: function(scope, el, attrs, model) {
            var max_length = parseInt(attrs.uiMaxlength, 10);

            var input_value_parser = function(value) {
                if(value.length > max_length) {
                    value = value.substring(0, max_length);
                    model.$setViewValue(value);
                    model.$render();
                }

                return value;
            };

            model.$parsers.push(input_value_parser);
        }
    };
})