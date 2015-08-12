/**
 * Created by devo on 7/30/2015.
 */
Ext.define( '517Employee.store.bill.restaurant.RestaurantList' , {
    extend: 'Ext.data.Store',
    storeId: 'Employee-Bill-Restaurant-RestaurantList',
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