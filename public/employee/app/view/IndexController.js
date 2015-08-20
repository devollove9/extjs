Ext.define('517Employee.view.IndexController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.index',
    requires: [
        '517Employee.view.main.EmployeeMain'
    ],

    init:function() {

        var main = Ext.create('517Employee.view.main.EmployeeMain');


        this.lookupReference('indexHolder').insert(main);
        ////console.log( this.lookupReference('indexHolder') );
        ////console.log(Ext.getCmp( 'Index' ).restaurant_info);

    }
})