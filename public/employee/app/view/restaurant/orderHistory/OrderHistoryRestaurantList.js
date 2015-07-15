/**
 * Created by Yaxin on 5/29/2015.
 */
Ext.define('517Employee.view.restaurant.orderHistory.OrderHistoryRestaurantList', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.RowNumberer',
        //'517Employee.view.restaurant.orderHistory.OrderHistoryRestaurantListController'
    ],
    xtype: 'employee-restaurant-orderHistory-restaurantList',
    //controller:'employee-restaurant-orderHistory-restaurantList',
    //store: Ext.create( '517Employee.store.restaurant.Restaurants'),
    //store:'Restaurants',
    title:' Restaurant List',
    collapsible:true,
    bodyStyle:{ "background-color":"white",'border-color' : '#c1c1c1',},
    header:{ height:30 ,padding:'0 10 0 10',margin:'0 0 0 0', titleAlign:'center'},

    viewConfig: {
        enableTextSelection: true
    },
    columns: [
        {
            xtype: 'rownumberer'
        },
        {
            text: 'Name',
            sortable: true,
            dataIndex: 'name',
            flex: 2
        }
    ]

});