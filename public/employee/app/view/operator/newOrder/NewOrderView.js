/**
 * Created by devo on 7/6/2015.
 */
Ext.define('517Employee.view.operator.newOrder.NewOrderView', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.Card',
        'Ext.form.Panel',
        '517Employee.view.operator.newOrder.NewOrderController',
        '517Employee.view.operator.newOrder.checkout.CheckoutView',
        '517Employee.view.operator.newOrder.DishList',
        '517Employee.view.operator.newOrder.RestaurantList'
    ],
    xtype: 'employee-operator-newOrder',
    controller: 'employee-operator-newOrder-controller',

    layout: 'border',
    referenceHolder: true,
    frame:false , border:false, split:true,collapsible:false,
    items: [
        {
            region:'west',
            xtype:'employee-operator-newOrder-restaurantList',
            id:'Employee-Operator-NewOrder-RestaurantList',
            maxwidth:150
        },
        {
            region:'center',
            xtype:'employee-operator-newOrder-dishList',
            id:'Employee-Operator-NewOrder-DishList',
            margin: '0 5 0 5',
            flex:3
        },
        {
            region:'east',
            xtype:'employee-operator-newOrder-checkout',
            id:'Employee-Operator-NewOrder-Checkout',
            flex:8
        },

    ],
    refreshView:function() {
        // Refresh Restaurant List
        Ext.getCmp( 'Employee-Header' ).doResetView( 'Employee-Operator-NewOrder-RestaurantList' );

        // Refresh Dish List
        Ext.getCmp( 'Employee-Header' ).doResetView( 'Employee-Operator-NewOrder-DishList' );
        // Refresh Checkout Panel
        //this.items.items[2].items.items[1].refreshView();
    },
    resetAll:function() {
        // Reset Restaurant List
        Ext.getCmp( 'Employee-Header' ).doResetView( 'Employee-Operator-NewOrder-RestaurantList' );

        // Reset Dish List
        Ext.getCmp( 'Employee-Header' ).doResetView( 'Employee-Operator-NewOrder-DishList' );
        // Reset Checkout Panel
        //this.items.items[2].resetAll();
    }

})

