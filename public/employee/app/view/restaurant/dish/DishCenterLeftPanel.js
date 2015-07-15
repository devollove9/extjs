/**
 * Created by Yaxin on 5/31/2015.
 */
Ext.define('517Employee.view.restaurant.dish.DishCenterLeftPanel', {
    extend: 'Ext.panel.Panel',
    requires: [
        '517Employee.view.restaurant.dish.DishCategory',
        '517Employee.view.restaurant.dish.DishType'
    ],
    xtype: 'employee-restaurant-dish-centerLeftPanel',
    border:false , frame:false , split:true ,
    bodyStyle:{ "background-color":"white" , 'border-color' : 'black' , 'border-width':'0px' } ,
    layout: 'border',
    defaults: { },
    items: [
        {
            xtype:'employee-restaurant-dish-category',
            id:'Employee-Restaurant-Dish-Category',
            region: 'west',
            margin: '0 5 0 0',
            collapsible: true ,
            flex:2
        },
        {
            region:'center',
            width:0,
            flex:0,
            margin:0,
            padding:0
        },
        {
            xtype: 'employee-restaurant-dish-type',
            id:'Employee-Restaurant-Dish-Type',
            region: 'east',
            collapsible: true ,
            flex:2
        }


    ]
});