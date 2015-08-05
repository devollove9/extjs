Ext.define('517Employee.view.main.EmployeeMainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-main',
    requires: [
        //'517Employee.view.main.ContentViewEmployee'
    ],
   
    init:function(){
        var main2 = Ext.create( '517Employee.view.main.ContentViewEmployee' );
        this.lookupReference('contentHolder').insert(main2);
    }
})