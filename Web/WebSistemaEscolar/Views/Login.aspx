<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="WebSistemaEscolar.Views.login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" ng-app="LoginApp">
<head runat="server">
    
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    
    <link href="../Content/css/login-style.css" rel="stylesheet" />
    <title>Login</title>
</head>

<body ng-controller="LoginController"> 
    <hgroup>
        <h1>Administracion Escolar</h1>
        <h3></h3>
    </hgroup>
    <form>
        <div class="group">
        <input type="email" name="UserEmail" ng-model="user.email"/><span class="highlight"></span><span class="bar"></span>
        <label>Email</label>
        </div>
        <div class="group">
        <input type="password" name="UserPass" ng-model="user.password"/><span class="highlight"></span><span class="bar"></span>
        <label>Password</label>
        </div>
        <button type="button" class="button buttonBlue" ng-click="Login($event)">Login
        <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
        </button>
    </form>
    <br />
    <footer><a href="#" target="_blank"><img src="http://www.excitetemplate.com/images/logo-designer-pune/software-company-logo.png"></a>
        <p>¿No estas Registrado? <a href="Views/Register.aspx" target="_blank">Registrarme</a></p>
    </footer>

    <div bn-modals ng-show="subview" class="m-modals" ng-switch="subview">
        <div ng-switch-when="alert" ng-controller="AlertModalController" class="modal">
            <p>{{msg}}</p>
            <p>
                <a ng-click="close()">Aceptar</a>
            </p>
        </div>
    </div>

</body>

  
    <script src="Content/js/angular.min.js"></script>
    <script src="Content/js/angular-animate.js"></script>
    <script src="Content/js/angular-aria.min.js"></script>
    <script src="Content/js/jquery-3.1.1.js"></script>
    <script src="Content/js/jquery.backstretch.min.js"></script>
    <script src="Content/js/Login-Style.js"></script>
    <script src="Content/js/angular-modal-Dialog.js"></script>
    <script src="Content/js/angular-modal.js"></script>
    <script src="Content/js/Login.js"></script>
</html>

