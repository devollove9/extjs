/**
 * Created by Yaxin on 6/4/2015.
 */
Ext.define( '517Employee.store.temp.restaurant.dish.dishTemp', {
    extend: 'Ext.data.Store',
    storeId: 'Employee-Temp-Restaurant-Dish-DishTemp',
    model: '517Employee.model.restaurant.Dish',
    pageSize: 1000,
    proxy: {
        type: 'ajax',
        url: '/employee/restaurant/dish/get_dish',
        //url:'/admin/test/orders.json',
        reader: {
            type:'json',
            rootProperty: 'dishes'
        }
    }
});