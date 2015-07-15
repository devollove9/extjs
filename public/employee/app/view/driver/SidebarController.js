Ext.define('517Employee.view.driver.SidebarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-driver-sidebar',
    requires: [
        //'517.view.main.AdminMain'
        //'517.517Time'
    ],
   
    init:function(){
        
    },
    doNavigation:function( tab ){
        Ext.getCmp( 'Employee-Driver' ).doNavigation( tab );
    }
})