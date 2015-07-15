Ext.define('517Employee.view.restaurant.RestaurantView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.restaurant.Sidebar',
        '517Employee.view.restaurant.ContentView'
    ],   
    xtype: 'employee-restaurant',
    frame:false , border:false,
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    layout: 'border',

    items:[
        {
            region: 'west',
            xtype: 'employee-restaurant-sidebar',
            // Border Color
            style:{ "background-color":"none"},
            id: 'Employee-Restaurant-Sidebar'
        },
        {
            region: 'center',
            margin: '0 0 0 10' , frame:false , border:false , 
            xtype: 'employee-restaurant-content',
            id: 'Employee-Restaurant-Content'
        }
    ],
    listeners: {
        render: function(c) {
            c.el.on('click', function() { 
                //alert('onclick');
            });
        },
        scope: this
    },
    doNavigation:function( tab ){
        var restaurantContent = Ext.getCmp( 'Employee-Restaurant-Content' );
        var employeeContent = Ext.getCmp( 'Employee-Main-ContentView' );
        if ( tab ) {           
            if ( tab.navigateAction ) {
                /* 0: Order History
                *  1: Information
                *  2: Dish
                *  3: Main
                */
                switch ( tab.navigateAction ) { 
                    case 'orderHistory' :
                        restaurantContent.setActiveItem(0);
                        break;

                    case 'information' :
                        restaurantContent.setActiveItem(1);
                        break;

                    case 'dish' :
                        restaurantContent.setActiveItem(2);
                        break;

                    case 'xxxxX' :
                        restaurantContent.setActiveItem(3);
                        break;
                        
                    case 'employee-navigation' :
                        employeeContent.setActiveItem(0);
                        break;

                }     
            } else {
                employeeContent.setActiveItem(0);
            }   
        }
    }
    
});