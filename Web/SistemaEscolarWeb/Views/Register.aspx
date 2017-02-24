<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Register.aspx.cs" Inherits="SistemaEscolarWeb.Views.Register" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>   
   <link href="../Content/css/bootstrap.min.css" rel="stylesheet" />
   
     <!-- getmdl -->
   <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
   <link rel="stylesheet" href="https://code.getmdl.io/1.1.1/material.indigo-pink.min.css"/>
   <script defer src="https://code.getmdl.io/1.1.1/material.min.js"></script>   
    <!--getmdl-select-->   
   <link rel="stylesheet" href="https://cdn.rawgit.com/CreativeIT/getmdl-select/master/getmdl-select.min.css"/>
   <script  src="https://cdn.rawgit.com/CreativeIT/getmdl-select/master/getmdl-select.min.js"></script>
    <link href="../Content/css/Register-Style.css" rel="stylesheet" />
   <title>Registro</title>
</head>
<body>

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
                                        <div class="form-group">
                                            <div class="group">
                                                <input class="Minput" type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
                                                <label class="Mlabel">Nombre</label>
                                             </div>
                                        </div>
                                        
                                        <div class="form-group">
                                            <div class="group">
                                                <input class="Minput" type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
                                                <label class="Mlabel">Curp</label>
                                            </div>
                                        </div>
                                        
                                        <div class="form-group">
                                            <div class="group">
                                                <input class="Minput" type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
                                                <label class="Mlabel">Rfc</label>
                                            </div>
                                        </div>
                                         <div class="form-group">
                                            <div class="group">
                                                <input class="Minput" type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
                                                <label class="Mlabel">Clave docente</label>
                                             </div>
                                        </div>
                                        
                                        <div class="form-group">
                                            <div class="group">
                                                <input class="Minput" type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
                                                <label class="Mlabel">Turno</label>
                                            </div>
                                        </div>
                                        
                                        <div class="form-group">
                                            <div class="group">
                                                <input class="Minput" type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
                                                <label class="Mlabel">Correo Electronico</label>
                                            </div>
                                        </div>

                                         <div class="form-group">
                                            <div class="group">
                                                <input class="Minput" type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
                                                <label class="Mlabel">Usuario</label>
                                             </div>
                                        </div>
                                        
                                        <div class="form-group">
                                            <div class="group">
                                                <input class="Minput" type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
                                                <label class="Mlabel">Contraseña</label>
                                            </div>
                                        </div>
                                        
                                        <div class="form-group">
                                            <div class="group">
                                                <input class="Minput" type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
                                                <label class="Mlabel">Confirmar Contraseña</label>
                                            </div>
                                        </div>

                                </form>
                            </div>
                            <div class="tab-pane fade" id="DataDireccion">
                                <form class="form-inline">
                                    <div class="form-group">
                                       <select class="group">
                                          <option>Estado de México</option>
                                          <option>Aguascalientes</option>
                                          <option>otro mas</option>
                                          <option>y mas </option>
                                          <option>y otro mas </option>
                                        </select>
                                    </div>

                                        
                                    <div class="form-group">
                                        <div class="group">
                                            <input class="Minput" type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
                                            <label class="Mlabel">Municipio</label>
                                        </div>
                                    </div>
                                        
                                    <div class="form-group">
                                        <div class="group">
                                            <input class="Minput" type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
                                            <label class="Mlabel">Delegación</label>
                                        </div>
                                    </div>
                                        <div class="form-group">
                                        <div class="group">
                                            <input class="Minput" type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
                                            <label class="Mlabel">Colonia</label>
                                            </div>
                                    </div>
                                        
                                    <div class="form-group">
                                        <div class="group">
                                            <input class="Minput" type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
                                            <label class="Mlabel">Calle</label>
                                        </div>
                                    </div>
                                        
                                    <div class="form-group">
                                        <div class="group">
                                            <input class="Minput" type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
                                            <label class="Mlabel">Numero Exterior</label>
                                        </div>
                                    </div>

                                        <div class="form-group">
                                        <div class="group">
                                            <input class="Minput" type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
                                            <label class="Mlabel">Numero Interior</label>
                                            </div>
                                    </div>

                                </form>
                            </div>
                            <div class="tab-pane fade" id="DataInstitucion">
                                <form class="form-inline">
                                    <div class="form-group">
                                         <!-- Simple Select -->
                                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fullwidth">
                                            <input class="mdl-textfield__input" type="text" id="EstadosInst" value="Belarus" readonly tabIndex="-1"/>
                                            <label for="EstadosInst" class="mdl-textfield__label">Estado</label>
                                            <ul for="EstadosInst" class="mdl-menu mdl-menu--bottom-left mdl-js-menu">
                                                <li class="mdl-menu__item">Germany</li>
                                                <li class="mdl-menu__item">Belarus</li>
                                                <li class="mdl-menu__item">Russia</li>
                                            </ul>
                                        </div>
                                    </div>

                                        
                                    <div class="form-group">
                                        <div class="group">
                                            <input class="Minput" type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
                                            <label class="Mlabel">Dirección</label>
                                        </div>
                                    </div>
                                        
                                    <div class="form-group">
                                        <div class="group">
                                            <input class="Minput" type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
                                            <label class="Mlabel">Codigo Postal</label>
                                        </div>
                                    </div>
                                        <div class="form-group">
                                        <div class="group">
                                            <input class="Minput" type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
                                            <label class="Mlabel">Nombre</label>
                                            </div>
                                    </div>
                                        
                                    <div class="form-group">
                                        <div class="group">
                                            <input class="Minput" type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
                                            <label class="Mlabel">Clave</label>
                                        </div>
                                    </div>
                                        
                                    <div class="form-group">
                                        <div class="group">
                                            <input class="Minput" type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
                                            <label class="Mlabel">Logo</label>
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
<script src="../Content/js/jquery-3.1.1.js"></script>
<script src="../Content/js/bootstrap.min.js"></script>
<script src="../Content/js/jquery.backstretch.min.js"></script>
<script src="../Content/js/Register-Style.js"></script>
<script src="../Content/js/Register.js"></script>
</html>
