/**
 * Created by Yaxin on 6/8/2015.
 */
Ext.define('517Employee.view.restaurant.dish.DishOptionSelection', {
    extend: 'Ext.panel.Panel',
    requires: [
        '517Employee.view.restaurant.dish.DishOptionList',
        '517Employee.view.restaurant.dish.DishOptionDetail'
    ],
    xtype: 'employee-restaurant-dish-optionSelection',
    border: false,
    layout: 'border',
    bodyPadding: 0,
    frame:false,
    margin:'20 0 0 0',
    bodyStyle:'backgroundColor:white',
    defaults: {
        collapsible: false,
        //bodyStyle: 'backgroundColor:#cecece',
    },
    items: [
        {
            xtype:'employee-restaurant-dish-optionList',
            region: 'center',
            flex:2
        },
        {
            xtype: 'employee-restaurant-dish-optionDetail',
            region: 'east',
            flex:2
        }
    ]
});