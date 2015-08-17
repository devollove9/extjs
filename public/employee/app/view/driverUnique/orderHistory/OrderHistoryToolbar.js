Ext.define('517Employee.view.driverUnique.orderHistory.OrderHistoryToolbar', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.driverUnique.orderHistory.OrderHistoryToolbarController',
        '517Employee.view.driverUnique.orderHistory.OrderHistoryToolbarCenter',
        '517Employee.view.driverUnique.orderHistory.OrderHistoryToolbarWest'
    ],   
    xtype: 'employee-driverUnique-orderHistory-toolbar',
    controller: 'employee-driverUnique-orderHistory-toolbar-controller',
    bodyStyle:{ "background-color":"white",'border-color' : '#c1c1c1',},
    title: '517 Employee DriverUnique Service : Order History',
    header:{ height:30 ,padding:'0 0 0 10',margin:'0 0 0 0'},
    //frame:false , border:false,
    layout: 'border',

    items:[
        {
            region: 'west',
            xtype:'employee-driverUnique-orderHistory-toolbar-west',
            id:'Employee-DriverUnique-OrderHistory-Toolbar-West',
            width: 124+124          
        },
        {
            region: 'center',
            border:false ,frame:false ,
            xtype:'employee-driverUnique-orderHistory-toolbar-center',
            id:'Employee-DriverUnique-OrderHistory-Toolbar-Center'
        }
        
    ],
 
    doNavigation:function(panel){
        ////console.log( panel );
    }
    
});