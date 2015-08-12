/**
 * Created by Yaxin on 5/19/2015.
 */


var app = angular.module('employeeMain517',['ngCookies']);


app.controller('MainController', [ '$scope' ,  '$http' , '$cookies','$cookieStore' , '$location' ,
    function( $scope , $http ,$cookies , $cookieStore , $location) {
        //window.location = "http://employee.yaxingli.com/login";
        var userInfo = $cookieStore.get( '517Employee' );
        if ( userInfo ) {
            if ( userInfo.status != true ) {
                //alert("Please Login First.");
               // window.location = "http://employee.yaxingli.com/login";
            }
        } else {
                //alert( "Please Login First." );
               // window.location = "http://employee.yaxingli.com/login";

        }

}]);
