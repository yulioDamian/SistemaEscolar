var app = angular.module('adminApp', ['ngMaterial', 'ngRoute', 'ngAnimate', 'ngAria', 'ngMessages',
    'xeditable', 'angular-js-xlsx', 'mdPickers']);

app.controller('adminController', function ($scope, $mdDialog, $window, $http, $location, $timeout, $mdSidenav, $log, confirminator) {
   

    //$scope.url = '/Energia/IUSASOL/Porteo/api/';
    $scope.url = '/APIS/';
    $scope.ComboUsuario = [];
    $scope.ComboPerfil = [];
    $scope.ComboTipoUsuario = [];
    $scope.ComboBanco = [];
    $scope.ComboMenu = [];
    $scope.ComboEstatus = [];
    $scope.ComboAnio = [];
    $scope.ComboMes = [];
    $scope.ComboTension = [];
    $scope.ComboSiNo = [];
    $scope.ComboTarifaDet = [];
    $scope.ComboTarifaP = [];
    $scope.ComboEstado = [];
    $scope.comboMunicipio = [];
    $scope.ComboTipoCuenta = [];
    $scope.ComboTipoPago = [];
    $scope.ComboTarifaHoraria = [];
    $scope.ComboSociedad = [];
    $scope.ComboAsentamiento = [];
    $scope.ComboMedidor = [];
    $scope.ComboIB = [];

    $scope.userMenu = [];
    $scope.PageTitle = "";
    
    $scope.idSelected = null;

    $scope.UserName = '';
    $scope.User;

    /*
     * window.onbeforeunload = function (e) {
     *  var e = e || window.event;
     *   if (e) {
     *       e.returnValue = 'Se perderan todos los datos que no hayas guardado';
     *    }
     * }
     */

    /** show the warning**/
    var isChange = false;

    $scope.showWarning = function (show) {
        isChange = (Boolean(show));
        //console.log(isChange);
    }
    /** end show Warning**/
   
    /** confirmator **/
    $scope.currentLocation = $location.url();
    $scope.$on("$locationChangeSuccess", function handleLocationChangeSuccessEvent(event) {
        $scope.currentLocation = $location.url();
    });
    var startWatchingTimer = $timeout(startWatchingForLocationChanges, 0, false);
    var stopWatchingLocation = null;
    function handleLocationChangeStartEvent(event) {
        event.preventDefault();
        var targetPath = $location.path();
        var targetSearch = $location.search();
        var targetHash = $location.hash();
        confirminator
        .open("La información ingresada se perdera, desea continuar",isChange)
        .then(function handleResolve() {
            $location.path(targetPath)
            .search(targetSearch)
            .hash(targetHash);
            isChange = false;
            stopWatchingLocation();
            $scope.$applyAsync(startWatchingForLocationChanges);
        });
    }

    function startWatchingForLocationChanges() {
        stopWatchingLocation = $scope.$on("$locationChangeStart", handleLocationChangeStartEvent);
    }
    /**end confirmator**/

    
    /**Menu**/
    $scope.toggleLeft = buildDelayedToggler('left');
    
    function debounce(func, wait, context) {
        var timer;

        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function () {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    function buildDelayedToggler(navID) {
        return debounce(function () {
            $mdSidenav(navID)
              .toggle()
              .then(function () {
              });
        }, 200);
    }
    /**end menu**/
    

    $scope.select = function (ev) {
        
        document.getElementById("Salir").removeAttribute("href");
        if (ev == "Salir") {
            $mdDialog.show($mdDialog.confirm()
            .title('CONFIRMACIÓN')
            .textContent('¿Estas seguro de salir?')
            .ok('Aceptar')
            .cancel('Cancelar')
            ).then(function () {
                $window.sessionStorage.clear();
                type = '../';
                $(location).attr('href', type);
            });
            
        }
    };


    $scope.Iniciar = function () {
        var usuario = $window.sessionStorage.getItem('usuario');
        
        if (usuario == null) {
            $scope.displayDialog("Debes inciar sesión.");
            type = '../';
            $(location).attr('href', type);
        }

        var usr = JSON.parse(usuario);
        $scope.userMenu = usr.menu;
        $scope.UserName = usr.name;
        $scope.User = usr.user;

        var activo = { id: '1', name: 'Activo' };
        $scope.ComboEstatus.push(activo);
        var inactivo = { id: '0', name: 'Inactivo' };
        $scope.ComboEstatus.push(inactivo);

        CargaAnios();
        CargaMeses();
        CargarTension();
        CargarSiNo();

        //Carga
        $scope.isLoading(true);        

        $http({
            method: 'POST',
            url: $scope.url + 'server/infocombo',
        }).then(function successCallback(response) {
            $scope.isLoading(false);
            if (response.data != null) {
                $scope.ComboUsuario = response.data.user;
                $scope.ComboPerfil = response.data.userProfile;
                $scope.ComboTipoUsuario = response.data.userType;
                $scope.ComboBanco = response.data.bank;
                $scope.ComboMenu = response.data.menu;
                $scope.ComboTarifaDet = response.data.tariffDetail;
                $scope.ComboTarifaP = response.data.tariff;
                $scope.ComboEstado = response.data.State;
                $scope.comboMunicipio = response.data.municipality;
                $scope.ComboTipoCuenta = response.data.accountType;
                $scope.ComboTipoPago = response.data.pay;
                $scope.ComboTarifaHoraria = response.data.horaryTariff;
                $scope.ComboSociedad = response.data.Society;
                $scope.ComboAsentamiento = response.data.ZipCodeType;
                $scope.ComboMedidor = response.data.Metter;
                $scope.ComboIB = response.data.IB;

            } else {
                $scope.displayDialog(response);
            }

        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });
    };

   
    function CargaAnios() {
        for (var k = 2015; k < 2027; k++) {
            var anio = { id: k, name: k };
            $scope.ComboAnio.push(anio);
        }
    }

    function CargaMeses() {
        var enero = { id: '1', name: 'Enero' };
        var feb = { id: '2', name: 'Febrero' };
        var marzo = { id: '3', name: 'Marzo' };
        var abril = { id: '4', name: 'Abril' };
        var mayo = { id: '5', name: 'Mayo' };
        var junio = { id: '6', name: 'Junio' };
        var julio = { id: '7', name: 'Julio' };
        var agost = { id: '8', name: 'Agosto' };
        var sep = { id: '9', name: 'Septiembre' };
        var oct = { id: '10', name: 'Octubre' };
        var nov = { id: '11', name: 'Noviembre' };
        var dic = { id: '12', name: 'Diciembre' };
        $scope.ComboMes.push(enero);
        $scope.ComboMes.push(feb);
        $scope.ComboMes.push(marzo);
        $scope.ComboMes.push(abril);
        $scope.ComboMes.push(mayo);
        $scope.ComboMes.push(junio);
        $scope.ComboMes.push(julio);
        $scope.ComboMes.push(agost);
        $scope.ComboMes.push(sep);
        $scope.ComboMes.push(oct);
        $scope.ComboMes.push(nov);
        $scope.ComboMes.push(dic);
    }

    function CargarTension() {
        var baja = { id: '1', name: 'Baja' };
        var media = { id: '2', name: 'Media' };
        var alta = { id: '3', name: 'Alta' };
        $scope.ComboTension.push(baja);
        $scope.ComboTension.push(media);
        $scope.ComboTension.push(alta);
    }

    function CargarSiNo() {
        var si = { id: '1', name: 'Si Aplica' };
        var no = { id: '0', name: 'No Aplica' };
        $scope.ComboSiNo.push(si);
        $scope.ComboSiNo.push(no);
    }

    $scope.displayDialog = function (message) {
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#mainBody')))
            .clickOutsideToClose(true)
            .title('IUSASOL')
            .textContent(message)
            .ok('Aceptar')
            );
    }

    $scope.isLoading = function (visible) {
        if (visible) {
            $("#divcarga").css('visibility', 'visible');
            $("#mainBody").addClass("disabledbutton");
        } else {
            $("#divcarga").css('visibility', 'hidden');
            $("#mainBody").removeClass("disabledbutton");
        }
    }

    $scope.displayTitle = function (title) {
        $scope.PageTitle = title;
    }

    $scope.sectionSelected = function (section) {
        $scope.idSelected = section;
    };

});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../include/inicio.html',
            controller: 'indexController'
        })
        .when('/Inicio', {
            templateUrl: '../include/inicio.html',
            controller: 'indexController'
        })
        .when('/Usuarios', {
            templateUrl: '../include/Usuarios.html',
            controller: 'UsuariosController'
        })
        .when('/PerfilUsuarios', {
            templateUrl: '../include/perfilusuarios.html',
            controller: 'PerfilesController'
        })
        .when('/Bancos', {
            templateUrl: '../include/Bancos.html',
            controller: 'BancosController'
        })
        .when('/DetalleTarifaCFE', {
            templateUrl: '../include/DetalleTarifaCFE.html',
            controller: 'DetalleTarifaCFEController'
        })
        .when('/Sociedades', {
            templateUrl: '../include/Sociedades.html',
            controller: 'SociedadesController'
        })
        .when('/TablaIB', {
            templateUrl: '../include/TablaIB.html',
            controller: 'TablaIBController'
        })
        .when('/Socios', {
            templateUrl: '../include/Socios.html',
            controller: 'SociosController'
        })
        .when('/ConsumosCFE', {
            templateUrl: '../include/ConsumosCFE.html',
            controller: 'ConsumosCFEController'
        })
        .when('/ProcesoPorteo', {
            templateUrl: '../include/ProcesoPorteo.html',
            controller: 'ProcesoPorteoController'
        })
        .when('/DiasFestivos', {
            templateUrl: '../include/DiasFestivos.html',
            controller: 'FestivosController'
        })
        .when('/Neteo', {
            templateUrl: '../include/Neteo.html',
            controller: 'NeteoController'
        });
});

app.controller('indexController', function ($scope) {
    $scope.displayTitle('Inicio');
    $scope.sectionSelected('#Inicio');
    var menu = $scope.userMenu;
    //console.log(menu);
    $scope.showMenu = [];
    
    var icons = [{
        url:'#Usuarios',
        icon: '../Images/icon/ic_useradd.svg',
        desc: 'Gestiona los usuarios'
    },{
        url:'#PerfilUsuarios',
        icon: '../Images/icon/ic_profile.svg',
        desc: 'Gestiona los perfiles de usuario'
    },{
        url:'#Bancos',
        icon: '../Images/icon/ic_bank.svg',
        desc: 'Gestiona los bancos'
    },{
        url:'#DetalleTarifaCFE',
        icon: '../Images/icon/ic_tariff.svg',
        desc: 'Gestiona las tarifas'
    },{
        url:'#DiasFestivos',
        icon: '../Images/icon/ic_date.svg',
        desc:'Gestiona los Días festivos'
    },{
        url:'#Sociedades',
        icon: '../Images/icon/ic_society.svg',
        desc: 'Gestiona las Sociedades'
    },{
        url:'#Socios',
        icon: '../Images/icon/ic_member.svg',
        desc: 'Gestiona los Socios'
    },{
        url:'#TablaIB',
        icon: '../Images/icon/ic_tableib.svg',
        desc: 'Gestiona los Registros IB'
    }];

    var mMenu = icons;
    $.each(menu, function (key, dat) {
        $.each(mMenu, function (key, data) {
            if (dat.url == data.url) {
                $scope.showMenu.push(data);
            }
        });
    });
    
});

app.controller('UsuariosController', function ($scope, $mdDialog, $http) {

    $scope.displayTitle('Usuarios');
    $scope.sectionSelected('#Usuarios');
    $scope.boton = "";
    $scope.selectedIndex = 0;
    $scope.vsSelUsuario = false;
    $scope.elemInactivo = true;
    $scope.confPwd = "";
    var operation = 0;

    $scope.tab0Usu = false;
    $scope.tab1Usu = true;
    $scope.Usuario = {
        operation: '',
        name: '',
        user: '',
        password: '',
        userId: '',
        profileId: '',
        email: ''
    };
    var userAdd = {};

    $scope.showWarn = function (data) {
        if (data != '') {
            $scope.showWarning(true);
        } else {
            if ($scope.Usuario.name != '' | $scope.Usuario.user != '' | $scope.Usuario.password != '' | $scope.Usuario.userId != '' |
                $scope.Usuario.profileId != '' | $scope.Usuario.email != '' | $scope.confPwd != '') {
                $scope.showWarning(true);
            } else {
                if ($scope.Usuario.name == '' | $scope.Usuario.user == '' | $scope.Usuario.password == '' | $scope.Usuario.userId == '' |
                    $scope.Usuario.profileId == '' | $scope.Usuario.email == '' | $scope.confPwd == '') {
                    $scope.showWarning(false);
                }
            }
        }
    }

    $scope.Regresar = function () {
        $scope.tab0Usu = false;
        $scope.tab1Usu = true;
        $scope.selectedIndex = 0;
        $scope.confPwd = "";
        $scope.displayTitle('Usuarios');
        $scope.showWarning(false);
    }

    $scope.confirmar = function (ev) {
        var elemento = ev.currentTarget.innerText;
        var mensaje = ValidarCampos(elemento);
        if (mensaje != "") {
            $scope.displayDialog(mensaje);
            return;
        }

        userAdd = $scope.Usuario;
        try {
            //userAdd.password = Aes.Ctr.encrypt($scope.Usuario.password, 'iusasol2016', 256);
        } catch (exception) {
            $scope.displayDialog('Error al encriptar datos: ' + mensaje);
        }
        userAdd.operation = operation;
        $scope.isLoading(true);
        $http({
            method: 'POST',
            url: $scope.url + 'server/admin/user/Action',
            data: userAdd
        }).then(function successCallback(response) {
            $scope.isLoading(false);

            if (response.data.ID > 0) {
                displayConfirmDialog(response.data.Message);
            } else {
                $scope.displayDialog(response.data.Message);
            }
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });
    }

    $scope.SeleccionarAccion = function (ev) {
        var elemento = ev.currentTarget.id;
        $scope.Usuario = {
            operation: '',
            name: '',
            user: '',
            password: '',
            userId: '',
            profileId: '',
            email: ''
        };
        $scope.tab0Usu = true;
        $scope.tab1Usu = false;
        $scope.selectedIndex = 1;
        switch (elemento) {
            case "imgAlta":
                $scope.vsSelUsuario = true;
                $scope.elemInactivo = false;
                $scope.boton = "AGREGAR";
                operation = 10;
                $scope.displayTitle('Usuarios > Agregar');
                break;
            case "imgMod":
                $scope.vsSelUsuario = false;
                $scope.elemInactivo = false;
                $scope.boton = "ACTUALIZAR";
                operation = 20;
                $scope.displayTitle('Usuarios > Editar');
                break;
            case "imgBaja":
                $scope.vsSelUsuario = false;
                $scope.elemInactivo = true;
                $scope.boton = "ELIMINAR";
                operation = 30;
                $scope.displayTitle('Usuarios > Eliminar');
                break;
        }
    }

    $scope.CambioUsuario = function () {
        $scope.showWarning(true);
        var user = {
            operation: '10',
            ID: $scope.Usuario.userId
        };

        var ID = $scope.Usuario.userId;
        var OP = $scope.Usuario.operation;

        $scope.isLoading(true);

        $http({
            method: 'POST',
            url: $scope.url + 'server/admin/info',
            data: user
        }).then(function successCallback(response) {
            $scope.isLoading(false);

            if (response.data != null) {
                $scope.Usuario = response.data;
                $scope.Usuario.userId = ID;
            } else {
                $scope.displayDialog(response.data.Message);
            }
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });
    }

    function ValidarCampos(accion) {
        switch (accion) {
            case "AGREGAR":
                if ($scope.Usuario.user == undefined || $scope.Usuario.user == '')
                    return "Usuario es un campo obligatorio."
                
                if ($scope.Usuario.password == undefined || $scope.Usuario.password == '') 
                    return "Clave es un campo obligatorio."
                
                if ($scope.Usuario.name == undefined || $scope.Usuario.name == '') 
                    return "Nombre es un campo obligatorio."
                
                if ($scope.Usuario.profileId == undefined || $scope.Usuario.profileId == '') 
                    return "Perfil es un campo obligatorio."

                if ($scope.Usuario.email == undefined || $scope.Usuario.email == '')
                    return "Correo es un campo obligatorio."

                if (!validateEmail($scope.Usuario.email))
                    return "Ingrese un correo valido.";

                if ($scope.confPwd != $scope.Usuario.password) 
                    return "Error en la confirmación de la clave, intente de nuevo.";
                
                break;
            case "ACTUALIZAR":
                if ($scope.Usuario.userId == undefined || $scope.Usuario.userId == '')
                    return "No ha seleccionado un usuario."

                if ($scope.Usuario.user == undefined || $scope.Usuario.user == '') 
                    return "Usuario es un campo obligatorio."
                /**
                if ($scope.Usuario.password == undefined || $scope.Usuario.password == '') 
                    return "Clave es un campo obligatorio."
                **/
                if ($scope.Usuario.name == undefined || $scope.Usuario.name == '') 
                    return "Nombre es un campo obligatorio."
                
                if ($scope.Usuario.profileId == undefined || $scope.Usuario.profileId == '')  
                    return "Perfil es un campo obligatorio."
                
                if ($scope.Usuario.email == undefined || $scope.Usuario.email == '') 
                    return "Correo es un campo obligatorio."

                if (!validateEmail($scope.Usuario.email))
                    return "Ingrese un correo valido.";
                
                break;
            case "ELIMINAR":
                if ($scope.Usuario.userId == undefined || $scope.Usuario.userId == '') 
                    return "Usuario es un campo obligatorio."
                
                break;
        }
        return "";
    }

    function displayConfirmDialog(message) {
        $mdDialog.show($mdDialog.confirm()
          .title('CONFIRMACIÓN')
          .textContent(message)
          .ariaLabel('Lucky day')
          .ok('Aceptar')
          ).then(function () {
              $scope.showWarning(false);
              window.location.reload();
          }, function () {
          });
    }
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
});

