Ext.define('517Employee.view.order.orderhistory.OrderHistoryView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.order.orderhistory.OrderHistoryOrderList',
        '517Employee.view.order.orderhistory.OrderHistoryToolbar',
    ],   
    xtype: 'employee-order-orderHistory',
    frame:false , border:false,
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    layout: 'border',
    autosSroll:true,
    items:[
        {
            region: 'north',
            margin: '0 0 5 0',
            xtype: 'employee-order-orderHistory-toolbar',
            id: 'employee-Order-OrderHistory-Toolbar',
            height:150,maxHeight:200,
        },
        {
            region: 'center',
            xtype: 'employee-order-orderHistory-orderList',
            id: 'employee-Order-OrderHistory-OrderList',
        }
        
    ],
 
    doNavigation:function(panel){
        //console.log( panel );
    }
    
});