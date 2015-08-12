/**
 * Created by Yaxin on 6/4/2015.
 */
Ext.define('517Employee.store.restaurant.dish.List', {
    extend: 'Ext.data.Store',
    storeId: 'Employee-Restaurant-Dish-List',
    model: '517Employee.model.restaurant.dish.List',
    groupField: 'dishTypeName'

});