app.controller('PerfilesController', function ($scope, $mdDialog, $http) {

    $scope.displayTitle('Perfiles de Usuario');
    $scope.sectionSelected('#PerfilUsuarios');
    $scope.boton = "";
    $scope.selectedIndex = 0;
    $scope.vsSelPerfil = false;
    $scope.elemInactivo = true;
    $scope.menus = [];

    $scope.tab0Per = false;
    $scope.tab1Per = true;
    $scope.tab2Per = true;
    $scope.visEstatus = false;

    $scope.Perfil = {
        operation: '',
        profileId: '',
        typeId: '',
        name: '',
        permissions: '',
        active: '',
        menu: []
    };

    /** show dialog **/
    $scope.showWarn = function (data) {
        if (data != '') {
            $scope.showWarning(true);
        } else {
            if ($scope.profileId != '' | $scope.Perfil.typeId != '' | $scope.Perfil.name != '' | $scope.Perfil.active != '') {
                $scope.showWarning(true);
            } else {
                if ($scope.profileId == '' | $scope.Perfil.typeId == '' | $scope.Perfil.name == '' | $scope.Perfil.active == '') {
                    $scope.showWarning(false);
                }
            }
            $scope.showWarning(false);
        }
    }
    /**end show dialog **/
    
    /**/
    $scope.items = [];
    $scope.selected = [];
 
    
    $scope.toggle = function (item,list) {
        var idx = list.indexOf(item);
        if(idx > -1){
            list.splice(idx,1);
        }else{
            list.push(item);
        }
        if ($scope.selected.length == 0) {
            $scope.showWarning(false);
        } else {
            $scope.showWarning(true);
        }
    };
    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };
    /**/
    var profile = {};

    $scope.SeleccionarAccion = function (ev) {
        var elemento = ev.currentTarget.id;
        $scope.tab0Per = true;
        $scope.tab1Per = false;
        $scope.tab2Per = true;
        $scope.selectedIndex = 1;
        $scope.menus = [];
        $scope.Perfil = {};
        var mMenu = $scope.ComboMenu;
        $.each(mMenu, function (key, data) {
            $scope.items.push(data.name);
        });
        $scope.visEstatus = false;
        $scope.Perfil.permissions = 1;
        switch (elemento) {
            case "imgAlta":
                $scope.vsSelPerfil = true;
                $scope.elemInactivo = false;
                $scope.boton = "AGREGAR";
                $scope.Perfil.operation = 10;
                $scope.Perfil.active = '1';
                $scope.Perfil.profileId = '0';
                $scope.displayTitle('Perfiles de Usuario > Agregar');
                $scope.visEstatus = true;
                break;
            case "imgMod":
                $scope.vsSelPerfil = false;
                $scope.elemInactivo = false;
                $scope.boton = "ACTUALIZAR";
                $scope.Perfil.operation = 20;
                $scope.displayTitle('Perfiles de Usuario > Editar');
                break;
            case "imgBaja":
                $scope.vsSelPerfil = false;
                $scope.elemInactivo = true;
                $scope.boton = "ELIMINAR";
                $scope.Perfil.operation = 30;
                $scope.displayTitle('Perfiles de Usuario > Eliminar');
                break;
        }
    }

    function createMenu() {
        var se = $scope.selected;
        var mMenu = $scope.ComboMenu;
        $scope.menu = [];
        $.each(se, function (key, dat) {
            $.each(mMenu, function (key, data) {
                if (dat == data.name) {
                    var mnu = {
                        url: '',
                        id: data.dataId,
                        text: data.name
                    };
                    $scope.menu.push(mnu);
                }
            });
        });
    };
    $scope.confirmar = function (ev) {
        var elemento = ev.currentTarget.innerText;
        var mensaje = ValidarCampos(elemento);
        if (mensaje != "") {
            $scope.displayDialog(mensaje);
            return;
        }
        
        createMenu();
        $scope.Perfil.menu = JSON.parse(JSON.stringify($scope.menu));
        profile = $scope.Perfil;
        $scope.isLoading(true);

        $http({
            method: 'POST',
            url: $scope.url + 'server/admin/profile/Action',
            data: profile
        }).then(function successCallback(response) {
            $scope.isLoading(false);

            if (response.data != null) {
                if (response.data.ID > 0) {
                    displayConfirmDialog(response.data.Message);
                } else {
                    $scope.displayDialog(response.data.Message);
                }
            } else {
                $scope.displayDialog(response);
            }
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });
    }

    function ValidarCampos(accion) {
        switch (accion) {
            case "AGREGAR":
                if ($scope.Perfil.name == undefined || $scope.Perfil.name == '') 
                    return "Nombre es un campo obligatorio."
                
                $scope.Perfil.active = 1;

                if ($scope.Perfil.typeId == undefined || $scope.Perfil.typeId == '') 
                    return "Tipo de perfil es un campo obligatorio."
                
                
                break;
            case "ACTUALIZAR":
                if ($scope.Perfil.name == undefined || $scope.Perfil.name == '') 
                    return "Nombre es un campo obligatorio."
                
                if ($scope.Perfil.active == undefined || $scope.Perfil.active == '') 
                    return "Estatus es un campo obligatorio."
                
                if ($scope.Perfil.typeId == undefined || $scope.Perfil.typeId == '') 
                    return "Tipo de perfil es un campo obligatorio."
                
                if ($scope.Perfil.profileId == undefined || $scope.Perfil.profileId == '') 
                    return "Perfil es un campo obligatorio."
                
                break;
            case "ELIMINAR":
                if ($scope.Perfil.profileId == undefined || $scope.Perfil.profileId == '') 
                    return "Perfil es un campo obligatorio."
                
                break;
        }
        return "";
    }

    $scope.Regresar = function () {
        if ($scope.selectedIndex == 2) {
            $scope.tab0Per = true;
            $scope.tab1Per = false;
            $scope.tab2Per = true;
            $scope.selectedIndex = 1;
        } else {
            $scope.tab0Per = false;
            $scope.tab1Per = true;
            $scope.tab2Per = true;
            $scope.selectedIndex = 0;
            $scope.displayTitle('Perfiles de Usuario');
            $scope.selected = [];
            $scope.showWarning(false);
        }
    }

    $scope.Siguiente = function () {

        $scope.tab0Per = true;
        $scope.tab1Per = true;
        $scope.tab2Per = false;

        $scope.selectedIndex = 2;
    }

    function displayConfirmDialog(message) {
        $mdDialog.show($mdDialog.confirm()
          .title('CONFIRMACIÓN')
          .textContent(message)
          .ariaLabel('Lucky day')
          .ok('Aceptar')
          ).then(function () {
              $scope.selected = [];
              $scope.showWarning(false);
              window.location.reload();
          }, function () {
          });
    }
    
    $scope.CambioPerfil = function () {
        
        var user = {
            operation: '20',
            ID: $scope.Perfil.profileId
        };

        var ID = $scope.Perfil.profileId;
        var OP = $scope.Perfil.operation;

        $scope.isLoading(true);

        $http({
            method: 'POST',
            url: $scope.url + 'server/admin/info',
            data: user
        }).then(function successCallback(response) {
            $scope.isLoading(false);

            if (response.data != null) {
                $scope.showWarning(true);
                $scope.selected = [];
                $scope.Perfil = response.data;
                $scope.Perfil.profileId = ID;
                $scope.Perfil.operation = OP;
                var menu = response.data.menu;
                $.each(menu, function (key, data) {
                    $scope.selected.push(data.text);
                });
            } else {
                $scope.displayDialog(response.data.Message);
            }
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });
    }

});

app.controller('BancosController', function ($scope, $mdDialog, $http) {
 
    $scope.displayTitle('Bancos');
    $scope.sectionSelected('#Bancos');
    $scope.boton = "";
    $scope.selectedIndex = 0;
    $scope.vsSelBanco = false;
    $scope.elemInactivo = true;

    $scope.tab0Ban = false;
    $scope.tab1Ban = true;

    $scope.Banco = {
        operation: '',
        atributeId: '',
        dataId: '',
        name: ''
    };

    /** show dialog **/
    $scope.showWarn = function (data) {
        if (data != '') {
            $scope.showWarning(true);
        } else {
            if ($scope.Banco.atributeId != '' | $scope.Banco.dataId != '' | $scope.Banco.name != '') {
                $scope.showWarning(true);
            } else {
                if ($scope.Banco.atributeId == '' | $scope.Banco.dataId == '' | $scope.Banco.name == '') {
                    $scope.showWarning(false);
                }
            }
            
        }
    }
    /**end show dialog **/

    var bank = {};

    $scope.SeleccionarAccion = function (ev) {
        var elemento = ev.currentTarget.id;
        $scope.tab0Ban = true;
        $scope.tab1Ban = false;
        $scope.selectedIndex = 1;
        $scope.Banco = {};
        switch (elemento) {
            case "imgAlta":
                $scope.vsSelBanco = true;
                $scope.elemInactivo = false;
                $scope.boton = "AGREGAR";
                $scope.Banco.operation = '10';
                $scope.Banco.dataId = '';
                $scope.displayTitle('Bancos > Agregar');
                break;
            case "imgMod":
                $scope.vsSelBanco = false;
                $scope.elemInactivo = false;
                $scope.boton = "ACTUALIZAR";
                $scope.Banco.operation = '20';
                $scope.displayTitle('Bancos > Editar');
                break;
            case "imgBaja":
                $scope.vsSelBanco = false;
                $scope.elemInactivo = true;
                $scope.boton = "ELIMINAR";
                $scope.Banco.operation = '30';
                $scope.displayTitle('Bancos > Eliminar');
                break;
        }
    }

    $scope.confirmar = function (ev) {
        var elemento = ev.currentTarget.innerText;
        var mensaje = ValidarCampos(elemento);
        if (mensaje != "") {
            $scope.displayDialog(mensaje);
            return;
        }
        bank = $scope.Banco;
        $scope.isLoading(true);

        $http({
            method: 'POST',
            url: $scope.url + 'server/admin/bank/Action',
            data: bank
        }).then(function successCallback(response) {
            $scope.isLoading(false);

            if (response.data.ID > 0) {
                displayConfirmDialog(response.data.Message);
            } else {
                $scope.displayDialog(response.data.Message);
            }
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });
    }

    function ValidarCampos(accion) {
        switch (accion) {
            case "AGREGAR":
                if ($scope.Banco.name == undefined || $scope.Banco.name == '') 
                    return "Usuario es un campo obligatorio."
                
                if ($scope.Banco.atributeId == undefined || $scope.Banco.atributeId == '') 
                    return "Identificador de banco es un campo obligatorio."
                
                break;
            case "ACTUALIZAR":
                $scope.Banco.operation = '20';
                if ($scope.Banco.dataId == undefined || $scope.Banco.dataId == '')
                    return "Banco es un campo obligatorio."

                if ($scope.Banco.name == undefined || $scope.Banco.name == '') 
                    return "Usuario es un campo obligatorio."
                
                if ($scope.Banco.atributeId == undefined || $scope.Banco.atributeId == '') 
                    return "Identificador de banco es un campo obligatorio."
                
                break;
            case "ELIMINAR":
                $scope.Banco.operation = '30';
                if ($scope.Banco.dataId == undefined || $scope.Banco.dataId == '') {
                    return "Banco es un campo obligatorio."
                }
                break;
        }
        return "";
    }

    $scope.Regresar = function () {
        $scope.tab0Ban = false;
        $scope.tab1Ban = true;
        $scope.selectedIndex = 0;
        $scope.displayTitle('Bancos');
        $scope.showWarning(false);
    }

    function displayConfirmDialog(message) {
        $mdDialog.show($mdDialog.confirm()
          .title('CONFIRMACIÓN')
          .textContent(message)
          .ariaLabel('Lucky day')
          .ok('Aceptar')
          ).then(function () {
              $scope.showWarning(false);
              window.location.reload();
          }, function () {
          });
    }

    $scope.CambioBanco = function () {

        var user = {
            operation: '30',
            ID: $scope.Banco.dataId
        };

        $scope.isLoading(true);

        $http({
            method: 'POST',
            url: $scope.url + 'server/admin/info',
            data: user
        }).then(function successCallback(response) {
            $scope.isLoading(false);

            if (response.data != null) {
                $scope.showWarning(true);
                $scope.Banco = response.data;
            } else {
                $scope.displayDialog(response.data.Message);
            }
        }, function errorCallback(response) {
            $scope.isLoading(false);

            $scope.displayDialog(response.data || ' Request failed');
        });
    }
    
});

