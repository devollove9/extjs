Ext.define('517Employee.view.restaurant.orderHistory.OrderHistoryToolbar', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.restaurant.orderHistory.OrderHistoryToolbarController',
        '517Employee.view.restaurant.orderHistory.OrderHistoryToolbarCenter',
        '517Employee.view.restaurant.orderHistory.OrderHistoryToolbarWest'
    ],   
    xtype: 'employee-restaurant-orderHistory-toolbar',
    controller: 'employee-restaurant-orderHistory-toolbar',
    bodyStyle:{ "background-color":"white",'border-color' : '#c1c1c1',},
    title: '517 Employee Restaurant Service : Order History',
    header:{ height:30 ,padding:'0 0 0 10',margin:'0 0 0 0'},
    //frame:false , border:false,
    layout: 'border',

    items:[
        {
            region: 'west',
            xtype:'employee-restaurant-orderHistory-toolbar-west',
            width: 124+124          
        },
        {
            region: 'center',
            border:false ,frame:false ,
            xtype:'employee-restaurant-orderHistory-toolbar-center',
        }
        
    ],
 
    doNavigation:function(panel){
        //console.log( panel );
    }
    
});