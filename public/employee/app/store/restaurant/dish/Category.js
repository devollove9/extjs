/**
 * Created by Yaxin on 6/3/2015.
 */
Ext.define( '517Employee.store.restaurant.dish.Category' , {
    extend: 'Ext.data.Store',
    storeId: 'Employee-Restaurant-Dish-Category',
    model: '517Employee.model.restaurant.dish.Category',
    remoteSort: false,
    pageSize: 100,
    //autoload:true,
    proxy: {
        type: 'ajax',
        url: '/employee/restaurant/get_category',
        reader: {
            type:'json',
            rootProperty: 'categories'
        }
    },
    extraParams:{
    },

    simpleSortMode: true,
    filterParam: 'query'

});