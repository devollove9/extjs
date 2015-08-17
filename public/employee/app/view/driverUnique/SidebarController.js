Ext.define('517Employee.view.driverUnique.SidebarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-driverUnique-sidebar',
    requires: [
        //'517.view.main.AdminMain'
        //'517.517Time'
    ],
   
    init:function(){
        
    },
    doNavigation:function( tab ){
        Ext.getCmp( 'Employee-DriverUnique' ).doNavigation( tab );
    }
})