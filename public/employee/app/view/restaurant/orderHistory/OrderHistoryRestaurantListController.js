/**
 * Created by devo on 7/27/2015.
 */
Ext.define( '517Employee.view.restaurant.orderHistory.OrderHistoryRestaurantListController' , {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-restaurant-orderHistory-restaurantList-controller',
    requires: [

    ],
    DeSelectAll:function( field ) {
        field.up().up().getSelectionModel().deselectAll();
    },

    Refreshlist:function(){
        Ext.getCmp( 'Employee-Restaurant-OrderHistory-RestaurantList' ).refreshView();
    }
});