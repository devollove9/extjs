Ext.define('517Employee.view.order.orderhistory.OrderHistoryToolbar', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.order.orderhistory.OrderHistoryToolbarController',
        '517Employee.view.order.orderhistory.OrderHistoryToolbarCenter',
        '517Employee.view.order.orderhistory.OrderHistoryToolbarWest'
    ],   
    xtype: 'employee-order-orderHistory-toolbar',
    controller: 'employee-order-orderHistory-toolbar',
    bodyStyle:{ "background-color":"white",'border-color' : '#c1c1c1',},
    title: '517 Store Service : Order History',
    header:{ height:30 ,padding:'0 0 0 10',margin:'0 0 0 0'},
    //frame:false , border:false,
    layout: 'border',
    autosSroll:true,
    items:[
        {
            region: 'west',
            xtype:'employee-order-orderHistory-toolbar-west',
            width: 124+124          
        },
        {
            region: 'center',
            border:false ,frame:false ,
            xtype:'employee-order-orderHistory-toolbar-center',
        }
        
    ],
 
    doNavigation:function(panel){
        //console.log( panel );
    }
    
});