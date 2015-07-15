Ext.define('517Employee.view.restaurant.SidebarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-restaurant-sidebar',
    requires: [
        //'517.view.main.AdminMain'
        //'517.517Time'
    ],
   
    init:function(){
        
    },
    doNavigation:function( tab ){
        Ext.getCmp( 'Employee-Restaurant' ).doNavigation( tab );
    }
})