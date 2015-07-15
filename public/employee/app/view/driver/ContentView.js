Ext.define( '517Employee.view.driver.ContentView' , {
    extend: 'Ext.panel.Panel',
    xtype: 'employee-driver-content',
    requires: [
        '517Employee.view.driver.orderHistory.OrderHistoryView',
    ],
    border: false,frame:false,
    layout: { type:'card' , padding:0 },
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    items: [
        {
            border:false,frame:false,
            xtype: 'employee-driver-orderHistory',
            id: 'Employee-Driver-OrderHistory',
        },
        {
            border:false,frame:false,
            //xtype: 'employee-driver-xxxx',
            id: 'Employee-Driver-Xxxx',
        }
        
    ]
});