app.controller('DetalleTarifaCFEController', function ($scope, $mdDialog, $http) {

    $scope.sectionSelected('#DetalleTarifaCFE');
    $scope.displayTitle('Detalle tarifa CFE');
    $scope.showHints = false;
    $scope.boton = "";
    $scope.selectedIndex = 0;
    $scope.vsSelTarifaDet = false;
    $scope.elemInactivo = true;

    $scope.tab0Tar = false;
    $scope.tab1Tar = true;
    $scope.tab2Tar = true;
    $scope.tInactivo = false;

    $scope.ComboTarifa = [];
    $scope.updateTariff = [];

    $scope.priceKwh = 'Precio kWh';
    $scope.priceKwhF = 'Precio kWh Fuera Verano';
    $scope.mSummer = true;
    $scope.range = [];
   
    $scope.Siguiente = "Finalizar";

    $scope.fixedCharge;
    $scope.Price = true;

    $scope.CargoVisible = false;
    $scope.tariffA = true;
    $scope.tariffB = true;
    var type = true;
    $scope.edit = false;

    $scope.Tarifas = {
        operation: '',
        cfeDetails: {},
        cfeDetail: {}
    }

    $scope.Tarifa = {
        Id: '',
        Tar_Id: '',
        year: '',
        month: '',
        applyCharge: '',
        initialRange: '',
        endRange: '',
        fixedCharge: '',
        pricekWh: '',
        winter: '',
        tension: ''
    };

    var tBaja = { id: '1', name: 'Baja tensión' };
    var tMedia = { id: '2', name: 'Media tensión' };
    var tAlta = {id:'3',name:'Alta tensión'};
    $scope.tension = [];
    $scope.tension.push(tBaja);
    $scope.tension.push(tMedia);
    $scope.tension.push(tAlta);
    $scope.Tar = [];

    function ordenateCombo(data) {
        $scope.ComboTarifa = [];
        $.each(data, function (key,data) {
            if(data.dataId != 17){
                if (data.dataId != 24) {
                    $scope.ComboTarifa.push(data);
                }
            }
        });
    }
    /** show dialog **/
    $scope.showWarn = function (data) {
        if (data != '') {
            $scope.showWarning(true);
        } else {
            if ($scope.Tarifa.Tar_Id != '' | $scope.Tarifa.year != '' | $scope.Tarifa.month != '' | $scope.Tarifa.applyCharge != ''
                | $scope.Tarifa.initialRange != '' | $scope.Tarifa.endRange != '' | $scope.Tarifa.fixedCharge != ''
                | $scope.Tarifa.pricekWh != '' | $scope.Tarifa.winter != '' | $scope.Tarifa.tension != '') {
                $scope.showWarning(true);
            } else {
                if ($scope.Tarifa.Tar_Id == '' | $scope.Tarifa.year == '' | $scope.Tarifa.month == '' | $scope.Tarifa.applyCharge == ''
                | $scope.Tarifa.initialRange == '' | $scope.Tarifa.endRange == '' | $scope.Tarifa.fixedCharge == ''
                | $scope.Tarifa.pricekWh == '' | $scope.Tarifa.winter == '' | $scope.Tarifa.tension == '') {
                    $scope.showWarning(false);
                }
            }
        }
    }
    /**end show dialog **/
 

    $scope.mApplyTarif = function () {
        $scope.showWarning(true);
        $scope.tariffA = true;
        $scope.tariffB = true;
        if ($scope.applyTarif == 1) {
            $scope.tariffA = false;
            $scope.tariffB = false;
        } else {
            $scope.Tarifa.winter = 0;
            $scope.tariffA = true;
            $scope.tariffB = true;
        }
        if ($scope.Tarifa.applyCharge == 0 && $scope.applyTarif == 1)
            $scope.Price = true;

        if ($scope.Tarifa.applyCharge == 0 && $scope.applyTarif == 0)
            $scope.Price = false;

        if ($scope.Tarifa.applyCharge == 1 && $scope.applyTarif == 1) {
            $scope.tariffA = true;
            $scope.tariffB = true;
        }
        if ($scope.Tarifa.applyCharge == 0 && $scope.applyTarif == 0 && $scope.Tarifa.Tar_Id == 61) {
            $scope.Price = true;
            $scope.tariffB = false;
            $scope.Tarifa.pricekWh = 0;
        }
    };

    $scope.SeleccionarAccion = function (ev) {
        var elemento = ev.currentTarget.id;
        $scope.tab0Tar = true;
        $scope.tab1Tar = false;
        $scope.tab2Tar = true;
        $scope.selectedIndex = 1;
        $scope.Tarifa = {
            Id: '',
            Tar_Id: '',
            year: '',
            month: '',
            applyCharge: '',
            initialRange: '',
            endRange: '',
            fixedCharge: '',
            pricekWh: '',
            winter: '',
            tension: ''
        };
        ordenateCombo($scope.ComboTarifaP);
        $scope.fixedCharge = '';
        $scope.applyTarif = '';
        switch (elemento) {
            case "imgAlta":
                delet(false);
                $scope.vsSelTarifaDet = true;
                $scope.elemInactivo = false;
                $scope.boton = "AGREGAR";
                $scope.Tarifas.operation = 10;
                $scope.displayTitle('Detalle tarifa CFE > Agregar');
                $scope.edit = false;
                borrarTabla();
                break;
            case "imgMod":
                delet(false);
                $scope.vsSelTarifaDet = false;
                $scope.elemInactivo = false;
                $scope.boton = "ACTUALIZAR";
                $scope.Tarifas.operation = 20;
                $scope.displayTitle('Detalle tarifa CFE > Editar');
                borrarTabla();
                $scope.edit = true;
                break;
            case "imgBaja":
                delet(true);
                $scope.vsSelTarifaDet = false;
                $scope.elemInactivo = false;
                $scope.boton = "ELIMINAR";
                $scope.Siguiente = "ELIMINAR";
                $scope.Tarifas.operation = 30;
                $scope.displayTitle('Detalle tarifa CFE > Eliminar');
                $scope.edit = false;
                break;
        }
    }

    $scope.getData = function () {
        $scope.showWarning(true);
        if($scope.edit){
            if ($scope.Tarifa.Tar_Id == undefined | $scope.Tarifa.Tar_Id == '') {
                $scope.displayDialog("Tarifa es un campo obligatorio");
                return;
            }
            if ($scope.Tarifa.year == undefined | $scope.Tarifa.year == '') {
                $scope.displayDialog("Año es un campo obligatorio");
                return;
            }
            if ($scope.Tarifa.month == undefined | $scope.Tarifa.month == '') {
                $scope.displayDialog("Mes es un campo obligatorio");
                return;
            }
                
            if ($scope.Tarifa.Tar_Id == 1 || $scope.Tarifa.Tar_Id == 2) {
                /*
                * validación Tarifa 5 5A
                */
                if ($scope.Tarifa.tension == undefined) {
                    $scope.displayDialog("Tension es un campo obligatorio");
                    return;
                }
            }
          
            $scope.isLoading(true);
            var tariffUpdate = {
                ID : '',
                Message:'',
                count : '',
                tariff:[],
            }

            tariffUpdate.tariff = $scope.Tarifa;
            $http({
                method: 'POST',
                url: $scope.url + 'server/admin/tariffUpdate',
                data: tariffUpdate
            }).then(function successCallback(response) {
                $scope.isLoading(false);
                if (response.data.ID > 0) {
                    displayDataUpdate(response.data);
                } else {
                    $scope.displayDialog(response.data.Message);
                }
            }, function errorCallback(response) {
                $scope.isLoading(false);
                $scope.displayDialog(response.data || ' Request failed');
            });
        }
    }

    function displayDataUpdate(data) {
        $scope.updateTariff = [];
        $scope.Tarifa = data.tariff;
        $scope.updateTariff = data;
        $scope.fixedCharge = (data.tariff.fixedCharge == 0) ? 0 : 1;
        $scope.applyTarif = (data.tariff.winter == 0) ? 0 : 1; 
        if ($scope.fixedCharge == 0){
            $scope.CargoVisible = true;
        } else {
            $scope.CargoVisible = false;
        }
        $scope.mApplyTarif();
        if (data.count == 1){
            $scope.Siguiente = "Actualizar";
        } else {
            $scope.Tarifa.pricekWh = '0.00';
            $scope.Price = true;
            displayRangeTable(data);
            $scope.Siguiente = "Siguiente";
        }
        
    }
    $scope.hideId = true;
    function displayRangeTable(data) {
        $scope.range = [];
        $scope.range = data.details;
        if (data.tariff.winter == 0) {
            type = false;
            console.log(data.details);
            $scope.priceKwh = 'Precio kWh';
            $scope.priceKwhF = 'Precio kWh Fuera Verano';
            $scope.mSummer = true;
            
        } else {
            type = true;
            $scope.priceKwh = 'Precio kWh Verano';
            $scope.priceKwhF = 'Precio kWh Fuera Verano';
            $scope.mSummer = false;
            
        }
    }

    function delet(disable) {
        $scope.fixedC = disable;
        $scope.CargoVisible = disable;
        $scope.Price = disable;
        $scope.tariffA = disable;
        $scope.tariffB = disable;
    }

    function ValidarCampos(accion) {
        switch (accion) {
            case "AGREGAR":
                if ($scope.Tarifa.Tar_Id == undefined)
                    return "Tarifa es un campo obligatorio";
                if ($scope.Tarifa.year == undefined)
                    return "Año es un campo obligatorio";
                if ($scope.Tarifa.month == undefined)
                    return "Mes es un campo obligatorio";
                if ($scope.Tarifa.Tar_Id == 1 || $scope.Tarifa.Tar_Id == 2) {
                    /*
                    * validación Tarifa 5 5A
                    */
                    if ($scope.Tarifa.tension == undefined)
                        return "Tension es un campo obligatorio";

                    if ($scope.Tarifa.pricekWh == undefined)
                        return "Precio Kwh es un campo obligatorio";
                }
                if ($scope.fixedCharge == 1) {
                    if ($scope.Tarifa.fixedCharge == undefined)
                        return "Cargo fijo es obligatorio";
                }
                if ($scope.Tarifa.Tar_Id == 13) {
                    /*
                    * validación Tarifa 2
                    */

                }

                if ($scope.Tarifa.Tar_Id == 61) {
                    /*
                    * validación tarifa Dac
                    */
                    if ($scope.Tarifa.applyCharge == undefined)
                        return "Cargo Fijo es un campo obligatorio."
                    if ($scope.Tarifa.winter == undefined)
                        return "Tarifa fuera de verano es un campo obligatorio."
                }

                break;
            case "ACTUALIZAR":
                if ($scope.Tarifa.Tar_Id == undefined)
                    return "Tarifa es un campo obligatorio";
                if ($scope.Tarifa.year == undefined)
                    return "Año es un campo obligatorio";
                if ($scope.Tarifa.month == undefined)
                    return "Mes es un campo obligatorio";
                if ($scope.Tarifa.Tar_Id == 1 || $scope.Tarifa.Tar_Id == 2) {
                    /*
                    * validación Tarifa 5 5A
                    */
                    if ($scope.Tarifa.tension == undefined)
                        return "Tension es un campo obligatorio";

                    if ($scope.Tarifa.pricekWh == undefined)
                        return "Precio Kwh es un campo obligatorio";
                }
                if ($scope.fixedCharge == 1) {
                    if ($scope.Tarifa.fixedCharge == undefined)
                        return "Cargo fijo es obligatorio";
                }
                if ($scope.Tarifa.Tar_Id == 13) {
                    /*
                    * validación Tarifa 2
                    */
                    $scope.Tarifa.tension = "1";
                }

                if ($scope.Tarifa.Tar_Id == 61) {
                    /*
                    * validación tarifa Dac
                    */
                    if ($scope.Tarifa.applyCharge == undefined)
                        return "Cargo Fijo es un campo obligatorio."
                    if ($scope.Tarifa.winter == undefined)
                        return "Tarifa fuera de verano es un campo obligatorio."
                }
                break;
            case "ELIMINAR":
                if ($scope.Tarifa.Tar_Id == undefined)
                    return "Tarifa es un campo obligatorio."
                if ($scope.Tarifa.tension == undefined && ($scope.Tarifa.Tar_Id == 1 || $scope.Tarifa.Tar_Id == 2))
                    return "Tension es un campo obligatorio.";
                if ($scope.Tarifa.year == undefined)
                    return "Año es un campo obligatorio";
                if ($scope.Tarifa.month == undefined)
                    return "Mes es un campo obligatorio";
                break;
        }
        return "";
    }

    function displayConfirmDialog(message) {
        $mdDialog.show(
            $mdDialog.confirm()
            .parent(angular.element(document.querySelector('#mainBody')))
            .title('CONFIRMACIÓN')
            .textContent(message)
            .ok('Aceptar')
          ).then(function () {
              $scope.showWarning(false);
              window.location.reload();
          }, function () {
          });
    }

    $scope.fixedChargeV = function () {
        $scope.showWarning(true);
        if ($scope.fixedCharge == 0) {
            $scope.Tarifa.fixedCharge = '0.00';
            $scope.CargoVisible = true;
        } else {
            $scope.CargoVisible = false;
        }
    };

    $scope.tariffSelect = function () {
        $scope.showWarning(true);
        $scope.Tarifa = {
            Id: '',
            Tar_Id: $scope.Tarifa.Tar_Id,
            year: '',
            month: '',
            applyCharge: '',
            initialRange: '',
            endRange: '',
            fixedCharge: '',
            pricekWh: '',
            winter: '',
            tension: ''
        };
        $scope.fixedCharge = '';
        $scope.applyTarif = '';
        if ($scope.Tarifa.Tar_Id == 13 || $scope.Tarifa.Tar_Id == 61) {
            if($scope.Tarifa.Tar_Id == 13)
                $scope.Tarifa.tension = '1';
            if ($scope.Tarifa.Tar_Id == 61)
                $scope.Tarifa.tension = '3';
            $scope.tInactivo = true;
        } else {
            $scope.tInactivo = false;
        }
    };

    $scope.Regresar = function () {
        if ($scope.selectedIndex == 2) {
            $scope.tab0Tar = true;
            $scope.tab1Tar = false;
            $scope.tab2Tar = true;
        } else {
            $scope.tab0Tar = false;
            $scope.tab1Tar = true;
            $scope.tab2Tar = true;
            $scope.displayTitle('Detalle tarifa CFE');
            $scope.showWarning(false);
        }
        $scope.selectedIndex = $scope.selectedIndex - 1;
    }

    $scope.Next = function () {
        if ($scope.Siguiente == "Siguiente") {
            $scope.tab0Tar = true;
            $scope.tab1Tar = true;
            $scope.tab2Tar = false;
            if (!$scope.edit) {
                if ($scope.Tarifa.applyCharge == 1 && $scope.applyTarif == 0) {
                    type = false;
                    $scope.priceKwh = 'Precio kWh';
                    $scope.priceKwhF = 'Precio kWh Fuera Verano';
                    $scope.mSummer = true;
                    
                }
                if ($scope.Tarifa.applyCharge == 1 && $scope.applyTarif == 1) {
                    $scope.tariffA = true;
                    $scope.tariffB = true;
                    type = true;
                    $scope.priceKwh = 'Precio kWh Verano';
                    $scope.priceKwhF = 'Precio kWh Fuera Verano';
                    $scope.mSummer = false;
                    
                }
            }
            
            $scope.selectedIndex = $scope.selectedIndex + 1;
        } else {
            Terminar();
        }
    }

    $scope.terminar = function () {
        Terminar();
    };

    function Terminar() {
        $scope.Tar = [];
        var elemento = $scope.boton;
        var mensaje = ValidarCampos(elemento);
        if (mensaje != "") {
            $scope.displayDialog(mensaje);
            return;
        }

        $scope.isLoading(true);
        if($scope.edit){
            if ($scope.updateTariff.count == 1) {
                $scope.Tarifa.id = $scope.updateTariff.tariff.id;
                $scope.Tar.push($scope.Tarifa);
                $scope.Tarifas.cfeDetails = JSON.parse(JSON.stringify($scope.Tar));
            } else {
                GenerarEntidad();
                $scope.Tarifas.cfeDetails = JSON.parse(JSON.stringify($scope.Tar));
            }
        } else {
            if ($scope.Tarifas.operation == 30) {
                $scope.Tarifas.cfeDetail = $scope.Tarifa;
            } else {
                if ($scope.Tarifa.Tar_Id == 1 || $scope.Tarifa.Tar_Id == 2 || $scope.Tarifa.Tar_Id == 61) {
                    $scope.Tar.push($scope.Tarifa);
                    $scope.Tarifas.cfeDetails = JSON.parse(JSON.stringify($scope.Tar));
                } else {
                    if ($scope.Tarifa.Tar_Id == 13) {
                        GenerarEntidad();
                        $scope.Tarifas.cfeDetails = JSON.parse(JSON.stringify($scope.Tar));
                    }
                }
            }
        }

        $http({
            method: 'POST',
            url: $scope.url + 'server/admin/tariff/Action',
            data: $scope.Tarifas
        }).then(function successCallback(response) {
            $scope.isLoading(false);
            if (response.data.ID > 0) {
                displayConfirmDialog(response.data.Message);
            } else {
                $scope.displayDialog(response.data.Message);
            }
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });
    }

    $scope.CambioRangos = function () {
        $scope.showWarning(true);
        if ($scope.Tarifa.applyCharge == 0) {
            var hide = ($scope.Tarifa.Tar_Id == 61) ? true : false;
            $scope.Price = hide;
            $scope.Tarifa.initialRange = '0',
            $scope.Tarifa.endRange = '0';
            $scope.Siguiente = "Finalizar";
        } else {
            $scope.Price = true;
            $scope.Siguiente = "Siguiente";
        }


    }

    function GenerarEntidad() {
        var data = $scope.range;
        $.each(data, function (key, data) {
            var T = {
                Id: ($scope.edit)? data.id: '0',
                Tar_Id: $scope.Tarifa.Tar_Id,
                year: $scope.Tarifa.year,
                month: $scope.Tarifa.month,
                applyCharge: $scope.Tarifa.applyCharge,
                initialRange: data.initialRange,
                endRange: data.endRange,
                fixedCharge: $scope.Tarifa.fixedCharge,
                winter: (type)? data.pricekwhF: '0',
                pricekWh: data.priceKwh,
                tension: $scope.Tarifa.tension
            };

            $scope.Tar.push(T);
            
        });
    }

    /***/
    $scope.saveTariff = function (data, id) {
        angular.extend(data, {id:id});
    }
    $scope.addTariff = function () {
        $scope.inserted = {
            id: '',
            initialRange: '',
            endRange: '',
            priceKwh: '',
            pricekwhF: ''
        };
        $scope.range.push($scope.inserted);
    };
    $scope.removeTariff = function (index) {
        $scope.range.splice(index, 1);
        //console.log($scope.range);
    };
    /***/


 
    function borrarTabla() {
        $scope.range = [];
    }

});

