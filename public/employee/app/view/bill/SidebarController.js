Ext.define('517Employee.view.bill.SidebarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-bill-sidebar',
    requires: [
        //'517.view.main.AdminMain'
        //'517.517Time'
    ],
   
    init:function(){
        
    },
    doNavigation:function( tab ){
        Ext.getCmp( 'Employee-Bill' ).doNavigation( tab );
    }
});