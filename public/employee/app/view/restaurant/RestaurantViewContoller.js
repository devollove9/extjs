/**
 * Created by devo on 7/24/2015.
 */
Ext.define('517Employee.view.restaurant.RestaurantViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-restaurant-controller',
    requires: [
        //'517Employee.view.main.ContentViewEmployee'
    ],

    init:function(){
        var main3 = Ext.create( '517Employee.view.restaurant.ContentVie' );
        this.lookupReference('restaurantContentHolder').insert(main3);
    }
})