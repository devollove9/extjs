/**
 * Created by Yaxin on 6/4/2015.
 */
Ext.define( '517Employee.store.temp.restaurant.dish.DishListTemp', {
    extend: 'Ext.data.Store',
    storeId: 'Employee-Temp-Restaurant-Dish-DishListTemp',
    model: '517Employee.model.restaurant.dish.List',
    pageSize: 1000,
    proxy: {
        type: 'ajax',
        pageParam: false, //to remove param "page"
        startParam: false, //to remove param "start"
        limitParam: false, //to remove param "limit"
        noCache: false, //to remove param "_dc"
        reader: {
            type:'json',
            rootProperty: 'data'
        }
    }
});