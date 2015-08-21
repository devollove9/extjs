Ext.define( '517Employee.view.order.ContentView' , {
    extend: 'Ext.panel.Panel',
    xtype: 'employee-order-content',
    requires: [
        '517Employee.view.order.orderhistory.OrderHistoryView',
    ],
    border: false,frame:false,
    layout: { type:'card' , padding:0 },
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    items: [
        {
            border:false,frame:false,
            xtype: 'employee-order-orderHistory',
            id: 'employee-Order-OrderHistory',
        },
        {
            border:false,frame:false,
            //xtype: 'employee-order-xxxx',
            id: 'employee-Order-Xxxx',
        },/*
       {
            border:false,frame:false,
            //xtype: 'employee-order-xxxx',
            id: 'employee-Order-Xxxx',
        }, 
        {
            border:false,frame:false,
            xtype: 'employee-order-xxxx',
            id: 'employee-Order-Xxxx',
        } */
        
    ]
});