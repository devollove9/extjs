Ext.define( '517Employee.view.driverUnique.ContentView' , {
    extend: 'Ext.panel.Panel',
    xtype: 'employee-driverUnique-content',
    requires: [
        '517Employee.view.driverUnique.orderHistory.OrderHistoryView',
    ],
    border: false,frame:false,
    layout: { type:'card' , padding:0 },
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    items: [
        {
            border:false,frame:false,
            xtype: 'employee-driverUnique-orderHistory',
            id: 'Employee-DriverUnique-OrderHistory',
        },
        {
            border:false,frame:false,
            //xtype: 'employee-driverUnique-xxxx',
            id: 'Employee-DriverUnique-Xxxx',
        }
        
    ]
});