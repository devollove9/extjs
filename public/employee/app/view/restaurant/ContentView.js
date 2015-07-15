Ext.define( '517Employee.view.restaurant.ContentView' , {
    extend: 'Ext.panel.Panel',
    xtype: 'employee-restaurant-content',
    requires: [
        '517Employee.view.restaurant.orderHistory.OrderHistoryView',
        '517Employee.view.restaurant.information.InformationView',
        '517Employee.view.restaurant.dish.DishView',
    ],
    border: false,frame:false,
    layout: { type:'card' , padding:0 },
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    items: [
        {
            border:false,frame:false,
            xtype: 'employee-restaurant-orderHistory',
            id: 'Employee-Restaurant-OrderHistory'
        },
        {
            border:false,frame:false,
            xtype: 'employee-restaurant-information',
            id: 'Employee-Restaurant-Information'
        },
        {
            border:false,frame:false,
            xtype: 'employee-restaurant-dish',
            id: 'Employee-Restaurant-Dish'
        },
        {
            border:false,frame:false,
            //xtype: 'employee-restaurant-xxxx',
            id: 'Employee-Restaurant-Xxxx',
        }
        
    ]
});