app.controller('SociedadesController', function ($scope, $mdDialog, $http, $mdMedia) {
    
    $scope.sectionSelected('#Sociedades');
    $scope.displayTitle('Sociedades');
    $scope.boton = "";
    $scope.selectedIndex = 0;
    $scope.vsSelSociedad = false;
    $scope.vsinpRazonSocial = false;
    $scope.vsinpClave = false;
    $scope.vsinpRfc = false;
    $scope.vsinpCalle = false;
    $scope.vsinpNoInt = false;
    $scope.vsinpNoExt = false;
    $scope.vsinpColonia = false;
    $scope.vsSelEstado = false;
    $scope.vsSelMunicipio = false;
    $scope.vsSelCP = false;
    $scope.btnCP = false;
    $scope.vsinpTelefono = false;
    $scope.vsinpEmail = false;
    $scope.vsbtnSocio = false;
    $scope.Municipios = [];
    $scope.CodigosPostales = [];
    $scope.mColony = [];
    $scope.elemInactivo = true;
    $scope.elemPagoInactivo = true;

    $scope.mUpdate = false;
    $scope.hideBlock = false;

    $scope.Tab0Socio = false;
    $scope.Tab1Socio = true;
    $scope.Tab2Socio = true;
    $scope.Tab3Socio = true;

    $scope.statusAdd = false;
    /**/
    $scope.dAccountType = false;
    $scope.hideNumberTD = true;
    $scope.vsinpClabe = false;
    $scope.disableColony = true;
    $scope.colony = [];
    var mEdit = false;
    /**/

    $scope.Sociedad = {
        operation: '',
        id: '',
        name: '',
        businessname: '',
        NameKey: '',
        rfc: '',
        street: '',
        noint: '',
        noext: '',
        colony: '',
        stateId: '', //llave a tabla estados
        municipalityID: '', //llave a tabla municipios
        zipcodeId: '', //llave a tabla cp
        phone: '',
        email: '',
        pay: '', //llave a tabla forma de pago
        bank: '', //llave a tabla bancos
        tcuenta: '', //llave a tabla tipo cuenta
        interbank: '',
        discount: '',
        tariff: '', //llave a tabla tarifas
        horarytariff: '', //llave a la tabla TARIFAHORARIAS_PRT
        active: '',
        limit: '',
        cardNumber:''
    };

    /** show dialog **/
    $scope.showWarn = function (data) {
        if (data != '') {
            $scope.showWarning(true);
        } else {
            if ($scope.Sociedad.id != '' | $scope.Sociedad.name != '' | $scope.Sociedad.businessname != '' | $scope.Sociedad.NameKey != ''
                | $scope.Sociedad.rfc != '' | $scope.Sociedad.street != '' | $scope.Sociedad.noint != ''
                | $scope.Sociedad.noext != '' | $scope.Sociedad.colony != '' | $scope.Sociedad.stateId != ''
                | $scope.Sociedad.municipalityID != '' | $scope.Sociedad.zipcodeId != '' | $scope.Sociedad.phone != '' | $scope.Sociedad.email != ''
                | $scope.Sociedad.pay != '' | $scope.Sociedad.bank != '' | $scope.Sociedad.tcuenta != '' | $scope.Sociedad.interbank != ''
                | $scope.Sociedad.discount != '' | $scope.Sociedad.tariff != '' | $scope.Sociedad.horarytariff != '' | $scope.Sociedad.active != ''
                | $scope.Sociedad.limit != '' | $scope.Sociedad.cardNumber != '') {
                $scope.showWarning(true);
            } else {
                if ($scope.Sociedad.id == '' | $scope.Sociedad.name == '' | $scope.Sociedad.businessname == '' | $scope.Sociedad.NameKey == ''
                | $scope.Sociedad.rfc == '' | $scope.Sociedad.street == '' | $scope.Sociedad.noint == ''
                | $scope.Sociedad.noext == '' | $scope.Sociedad.colony == '' | $scope.Sociedad.stateId == ''
                | $scope.Sociedad.municipalityID == '' | $scope.Sociedad.zipcodeId == '' | $scope.Sociedad.phone == '' | $scope.Sociedad.email == ''
                | $scope.Sociedad.pay == '' | $scope.Sociedad.bank == '' | $scope.Sociedad.tcuenta == '' | $scope.Sociedad.interbank == ''
                | $scope.Sociedad.discount == '' | $scope.Sociedad.tariff == '' | $scope.Sociedad.horarytariff == '' | $scope.Sociedad.active == ''
                | $scope.Sociedad.limit == '' | $scope.Sociedad.cardNumber == '') {
                    $scope.showWarning(false);
                }
            }
        }
    }
    /**end show dialog **/

    $scope.Regresar = function () {
        switch ($scope.selectedIndex) {
            case 1:
                $scope.Tab0Socio = false;
                $scope.Tab1Socio = true;
                $scope.Tab2Socio = true;
                $scope.Tab3Socio = true;
                $scope.displayTitle('Sociedades');
                break;
            case 2:
                $scope.Tab0Socio = true;
                $scope.Tab1Socio = false;
                $scope.Tab2Socio = true;
                $scope.Tab3Socio = true;
                break;
            case 3:
                $scope.Tab0Socio = true;
                $scope.Tab1Socio = true;
                $scope.Tab2Socio = false;
                $scope.Tab3Socio = true;
                break;
        }
        $scope.selectedIndex = $scope.selectedIndex - 1;
    }

    $scope.Siguiente = function () {
        switch ($scope.selectedIndex) {
            case 1:
                $scope.Tab0Socio = true;
                $scope.Tab1Socio = true;
                $scope.Tab2Socio = false;
                $scope.Tab3Socio = true;
                break;
            case 2:
                $scope.Tab0Socio = true;
                $scope.Tab1Socio = true;
                $scope.Tab2Socio = true;
                $scope.Tab3Socio = false;
                break;
        }

        $scope.selectedIndex = $scope.selectedIndex + 1;
    }

    $scope.secondLocked = true;
  
    function displayConfirmDialog(message) {
        $mdDialog.show($mdDialog.confirm()
          .title('CONFIRMACIÓN')
          .textContent(message)
          .ariaLabel('Lucky day')
          .ok('Aceptar')
          ).then(function () {
              window.location.reload();
          }, function () {
          });
    }

    $scope.SeleccionarAccion = function (ev) {
        var elemento = ev.currentTarget.id;
        $scope.Tab0Socio = true;
        $scope.Tab1Socio = false;
        $scope.Tab2Socio = true;
        $scope.Tab3Socio = true;
        $scope.selectedIndex = 1;
        //$scope.Sociedad = {};
        $scope.mUpdate = false;
        mEdit = false;
        $scope.Sociedad = {
            operation: '',
            id: '',
            name: '',
            businessname: '',
            NameKey: '',
            rfc: '',
            street: '',
            noint: '',
            noext: '',
            colony: '',
            stateId: '', //llave a tabla estados
            municipalityID: '', //llave a tabla municipios
            zipcodeId: '', //llave a tabla cp
            phone: '',
            email: '',
            pay: '', //llave a tabla forma de pago
            bank: '', //llave a tabla bancos
            tcuenta: '', //llave a tabla tipo cuenta
            interbank: '',
            discount: '',
            tariff: '', //llave a tabla tarifas
            horarytariff: '', //llave a la tabla TARIFAHORARIAS_PRT
            active: '',
            limit: '',
            cardNumber:''
        };
        switch (elemento) {
            case "imgAlta":
                $scope.vsbtnSocio = true;
                $scope.mUpdate = true;
                $scope.vsSelSociedad = true;
                $scope.elemInactivo = false;
                $scope.statusAdd = true;
                $scope.boton = "AGREGAR";
                $scope.Sociedad.operation = 10;
                $scope.displayTitle('Sociedades > Agregar');
                $scope.hideBlock = true;
                break;
            case "imgMod":
                $scope.vsbtnSocio = false;
                $scope.vsSelSociedad = true;
                $scope.elemInactivo = false;
                $scope.boton = "ACTUALIZAR";
                $scope.Sociedad.operation = 20;
                $scope.statusAdd = false;
                $scope.displayTitle('Sociedades > Editar');
                $scope.mUpdate = false;
                $scope.hideBlock = false;
                $scope.disableColony = false;
                mEdit = true;
                break;
            case "imgBaja":
                $scope.vsbtnSocio = true;
                $scope.vsSelSociedad = false;
                $scope.elemInactivo = true;
                $scope.elemInactivo = true;
                $scope.boton = "ELIMINAR";
                $scope.Sociedad.operation = 30;
                $scope.statusAdd = false;
                $scope.mUpdate = true;
                $scope.displayTitle('Sociedades > Eliminar');
                $scope.hideBlock = false;
                break;
        }
    }

    $scope.confirmar = function (ev) {
        var elemento = ev.currentTarget.innerText;
        var mensaje = ValidarCampos(elemento);
        if (mensaje != "") {
            $scope.displayDialog(mensaje);
            return;
        }

        var society = $scope.Sociedad;

        $scope.isLoading(true);

        $http({
            method: 'POST',
            url: $scope.url + 'server/admin/society/Action',
            data: society
        }).then(function successCallback(response) {
            $scope.isLoading(false);

            if (response.data.ID > 0) {
                displayConfirmDialog(response.data.Message);
            } else {
                $scope.displayDialog(response.data.Message);
            }
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });
    }


    function ValidarCampos(accion) {
        switch (accion) {
            case "AGREGAR":
                $scope.Sociedad.active = '1';
                if ($scope.Sociedad.name == undefined || $scope.Sociedad.name == '') 
                    return "Nombre es un campo obligatorio."
                
                if ($scope.Sociedad.businessname == undefined || $scope.Sociedad.businessname == '') 
                    return "Razón Social es un campo obligatorio."
                
                if ($scope.Sociedad.NameKey == undefined || $scope.Sociedad.NameKey == '' ) 
                    return "Clave IUSASOL es un campo obligatorio."

                if ($scope.Sociedad.NameKey.length > 5)
                    return "Clave IUSASOL debe de ser menor a 5 caracteres"
                
                if ($scope.Sociedad.rfc == undefined || $scope.Sociedad.rfc == '')
                    return "RFC es un campo obligatorio."
                
                if ($scope.Sociedad.street == undefined || $scope.Sociedad.street == '')
                    return "Calle es un campo obligatorio."
                
                if ($scope.Sociedad.colony == undefined || $scope.Sociedad.colony == '')
                    return "Colonia es un campo obligatorio."
                
                if ($scope.Sociedad.stateId == undefined || $scope.Sociedad.stateId == '') 
                    return "Estado es un campo obligatorio."
                
                if ($scope.Sociedad.municipalityID == undefined || $scope.Sociedad.municipalityID == '')
                    return "Municipio es un campo obligatorio."
                
                if ($scope.Sociedad.zipcodeId == undefined || $scope.Sociedad.zipcodeId == '')
                    return "Código Postal es un campo obligatorio."
                
                if ($scope.Sociedad.phone == undefined || $scope.Sociedad.phone == '')
                    return "Teléfono es un campo obligatorio."
                
                if ($scope.Sociedad.email == undefined || $scope.Sociedad.email == '')
                    return "Correo electrónico es un campo obligatorio."
                
                if (!validateEmail($scope.Sociedad.email))
                    return "Correo electrónico no valido."
                if ($scope.Sociedad.pay == undefined || $scope.Sociedad.pay == '') {
                    return "Forma de pago es un campo obligatorio."
                } else {
                    if ($scope.Sociedad.pay == "21") {//tarjeta crédito
                        $scope.Sociedad.bank = "";
                        $scope.Sociedad.interbank = "";
                        $scope.Sociedad.tcuenta = "";
                        $scope.Sociedad.cardNumber = "";
                    }
                    if ($scope.Sociedad.pay == "22") {// tarjeta debito
                        if ($scope.Sociedad.bank == 1) {
                            if ($scope.Sociedad.tcuenta == undefined || $scope.Sociedad.tcuenta == '')
                                return "Tipo de cuenta es un campo obligatorio.";
                            if ($scope.Sociedad.tcuenta == '3') {
                                if ($scope.Sociedad.cardNumber == '' || $scope.Sociedad.cardNumber == undefined)
                                    return "Numero de tarjeta es un campo obligatorio";
                                if (isNaN($scope.Sociedad.cardNumber))
                                    return "Tarjeta de debito debe de ser numérica";
                                if ($scope.Sociedad.cardNumber.length > 16)
                                    return "Longitud de tarjeta de debito no valida";
                            }

                            if ($scope.Sociedad.tcuenta == '40') {
                                if ($scope.Sociedad.interbank == undefined || $scope.Sociedad.interbank == '')
                                    return "Clabe interbancaria es un campo obligatorio";
                                if (isNaN($scope.Sociedad.interbank))
                                    return "Clabe interbancaria debe ser numérica";
                                if ($scope.Sociedad.interbank < 18)
                                    return "Clabe interbancaria dede de ser de 18 digitos";
                            }
                        } else {
                            if (isNaN($scope.Sociedad.interbank))
                                return "Clabe interbancaria debe ser numérica";
                            if ($scope.Sociedad.interbank < 18)
                                return "Clabe interbancaria dede de ser de 18 digitos";
                        }
                    }
                    if ($scope.Sociedad.pay == "23") {//linea captura
                        $scope.Sociedad.bank = "";
                        $scope.Sociedad.interbank = "";
                        $scope.Sociedad.tcuenta = "";
                        $scope.Sociedad.cardNumber = "";
                    }
                    
                }

                
                if ($scope.Sociedad.discount == undefined || $scope.Sociedad.discount == '') {
                    return "Descuento es un campo obligatorio."
                } else {
                    if ($scope.Sociedad.discount.length > 2) {
                        return "Descuento es un campo validos solo para 2 dígitos."
                    }
                    if (isNaN($scope.Sociedad.discount)) {
                        return "Descuento es un campo validos solo para valores numéricos."
                    }
                }
                if ($scope.Sociedad.tariff == undefined || $scope.Sociedad.tariff == '') 
                    return "Tarifa CFE es un campo obligatorio."
                
                if ($scope.Sociedad.horarytariff == undefined || $scope.Sociedad.horarytariff == '')
                    return "Tarifa de porteo es un campo obligatorio."
                
                if ($scope.Sociedad.active == undefined || $scope.Sociedad.active == '')
                    return "Estatus es un campo obligatorio."
                
                if ($scope.Sociedad.limit == undefined || $scope.Sociedad.limit == '') {
                    return "Limite es un campo obligatorio."
                } else {
                    if ($scope.Sociedad.limit.length > 5) {
                        return "limite es un campo validos solo para 5 dígitos."
                    }
                    if (isNaN($scope.Sociedad.limit)) {
                        return "limite es un campo validos solo para valores numéricos."
                    }
                }
                break;
            case "ACTUALIZAR":
                if ($scope.Sociedad.id == undefined || $scope.Sociedad.id == '')
                    return "Sociedad es un campo obligatorio."
                
                if ($scope.Sociedad.name == undefined || $scope.Sociedad.name == '')
                    return "Nombre es un campo obligatorio."

                if ($scope.Sociedad.businessname == undefined || $scope.Sociedad.businessname == '')
                    return "Razón Social es un campo obligatorio."

                if ($scope.Sociedad.NameKey == undefined || $scope.Sociedad.NameKey == '')
                    return "Clave es un campo obligatorio."

                if ($scope.Sociedad.rfc == undefined || $scope.Sociedad.rfc == '')
                    return "RFC es un campo obligatorio."

                if ($scope.Sociedad.street == undefined || $scope.Sociedad.street == '')
                    return "Calle es un campo obligatorio."

                if ($scope.Sociedad.colony == undefined || $scope.Sociedad.colony == '')
                    return "Colonia es un campo obligatorio."

                if ($scope.Sociedad.stateId == undefined || $scope.Sociedad.stateId == '')
                    return "Estado es un campo obligatorio."

                if ($scope.Sociedad.municipalityID == undefined || $scope.Sociedad.municipalityID == '')
                    return "Municipio es un campo obligatorio."

                if ($scope.Sociedad.zipcodeId == undefined || $scope.Sociedad.zipcodeId == '')
                    return "Código Postal es un campo obligatorio."

                if ($scope.Sociedad.phone == undefined || $scope.Sociedad.phone == '')
                    return "Teléfono es un campo obligatorio."

                if ($scope.Sociedad.email == undefined || $scope.Sociedad.email == '')
                    return "Correo electrónico es un campo obligatorio."

                if (!validateEmail($scope.Sociedad.email))
                    return "Correo electrónico no valido."
                if ($scope.Sociedad.pay == undefined || $scope.Sociedad.pay == '') {
                    return "Forma de pago es un campo obligatorio."
                } else {
                    if ($scope.Sociedad.pay == "21") {//tarjeta crédito
                        $scope.Sociedad.bank = "";
                        $scope.Sociedad.interbank = "";
                        $scope.Sociedad.tcuenta = "";
                        $scope.Sociedad.cardNumber = "";
                    }
                    if ($scope.Sociedad.pay == "22") {// tarjeta debito
                        if ($scope.Sociedad.bank == 1) {
                            if ($scope.Sociedad.tcuenta == undefined || $scope.Sociedad.tcuenta == '')
                                return "Tipo de cuenta es un campo obligatorio.";
                            if ($scope.Sociedad.tcuenta == '3') {
                                if ($scope.Sociedad.cardNumber == '' || $scope.Sociedad.cardNumber == undefined)
                                    return "Numero de tarjeta es un campo obligatorio";
                                if (isNaN($scope.Sociedad.cardNumber))
                                    return "Tarjeta de debito debe de ser numérica";
                                if ($scope.Sociedad.cardNumber.length > 16)
                                    return "Longitud de tarjeta de debito no valida";
                            }

                            if ($scope.Sociedad.tcuenta == '40') {
                                if ($scope.Sociedad.interbank == undefined || $scope.Sociedad.interbank == '')
                                    return "Clabe interbancaria es un campo obligatorio";
                                if (isNaN($scope.Sociedad.interbank))
                                    return "Clabe interbancaria debe ser numérica";
                                if ($scope.Sociedad.interbank < 18)
                                    return "Clabe interbancaria dede de ser de 18 digitos";
                            }
                        } else {
                            if (isNaN($scope.Sociedad.interbank))
                                return "Clabe interbancaria debe ser numérica";
                            if ($scope.Sociedad.interbank < 18)
                                return "Clabe interbancaria dede de ser de 18 digitos";
                        }
                    }
                    if ($scope.Sociedad.pay == "23") {//linea captura
                        $scope.Sociedad.bank = "";
                        $scope.Sociedad.interbank = "";
                        $scope.Sociedad.tcuenta = "";
                        $scope.Sociedad.cardNumber = "";
                    }

                }


                if ($scope.Sociedad.discount == undefined || $scope.Sociedad.discount == '') {
                    return "Descuento es un campo obligatorio."
                } else {
                    if ($scope.Sociedad.discount.length > 2) {
                        return "Descuento es un campo validos solo para 2 dígitos."
                    }
                    if (isNaN($scope.Sociedad.discount)) {
                        return "Descuento es un campo validos solo para valores numéricos."
                    }
                }
                if ($scope.Sociedad.tariff == undefined || $scope.Sociedad.tariff == '')
                    return "Tarifa CFE es un campo obligatorio."

                if ($scope.Sociedad.horarytariff == undefined || $scope.Sociedad.horarytariff == '')
                    return "Tarifa de porteo es un campo obligatorio."

                if ($scope.Sociedad.active == undefined || $scope.Sociedad.active == '')
                    return "Estatus es un campo obligatorio."

                if ($scope.Sociedad.limit == undefined || $scope.Sociedad.limit == '') {
                    return "limite es un campo obligatorio."
                } else {
                    if ($scope.Sociedad.limit.length > 5) {
                        return "limite es un campo validos solo para 5 dígitos."
                    }
                    if (isNaN($scope.Sociedad.limit)) {
                        return "limite es un campo validos solo para valores numéricos."
                    }
                }
                break;
            case "ELIMINAR":
                if ($scope.Sociedad.id == undefined || $scope.Sociedad.id == '')
                    return "Sociedad es un campo obligatorio."
                
                break;
        }
        return "";
    }

    $scope.change = function (id) {
        $scope.showWarning(true);
        $scope.Municipios = [];
        for (var k = 0; k < $scope.comboMunicipio.length; k++) {
            if ($scope.comboMunicipio[k].EDO == id) {
                var mun = {};
                mun = $scope.comboMunicipio[k];
                $scope.Municipios.push(mun);
            }
        }
    }
    $scope.colonySelect = function (zipCode) {
        $scope.disableColony = false;
        var data = $scope.mColony;
        $scope.colony = [];
        $scope.showWarning(true);
        $.each(data, function (key, d) {
            if (d.MunicipalityID == zipCode)
                $scope.colony.push(d);
        });
    }
    $scope.CargarCPs = function (id) {

        $scope.isLoading(true);

        var data = {
            operation: 10,
            ID: '',
            name: '',
            code: '',
            nameType: '',
            EDO_ID: $scope.Sociedad.stateId,
            MunicipalityID: id,
            Zone: ''
        };

        $http({
            method: 'POST',
            url: $scope.url + 'server/admin/cp',
            data: data
        }).then(function successCallback(response) {
            $scope.isLoading(false);
            if (response.data.getCP.length > 0) {
                $scope.mColony = [];
                $scope.CodigosPostales = response.data.getCP;
                $scope.mColony = response.data.getColony;
                $scope.showWarning(true);
                if(mEdit)
                    $scope.colonySelect($scope.Sociedad.zipcodeId);
            } else {
                $scope.displayDialog(response.data.Message);
            }
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });

    }

    $scope.CambioSociedad = function () {

        var user = {
            operation: '50',
            ID: $scope.Sociedad.id
        };

        var ID = $scope.Sociedad.id
        var OP = $scope.Sociedad.operation;
        $scope.isLoading(true);
        $http({
            method: 'POST',
            url: $scope.url + 'server/admin/info',
            data: user
        }).then(function successCallback(response) {
            $scope.isLoading(false);
            if (response.data != null) {
                if (response.data.name == null) {
                    $scope.displayDialog("No se encontraron datos");
                } else {
                    $scope.showWarning(true);
                    $scope.Sociedad = response.data;
                    $scope.CambioformaPago($scope.Sociedad.pay);
                    $scope.selectBank($scope.Sociedad.bank);
                    $scope.AccountType($scope.Sociedad.tcuenta);
                    $scope.Sociedad.id = ID;
                    $scope.Sociedad.operation = OP;
                    $scope.change($scope.Sociedad.stateId);
                    $scope.CargarCPs($scope.Sociedad.municipalityID);
                    
                }
            } else {
                $scope.displayDialog(response.data.Message);
            }
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });
    }

    $scope.CambioformaPago = function (value) {
        $scope.Sociedad.bank = '';
        $scope.Sociedad.tcuenta = '';
        $scope.Sociedad.cardNumber = '';
        $scope.Sociedad.interbank = '';
        $scope.showWarning(true);
        switch (value) {
            case '21'://credito
                $scope.elemPagoInactivo = true;
                $scope.elemPagoBanco = true;
                $scope.dAccountType = true;
                
                break;
            case '22'://domiciliado
                $scope.elemPagoInactivo = false;
                $scope.elemPagoBanco = false;
                $scope.dAccountType = true;
                break;
            case '23'://linea de captura
                $scope.Sociedad.bank = '';
                $scope.elemPagoInactivo = true;
                $scope.elemPagoBanco = true;
                $scope.dAccountType = true;
                break;
        }
    }

    $scope.selectBank = function (value) {
        $scope.showWarning(true);
        if (value != 1) {
            $scope.dAccountType = true;
            $scope.hideNumberTD = true;
            $scope.vsinpClabe = false;
            $scope.Sociedad.tcuenta = '';
        } else {
            $scope.dAccountType = false;
        }
    }

    $scope.AccountType = function (value) {
        $scope.showWarning(true);
        if (value == 1) {/** cuenta de cheques**/
            $scope.cardLabel = 'Número de cuenta de cheques';
            $scope.hideNumberTD = false;
            $scope.vsinpClabe = true;
            $scope.eNumberTD = false;
            $scope.elemPagoInactivo = true;
            $scope.Sociedad.CardNumber = '';
            $scope.Sociedad.interbank = '';
        }
        if (value == 3) {/** tarjeta de debito**/
            $scope.cardLabel = 'Número de tarjeta debito';
            $scope.hideNumberTD = false;
            $scope.eNumberTD = false;
            $scope.elemPagoInactivo = true;
            $scope.vsinpClabe = true;
            $scope.Sociedad.CardNumber = '';
            $scope.Sociedad.interbank = '';
        }
        if (value == 40) {/** clabe interbancaria **/
            $scope.hideNumberTD = true;
            $scope.vsinpClabe = false;
            $scope.eNumberTD = true;
            $scope.elemPagoInactivo = false;
            $scope.Sociedad.CardNumber = '';
            $scope.Sociedad.interbank = '';
        }
        
    }

    //Agregar CP--------------------------
    $scope.AgregarCP = function (ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: DialogCPController,
            templateUrl: '../include/CodigoPostal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: { estadoid: $scope.Sociedad.stateId, municipioid: $scope.Sociedad.municipalityID, asentamientos: $scope.ComboAsentamiento },
            fullscreen: useFullScreen
        })
        .then(function (answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
            $scope.status = 'You cancelled the dialog.';
        });
    }

    function DialogCPController($scope, $mdDialog, locals) {
        $scope.Edo = locals.estadoid;
        $scope.mun = locals.municipioid;
        $scope.Asentamiento = locals.asentamientos;

        $scope.ComboZona = [];

        var tZ1 = { id: '0', name: 'Urbano' };
        var tZ2 = { id: '1', name: 'Semiurbano' };
        var tZ3 = { id: '2', name: 'Rural' };
        $scope.ComboZona.push(tZ1);
        $scope.ComboZona.push(tZ2);
        $scope.ComboZona.push(tZ3);

        $scope.Cp = {
            operation: 20,
            ID: '',
            name: '',
            code: '',
            nametype: '',
            EDO_ID: $scope.Edo,
            MunicipalityID: $scope.mun,
            Zone: ''
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.confirmar = function () {
            var mensaje = ValidarCampos();
            if (mensaje != "") {
                displayDialog(mensaje);
                return;
            }

            var zipcode = {};

            zipcode = $scope.Cp;
            $scope.isLoading(true);
            $http({
                method: 'POST',
                url: $scope.url + 'server/admin/cp',
                data: zipcode
            }).then(function successCallback(response) {
                $scope.isLoading(false);
                if (response.data.ID > 0) {
                    displayConfirmDialog(response.data.Message);
                } else {
                    $scope.displayDialog(response.data.Message);
                }
            }, function errorCallback(response) {
                $scope.isLoading(false);
                $scope.displayDialog(response.data || ' Request failed');
            });
        }

        function ValidarCampos() {
            if ($scope.Cp.code == "") {
                return "Código postal es un campo obligatorio";
            }
            if ($scope.Cp.name == "") {
                return "Colonia es un campo obligatorio";
            }
            if ($scope.Cp.nametype == "") {
                return "Tipo de asentamiento es un campo obligatorio";
            }
            if ($scope.Cp.Zone == "") {
                return "Zona es un campo obligatorio";
            }
            return "";
        }

        function displayConfirmDialog(message) {
            $mdDialog.show($mdDialog.confirm()
              .title('CONFIRMACIÓN')
              .textContent(message)
              .ok('Aceptar')
              ).then(function () {
                  window.location.reload();
              }, function () {
              });
        }
    }
    //-----------------------------------
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
});

