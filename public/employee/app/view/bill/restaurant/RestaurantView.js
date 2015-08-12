/**
 * Created by devo on 7/30/2015.
 */
Ext.define( '517Employee.view.bill.restaurant.RestaurantView' , {
    extend: 'Ext.panel.Panel',
    requires: [
        //'517Employee.view.bill.restaurant.RestaurantViewController',
        '517Employee.view.bill.restaurant.billCenter.BillCenterView',
        '517Employee.view.bill.restaurant.RestaurantList',
    ],
    xtype:'employee-bill-restaurant',
    border: false, frame:false,
    layout: 'border',

    items: [
        {
            xtype: 'employee-bill-restaurant-restaurantList',
            id:'Employee-Bill-Restaurant-RestaurantList',
            region: 'west',
            width:150,
            margin: '0 5 0 0'
        },
        {
            xtype: 'employee-bill-restaurant-billCenter',
            id:'Employee-Bill-Restaurant-BillCenter',
            region : 'center'

        }
    ],
    refreshView:function() {
        // Refresh Restaurant List
        this.items.items[ 0 ].refreshView();

        // Refresh Bill Center
        this.items.items[ 1 ].refreshView();
    },

    resetAll:function() {
        // Reset Restaurant List
        this.items.items[ 0 ].resetAll();

        // Reset Bill Center
        this.items.items[ 1 ].resetAll();
    }
});