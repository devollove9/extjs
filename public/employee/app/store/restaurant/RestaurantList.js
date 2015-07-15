/**
 * Created by Yaxin on 6/2/2015.
 */
Ext.define( '517Employee.store.restaurant.RestaurantList' , {
    extend: 'Ext.data.Store',
    storeId: 'RestaurantList',
    model: '517Employee.model.restaurant.Restaurant',
    remoteSort: true,
    pageSize: 100,
    //autoLoad:true,

    proxy: {
        type: 'ajax',
        url:'/employee/restaurant/get_restaurant',
        extraParams:{

        },
        reader: {
            type:'json',
            rootProperty: 'restaurants'
        }
    }
    //listeners:{
    //}

});