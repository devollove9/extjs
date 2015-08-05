
<html ng-app="employeeMain517" ng-controller="MainController">
<head>
    <title>517 Employee</title>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.0-rc.2/angular.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.0-rc.2/angular-cookies.js"></script>
    <script src="../js/employeeMain/controller.js" type="text/javascript"></script>
    <style type="text/css">
        HTML, BODY { height: 100%; }
        .header-menus x-btn-inner x-btn-inner-small-default {
            background-color:red !important;
            color:red ! important;
        }
        .employee517-service{
            display:block;
            position:relative;
            padding: 0 0 0 40px;
        }

        .employee517-service-icon{
            height: 24px;
            width: 24px;
            margin: 3px 5px 0 0;
            background-position: -0px 0px;
            position: absolute;
            left:0;
            top: 2px;
        }
        .employee517-serviceName{
            font-family: Arial,Verdana,Helvetica,sans-serif;
            padding: 5px 0 5px 0;
            font-size: 20px;
            color: #333;
        }
        .employee517-serviceName:hover{
            color: #2a6496;
        }
        .employee517-serviceCaption{
            font-family: Arial,Verdana,Helvetica,sans-serif;
            padding: 0;
            margin: 1px 0 0 1px;
            color: #666;
            font-size: 15px;
            line-height: 13px;
        }

        h2 {
            display: block;
            font-size: 1.5em;
            margin: 0 0 5px;
            font-weight: normal;
            font-size: 25px;
            color: #666;
            text-decoration: underline;
            font-family: Arial,Verdana,Helvetica,sans-serif;
            -webkit-margin-before: 0.83em;
            -webkit-margin-after: 0.83em;
            -webkit-margin-start: 0px;
            -webkit-margin-end: 0px;
            font-weight: bold;
        }
        #loading-mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: gray;
            z-index: 1;
        }
        #loading {
            position: absolute;
            top: 35%;
            left: 40%;
            width: 20% ;
            margin-left: auto ;
            margin-right: auto ;
            z-index: 2;
            margin:0 auto;
            color:white;
            text-align: center
        }
        #loading span{
            font-size: 30px;
            margin:5px auto;
        }
        #loader {
            background: url('/admin1/resources/loader.gif') no-repeat left center;
            padding: 5px;
            display: block;
            height:300px;
            width:300px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body >
<div id="loading-mask"></div>
<div id="loading">
    <span id="loader"></span>
    <span id="loading-message">Loading. Please wait...</span>
</div>

<script type="text/javascript">
    document.getElementById('loading-message').innerHTML = 'Loading Core API...';
</script>
<!--link rel="stylesheet" type="text/css" href="./packages/ext-theme-neptune-touch/build/resources/ext-theme-neptune-touch-all.css">
<!link rel="stylesheet" type="text/css" href="./packages/ext-theme-neptune/build/resources/ext-theme-neptune-all.css"-->
<link rel="stylesheet" type="text/css" href="./packages/kitchensink/crisp-en/resources/KitchenSink-all.css">
<link rel="stylesheet" type="text/css" href="./packages/ext-theme-crisp/build/resources/ext-theme-crisp-all.css">

<!--<link rel="stylesheet" type="text/css" href="./packages/kitchensink/resources/Sencha-Examples/style.css"-->
<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
<!--link href="resources/css/font-awesome.css" rel="stylesheet">
<!--link href='resources/css/navigation-ui.css' rel='stylesheet'>
<!--link href='resources/css/517.css' rel='stylesheet'>



 <!--<script type="text/javascript" src="https://cdn.sencha.com/ext/gpl/5.0.0/build/ext-all_bak.js"></script>-->
<link rel="stylesheet" href="resources/css/bootstrap.css">
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
<script type="text/javascript" src="ext-all.js"></script>
<script>
    document.getElementById('loading-message').innerHTML = 'Loading 517 Employee App 1.0 ...';
</script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="employee/app.js" type="text/javascript"></script>

</body>

</html>
