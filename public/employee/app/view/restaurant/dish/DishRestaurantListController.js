/**
 * Created by Yaxin on 6/3/2015.
 */
/**
 * Created by Yaxin on 5/31/2015.
 */
Ext.define( '517Employee.view.restaurant.dish.DishRestaurantListController' , {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-restaurant-dish-restaurantList-controller',
    requires: [

    ],
    DeSelectAll:function( field ) {
        field.up().up().getSelectionModel().deselectAll();
    },

    Refreshlist:function(){
        Ext.getCmp( 'Employee-Restaurant-Dish-RestaurantList' ).refreshView();
    }
});