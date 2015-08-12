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
        pageParam: false, //to remove param "page"
        startParam: false, //to remove param "start"
        limitParam: false, //to remove param "limit"
        noCache: false, //to remove param "_dc"
        reader: {
            type:'json',
            rootProperty: 'data'
        }
    },

    simpleSortMode: true,
    filterParam: 'query'

});