app.controller('TablaIBController', function ($scope, $mdDialog, $http) {
  
    $scope.sectionSelected('#TablaIB');
    $scope.displayTitle('Tabla IB');
    $scope.boton = "";
    $scope.selectedIndex = 0;
    $scope.btnValidar = false;
    $scope.btnCargar = true;
    $scope.elmnInvisible = true;
    $scope.elmnBtnInvisibleNext = true;
    $scope.elmnBtnInvisible = true;
    $scope.elmnBtnInvisibleBack = true;
    $scope.elmnInvisibleCargar = true;
    $scope.cardDelete = true;
    $scope.elmnInactivo = true;
    $scope.cleanTable = 0;
    $scope.ibEdit = true;

    $scope.fileName = "";

    $scope.tab0 = false;
    $scope.tab1 = true;
    $scope.tab2 = true;

    $scope.Pegado = "";

    $scope.Registros = [];
    $scope.RegistrosAdd = [];

    $scope.secondLocked = true;

    $scope.Registro = {
        soc_id: '',
        id: '',
        demand_max: '',
        demand_limit:'',
        priority: '',
        active: '',
        month: '',
        year: '',
        med_sum:''
    };

    /** load Month **/

    $scope.months = [];
    var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
     "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var d = new Date();
    var n = d.getMonth();
    n = (n == 11) ? -1 : n;
    for (var i = 0; i < 12; i++) {
        if (i > n) {
            var dat = {
                name: monthNames[i],
                value: i+1,
                valid: false
            };
            $scope.months.push(dat);
        } else {
            var dat = {
                name: monthNames[i],
                value: i + 1,
                valid: true
            };
            $scope.months.push(dat);
        }
    }

    $scope.setFullYear = function () {
        $scope.Registro.year = (n < 0) ? d.getFullYear() + 1 : d.getFullYear();
        //console.log($scope.Registro.year);
    };

    /** end load Month**/
/**
    function borrarTabla() {
        $("#tblIB").html("<thead>" +
                           "<tr>" +
                            "<th>RPU</th>" +
                            "<th>Demanda</th>" +
                            "<th>Prioridad</th>" +
                            "<th>Comentarios</th>" +
                           "</tr>" +
                         "</thead>" +
                           "<tbody></tbody>"
                           );
    }
    **/

    /**
    *read Excel
    **/
    
    $scope.read = function (workbook, name) {
        $scope.btnValidar = false;
        $scope.fileName = name;
        if ($scope.Registro.month == '') {
            $scope.displayDialog('Seleccione mes de carga de los lados');
            $scope.fileName = '';
            return;
        }
        
        for (var sheetName in workbook.Sheets) {
            
            var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

            $scope.Registros = [];
            $.each(jsonData, function (key, value) {
                var SO = {
                    soc_id: value.RPU,
                    id: '',
                    demand_max: value.Demanda_max,
                    demand_limit: value.Demanda_limite,
                    priority: value.Prioridad,
                    active: '1',
                    month: $scope.Registro.month,
                    year: $scope.Registro.year,
                    med_sum: value.Med_Sum,
                    comment: '',
                    color:''
                };
                
                $scope.Registros.push(SO);
            });
            //console.log($scope.Registros);
            $http({
                method: 'GET',
                url: 'https://www.google.com',
            }).then(function successCallback(response) {
                //  $scope.isLoading(false);
            }, function errorCallback(response) {
                //$scope.isLoading(false);
            });

            /**
            borrarTabla();
            try{
                var tabla = $("#tblIB");
                for (var k = 0; k < jsonData.length; k++) {
                    var row = tabla[0].insertRow(k + 1);
                    var fname = jsonData[k]["RPU"];
                    row.id = "r" + fname;

                    var cellRPU = row.insertCell(0);
                    cellRPU.innerHTML = jsonData[k]["RPU"];
                    var cellDem = row.insertCell(1)
                    cellDem.innerHTML = jsonData[k]["Demanda"];
                    var cellPri = row.insertCell(2);
                    cellPri.innerHTML = jsonData[k]["Prioridad"];

                    var cellCom = row.insertCell(3);
                    cellCom.id = "c" + fname;
                    cellCom.innerHTML = "";
                }
                $scope.showWarning(true);
            } catch (e) {
                $scope.showWarning(false);
                $scope.Registros = [];
                $scope.displayDialog('Datos no validos');
            }
          **/  
        }
    }

    $scope.error = function (e) {
        console.log(e);
    }
    /**
    * End Read Excel
    **/


    $scope.SeleccionarAccion = function (ev) {
        var elemento = ev.currentTarget.id;
        $scope.Registro = {
            soc_id: '',
            id: '',
            demand_max: '',
            demand_limit: '',
            priority: '',
            active: '',
            month: '',
            year: ''
        };
        switch (elemento) {
            case "imgAlta":
                //borrarTabla();
                $scope.Registros = [];
                $scope.tab0 = true;
                $scope.tab1 = true;
                $scope.tab2 = false;
                $scope.elmnInvisible = true;
                $scope.elmnBtnInvisibleBack = false;
                $scope.elmnBtnInvisibleNext = false;
                $scope.elmnInvisibleCargar = false;
                $scope.elmnInactivo = false;
                $scope.cardDelete = true;
                $scope.boton = "AGREGAR";
                $scope.Registro.operation = 10;
                $scope.selectedIndex = 2;
                $scope.displayTitle('Tabla IB > Agregar');
                break;
            case "imgMod":
                $scope.tab0 = true;
                $scope.tab1 = false;
                $scope.tab2 = true;
                $scope.selectedIndex = 1;
                $scope.elmnInvisible = false;
                $scope.elmnInvisibleCargar = true;
                $scope.elmnInactivo = false;
                $scope.elmnBtnInvisibleNext = false;
                $scope.elmnBtnInvisibleBack = false;
                $scope.cardDelete = true;
                $scope.boton = "ACTUALIZAR";
                $scope.Registro.operation = 30;
                $scope.displayTitle('Tabla IB > Editar');
                break;
            case "imgBaja":
                $scope.tab0 = true;
                $scope.tab1 = false;
                $scope.tab2 = true;
                $scope.selectedIndex = 1;
                $scope.elmnInvisible = true;
                $scope.elmnInvisibleCargar = true;
                $scope.elmnBtnInvisible = false;
                $scope.elmnBtnInvisibleNext = true;
                $scope.elmnBtnInvisibleBack = false;
                $scope.elmnInactivo = true;
                $scope.cardDelete = false;
                $scope.boton = "ELIMINAR";
                $scope.Registro.operation = 40;
                $scope.displayTitle('Tabla IB > Eliminar');
                break;
        }
    }



    $scope.delete = function () {
        if ($scope.Registro.month == '') {
            $scope.displayDialog('Mes es un campo obligatorio');
            return;
        }
        var IB = $scope.Registro;
        //IB.month = $scope.Registro.month;

        $scope.isLoading(true);
        $http({
            method: 'POST',
            url: $scope.url + 'server/IB/Action',
            data: IB
        }).then(function successCallback(response) {
            $scope.isLoading(false);
            if (response.data.ID > 0) {
                displayConfirmDialog(response.data.Message);
            } else {
                $scope.displayDialog(response.data.Message);
            }
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });
    }


    function ValidarCampos(accion) {
        switch (accion) {
            case "ACTUALIZAR":
                if ($scope.Registro.demand_max == undefined || $scope.Registro.demand_max == '')
                    return "Demanda es un campo obligatorio."

                if ($scope.Registro.demand_limit == undefined || $scope.Registro.demand_limit == '')
                    return "Demanda es un campo obligatorio."
                
                $scope.Registro.priority = 0;
                if ($scope.Registro.active == undefined || $scope.Registro.active == '' )
                    return "Estatus es un campo obligatorio."
                
                if ($scope.Registro.id == undefined || $scope.Registro.id == '' ) {
                    return "Registro es un campo obligatorio."
                }
                break;
            case "ELIMINAR":
                if ($scope.Registro.id == undefined || $scope.Registro.id == '' ) {
                    return "Registro es un campo obligatorio."
                }
                break;
        }
        return "";
    }

    $scope.Regresar = function () {
        $scope.showWarning(false);
        $scope.selectedIndex = 0;
        $scope.tab0 = false;
        $scope.tab1 = true;
        $scope.tab2 = true;
        $scope.displayTitle('Tabla IB');
    }

    function displayConfirmDialog(message) {
        $mdDialog.show($mdDialog.confirm()
          .title('CONFIRMACIÓN')
          .textContent(message)
          .ariaLabel('Lucky day')
          .ok('Aceptar')
          ).then(function () {
              $scope.showWarning(false);
              window.location.reload();
          }, function () {
          });
    }
    
    $scope.cancel = function () {
        $scope.selectedIndex = 0;
        $scope.tab0 = false;
        $scope.tab1 = true;
        $scope.tab2 = true;
        //borrarTabla();
        $scope.Registros = [];
        $scope.showWarning(false);
        $scope.fileName = "";
        $scope.displayTitle('Tabla IB');
    };

    $scope.Reiniciar = function () {
        $scope.Member = [];
        $scope.RegistrosAdd = [];
        $scope.btnValidar = true;
        $scope.btnCargar = true;
        //borrarTabla();
        $scope.Registros = [];
        $scope.showWarning(false);
        $scope.fileName = "";
    }

    $scope.Validar = function () {
        //Vamos a BD a validar campos
        if ($scope.Registro.month == '') {
            $scope.displayDialog('Seleccione mes de carga de los lados');
            return;
        }
        var data = {
            IB: $scope.Registros,
            operation: 10
        }
        $scope.isLoading(true);
        $http({
            method: 'POST',
            url: $scope.url + 'server/IB/Masive/Action',
            data: data
        }).then(function successCallback(response) {
            $scope.isLoading(false);
            if (response.data.length > 0) {
                if (response.data.ID == 2) {
                    $scope.displayDialog(response.data.message);
                } else {
                    PintarValidaciones(response.data);
                }
                
            } else {
                $scope.displayDialog(response.data.message);
            }
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });
    }

    function PintarValidaciones(response) {
        var dat = $scope.Registros;
        var paint = 1;
        $scope.Registros = [];
        $scope.RegistrosAdd = [];
        $.each(response, function (key, data) {
            $.each(dat, function (key, dat) {
                if (data.name == dat.soc_id) {
                    dat.comment = data.message;
                    $scope.Registros.push(dat);
                    if (data.ID == 1) {
                        dat.color = 'background-color:seagreen';
                        $scope.RegistrosAdd.push(dat)
                    }
                    if (data.ID < 0) {
                        paint = 0;
                        dat.color = 'background-color:orange';
                    }
                }
            });
        });

        $scope.finalMessage = (paint == 1) ? 'Se insertarán todos los registros.' : 'Solo se insertaran los registros en color verde.';

        /**
        for (var k = 0; k < response.data.length; k++) {
            var idrow = "#r" + response.data[k]["name"];
            var idcell = "#c" + response.data[k]["name"];
            var row = $(idrow);
            var cell = $(idcell);
            cell[0].innerHTML = response.data[k]["message"];
            var ctrl = 0;

            if (response.data[k]["ID"] == 1) {
                row.css('background-color', 'seagreen');

                for (var n = 0; n < $scope.Registros.length; n++) {
                    if ($scope.Registros[n]["soc_id"] == response.data[k]["name"]) {
                        $scope.RegistrosAdd.push($scope.Registros[n])
                        break;
                    }
                }

            } else {
                row.css('background-color', 'orange');
                ctrl = 1;
            }
        }
        var pmsj = $("#pMensaje");
        if (ctrl == 1) {
            pmsj[0].innerText = "Solo se insertarán los registros en color verde.";
        } else {
            pmsj[0].innerText = "Se insertarán todos los registros.";
        }
        **/
        $scope.btnCargar = false;
    }

    $scope.Cargar = function () {

        var data = {
            IB: $scope.RegistrosAdd,
            operation: 20
        }
        $scope.isLoading(true);
        $http({
            method: 'POST',
            url: $scope.url + 'server/IB/Masive/Action',
            data: data
        }).then(function successCallback(response) {
            $scope.isLoading(false);
            if (response.data.length > 0) {
                PintarInserciones(response.data);
            } else {
                $scope.displayDialog(response.data.Message);
            }
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });
    }

    function PintarInserciones(response) {

        var dat = $scope.Registros;
        var paint = 1;
        $scope.Registros = [];
        $scope.RegistrosAdd = [];
        $.each(response, function (key, data) {
            $.each(dat, function (key, dat) {
                if (data.name == dat.soc_id) {
                    dat.comment = data.message;
                    $scope.Registros.push(dat);
                    if (data.ID == 1) {
                        dat.color = 'background-color:seagreen';
                        $scope.RegistrosAdd.push(dat)
                    }
                    if (data.ID < 0) {
                        paint = 0;
                        dat.color = 'background-color:orange';
                    }
                }
            });
        });

        $scope.finalMessage = (paint == 1) ? 'Se agregaron todos los registros.' : 'No todos los registros fueron agregados, contactar a su administrador.';
        /**
        for (var k = 0; k < response.data.length; k++) {
            var idrow = "#r" + response.data[k]["name"];
            var idcell = "#c" + response.data[k]["name"];
            var row = $(idrow);
            var cell = $(idcell);
            cell[0].innerHTML = "";
            cell[0].innerHTML = response.data[k]["message"];
            var ctrl = 0;
            if (response.data[k]["ID"] == 1) {
                row.css('background-color', 'seagreen');
            } else {
                row.css('background-color', 'orange');
                ctrl = 1;
            }
        }

        var pmsj = $("#pMensaje");
        pmsj[0].innerText = "";
        if (ctrl == 1) {
            pmsj[0].innerText = "No todos los registros fueron agregados, contactar a su administrador.";
        } else {
            pmsj[0].innerText = "Se agregaron todos los registros";
        }
        **/
    }

    $scope.CambioRegistro = function () {

        var user = {
            operation: '70',
            ID: $scope.Registro.id
        };

        var ID = $scope.Registro.id;
        var OP = $scope.Registro.operation;

        $scope.isLoading(true);

        $http({
            method: 'POST',
            url: $scope.url + 'server/admin/info',
            data: user
        }).then(function successCallback(response) {
            $scope.isLoading(false);

            if (response.data != null) {
                $scope.Registro = response.data;
                $scope.Registro.id = ID;
                $scope.Registro.operation = OP;
            } else {
                $scope.displayDialog(response.data.Message);
            }
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });
    }

});

