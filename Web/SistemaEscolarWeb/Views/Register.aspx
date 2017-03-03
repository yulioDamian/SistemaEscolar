<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Register.aspx.cs" Inherits="SistemaEscolarWeb.Views.Register" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" ng-app="RegisterApp">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>   
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
    <link href="../Content/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../Content/css/Register-Style.css" rel="stylesheet" />
    <link href="../Content/css/select.css" rel="stylesheet" />
    <link href="../Content/css/fileinput.css" rel="stylesheet" />
    <title>Registro</title>
</head>
<body ng-controller="RegisterController">

    <hgroup>
        <h1>Registro</h1>
        <h3>Crear una nueva cuenta</h3>
    </hgroup>

    <div class="container">
        <div class="row">
		    <div class="col-md-12">
                <div class="panel with-nav-tabs panel-success">
                    <div class="panel-heading">
                            <ul class="nav nav-tabs">
                                <li class="active"><a href="#DataUser" data-toggle="tab">Datos de Usuario</a></li>
                                <li><a href="#DataDireccion" data-toggle="tab">Dirección de Usuario</a></li>
                                <li><a href="#DataInstitucion" data-toggle="tab">Datos de Institución</a></li>
                            </ul>
                    </div>
                    <div class="panel-body">
                        <div class="tab-content">
                            <div class="tab-pane fade in active" id="DataUser">
                                <form class="form-inline">
                                    <div class="row">
                                        <div class="col-sx-12 col-sm-6 col-md-4">
                                            <div class="form-group">
                                                <input type="text" required="required" ng-model="user.nombre"/>
                                                <label for="input" class="input-label">Nombre</label><i class="bar"></i>
                                            </div>
                                        </div>
                                        <div class="col-sx-12 col-sm-6 col-md-4">
                                            <div class="form-group">
                                                <input type="text" required="required" ng-model="user.curp"/>
                                                <label for="input" class="input-label">Curp</label><i class="bar"></i>
                                            </div>
                                        </div>
                                        <div class="col-sx-12 col-sm-6 col-md-4">
                                             <div class="form-group">
                                                 <input type="text" required="required" ng-model="user.rfc"/>
                                                 <label for="input" class="input-label">RFC</label><i class="bar"></i>
                                             </div>
                                        </div>
                                    
                                         <div class="col-sx-12 col-sm-6 col-md-4">
                                             <div class="form-group">
                                                 <input type="text" required="required" ng-model="user.claveDocente"/>
                                                 <label for="input" class="input-label">Clave Docente</label><i class="bar"></i>
                                             </div>
                                        </div>
                                         <div class="col-sx-12 col-sm-6 col-md-4">
                                            <div class="form-group">
                                                <input type="text" required="required" ng-model="user.turno"/>
                                                <label for="input" class="input-label">Turno</label><i class="bar"></i>
                                            </div>
                                        </div>
                                         <div class="col-sx-12 col-sm-6 col-md-4">
                                             <div class="form-group">
                                                  <input type="email" required="required" ng-model="user.email"/>
                                                  <label for="input" class="input-label">Correo Electronico</label><i class="bar"></i>
                                              </div>
                                        </div>
                                    
                                        <div class="col-sx-12 col-sm-6 col-md-4">
                                              <div class="form-group">
                                                  <input type="text" required="required" ng-model="user.usuario"/>
                                                  <label for="input" class="input-label">Usuario</label><i class="bar"></i>
                                              </div>
                                        </div>
                                        <div class="col-sx-12 col-sm-6 col-md-4">
                                              <div class="form-group">
                                                  <input type="password" required="required" ng-model="user.password"/>
                                                  <label for="input" class="input-label">Contraseña</label><i class="bar"></i>
                                              </div>
                                        </div>
                                        <div class="col-sx-12 col-sm-6 col-md-4">
                                             <div class="form-group">
                                                  <input type="password" required="required" ng-model="user.Cpassword"/>
                                                  <label for="input" class="input-label">Confirmar Contraseña</label><i class="bar"></i>
                                              </div>
                                        </div>
                                    </div>
                                    
                                </form>
                            </div>
                            <div class="tab-pane fade" id="DataDireccion">
                                <form class="form-inline">
                                    <div class="row">
                                         <div class="col-sx-12 col-sm-6 col-md-4">
                                           <div class="form-group">
                                              <select required ng-model="userDir.IdEstado">
                                                 <option value="" >Seleccione</option>
                                                 <option ng-repeat="est in estados" value="{{est.IdEstado}}">{{est.Nombre}}</option>
                                              </select>
                                              <label for="select" class="input-label">Seleccione un Estado</label><i class="bar"></i>
                                           </div>
                                        </div>
                                        
                                        <div class="col-sx-12 col-sm-6 col-md-4">
                                            <div class="form-group">
                                                <input type="password" required="required" ng-model="userDir.Municipio"/>
                                                <label for="input" class="input-label">Municipio</label><i class="bar"></i>
                                            </div>
                                        </div>
                                        <div class="col-sx-12 col-sm-6 col-md-4">
                                            <div class="form-group">
                                                <input type="password" required="required" ng-model="userDir.Delegacion"/>
                                                <label for="input" class="input-label">Delegación</label><i class="bar"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-sx-12 col-sm-6 col-md-4">
                                            <div class="form-group">
                                                <input type="password" required="required" ng-model="userDir.Colonia"/>
                                                <label for="input" class="input-label">Colonia</label><i class="bar"></i>
                                            </div>
                                        </div>
                                        <div class="col-sx-12 col-sm-6 col-md-4">
                                            <div class="form-group">
                                                <input type="password" required="required" ng-model="userDir.Calle"/>
                                                <label for="input" class="input-label">Calle</label><i class="bar"></i>
                                            </div>
                                        </div>
                                         <div class="col-sx-12 col-sm-6 col-md-4">
                                            <div class="form-group">
                                                <input type="password" required="required" ng-model="userDir.NumeroExterior"/>
                                                <label for="input" class="input-label">Numero Exterior</label><i class="bar"></i>
                                            </div>
                                        </div>
                                        <div class="col-sx-12 col-sm-6 col-md-4">
                                            <div class="form-group">
                                                <input type="password" required="required" ng-model="userDir.NumeroInterior"/>
                                                <label for="input" class="input-label">Numero Interior</label><i class="bar"></i>
                                            </div>
                                        </div>
                                        <div class="col-sx-12 col-sm-6 col-md-4">
                                            <div class="form-group">
                                                <input type="password" required="required" ng-model="userDir.CP"/>
                                                <label for="input" class="input-label">Codigo Postal</label><i class="bar"></i>
                                            </div>
                                        </div>
                                        
                                    </div>

                                </form>
                            </div>
                            <div class="tab-pane fade" id="DataInstitucion">
                                <form class="form-inline">
                                    <div class="row">
                                        <div class="col-sx-12 col-sm-6 col-md-4">
                                           <div class="form-group">
                                              <select required>
                                                 <option value="" >Seleccione</option>
                                                 <option ng-repeat="est in estados" value="{{est.IdEstado}}">{{est.Nombre}}</option>
                                              </select>
                                              <label for="select" class="input-label">Seleccione un Estado</label><i class="bar"></i>
                                           </div>
                                        </div>
                                        <div class="col-sx-12 col-sm-6 col-md-4">
                                            <div class="form-group">
                                                <input type="password" required="required"/>
                                                <label for="input" class="input-label">Dirección</label><i class="bar"></i>
                                            </div>
                                        </div>
                                        <div class="col-sx-12 col-sm-6 col-md-4">
                                             <div class="form-group">
                                                 <input type="password" required="required"/>
                                                 <label for="input" class="input-label">Codigo Postal</label><i class="bar"></i>
                                             </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-sx-12 col-sm-6 col-md-4">
                                             <div class="form-group">    
                                                 <input type="password" required="required"/>
                                                 <label for="input" class="input-label">Nombre</label><i class="bar"></i>
                                             </div>
                                        </div>
                                        <div class="col-sx-12 col-sm-6 col-md-4">
                                             <div class="form-group">
                                                 <input type="password" required="required"/>
                                                 <label for="input" class="input-label">Clave</label><i class="bar"></i>
                                             </div>
                                        </div>
                                        <div class="col-sx-12 col-sm-6 col-md-4">
                                           <div class="form-group">
                                               <input id="file-3" type="file" multiple=false>
                                           </div>    
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="button-container">
                                          <button type="submit" class="button"><span>Registrar</span></button>
                                        </div>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
	    </div>
    </div>

</body>
<script src="../Content/js/angular.min.js"></script>
<script src="../Content/js/angular-aria.min.js"></script>
<script src="../Content/js/angular-animate.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angular_material/0.7.1/angular-material.min.js"></script>
<script src="../Content/js/jquery-3.1.1.js"></script>
<script src="../Content/js/bootstrap.min.js"></script>
<script src="../Content/js/fileinput.js"></script>
<script src="../Content/js/jquery.backstretch.min.js"></script>
<script src="../Content/js/Register-Style.js"></script>
<script src="../Content/js/Register.js"></script>
    <script>
	$("#file-3").fileinput({
		showCaption: false,
		browseClass: "btn btn-primary btn-lg",
		fileType: "any"
	});
	</script>
</html>
