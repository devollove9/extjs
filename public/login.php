<!DOCTYPE html>
<html ng-app="employee517" >
<head>
    <title>517 Employee Login</title>
    <meta charset="utf-8" />
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.0-rc.2/angular.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.0-rc.2/angular-cookies.js"></script>
    <script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js"></script>
    <link href="css/login/style.css" rel="stylesheet" type="text/css" media="all" />

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script type="text/javascript" src="http://kaidian.ele.me/js/libs/jquery-1.10.2.min.js?v=201411260042"></script>
    <script src="js/login/controller.js" type="text/javascript"></script>
    <script>


    </script>



</head>
<body ng-controller="LoginController" class ="ng-scope"  >
<div class="container">
    <header class="account-header">
        <a href="http://yaxingli.com/" >
            <p class="header-text" >517 Employee </p>
        </a>
    </header>

    <div class="account-container" >
        <div class="login-field" >
            <!--div class="account-promote">
                <!img src="//static2.ele.me/eleme/account/media/img/banner-app.682d34.png">
                <p style="font-size:30px;">此处应该有一幅图 445*320</p>
            </div-->
            <div class="account-main aside">
                <div class="account-line">
                    <h3 class="account-title line-left">Login</h3>
                    <!-- ngIf: normalMode --><!--a class="login-mode-toggle line-right ng-scope" href="javascript:" ng-click="changeMode()" ng-if="normalMode">Log in by phone<span class="icon icon-mobile"></span></a><!-- end ngIf: normalMode -->
                    <!-- ngIf: !normalMode -->
                </div>
                <!-- ngInclude:  -->
                <div class="login-form" >
                    <form class="account-form" ng-submit="loginNormal()" novalidate="">
                        <div class="form-group error-group ng-hide" ng-show="(loginnormal.$invalid || errTip) &amp;&amp; submitted">
                            <div class="account-errtip ng-binding ng-hide" ng-show="errTip" ng-bind="errTip"></div>
                            <div class="account-errtip" ng-show="loginnormal.username.$error.required">Enter Phone/Email/Username</div>
                            <div class="account-errtip" ng-show="loginnormal.password.$error.required">Enter Password</div>
                            <div class="account-errtip ng-hide" ng-show="loginnormal.password.$error.minlength">密码长度不对</div>
                            <div class="account-errtip" ng-show="loginnormal.captcha_code.$error.required">请输入验证码</div>
                            <div class="account-errtip ng-hide" ng-show="loginnormal.captcha_code.$error.minlength">验证码位数不对</div>
                        </div>
                        <div class="form-group compact">
                            <input id ='username' name="username" ng-model="normalForm.username" class="account-input withicon ng-invalid ng-invalid-required ng-dirty" type="text" placeholder="Phone/Email/Username" ng-class="{error: submitted &amp;&amp; loginnormal.username.$dirty &amp;&amp; loginnormal.username.$invalid}" update-model-on="loginnormal.submit blur" required="">
                            <span class="account-inputicon icon icon-user"></span>
                        </div>
                        <div class="form-group">
                            <input id='password' name="password" ng-model="normalForm.password" class="account-input withicon ng-invalid ng-invalid-required ng-valid-minlength ng-dirty" type="password" placeholder="Password" ng-class="{error: submitted &amp;&amp; loginnormal.password.$dirty &amp;&amp; loginnormal.password.$invalid}" update-model-on="loginnormal.submit blur" ng-minlength="6" maxlength="20" required="">
                            <span class="account-inputicon icon icon-lock"></span>
                        </div>

                        <div class="form-group compact">
                            <label> <input class="account-checkbox" type="checkbox" checked="checked" ng-model="rememberMe" >Remember Me </label>
                        </div>
                        <div class="form-group">
                            <button class="account-btn submit ng-binding" type="submit" ng-bind="loginSubmitText">Sign In</button>
                        </div>
                    </form>
                </div>

                <div class="account-line ng-scope">

                    <a class="line-right" href="/forget" target="_blank">Forget Password</a>
                </div>

            </div>
        </div>
    </div>



    <footer class="account-footer">
        <p class="footer-line line-under">Copyright &copy;2014-2015 517 Dine At Home Delivery. All Rights Reserved. <a href="https://517.today/">517.Today</a></p>
        <!--p class="footer-line line-under">
            <a class="footer-link" target="_blank" rel="nofollow" href=""></a> |
            <a class="footer-link" target="_blank" rel="nofollow" href=""></a> |
            <a class="footer-link" target="_blank" rel="nofollow" href=""></a>
            Copyright &copy;2008-2015, All Rights Reserved.
        </p-->
    </footer>
</div>

</body>
</html>
