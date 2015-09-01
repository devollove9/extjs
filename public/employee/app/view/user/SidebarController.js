Ext.define('517Employee.view.user.SidebarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-user-sidebar-controller',
    requires: [
        //'517.view.main.AdminMain'
        //'517.517Time'
    ],
   
    init:function(){
        
    },
    doNavigation:function( tab ){
        Ext.getCmp( 'Employee-User' ).doNavigation( tab );
    }
})