Ext.define('517Employee.view.Viewport', {
    extend: 'Ext.container.Viewport',    
    layout: 'fit',
    requires: [
        //'517Employee.view.ViewPortController',
        '517Employee.view.Index'
    ],
   
    //controller:'viewport',  
    items:[{
        xtype:'index',
        id:'Index'
    }],
});