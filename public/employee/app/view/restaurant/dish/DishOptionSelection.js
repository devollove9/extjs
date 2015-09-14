/**
 * Created by Yaxin on 6/8/2015.
 */
Ext.define('517Employee.view.restaurant.dish.DishOptionSelection', {
    extend: 'Ext.panel.Panel',
    requires: [
        '517Employee.view.restaurant.dish.DishOptionList',
        '517Employee.view.restaurant.dish.DishOptionDetail',
        '517Employee.view.restaurant.dish.optionGroup.option.BusinessHour'
    ],
    xtype: 'employee-restaurant-dish-optionSelection',
    border: false,
    layout: 'border',
    bodyPadding: 0,
    frame:false,
    margin:'20 0 0 0',
    referenceHolder:true,
    bodyStyle:'backgroundColor:white',
    defaults: {
        collapsible: false,
        //bodyStyle: 'backgroundColor:#cecece',
    },
    items: [

        {
            xtype:'employee-restaurant-dish-optionList',
            region: 'west',
            flex:1
        },
        {
            xtype: 'employee-restaurant-dish-optionDetail',
            flex:1,
            region:'center'
        },
        {
            xtype:'employee-restaurant-dish-optionGroup-option-businessHour',
            reference:'employee-restaurant-dish-optionGroup-option-businessHour',
            region: 'east',
            width:240,
            collapsible:true
        }
    ]
});