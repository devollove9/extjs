Ext.define('517Employee.view.restaurant.information.InformationView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.restaurant.information.restaurant.RestaurantView',
        '517Employee.view.restaurant.information.InformationRestaurantList',
    ],   
    xtype: 'employee-restaurant-information',
    frame:false , border:false, split:true,
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    layout: 'border',

    items:[
        {
            region: 'west',
            xtype: 'employee-restaurant-information-restaurantList',
            id: 'Employee-Restaurant-Information-RestaurantList',
            width:150,
            margin:'0 5 0 0'
        },
        {
            region: 'center',
            xtype: 'employee-restaurant-information-restaurant',
            id: 'Employee-Restaurant-Information-Restaurant',
            flex:1,
        },
        
    ],
 
    doNavigation:function(panel){
        //console.log( panel );
    },
    resetAll:function() {
        // Refresh Restaurant List
        this.items.items[ 0 ].resetAll();
    },

    refreshView:function() {
        // Refresh Restaurant List
        this.items.items[ 0 ].refreshView();
    }
    
});