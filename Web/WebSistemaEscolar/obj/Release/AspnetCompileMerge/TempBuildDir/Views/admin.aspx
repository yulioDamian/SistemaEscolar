<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="admin.aspx.cs" Inherits="SCHOOL.Views.admin" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" ng-app="adminApp">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="shortcut icon" href="../favicon.ico" />
    <link href="../Content/mSite.css" rel="stylesheet" />
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.1/angular-material.min.css" />
    <link href="../Content/xeditable.css" rel="stylesheet" />
    <link href="../Content/mdPickers.css" rel="stylesheet" />
    <link href="../Content/Style.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Arimo" rel="stylesheet" /> 
    <link href="../Content/sunTransform.css" rel="stylesheet" />
    <title>Admin</title>

 </head>

    <div id="divcarga" style="position:absolute; visibility:hidden; z-index:1; opacity:1; margin-left:35%; margin-top:15%;">
        <svg class="animacion" viewbox="-200 -150 400 300">
            <defs>
                <line class="animate" id="ray" x1="-5" x2="5"></line>
                <clipPath class="animate" id="cp">
                    <rect class="animate" x="-200" y="-150" width="400" height="150"></rect>
                </clipPath>
            </defs>
            <line class="animate" id="line" x1="-76" x2="76"></line>
            <text class="animate" text-anchor="middle" y="45">Cargando</text>
            <g class="animate" id="sun" clip-path="url(#cp)">
                <g class="animate" id="mover">
                    <circle class="animate" id="main" r="50"></circle>
                    <g id="eyes">
                        <circle class="animate" r="3" cx="-13"></circle>
                        <circle class="animate" r="3" cx="13"></circle>
                    </g>
                    <g id="rays">
                        <use xlink:href="#ray" transform="rotate(315) translate(70)"></use>
                        <use xlink:href="#ray" transform="rotate(270) translate(70)"></use>
                        <use xlink:href="#ray" transform="rotate(225) translate(70)"></use>
                        <use xlink:href="#ray" transform="rotate(180) translate(70)"></use>
                        <use xlink:href="#ray" transform="rotate(135) translate(70)"></use>
                        <use xlink:href="#ray" transform="rotate(90) translate(70)"></use>
                        <use xlink:href="#ray" transform="rotate(45) translate(70)"></use>
                        <use xlink:href="#ray" transform="rotate(0) translate(70)"></use>
                    </g>
                </g>
            </g>
        </svg>
    </div>

<body class="docs-body" layout="row" ng-cloak ng-init="Iniciar()"  ng-controller="adminController" id="mainBody" name="mainBody">

  <md-sidenav class="site-sidenav md-sidenav-left md-whiteframe-z2"
              md-component-id="left" hide-print
              md-is-locked-open="$mdMedia('gt-sm')">

    <header class="nav-header">
       <a ng-href="#/" class="docs-logo">
           <img src="../Images/iusasolLogo.png"/>
           <!--h1 class="docs-logotype md-heading">IUSASOL</h1-->
        </a>
         <br />
         <br />
    </header>

    <md-content flex role="navigation">
      <ul class="docs-menu">
        <li ng-repeat="menu in userMenu" class="parent-list-item" ng-click="select(menu.url)" ng-class="{parentActive: menu.url === idSelected}">
            <a class="md-button md-ink-ripple" href="{{menu.url}}" id="{{menu.text}}">
                 {{menu.text}}
            </a>
        </li>
      </ul>
    </md-content>
  </md-sidenav>

  <div layout="column" tabIndex="-1" role="main" flex>
    <md-toolbar class="md-whiteframe-glow-z1 site-content-toolbar">

      <div class="md-toolbar-tools docs-toolbar-tools" tabIndex="-1">
        <md-button class="md-icon-button" ng-click="toggleLeft()" hide-gt-sm aria-label="Toggle Menu">
          <md-icon md-svg-src="../Images/icon/ic_menu_24px.svg"></md-icon>
        </md-button>
          <div layout="row" flex class="fill-height">
              <h2 class="md-toolbar-item md-breadcrumb md-headline">
                <span class="md-breadcrumb-page">{{PageTitle}}</span>
              </h2>
          </div>
      <span flex></span>
         <h2> {{UserName}} </h2>
          <div class="md-toolbar-item docs-tools" layout="row">
            <md-button class="md-icon-button"
                       aria-label="Active User">
              <md-icon md-svg-src="../Images/icon/ic_user.svg"></md-icon>
            </md-button>
          </div>
      </div>

    </md-toolbar>

    <md-content md-scroll-y layout="column" flex>
      <div ng-view layout-padding flex="noshrink" class="docs-ng-view"></div>
    </md-content>

  </div>
    
    
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-route.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.1/angular-material.min.js"></script>
    <script src="../Scripts/jquery-3.1.1.js"></script>
    <script src="../Scripts/xeditable.js"></script>
    <script src="../Scripts/xlsx.core.min.js"></script>
    <script src="../Scripts/angular-js-xlsx.js"></script>
    <script src="https://code.highcharts.com/stock/highstock.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="../Scripts/moment.js"></script>
    <script src="../Scripts/mdPickers.js"></script>
    <script src="../Scripts/admin.js"></script>
    
    <script src="../Scripts/aes.js"></script>
    <script src="../Scripts/aes-ctr.js"></script>
</body>
</html>
