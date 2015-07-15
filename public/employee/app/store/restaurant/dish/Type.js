/**
 * Created by Yaxin on 6/4/2015.
 */
Ext.define( '517Employee.store.restaurant.dish.Type' , {
    extend: 'Ext.data.Store',
    storeId: 'Employee-Restaurant-Dish-Type',
    model: '517Employee.model.restaurant.dish.Type',
    remoteSort: false,
    pageSize: 100,
    //autoload:true,
    proxy: {
        type: 'ajax',
        url: '/employee/restaurant/get_type',
        reader: {
            type:'json',
            rootProperty: 'types'
        }
    },
    extraParams:{
    },

    simpleSortMode: true,
    filterParam: 'query'

});