Ext.define('517Employee.view.order.SidebarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-order-sidebar',
    requires: [
        //'517.view.main.AdminMain'
        //'517.517Time'
    ],
   
    init:function(){
        
    },
    doNavigation:function( tab ){
        Ext.getCmp( 'Employee-Order' ).doNavigation( tab );
    }
})