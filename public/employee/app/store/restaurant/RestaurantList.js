/**
 * Created by Yaxin on 6/2/2015.
 */
Ext.define( '517Employee.store.restaurant.RestaurantList' , {
    extend: 'Ext.data.Store',
    storeId: 'Employee-Restaurant-RestaurantList',
    model: '517Employee.model.restaurant.Restaurant',
    remoteSort: true,
    pageSize: 100,
    //autoLoad:true,

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