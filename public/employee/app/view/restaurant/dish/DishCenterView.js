/**
 * Created by Yaxin on 5/31/2015.
 */
Ext.define('517Employee.view.restaurant.dish.DishCenterView', {
    extend: 'Ext.panel.Panel',
    requires: [
        '517Employee.view.restaurant.dish.DishCenterLeftPanel',
        '517Employee.view.restaurant.dish.DishList',
        '517Employee.view.restaurant.dish.DishDetail'
    ],
    xtype: 'employee-restaurant-dish-centerView',
    title: '517 Employee Restaurant Service : Dish',
    header:{ height:30 , padding:'0 0 0 10', margin:'0 0 0 0' },
    split:true ,
    bodyStyle:{ "background-color":"white",'border-color' : '#c1c1c1' },
    layout: 'border',
    defaults: { split: true , margin:'5 0 5 0'},
    items: [
        {
            xtype:'employee-restaurant-dish-centerLeftPanel',
            flex:2 ,
            margin:'5 0 5 5' ,
            region:'west'
        },
        {
            xtype:'employee-restaurant-dish-list',
            id:'Employee-Restaurant-Dish-List',
            region: 'center',
            flex:2
        },
        {
            xtype: 'employee-restaurant-dish-detail',
            id:'Employee-Restaurant-Dish-Detail',
            margin:'5 5 5 0' ,
            region: 'east',
            flex:2
        }
    ],
    resetAll:function() {
        this.setDisabled( false );
        this.setTitle( '517 Employee Restaurant Service : Dish' );
        Ext.getCmp( 'Employee-Restaurant-Dish-Category' ).resetAll();
    }
});