app.controller('SociosController', function ($scope, $mdDialog, $http) {
   
    $scope.displayTitle('Socios');
    $scope.sectionSelected('#Socios');
    $scope.selectedIndexS = 0;
    $scope.vsbtnMasiva = true;
    $scope.btnSAddNext = true;
    $scope.vsbtnInd = true;
    $scope.vsSelActivo = true;
    $scope.Member = [];
    $scope.MemberAdd = [];
    $scope.comboSocio = [];
    $scope.showWarning(false);

    $scope.auxMetter = [];

    var delet = false;
    $scope.load = false;

    var addSingle = false;

    $scope.Tab0Socio = false;
    $scope.Tab1Socio = true;
    
    $scope.TabMasSocio = true;

    hideButton = false;

    $scope.dataIn = true;
    $scope.hideSoci = false;
    $scope.hideSociUpdate = true;
    $scope.btnValidar = false;
    $scope.btnCargar = true;
    $scope.disable = true;
    $scope.Consumo;
                            
    $scope.disabledDelete = true;

    $scope.ComboSiNo = [];
    var si = { id: '1', name: 'Si Aplica' };
    var no = { id: '0', name: 'No Aplica' };
    $scope.ComboSiNo.push(si);
    $scope.ComboSiNo.push(no);

    $scope.ComboEstatus = [];
    var activo = { id: '1', name: 'Activo' };
    $scope.ComboEstatus.push(activo);
    var inactivo = { id: '0', name: 'Inactivo' };
    $scope.ComboEstatus.push(inactivo);
    
    $scope.fileName = '';

    $scope.Socio = {
        operation: '',
        id: '',
        societyID: '',
        name: '',
        rpu: '',
        rmu: '',
        consumption: '',
        metter: '',
        active: ''
        //med_sum: ''
    };
    /** show dialog **/
    $scope.showWarn = function (data) {
        if (data != '') {
            $scope.showWarning(true);
        } else {
            if ($scope.Socio.id != '' | $scope.Socio.societyID != '' | $scope.Socio.name != '' | $scope.Socio.rpu != ''
                | $scope.Socio.consumption != '' | $scope.Socio.metter != ''
                | $scope.Socio.active != '' /**| $scope.Socio.med_sum != ''**/) {
                $scope.showWarning(true);
            } else {
                if ($scope.Socio.id == '' | $scope.Socio.societyID == '' | $scope.Socio.name == '' | $scope.Socio.rpu == ''
                | $scope.Socio.consumption == '' | $scope.Socio.metter == ''
                | $scope.Socio.active == '' /**| $scope.Socio.med_sum == ''**/) {
                    $scope.showWarning(false);
                }
            }
        }
    }
    $scope.mMetter = [];
    /**end show dialog **/
    var dat = {
        operation: '91',
        ID:'0'
    };
    $scope.isLoading(true);
    $http({
        method: 'POST',
        url: $scope.url + 'server/admin/info',
        data: dat
    }).then(function successCallback(response) {
        $scope.isLoading(false);
        if (response.data != null) {
            //$scope.showWarning(true);
            $scope.mMetter = response.data;
        } else {
            $scope.displayDialog("No se puede obtener infomación" + '/n' + "intente más tarde");
        }
    }, function errorCallback(response) {
        $scope.isLoading(false);
        $scope.displayDialog(response.data || ' Request failed');
    });

    function resetValue() {
        
        $scope.Socio.operation = '';
        $scope.Socio.id = '';
        $scope.Socio.societyID = '';
        $scope.Socio.name = '';
        $scope.Socio.rpu = '';
        $scope.Socio.rmu = '';
        $scope.Socio.consumption = '';
        $scope.Socio.metter = '';
        $scope.Socio.active = '';
        //$scope.Socio.med_sum = '';
    }

    function resetValues() {
        
        $scope.Socio.name = '';
        $scope.Socio.rpu = '';
        $scope.Socio.rmu = '';
        $scope.Socio.consumption = '';
        $scope.Socio.metter = '';
        $scope.Socio.active = '';
    }

    var member = {
        operation :0,
        ID :0
    }

    function memberAdd(data) {
        $.each(data, function (key, item) {
            if (item.active == 1) {
                $scope.comboSocio.push(item);
            }
        });
    }

    $scope.loadMember = function () {
        $scope.isLoading(true);
        $scope.comboSocio = [];
        $scope.auxMetter = [];
        member.operation = 80;
        member.ID = $scope.Socio.societyID;
        $scope.Socio.id = '';
        $http({
            method: 'POST',
            url: $scope.url + 'server/admin/info',
            data: member
        }).then(function successCallback(response) {
            $scope.isLoading(false);
            if (response.data != null) {
                $scope.showWarning(true);
                resetValues();
                if (delet) {
                    memberAdd(response.data);
                } else {
                    $scope.comboSocio = response.data;
                }
                
            } else {
                $scope.displayDialog("No se puede obtener infomación"+'/n'+"intente más tarde");
            }
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });
    };

    $scope.SeleccionarAccion = function (ev) {
        var elemento = ev.currentTarget.id;
        $scope.Tab0Socio = true;
        $scope.Tab1Socio = false;
        $scope.TabMasSocio = true;
        $scope.selectedIndexS = 1;
        resetValue();
        switch (elemento) {
            case "imgAlta":
                $scope.vsbtnMasiva = false;
                $scope.vsbtnInd = false;
                $scope.vsSelSociedad = true;
                $scope.dataIn = true;
                $scope.btnSAddNext = true;
                $scope.hideSociUpdate = true;
                $scope.Socio.operation = 10;
                $scope.hideSoci = false;
                $scope.displayTitle('Socios > Agregar');
                $scope.Action = "AGREGAR";
                $scope.vsSelActivo = true;
                $scope.disabledDelete = false;
                break;
            case "imgMod":
                $scope.vsbtnMasiva = true;
                $scope.vsbtnInd = true;
                $scope.dataIn = false;
                $scope.hideSociUpdate = false;
                $scope.vsSelActivo = false;
                $scope.btnSAddNext = false;
                $scope.Socio.operation = 20;
                $scope.displayTitle('Socios > Actualizar');
                $scope.Action = "ACTUALIZAR";
                $scope.hideSociAdd = true;
                //$scope.Socio.societyID = 0;
                delet = false;
                $scope.disabledDelete = false;
                break;
            case "imgBaja":
                $scope.comboSocio = [];
                $scope.hideSociUpdate = false;
                $scope.dataIn = false;
                $scope.hideSociAdd = true;
                $scope.vsbtnMasiva = true;
                $scope.vsbtnInd = true;
                $scope.btnSAddNext = false;
                $scope.vsSelSociedad = true;
                $scope.vsSelActivo = false;
                delet = true;
                $scope.Socio.operation = 30;
                $scope.displayTitle('Socios > Eliminar');
                $scope.Action = "Eliminar";
                $scope.Socio.active = '';
                //$scope.Socio.societyID = 0;
                $scope.disabledDelete = true;
                break;
        }
    }

    $scope.cancelM = function () {
        $scope.selectedIndexS = 0;
        $scope.Tab0Socio = false;
        $scope.Tab1Socio = true;
        $scope.TabMasSocio = true;
        hideButton = false;
        $scope.displayTitle('Socios');
        //BorrarTabla();
        $scope.Member = [];
        $scope.fileName = '';
        $scope.showWarning(false);
    };

    $scope.Regresar = function () {
        if (hideButton) {
            $scope.vsbtnMasiva = false;
            $scope.vsbtnInd = false;
            $scope.vsSelSociedad = true;
            $scope.btnSAddNext = true;
            $scope.dataIn = true;
            $scope.Socio.operation = 10;
            $scope.displayTitle('Socios > Agregar');
            $scope.showWarning(false);
            hideButton = false;
            addSingle = false;
        } else {
            $scope.Tab0Socio = false;
            $scope.Tab1Socio = true;
            $scope.TabMasSocio = true;
            $scope.showWarning(false);
            $scope.displayTitle('Socios');
            $scope.selectedIndexS = $scope.selectedIndexS - 1;
        }
    }


    $scope.Individual = function () {
        
        $scope.vsbtnMasiva = true;
        $scope.vsbtnInd = true;
        $scope.vsSelSociedad = false;
        $scope.dataIn = false;
        $scope.btnSAddNext = false;
        $scope.vsSelActivo = true;
        $scope.hideSociAdd = false;
        $scope.displayTitle('Socios > Agregar > Individual');
        hideButton = true;
        addSingle = true;
    }

    $scope.Masiva = function () {
        $scope.Tab0Socio = true;
        $scope.Tab1Socio = true;
        $scope.Tab3Socio = true;
        $scope.TabMasSocio = false;
        $scope.vsSelSociedad = false;
        $scope.selectedIndexS = 3;
        $scope.displayTitle('Socios > Agregar > Masiva');
        hideButton = true;
        addSingle = false;
    }
    /**
*read Excel
**/
    $scope.read = function (workbook, name) {
        if ($scope.Socio.societyID == '' | $scope.Socio.societyID == undefined) {
            $scope.displayDialog('Seleccione una sociedad');
            return;
        }
        $scope.fileName = name;
        for (var sheetName in workbook.Sheets) {
            var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

            $scope.Member = [];
            $.each(jsonData, function (key, value) {
                var SO = {
                    societyID: $scope.Socio.societyID,
                    name: value.Nombre,
                    rpu: value.RPU,
                    rmu: value.RMU,
                    active: value.ESTATUS,
                    consumption: value.CONSUMO_MEDIDO,
                    metter: value.MEDIDOR,
                    /**med_sum: value.MED_SUM,**/
                    comment: '',
                    color:''
                };
                $scope.Member.push(SO);
            });
            //console.log($scope.Member);
            /**
            BorrarTabla();
            try {
                var tabla = $("#tblSocios");
                for (var k = 0; k < jsonData.length; k++) {
                    var row = tabla[0].insertRow(k + 1);
                    var name = jsonData[k]["name"];
                    row.id = "r" + name;

                    var cellName = row.insertCell(0);
                    cellName.innerHTML = $scope.Member[k]["name"];
                    var cellRPU = row.insertCell(1);
                    cellRPU.innerHTML = $scope.Member[k]["rpu"];

                    var cellEstatus = row.insertCell(2);
                    if ($scope.Member[k]["active"] == 1) {
                        cellEstatus.innerHTML = "Activo"
                    } else {
                        cellEstatus.innerHTML = "Inactivo"
                    }

                    var cellConsumos = row.insertCell(3);
                    cellConsumos.innerHTML = $scope.Member[k]["consumption"];

                    var cellMedidor = row.insertCell(4);
                    cellMedidor.innerHTML = $scope.Member[k]["metter"];

                    var cellMetterGen = row.insertCell(5);
                    cellMetterGen.innerHTML = $scope.Member[k]["med_sum"];

                    var cellCom = row.insertCell(6);
                    cellCom.id = "c" + name;
                    cellCom.innerHTML = "";
                }
                $scope.showWarning(true);
            } catch (e) {
                $scope.showWarning(false);
                $scope.Member = [];
                $scope.displayDialog('Datos no validos');
            }
         **/   
        }
        //$scope.isLoading(true);
        $http({
            method: 'GET',
            url: 'https://www.google.com',
        }).then(function successCallback(response) {
          //  $scope.isLoading(false);
        }, function errorCallback(response) {
            //$scope.isLoading(false);
        });
        
        $scope.btnValidar = false;
    }

    $scope.error = function (e) {
        
        console.log(e);
        $scope.displayDialog(e);
    }
    /**
    * End Read Excel
    **/

    $scope.Validar = function () {
        //Vamos a BD a validar campos
        if ($scope.Socio.societyID == undefined || $scope.Socio.societyID=='') {
            $scope.displayDialog("Debe seleccionar una sociedad");
            return;
        }
        var data = {
            mResponse: $scope.Member,
            operation: 10
        }
        $scope.isLoading(true);
        $http({
            method: 'POST',
            url: $scope.url + 'server/admin/partner/Masive',
            data: data
        }).then(function successCallback(response) {
            $scope.isLoading(false);
            if (response.data.length > 0) {
                PintarValidaciones(response.data);
            } else {
                $scope.displayDialog(response.data.Message);
            }
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });
    }

    $scope.Cargar = function () {
        console.log($scope.MemberAdd.length);
        if ($scope.MemberAdd.length == '0') {
            $scope.displayDialog('No hay datos a insertar, verifique la información');
            return;
        }

        var data = {
            mResponse: $scope.MemberAdd,
            operation: 20
        }
        $scope.isLoading(true);
        $http({
            method: 'POST',
            url: $scope.url + 'server/admin/partner/Masive',
            data: data
        }).then(function successCallback(response) {
            $scope.isLoading(false);
            if (response.data.length > 0) {
                PintarInserciones(response.data);
            } else {
                $scope.displayDialog(response.data.Message);
            }
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });
    }

    $scope.confirmar = function (ev) {
        sendServer(ev);
    }

    function sendServer(ev) {
        var elemento = ev.currentTarget.innerText;
        var mensaje = ValidarCampos(elemento);
        if (mensaje != "") {
            $scope.displayDialog(mensaje);
            return;
        }

        var member = {};
        if ($scope.Socio.operation == 10) {
            $scope.Socio.active = 1;
        }
        member = $scope.Socio;
        $scope.isLoading(true);
        $http({
            method: 'POST',
            url: $scope.url + 'server/admin/partner/Action',
            data: member
        }).then(function successCallback(response) {
            $scope.isLoading(false);
            if (response.data.ID > 0) {
                displayConfirmDialog(response.data.Message);
            } else {
                $scope.displayDialog(response.data.Message);
            }
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });
    }


    $scope.Reiniciar = function () {
        $scope.Member = [];
        $scope.MemberAdd = [];
        $scope.btnValidar = true;
        $scope.btnCargar = true;
        //BorrarTabla();
        $scope.Member = [];
        $scope.fileName = '';
        $scope.showWarning(false);
    }

    function ValidarCampos(accion) {
        switch (accion) {
            case "AGREGAR":
                if (addSingle)
                    $scope.Socio.active = '1';
                if ($scope.Socio.name == undefined || $scope.Socio.name == '') 
                    return "Nombre es un campo obligatorio."
                
                if ($scope.Socio.rpu == undefined | $scope.Socio.rpu == '') 
                    return "rpu es un campo obligatorio."
                
                if ($scope.Socio.rpu.length > 12)
                    return "RPU no debe de ser mayor a 12 caracteres";

                /*
                if ($scope.Socio.rmu == undefined | $scope.Socio.rmu == '') 
                    return "rmu es un campo obligatorio."
                */
                
                if ($scope.Socio.consumption == undefined | $scope.Socio.consumption == '') 
                    return "Consumo medido es un campo obligatorio."
                
                if ($scope.Socio.consumption == "1") {
                    if ($scope.Socio.metter == undefined | $scope.Socio.metter == '') 
                        return "Medidor es un campo obligatorio."
                    
                }

                if ($scope.Socio.active == undefined | $scope.Socio.active == '') 
                    return "Estatus es un campo obligatorio."
                /**if ($scope.Socio.med_sum == undefined | $scope.Socio.med_sum == '')
                    return "Medidor generador de energia es obligatorio";
                    **/
                break;
            case "ACTUALIZAR":
                if ($scope.Socio.name == undefined | $scope.Socio.name == '') 
                    return "Nombre es un campo obligatorio."
                
                if ($scope.Socio.rpu == undefined | $scope.Socio.rpu == '') 
                    return "rpu es un campo obligatorio."
                /*
                if ($scope.Socio.rmu == undefined | $scope.Socio.rmu == '') 
                    return "rmu es un campo obligatorio."
                */
                if ($scope.Socio.consumption == undefined || $scope.Socio.consumption == '') 
                    return "Consumo medido es un campo obligatorio."
                
                if ($scope.Socio.consumption == 1) {
                    if ($scope.Socio.metter == undefined || $scope.Socio.metter == '') {
                        return "Medidor es un campo obligatorio."
                    }
                }
                if ($scope.Socio.active == undefined | $scope.Socio.active == '') 
                    return "Estatus es un campo obligatorio."
                
                if ($scope.Socio.id == undefined | $scope.Socio.id == '') 
                    return "Socio es un campo obligatorio."

                /**if ($scope.Socio.med_sum == undefined | $scope.Socio.med_sum == '')
                    return "Medidor generador de energia es obligatorio";
                **/
                break;
            case "ELIMINAR":
                if ($scope.Socio.id == undefined | $scope.Socio.id == '') 
                    return "Socio es un campo obligatorio."
                
                break;
        }
        return "";
    }

    function displayConfirmDialog(message) {
        $mdDialog.show($mdDialog.confirm()
          .title('CONFIRMACIÓN')
          .textContent(message)
          .ariaLabel('Lucky day')
          .ok('Aceptar')
          ).then(function () {
              $scope.showWarning(false);
              window.location.reload();
          }, function () {
          });
    }

    $scope.finalMessage = '';

    function PintarValidaciones(response) {
        var dat = $scope.Member;
        var paint = 1;
        $scope.Member = [];
        $scope.MemberAdd = [];
        $.each(response, function (key,data) {
            $.each(dat, function (key, dat) {
                if (data.name == dat.rpu) {
                    dat.comment = data.message;
                    $scope.Member.push(dat);
                    if (data.ID == 1) {
                        dat.color = 'background-color:seagreen';
                        $scope.MemberAdd.push(dat)   
                    }
                    if (data.ID < 0) {
                        paint = 0;
                        dat.color = 'background-color:orange';
                    }
                }
            });
        });
        
        $scope.finalMessage = (paint == 1) ? 'Se insertarán todos los registros.' : 'Solo se insertaran los registros en color verde.';
        /**
        for (var k = 0; k < response.data.length; k++) {
            var idrow = "#r" + response.data[k]["name"];
            var idcell = "#c" + response.data[k]["name"];
            var row = $(idrow);
            var cell = $(idcell);
            cell[0].innerHTML = response.data[k]["message"];
            var ctrl = 0;

            if (response.data[k]["ID"] == 1) {
                row.css('background-color', 'seagreen');

                for (var n = 0; n < $scope.Member.length; n++) {
                    if ($scope.Member[n]["name"] == response.data[k]["name"]) {
                        $scope.MemberAdd.push($scope.Member[n])
                        break;
                    }
                }

            } else {
                row.css('background-color', 'orange');
                ctrl = 1;
            }
        }
        var pmsj = $("#pMensaje");
        if (ctrl == 1) {
            pmsj[0].innerText = "Solo se insertaran los registros en color verde.";
        } else {
            pmsj[0].innerText = "Se insertarán todos los registros.";
        }
        **/
        $scope.btnCargar = false;
    }

    function PintarInserciones(response) {
        var dat = $scope.Member;
        var paint = 1;
        $scope.Member = [];
        $scope.MemberAdd = [];
        $.each(response, function (key, data) {
            $.each(dat, function (key, dat) {
                if (data.name == dat.rpu) {
                    dat.comment = data.message;
                    $scope.Member.push(dat);
                    if (data.ID == 1) {
                        dat.color = 'background-color:seagreen';
                        $scope.MemberAdd.push(dat)
                    }
                    if (data.ID < 0) {
                        paint = 0;
                        dat.color = 'background-color:orange';
                    }
                }
            });
        });

        $scope.finalMessage = (paint == 1) ? 'Se agregaron todos los socios.' : 'No todos los socios fueron agregados, contactar a su administrador.';
        /**
        for (var k = 0; k < response.data.length; k++) {
            var idrow = "#r" + response.data[k]["name"].replace(" ", "");
            var idcell = "#c" + response.data[k]["name"].replace(" ", "");
            var row = $(idrow);
            var cell = $(idcell);
            cell[0].innerHTML = "";
            cell[0].innerHTML = response.data[k]["message"];
            var ctrl = 0;
            if (response.data[k]["ID"] == 1) {
                row.css('background-color', 'seagreen');
            } else {
                row.css('background-color', 'orange');
                ctrl = 1;
            }
        }
        var pmsj = $("#pMensaje");
        pmsj[0].innerText = "";
        if (ctrl == 1) {
            pmsj[0].innerText = "No todos los socios fueron agregados, contactar a su administrador.";
        } else {
            pmsj[0].innerText = "Se agregaron todos los socios";
        }
        **/
        
    }
/**
    function BorrarTabla() {
        $("#tblSocios").html(" <thead>" +
                                     "<tr>" +
                                       "<th>Socio</th>" +
                                       "<th>RPU</th>" +
                                       "<th>Estatus</th>" +
                                       "<th>Consumo Medido</th>" +
                                       "<th>Medidor</th>" +
                                       "<th>ID medidor generación</th>" +
                                       "<th>Comentarios</th>" +
                                    "</tr>" +
                                  "</thead>" +
                                  "<tbody></tbody>");
    }
    **/
    function showMetter(data) {
        var da = $scope.ComboMedidor;
        $scope.auxMetter = [];
        $.each(da, function (key, data) {
            var metter = {
                active: data.active,
                dataId: data.dataId,
                name: data.name
            };
            $scope.auxMetter.push(metter);
        });
        if (data != '') {
            var d = data.split(",");
            var id = d[1];
            var name = d[0];
            var metter = {
                active: "1",
                dataId: id,
                name: name
            };
            $scope.auxMetter.push(metter);
            $scope.Socio.metter = id;
        }
    };


    $scope.onChange = function () {
        $scope.showWarning(true);
        $scope.auxMetter = [];
        if ($scope.Socio.consumption == 0) {
            $scope.disable = true;
        } else {
            showMetter($scope.Socio.metter);
            $scope.disable = false;

        }
    };

    $scope.CambioSocio = function () {
        var user = {
            operation: '60',
            ID: $scope.Socio.id
        };
        resetValues();
        var ID = $scope.Socio.id;
        var OP = $scope.Socio.operation;
        $scope.isLoading(true);

        $http({
            method: 'POST',
            url: $scope.url + 'server/admin/info',
            data: user
        }).then(function successCallback(response) {
            $scope.isLoading(false);
            if (response.data != null) {

                $scope.showWarning(true);
                $scope.Socio = response.data;
                $scope.Socio.id = ID;
                $scope.Socio.operation = OP;
                $scope.onChange();
            } else {
                $scope.displayDialog(response.data.Message);
            }
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });
    };

});

app.controller('ConsumosCFEController', function ($scope, $mdDialog, $http) {
    $scope.displayTitle('Consumos CFE');
    $scope.sectionSelected('#ConsumosCFE');
});

