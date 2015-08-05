Ext.define( '517Employee.view.bill.ContentView' , {
    extend: 'Ext.panel.Panel',
    xtype: 'employee-bill-content',
    requires: [
        '517Employee.view.bill.restaurant.RestaurantView',
        '517Employee.view.bill.driver.DriverView',
    ],
    border: false,frame:false,
    layout: { type:'card' , padding:0 },
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    items: [
        {
            border:false,frame:false,
            xtype: 'employee-bill-restaurant',
            id: 'Employee-Bill-Restaurant'
        },
        {
            border:false,frame:false,
            xtype: 'employee-bill-driver',
            id: 'Employee-Bill-Driver'
        },
        {
            border:false,frame:false,
            //xtype: 'employee-bill-xxxx',
            id: 'Employee-Bill-Xxxx',
        }
        
    ]
});