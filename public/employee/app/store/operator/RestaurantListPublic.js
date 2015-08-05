/**
 * Created by devo on 7/7/2015.
 */
Ext.define( '517Employee.store.operator.RestaurantListPublic' , {
    extend: 'Ext.data.Store',
    storeId: 'Employee-Operator-NewOrder-RestaurantListPublic',
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