app.controller('NeteoController', function ($scope, $mdDialog, $http, $interval) {
    $scope.displayTitle('Neteo de Energia');
    $scope.sectionSelected('#Neteo');
    $scope.showWarning(false);

    //canvas IUSASOL BASE ---------------------------
    var canv = document.getElementById('iusaB');

    var ctx = canv.getContext('2d');
    var s = getComputedStyle(canv);
    var w = s.width;
    var h = s.height;

    canv.width = w.split("px")[0];
    canv.height = h.split("px")[0];
    w = canv.width;
    h = canv.height;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);
    //--------------------------------------------
    //---canvas IUSASOL 1-------------
    var can = document.getElementById('iusa1');

    var ctxs = can.getContext('2d');
    var s = getComputedStyle(can);
    var w1 = s.width;
    var h1 = s.height;

    can.width = w1.split("px")[0];
    can.height = h1.split("px")[0];
    w1 = can.width;
    h1 = can.height;
    ctxs.fillStyle = '#FFFFFF';
    ctxs.fillRect(0, 0, w1, h1);
    //----------------------------------

    function drawSocios(ctx, text, x, y, style, fontSize) {

        ctx.fillStyle = style;
        ctx.font = fontSize;
        ctx.fillText(text, x, y);
    }

    function drawInfoPorteo(ctx, x, y, value, style, fontSize) {

        ctx.fillStyle = style;
        ctx.font = fontSize;
        ctx.fillText(value, x, y);
    }

    function drawLines(ctx, x, y, width, height) {
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 10, y + 10);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 10, y + 10);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + width);
        ctx.stroke();
    }

    function drawLinesReverse(ctx, x, y, width, height) {
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 10, y - 10);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 10, y - 10);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - width);
        ctx.stroke();
    }

    function drawOnda(ctx, x, y, anticlockwise) {
        for (var i = 0; i < 4; i++) {
            ctx.beginPath();

            var radius = 10;
            var startAngle = 0; // Starting point on circle
            var endAngle = Math.PI; // End point on circle
            //anticlockwise - clockwise or anticlockwise
            ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
            ctx.stroke();
            x += 20;
        }
    }

    function drawImage(ctx, x, y, w, h, path) {
        var img = new Image();
        img.src = path;
        ctx.drawImage(img, x, y, w, h);
        ctx.stroke();
    }

    function dottedLine(ctx, Ix, y, Fx) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 10]);
        ctx.beginPath();
        ctx.moveTo(Ix, y);
        ctx.lineTo(Fx, y);
        ctx.stroke();
    }

    function Line(ctx, Ix, y, Fx) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(Ix, y);
        ctx.lineTo(Fx, y);
        ctx.stroke();
    }

    var dataGraphic = function () {
        var date = new Date();
        
        var maxDate = date.getFullYear() + '-' + date.getMonth()+1 + '-' + date.getDate();
        console.log(maxDate);
        $scope.isLoading(load);
        
        console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
        $http({
            method: 'POST',
            url: $scope.url + 'server/porteo/getDataGraphic'
        }).then(function successCallback(response) {
            draw(response.data);
            $scope.isLoading(false);
        }, function errorCallback(response) {
            $scope.isLoading(false);
            //$scope.displayDialog(response.data || ' Request failed');
        });

    }
    var load = true;
    dataGraphic();
    load = false;
    $interval(dataGraphic, 900000);//funcion que ejecuta la actualización de infromación cada x tiempo


    var colorLetter = 'rgb(113,144,58)';
    var colorOrange = 'rgb(247,150,70)';
    var colorOro = 'rgb(255,192,0)';
    var colorRojo = 'rgb(255,0,0)';
    var colorNegro = 'rgb(0,0,0)';
    var ciusa = '../Images/Imagen.png';
    var pti = '../Images/Imagen1.png';
    var fontSize = '16px serif';



    function draw(data) {
        var canvas;
        $.each(data, function (key, data) {
            var sociedades = data.societyData;
            var we = (w / data.societyData.length);
            var weAux = (w / data.societyData.length);
            var aux = (weAux / 3);
            var rowPadding = (w / 2);

            if (data.proyecto == 6) {
                canvas = ctx;
                canvas.fillStyle = '#FFFFFF';
                canvas.fillRect(0, 0, w, h);
            }
            if (data.proyecto == 7) {
                canvas = ctxs;
                canvas.fillStyle = '#FFFFFF';
                canvas.fillRect(0, 0, w, h);
                drawLinesReverse(canvas, rowPadding - 150, 395, 60, 1);
                drawImage(canvas, rowPadding - 170, 396, 50, 50, ciusa);
                drawSocios(canvas, "Consumo IUSA", rowPadding - 170, 465, colorNegro, fontSize);

            }


            $.each(sociedades, function (key, data) {
                drawSocios(canvas, data.name, (we - ((weAux / 2) + aux)), 30, colorLetter, fontSize);
                drawInfoPorteo(canvas, (we - (((weAux / 2) + aux))) + 10, 50, data.value, colorLetter, fontSize);
                drawLines(canvas, (we - (((weAux / 2) + aux))) + 35, 55, 125, 1);

                we += weAux;
            });
            we -= weAux;
            dottedLine(canvas, (weAux - (((weAux / 2) + aux))) + 35, 180, (we - (((weAux / 2) + aux))) + 35);
            drawSocios(canvas, 'Energía', rowPadding - 113, 200, colorLetter, fontSize);
            drawSocios(canvas, 'Porteada a los Socios', rowPadding - 143, 215, colorLetter, fontSize);
            drawInfoPorteo(canvas, rowPadding - 123, 230, data.porteada, colorLetter, fontSize);
            drawLines(canvas, rowPadding, 180, 60, 1);
            drawOnda(canvas, rowPadding - 30, 240, false);
            drawOnda(canvas, rowPadding - 30, 275, true);
            drawLines(canvas, rowPadding, 275, 60, 1);

            drawSocios(canvas, 'Energía', rowPadding - 113, 300, colorLetter, fontSize);
            drawSocios(canvas, 'Inyectada a la Red', rowPadding - 143, 315, colorLetter, fontSize);
            drawInfoPorteo(canvas, rowPadding - 123, 330, data.inyectada, colorLetter, fontSize);

            Line(canvas, rowPadding - 165, 335, rowPadding + 165);


            drawLines(canvas, rowPadding + 150, 335, 60, 1);
            drawImage(canvas, rowPadding + 130, 396, 50, 50, pti);



            drawSocios(canvas, "Energía Generada", rowPadding + 185, 416, colorOrange, fontSize);
            drawInfoPorteo(canvas, rowPadding + 185, 434, data.generada, colorOrange, fontSize);

            canvas.strokeStyle = colorOro;
            canvas.strokeRect(w - 150, 390, 120, 45);
            drawSocios(canvas, "Energía Sobrante", w - 144, 405, colorOrange, fontSize);
            drawInfoPorteo(canvas, w - 142, 425, data.sobrante, colorOrange, fontSize);

            canvas.strokeStyle = colorRojo;
            canvas.strokeRect(w - 150, 450, 120, 45);
            drawSocios(canvas, "Energía Faltante", w - 144, 465, colorOrange, fontSize);
            drawInfoPorteo(canvas, w - 142, 483, data.faltante, colorOrange, fontSize);
        });

    }

});

app.controller('ProcesoPorteoController', function ($scope, $mdDialog, $http, $interval) {
    $scope.displayTitle('Proceso Porteo');
    $scope.sectionSelected('#ProcesoPorteo');
    $scope.showWarning(false);
    $scope.Comboproyecto = [];
    $scope.proyectType = '';
    $scope.proyectYear = '';
    $scope.proyectMonth = '';
    var base = {
        name: 'IUSASOL BASE',
        id:6
    };

    var uno = {
        name: 'IUSASOL UNO',
        id: 7
    };

    //$scope.selectedIndex = 0;
    $scope.Comboproyecto.push(base);
    $scope.Comboproyecto.push(uno);

    //canvas IUSASOL BASE ---------------------------
    var canv = document.getElementById('iusaB');

    var ctx = canv.getContext('2d');
    var s = getComputedStyle(canv);
    var w = s.width;
    var h = s.height;

    canv.width = w.split("px")[0];
    canv.height = h.split("px")[0];
    w = canv.width;
    h = canv.height;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);
    //--------------------------------------------
    //---canvas IUSASOL 1-------------
    var can = document.getElementById('iusa1');

    var ctxs = can.getContext('2d');
    var s = getComputedStyle(can);
    var w1 = s.width;
    var h1 = s.height;

    can.width = w1.split("px")[0];
    can.height = h1.split("px")[0];
    w1 = can.width;
    h1 = can.height;
    ctxs.fillStyle = '#FFFFFF';
    ctxs.fillRect(0, 0, w1, h1);
    //----------------------------------
    var months = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    $scope.panels = [];
    $scope.panelConsumo = [];
    $scope.panelNeteo = [];
    $scope.panelPorteo = [];
    $scope.panelSobrante = [];
    var currentDateFormat = '';
    $scope.dateName = '';
    var year = '';
    var month = '';
    var day = '';

    $scope.data = {
        group1: '1'
    };
    var initialDate='';
    $scope.format = function (date) {
        year = date.getFullYear();
        month = date.getMonth();
        day = date.getDate();
        cMonth = (month + 1);
        if (cMonth < 10)
            cMonth = '0' + cMonth;
        cDay = date.getDate();
        if (cDay < 10)
            cDay = '0' + cDay;

        currentDateFormat = year + '-' + cMonth + '-' + cDay;
        initialDate = day + '/' + (month + 1) + '/' + year;
        $scope.dateName = dateToString(year, month, day, date.getDay());
    };
    var cdate = new Date();

    var cMonth = cdate.getMonth() + 1;
    var cDate = cdate.getDate() + 1;
    if (cMonth < 10) {
        cMonth = '0' + cMonth;
    }
    if (cDate < 10)
        cDate = '0' + cDate;

    $scope.maxDate = cdate.getFullYear() + '-' + cMonth + '-' + cDate;
    $scope.currentDate = new Date();
    $scope.format($scope.currentDate);

    var value = true;
    var fromWeb = 0;

    $scope.isProgress = false;
    $scope.isProgress1 = false;
    $scope.isProgress2 = false;
    $scope.isProgress3 = false;
    $scope.isProgress4 = false;
    function init() {
        var date = new Date();
        var finalDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        if (validate_fechaMayorQue(initialDate, finalDate)) {
            if (fromWeb==0) {
                $scope.format($scope.currentDate);
                $scope.currentDate = new Date();
            }
            fromWeb = 0;
        }
        var cMonth = date.getMonth() + 1;
        var cDate = date.getDate() + 1;
        if (cMonth < 10) {
            cMonth = '0' + cMonth;
        }
        if (cDate < 10)
            cDate = '0' + cDate;

        $scope.maxDate = date.getFullYear() + '-' + cMonth + '-' + cDate;
       // console.log($scope.maxDate);
        $scope.isLoading(value);
        var data = {
            date: currentDateFormat
        };
        //console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
        $scope.isProgress = true;
        $scope.isProgress1 = true;
        $scope.isProgress2 = true;
        $scope.isProgress3 = true;
        $scope.isProgress4 = true;
        $http({
            method: 'POST',
            url: $scope.url + 'server/porteo/panel',
            data: data
        }).then(function successCallback(response) {
            $scope.isLoading(false);
            $scope.selectedIndex1 = (response.data.length)-1;
            $scope.panels = [];
            $scope.panels = response.data;
            $scope.isProgress = false;
            //showGraphic(response.data, '#containerGG', 'Energia Generada');
          //  ConsuptionGraphic();
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });

        $http({
            method: 'POST',
            url: $scope.url + 'server/porteo/Consuption',
            data: data
        }).then(function successCallback(response) {
            $scope.isLoading(false);
            //$scope.panels = response.data;
            $scope.selectedIndex2 = (response.data.length)-1;
            $scope.panelConsumo = [];
            $scope.panelConsumo = response.data;
            $scope.isProgress1 = false;
            //showGraphic(response.data, '#containerC', 'Energia Consumida');
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });

        $http({
            method: 'POST',
            url: $scope.url + 'server/porteo/consumos_totales',
            data: data
        }).then(function successCallback(response) {
            $scope.isLoading(false);
            $scope.selectedIndex4 = (response.data.length)-1;
            $scope.panelPorteo = [];
            $scope.panelPorteo = response.data;
            $scope.isProgress3 = false;
            //$scope.panels = response.data;
            //showGraphic(response.data, '#containerN', 'Neteo');
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });

        $http({
            method: 'POST',
            url: $scope.url + 'server/porteo/sobrante',
            data: data
        }).then(function successCallback(response) {
            $scope.isLoading(false);
            $scope.selectedIndex5 = (response.data.length)-1;
            $scope.panelSobrante = [];
            $scope.panelSobrante = response.data;
            $scope.isProgress4 = false;
            //$scope.panels = response.data;
            //showGraphic(response.data, '#containerN', 'Neteo');
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });

        $http({
            method: 'POST',
            url: $scope.url + 'server/porteo/Neteo',
            data: data
        }).then(function successCallback(response) {
            $scope.isLoading(false);
            $scope.selectedIndex3 = (response.data.length) - 1;
            $scope.panelNeteo = [];
            $scope.panelNeteo = response.data;
            $scope.isProgress2 = false
            //$scope.panels = response.data;
            //showGraphic(response.data, '#containerN', 'Neteo');
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });

    }

    init();
    value = false;
    $interval(init, 900000);

    $scope.changeDate = function (date) {
        $scope.format(date);
        value = false;
        fromWeb = 1;
        init();
    };

    
    $scope.selectTabs = function (index) {
            $scope.selectedIndex1 = index;
            $scope.selectedIndex2 = index;
            $scope.selectedIndex3 = index;
            $scope.selectedIndex4 = index;
            $scope.selectedIndex5 = index;
        
        
    }
    $scope.showGraphic = function (data) {
        //console.log(index);
        //console.log(data.color);
        $(data.container).highcharts('StockChart', {
            rangeSelector: {
                allButtonsEnabled: true,
                buttons: [{
                    type: 'day',
                    count: 1,
                    text: '1d'
                }, {
                    type: 'ytd',
                    text: '1m'
                }, {
                    type: 'month',
                    count: 3,
                    text: '3m'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                }],
                buttonTheme: {
                    width: 60
                },
                selected: 0
            },

            xAxis: {
                min: new Date().getTime(),//Date.UTC(2017,1,18,0,0,0,0), //previous day  at 16.00
                max: new Date().getTime() //get actual time
            },

            title: {
                text: data.title
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} kwh</b>',
                valueDecimals: 3,
                split: true
            },

            series: [{
                name: data.name,
                data: data.CollectionByDate,
                color:data.color
            }
            ]
        });
    }

   /** var showGraphic = function (data,container,title) {
        var series = [];
        $.each(data, function (key, data) {
           // console.log(data.color);
            var obj = {
                name: data.name,
                data: data.CollectionByDate,
                //visible: data.active,
                type: data.tipo,
                color: data.color,
                
            };
            series.push(obj);
        });

        $(container).highcharts('StockChart', {
            rangeSelector: {
                allButtonsEnabled: true,
                buttons: [{
                    type: 'day',
                    count: 1,
                    text :'1d'
                }, {
                    type: 'ytd',
                    text: '1m'
                }, {
                    type: 'month',
                    count: 3,
                    text: '3m'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                }],
                buttonTheme: {
                    width: 60
                },
                selected: 0
            },

            xAxis: {
                min: new Date().getTime(),//Date.UTC(2017,1,18,0,0,0,0), //previous day  at 16.00
                max: new Date().getTime() //get actual time
            },

            title: {
                text: title
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} kwh</b>',
                valueDecimals: 3,
                split: true
            },

            series: series
        });
        **/
        /**

        Highcharts.stockChart('#containerGG', {
            rangeSelector: {
                selected:0
            },
            title: {
                text:'Generación de energia'
            },
            
            yAxis: {
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color:'silver'
                }]
            },
            plotOptions: {
                series: {
                    compare: 'percent',
                    showInNavigator : true
                }
            },

            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} kwh</b> ',
                vlueDecimals: 3,
                split:true
            },
            series:series

        });
        **/
        /**
        $('#containerGG').highcharts({
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Energia Generada de las granjas'
            },
            subtitle: {
                text: $scope.dateName
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    overflow: 'justify'
                }
            },
            yAxis: {
                title: {
                    text: 'Energia'
                },
                minorGridLineWidth: 0,
                gridLineWidth: 0,
                alternateGridColor: null,
                plotBands: [{
                    from: 0.0,
                    to: 10000,
                    color: 'rgba(237, 231, 246, 1)',
                    label: {
                        text: 'Energia',
                        style: {
                            color: '#606060'
                        }
                    }
                }]
            },
            tooltip: {
                valueSuffix: ' kwh'
            },
            plotOptions: {
                spline: {
                    lineWidth: 4,
                    states: {
                        hover: {
                            lineWidth: 5
                        }
                    },
                    marker: {
                        enabled: false
                    },
                    pointInterval: 300000, // one hour
                    pointStart: Date.UTC(year, month, day, 0, 0, 0)
                }
            },
            series: series,
            navigation: {
                menuItemStyle: {
                    fontSize: '10px'
                }
            }
        });

        
    };
    **/
    

    $scope.ConsuptionGraphic = function (data) {
        
        var serie = data.collection;
        var pFormat = (data.active) ? '({point.percentage:.0f}%)<br/>' : '';
        Highcharts.chart(data.containerName, {
            chart: {
                type: 'column'
            },
            title: {
                text: data.title
            },
            xAxis: {
                categories: data.categories
            },
            yAxis: {
               // min: 0,
                title: {
                    text: ''
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}Kwh</b> ' +pFormat,
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: serie
        });

    }

    function dateToString(year, month, day,dayWeek) {
        var days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return days[dayWeek] + ' ' + day + ' de ' + months[(month+1)] + ' del ' + year;
    };

    $scope.downloadInfo = function (idMetter) {
        var datos = {
            fileName:'Generado_' + currentDateFormat + '_IUSASOL_',
            mDate: currentDateFormat,
            proyect:idMetter
        }
        $scope.isLoading(true);
        $http({
            method: 'POST',
            url: $scope.url + 'server/porteo/downloadGenerated',
            params: datos,
            responseType: 'arraybuffer'
        }).success(function (data, status, headers) {
            $scope.isLoading(false);
            headers = headers();

            var filename = headers['X-Filename'];
            var contentType = headers['content-type'];
            var linkElement = document.createElement('a');

            try {
                var blob = new Blob([data], { type: contentType });
                var url = window.URL.createObjectURL(blob);
                linkElement.setAttribute('href',url);
                var proyecto = (idMetter == 6) ? 'BASE':'UNO';
                linkElement.setAttribute("download",datos.fileName + proyecto +'.xlsx');

                var clickEvent = new MouseEvent("click",{
                    "view" : window,
                    "bubbles" : true,
                    "cancelable" : false
                });
                linkElement.dispatchEvent(clickEvent);
            } catch (ex) {
                console.log('constructor error');
                console.log(ex);
                $scope.displayDialog('Error al descargar el archivo, intente de nuevo');
            }
        }).error(function (data) {
            $scope.isLoading(false);
            console.log('no data');
            console.log(data);
            $scope.displayDialog('No hay datos para mostrar');
        });
    }

    $scope.download = function () {
        if ($scope.proyectType == '' || $scope.proyectYear == '' || $scope.proyectMonth == '') {
            $scope.displayDialog('Seleccione fecha de detalle');
            return;
        }
        var datos = {
            year: $scope.proyectYear,
            month: $scope.proyectMonth,
            proyect:$scope.proyectType,
            typeFormat: $scope.data.group1
        };
        $scope.isLoading(true);
        $http({
            method: 'POST',
            url: $scope.url + 'values/download',
            params: datos,
            responseType: 'arraybuffer'
        }).success(function (data, status, headers) {
            $scope.isLoading(false);
            headers = headers();

            var filename = headers['X-Filename'];
            var contentType = headers['content-type'];
            var linkElement = document.createElement('a');

            try {
                var blob = new Blob([data], { type: contentType });
                var url = window.URL.createObjectURL(blob);
                var format = ($scope.data.group1 == 1) ? '.xlsx' : '.pdf';
                linkElement.setAttribute('href', url);
                var proyecto = (datos.proyect == 6) ? 'BASE' : 'UNO';
                linkElement.setAttribute("download", 'BALANCE_'+ months[datos.month]+'-IUSASOL-'+proyecto+format);

                var clickEvent = new MouseEvent("click", {
                    "view": window,
                    "bubbles": true,
                    "cancelable": false
                });
                linkElement.dispatchEvent(clickEvent);
            } catch (ex) {
                console.log('Constructor error');
                console.log(ex);
                $scope.displayDialog('Error al descargar el archivo, intente de nuevo');
            }
        }).error(function (data) {
            $scope.isLoading(false);
            console.log('no data');
            console.log(data);
            $scope.displayDialog('No hay datos para mostrar');
        });

    }

    function drawSocios(ctx,text,x,y,style,fontSize) {
        
        ctx.fillStyle = style;
        ctx.font = fontSize;
        ctx.fillText(text, x,y);
    }

    function drawInfoPorteo(ctx, x, y, value,style,fontSize) {        

        // Set new text
        ctx.fillStyle = style;
        ctx.font = fontSize;
        ctx.fillText(value, x, y);
    }

    function drawLines(ctx, x, y, width, height) {
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x-10, y+10);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x+10, y+10);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x , y + width);
        ctx.stroke();
    }

    function drawLinesReverse(ctx, x, y, width, height) {
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 10, y - 10);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 10, y - 10);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - width);
        ctx.stroke();
    }

    function drawOnda(ctx,x,y,anticlockwise) {
        for (var i = 0; i < 4; i++) {
            ctx.beginPath();


            //var y = 125;
            var radius = 10;
            var startAngle = 0; // Starting point on circle
            var endAngle = Math.PI; // End point on circle
            //var anticlockwise = false; // clockwise or anticlockwise
            ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
            ctx.stroke();
            x += 20;
        }
    }

    function drawImage(ctx, x, y, w, h, path) {
        var img = new Image();
        img.src = path;
        ctx.drawImage(img, x, y,w,h);
        ctx.stroke();
    }

    function dottedLine(ctx,Ix,y,Fx) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 10]);
        ctx.beginPath();
        ctx.moveTo(Ix, y);
        ctx.lineTo(Fx, y);
        ctx.stroke();
    }

    function Line(ctx,Ix,y,Fx) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(Ix, y);
        ctx.lineTo(Fx,y);
        ctx.stroke();
    }

    var dataGraphic = function () {
        $http({
            method: 'POST',
            url: $scope.url + 'server/porteo/getDataGraphic'
        }).then(function successCallback(response) {
            draw(response.data);
        }, function errorCallback(response) {
            //$scope.displayDialog(response.data || ' Request failed');
        });
        
    }
    dataGraphic();
    $interval(dataGraphic, 900000);
 
    
    var colorLetter = 'rgb(113,144,58)';
    var colorOrange = 'rgb(247,150,70)';
    var colorOro = 'rgb(255,192,0)';
    var colorRojo = 'rgb(255,0,0)';
    var colorNegro = 'rgb(0,0,0)';
    var ciusa = '../Images/Imagen.png';
    var pti = '../Images/Imagen1.png';
    var fontSize = '16px serif';
    
    

    function draw(data) {
        var canvas;
        $.each(data, function (key, data) {
            var sociedades = data.societyData;
            var we = (w / data.societyData.length);
            var weAux = (w / data.societyData.length);
            var aux = (weAux / 3);
            var rowPadding = (w / 2);

            if (data.proyecto == 6) {
                canvas = ctx;
                canvas.fillStyle = '#FFFFFF';
                canvas.fillRect(0, 0, w, h);
            }
            if (data.proyecto == 7) {
                canvas = ctxs;
                canvas.fillStyle = '#FFFFFF';
                canvas.fillRect(0, 0, w, h);
                drawLinesReverse(canvas, rowPadding - 150, 395, 60, 1);
                drawImage(canvas, rowPadding-170, 396, 50, 50, ciusa);
                drawSocios(canvas, "Consumo IUSA", rowPadding - 170, 465, colorNegro,fontSize);
                
            }

            
            $.each(sociedades, function (key, data) {
                drawSocios(canvas, data.name, (we - ((weAux / 2) + aux)), 30, colorLetter, fontSize);
                drawInfoPorteo(canvas, (we - (((weAux / 2) + aux))) + 10, 50, data.value, colorLetter, fontSize);
                drawLines(canvas, (we - (((weAux / 2) + aux))) + 35, 55, 125, 1);
                
                we += weAux;
            });
            we -= weAux;
            dottedLine(canvas, (weAux - (((weAux / 2) + aux))) + 35, 180, (we - (((weAux / 2) + aux))) + 35);
            drawSocios(canvas, 'Energía', rowPadding - 113, 200, colorLetter, fontSize);
            drawSocios(canvas, 'Porteada a los Socios', rowPadding - 143, 215, colorLetter, fontSize);
            drawInfoPorteo(canvas, rowPadding - 123, 230, data.porteada, colorLetter, fontSize);
            drawLines(canvas, rowPadding, 180, 60, 1);
            drawOnda(canvas, rowPadding - 30, 240, false);
            drawOnda(canvas, rowPadding - 30, 275, true);
            drawLines(canvas, rowPadding, 275, 60, 1);

            drawSocios(canvas, 'Energía', rowPadding - 113, 300, colorLetter, fontSize);
            drawSocios(canvas, 'Inyectada a la Red', rowPadding - 143, 315, colorLetter, fontSize);
            drawInfoPorteo(canvas, rowPadding - 123, 330, data.inyectada, colorLetter, fontSize);

            Line(canvas, rowPadding - 165, 335, rowPadding + 165);


            drawLines(canvas, rowPadding + 150, 335, 60, 1);
            drawImage(canvas, rowPadding + 130, 396, 50, 50, pti);
            
            

            drawSocios(canvas, "Energía Generada", rowPadding + 185, 416, colorOrange, fontSize);
            drawInfoPorteo(canvas, rowPadding + 185, 434, data.generada, colorOrange, fontSize);

            canvas.strokeStyle = colorOro;
            canvas.strokeRect(w-150, 390, 150, 45);
            drawSocios(canvas, "Energía Sobrante", w - 144, 405, colorOrange, fontSize);
            drawInfoPorteo(canvas, w - 142, 425, data.sobrante, colorOrange, fontSize);

            canvas.strokeStyle = colorRojo;
            canvas.strokeRect(w - 150, 450, 150, 45);
            drawSocios(canvas, "Energía Faltante", w - 144, 465, colorOrange, fontSize);
            drawInfoPorteo(canvas, w - 142, 483, data.faltante, colorOrange, fontSize);
        });
        
    }



    function validate_fechaMayorQue(fechaInicial, fechaFinal) {
        valuesStart = fechaInicial.split("/");
        valuesEnd = fechaFinal.split("/");
        // Verificamos que la fecha no sea posterior a la actual
        var dateStart = new Date(valuesStart[2], (valuesStart[1] - 1), valuesStart[0]);
        var dateEnd = new Date(valuesEnd[2], (valuesEnd[1] - 1), valuesEnd[0]);
        if (dateStart >= dateEnd) {
            return 0;
        }
        return 1;
    }

   
});

