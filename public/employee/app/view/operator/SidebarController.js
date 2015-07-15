Ext.define('517Employee.view.operator.SidebarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-operator-sidebar',
    requires: [
        //'517.view.main.AdminMain'
        //'517.517Time'
    ],
   
    init:function(){
        
    },
    doNavigation:function( tab ){
        Ext.getCmp( 'Employee-Operator' ).doNavigation( tab );
    }
})