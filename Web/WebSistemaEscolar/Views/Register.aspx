<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Register.aspx.cs" Inherits="WebSistemaEscolar.Views.Register" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link href="../Content/css/login-style.css" rel="stylesheet" />
    <title>Registro</title>
</head>

<body>
    <hgroup>
        <h1>Administracion Escolar</h1>
        <h3></h3>
    </hgroup>

    <form>

        <div class="group">
            <input type="Email"><span class="highlight"></span><span class="bar"></span>
            <label>Email</label>
        </div>
        <div class="group">
            <input type="password"><span class="highlight"></span><span class="bar"></span>
        <label>Password</label>
        </div>

        <button type="button" class="button buttonBlue">Login
            <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
        </button>
    </form>
    <br />
    <footer><a href="#" target="_blank"><img src="http://www.excitetemplate.com/images/logo-designer-pune/software-company-logo.png"></a>
        <p>¿No estas Registrado? <a href="Views/Register.aspx" target="_blank">Registrarme</a></p>
    </footer>
</body>
        <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js"></script>
        <script src="Content/js/jquery-3.1.1.js"></script>
        <script src="Content/js/jquery.backstretch.min.js"></script>
        <script src="Content/js/Login-Style.js"></script>
        <script src="Content/js/Login.js"></script>
</html>