app.controller('FestivosController', function ($scope, $mdDialog, $http, $mdToast) {
  
    $scope.displayTitle('Días Festivos');
    $scope.sectionSelected('#DiasFestivos');
    $scope.currentDate= new Date();
    $scope.DateName = '';
    $scope.mDate = [];

    var isWarn = false;

    $scope.cYear = [];
    var all = { id: 'Todos', name: 'Todos los años' };
    var inter = {id:'6year', name: 'Cada 6 años'};
    $scope.cYear.push(all);
    $scope.cYear.push(inter);
    var year = $scope.ComboAnio;
    $.each(year, function (key, data) {
        $scope.cYear.push(data);
    });

    $scope.orden = [];
    var ul = { id: 0, name: 'Ultimo'};
    var pr = { id: 1, name: 'Primero'};
    var se = { id: 2, name: 'Segundo'};
    var te = { id: 3, name: 'Tercero'};
    var cu = { id: 4, name: 'Cuarto'};
    var qu = { id: 5, name: 'Quinto' };
    var es = { id: 6, name: 'Día especifico' };
    $scope.orden.push(es);
    $scope.orden.push(pr);
    $scope.orden.push(se);
    $scope.orden.push(te);
    $scope.orden.push(cu);
    $scope.orden.push(qu);
    $scope.orden.push(ul);
    
    $scope.days = [];
    var dom = {id:0,name:'Domingo'};
    var lu = {id:1,name:'Lunes'};
    var ma = {id:2,name:'Martes'};
    var mi = {id:3,name:'Miercoles'};
    var ju = {id:4,name:'Jueves'}
    var vi = {id:5,name:'Viernes'}
    var sa = {id:6,name:'Sabado'};
    $scope.days.push(lu);
    $scope.days.push(ma);
    $scope.days.push(mi);
    $scope.days.push(ju);
    $scope.days.push(vi);
    $scope.days.push(sa);
    $scope.days.push(dom);

    $scope.date = {
        year: '',
        month: '',
        orden: '',
        day: '',
        title:''
    };
    /** show dialog **/
    $scope.showWarn = function (data) {
        if (data != '') {
            $scope.showWarning(true);
        } else {
            if ($scope.date.year != '' | $scope.date.month != '' | $scope.date.orden != '' | $scope.date.day != ''
                | $scope.date.title != '' ) {
                $scope.showWarning(true);
            } else {
                if ($scope.date.year == '' | $scope.date.month == '' | $scope.date.orden == '' | $scope.date.day == ''
                | $scope.date.title == '') {
                    if (!isWarn)
                        $scope.showWarning(false);
                }
            }
        }
    }
    /**end show dialog **/


    /***********************/
    
    $scope.loadDate = function () {
        var data = {
            operation:'90',
            ID:''
        }
        $scope.isLoading(true);
        $http({
            method: 'POST',
            url: $scope.url + 'server/admin/info',
            data: data
        }).then(function successCallback(response) {
            $scope.isLoading(false);
            $scope.mDate = response.data;
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || ' Request failed');
        });
    };

    $scope.selectDay = function (id) {
        $scope.days = [];
        $scope.showWarning(true);
        var dayOnMonth = '';
        if (id == '6') {
            var year = new Date();
            if ($scope.date.year == '6year') {
                //var y = 2012;
                dayOnMonth = daysInMonth($scope.date.month,year.getFullYear());
            } else {
                dayOnMonth = daysInMonth($scope.date.month, ($scope.date.year == 'Todos') ? year.getFullYear() : $scope.date.year);
            }
            
            for (i = 1; i <= dayOnMonth; i++) {
                var d = { id: i, name: i };
                $scope.days.push(d);
            }
        } else {
            var dom = { id: 0, name: 'Domingo' };
            var lu = { id: 1, name: 'Lunes' };
            var ma = { id: 2, name: 'Martes' };
            var mi = { id: 3, name: 'Miercoles' };
            var ju = { id: 4, name: 'Jueves' }
            var vi = { id: 5, name: 'Viernes' }
            var sa = { id: 6, name: 'Sabado' };
            $scope.days.push(lu);
            $scope.days.push(ma);
            $scope.days.push(mi);
            $scope.days.push(ju);
            $scope.days.push(vi);
            $scope.days.push(sa);
            $scope.days.push(dom);
        }
    };

    $scope.saveDataDate = function () {
        if ($scope.mDate.length <= 0) {
            $scope.displayDialog('No hay datos');
            return;
        }
        
        var data = {
            operation: '10',
            mDate: $scope.mDate
        };
        $scope.isLoading(true);
        $http({
            method: 'POST',
            url: $scope.url + 'server/admin/Date',
            data: data
        }).then(function successCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data.Message);
            if (response.data.ID == 1)
                $scope.loadDate();
        }, function errorCallback(response) {
            $scope.isLoading(false);
            $scope.displayDialog(response.data || 'Request failed')
        });
    };

    $scope.addAbstractDate = function () {
              
        if ($scope.date.year == '' |
            $scope.date.month == '' |
            $scope.date.orden == '' |
            $scope.date.day == ''|
            $scope.date.title == '') {
            $scope.displayDialog('todos los campos son obligatorios');
            $scope.date.day = '';
            $scope.date.orden = '';
            return;
        }
        var dEnd = $scope.date.orden;
        var dDay = $scope.date.day;
        if (dEnd == 0)
            $scope.date.orden = '0';

        if (dDay == 0)
            $scope.date.day = '0';
        var day = $scope.date.day;
        var month = $scope.date.month;
        month = (month < 10) ? '0' + month : month;
        day = (day < 10) ? '0' + day : day;

      

        var date = DateToHexa($scope.date.year, month, $scope.date.orden, day);
        var name = HexaToDate(date);
        var val = false;
        var data = $scope.mDate;
        $.each(data, function (key, data) {
            if (data.hexa == date)
                val = true;
        });

        if (!val) {
            $scope.inserted = {
                dateId: '',
                typeDay: '3',
                name: $scope.date.title,
                hexa: date,
                date: name,
                active: '1'
            };
            $scope.mDate.push($scope.inserted);
            $scope.date = {
                year: '',
                month: '',
                orden: '',
                day: '',
                title: ''
            };
            $scope.showToast();
            isWarn = true;
            $scope.showWarning(true);
        } else {
            $scope.displayDialog('Fecha existente');
        }
    };
    
    $scope.removeDate = function (data,index) {
        data.active = '0';
        $scope.mDate[index] = data;
        isWarn = true;
        $scope.showWarning(true);
    };

    $scope.showToast = function () {
        $mdToast.show({
            hideDelay: 4000,
            position: 'top right',
            controller: 'ToastCtrl',
            templateUrl: '../include/Toast-template.html'
        });
    };
    function HexaToDate(hexa) {

        var date = null;
        var fType, year, month, dType, day;
        var days = ['Ultimo', 'Primer', 'Segundo', 'Tercer', 'Cuarto', 'Quinto'];
        var week = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        var months = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        var da = hexa.toString();
        //00FE120106
        //FFFF12FF12
        fType = da.substring(0, 2);//00  //FF
        year = da.substring(2, 4); //FE  //FF
        month = da.substring(4, 6);//12  //12
        dType = da.substring(6, 8);//01  //FF
        day = da.substring(8, 10); //06  //12


        if (year == 'FF') {
            if (fType == '00') {
                var d = parseInt(dType);
                var w = parseInt(day);
                var m = parseInt(month);
                date = days[d] + ' ' + week[w] + ' de ' + months[m] + ' de todos los años';
            } else {
                date = day + '/' + month + ' de todos los años';
            }

        } else {
            if (year == 'FE') {
                if (fType == '00') {
                    var d = parseInt(dType);
                    var w = parseInt(day);
                    var m = parseInt(month);
                    date = days[d] + ' ' + week[w] + ' de ' + months[m] + ' de cada 6 años';
                } else {
                    date = day + "/" + month + " de cada 6 años";
                }
            } else {

                if (dType == 'FF') {
                    date = day + '/' + month + '/' + year;
                }
                else {
                    var d = parseInt(dType);
                    var w = parseInt(day);
                    var m = parseInt(month);
                    //date = days[d] + " " + week[w] + " de " + months[m] + " del 20" + year;
                    date = day + '/' + month + '/' + year;
                }

            }
        }

        return date;
    }
    function DateToHexa(year,month,type,day) {
        
        var date = '';
        if(type=='6'){
            date += 'FF';
        }else{
            date += '00';
        }
        
        if (year == 'Todos') {
            date += 'FF';
        } else {
            if (year == '6year') {
                date += 'FE';
            } else {
                var d = year.toString();
                date += d.substring(2, 4);
            }
        }
        
        date += month;
        if (type == '6') {
            date += 'FF';
        }else{
            date += '0' + type;
        }
        date+=day;
        
        return date;
    }
    function getDateTime() {
        var Reference = new Date();
        var index = 0;
        var end = 0;
        var pass = 0;
        var nFound = 0;
        var found = false;
        try {
            var dayOnMonth = daysInMonth($scope.date.month, $scope.date.year);
            var ord = parseInt($scope.date.orden)
            if (ord == 0) {
                index = dayOnMonth;
                end = 1;
                pass = -1;
            } else {
                index = 1;
                end = dayOnMonth;
                pass = 1;
                nFound = 1;
            }
            for (day = index; (day <= end) ? day <= end : day >= end; day += pass) {
                Reference = new Date($scope.date.year, $scope.date.month-1, day);
                if (Reference.getDay() == $scope.date.day) {
                    if (nFound == ord) {
                        found = true;
                        break;
                    }
                    nFound++;
                }
            }
            if (found)
                return Reference;
            else
                return -1;
        } catch (Exception) {
            return -1;
        }
    };
    function daysInMonth(humanMonth, year) {
        return new Date(year || new Date().getFullYear(), humanMonth, 0).getDate();
    }
});

app.controller('ToastCtrl', function ($scope, $mdToast) {
    $scope.closeToast = function () {
        $mdToast
            .hide()
            .then(function () {

        });
    };
});

app.directive('capitalize', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            var capitalize = function(inputValue) {
                if (inputValue == undefined) inputValue = '';
                var capitalized = inputValue.toUpperCase();
                if (capitalized !== inputValue) {
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                }
                return capitalized;
            }
            modelCtrl.$parsers.push(capitalize);
            capitalize(scope[attrs.ngModel]); // capitalize initial value
        }
    };
});

app.service("confirminator", function ($q, $timeout, $window, $mdDialog) {
    var currentModal = null;
    return ({
        open:open
    });
    function open(message,show) {
        if (currentModal) {
            currentModal.reject();
        }
        currentModal = $q.defer();
        $timeout(
           
            function openConfirm() {
                if (show) {
                    var confirm = $mdDialog.confirm()
                   .title('IUSASOL')
                   .textContent(message)
                   .ok('Continuar')
                   .cancel('Cancelar');
                    $mdDialog.show(confirm).then(function () {
                        currentModal.resolve();
                    }, function () {
                        currentModal.reject();
                    });
                } else {
                    currentModal.resolve();
                }
            },0,false
            );
        return( currentModal.promise );
    };
});

app.filter('words', function () {
    function isInteger(x) {
        return x % 1 === 0;
    }

    function toWords(value) {
        if (value == 1) {
            return "ACTIVO";
        } else {
            if (value == 2) {
                return "INACTIVO";
            }
        }
    }

    return function (value) {
        if (value && isInteger(value))
            return toWords(value);

        return value;
    };

});





