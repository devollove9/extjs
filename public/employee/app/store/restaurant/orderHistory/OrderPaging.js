/**
 * Created by devo on 7/27/2015.
 */
Ext.define('517Employee.store.restaurant.orderHistory.OrderPaging', {
    extend: 'Ext.data.Store',
    model: '517Employee.model.order.Order',
    requires:[
        'Ext.ux.data.PagingMemoryProxy'
    ],
    remoteSort: true,
    pageSize: 50,

    proxy: {
        type: 'memory',
        enablePaging:true,
        data: [],
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }



});