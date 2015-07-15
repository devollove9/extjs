Ext.define('517Employee.view.settings.SidebarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-settings-sidebar',
    requires: [
        //'517.view.main.AdminMain'
        //'517.517Time'
    ],
   
    init:function(){
        
    },
    doNavigation:function( tab ){
        Ext.getCmp( 'Employee-Settings' ).doNavigation( tab );
    }
})