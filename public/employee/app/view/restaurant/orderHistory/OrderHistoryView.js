Ext.define('517Employee.view.restaurant.orderHistory.OrderHistoryView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.restaurant.orderHistory.OrderHistoryCenterView',
        '517Employee.view.restaurant.orderHistory.OrderHistoryRestaurantList',
    ],   
    xtype: 'employee-restaurant-orderHistory',
    frame:false , border:false, split:true,
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    layout: 'border',

    items:[
        {
            region: 'west',
            xtype: 'employee-restaurant-orderHistory-restaurantList',
            id: 'Employee-Restaurant-OrderHistory-RestaurantList',
            width:150,
            margin:'0 5 0 0'
        },
        {
            region: 'center',
            xtype: 'employee-restaurant-orderHistory-centerView',
            id: 'Employee-Restaurant-OrderHistory-CenterView',
            flex:1,
        },
        
    ],
 
    doNavigation:function(panel){
        //console.log( panel );
    },

    resetAll:function() {
        // Reset Restaurant List
        this.items.items[ 0].resetAll();

        // Reset Order History List
        this.items.items[ 0].resetAll();
    },

    refreshView:function() {
        // Refresh Restaurant List
        this.items.items[ 0 ].refreshView();

        // Refresh Order History List
        this.items.items[ 0 ].refreshView();
    }
});