Ext.define('517Employee.view.support.SidebarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-support-sidebar',
    requires: [
        //'517.view.main.AdminMain'
        //'517.517Time'
    ],
   
    init:function(){
        
    },
    doNavigation:function( tab ){
        Ext.getCmp( 'Employee-Support' ).doNavigation( tab );
    }
})