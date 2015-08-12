/**
 * Created by Yaxin on 5/19/2015.
 */


var app = angular.module('employee517',['ngCookies']);


app.controller('LoginController', [ '$scope' ,  '$http' , '$cookies','$cookieStore' , '$location' ,
    function( $scope , $http ,$cookies , $cookieStore , $location) {

            var userInfo = $cookieStore.get( '517Employee' );
            if ( userInfo ) {
                userInfo.status = false;
                if ( userInfo.rememberMe == true && userInfo.status == false ) {
                    var username = userInfo.email;
                    var password = userInfo.password;

                    $http
                        // Login Url
                        .get('https://apiv2-test.517.today/auth/email?email='+username+'&password='+password+'&maxAge=3600')
                        .success(function(data) {
                            //console.log(data);
                            if ( data.error.errorCode ) {
                                if ( data.error.errorCode == 1007 ) {
                                    alert( 'Please check your username/password.' );
                                } else {
                                    alert( 'Login failed' );
                                }
                                $scope.loginSubmitText = "Sign In";
                            } else {
                                userInfo.token = data.data.token;
                                userInfo.status = true;
                                $cookieStore.put( '517Employee' , userInfo );
                                // Ext App Url
                                window.location = "http://employee.yaxingli.com/employee";
                            }

                        })
                        .error( function ( data ) {
                            $scope.loginSubmitText = "Sign In";
                        });
                }

            };
    $scope.loginSubmitText = "Sing In";

    $scope.rememberMe = false;

    $scope.loginNormal=function() {

        $scope.loginSubmitText = "Submitting..";
        username=$('#username').val();
        password = CryptoJS.MD5( $('#password').val() );

        var rememberMe = $scope.rememberMe;
        $http
            // Login Url
            .get('https://apiv2-test.517.today/auth/email?email='+username+'&password='+password+'&maxAge=3600')
            .success(function(data) {

                if ( data.error.errorCode ) {
                    if ( data.error.errorCode == 1007 ) {
                        alert( 'Please check your username/password.' );
                    } else {
                        alert( 'Login failed' );
                    }
                    $scope.loginSubmitText = "Sign In";
                } else {
                    data.data.password = password.toString();
                    data.data.status = true;
                    data.data.rememberMe = rememberMe;
                    $cookieStore.put( '517Employee' , data.data );

                    // Ext App Url
                    window.location = "http://employee.yaxingli.com/employee";
                }

            })
            .error( function ( data ) {
                $scope.loginSubmitText = "Sign In";
            });
    }
}]);
