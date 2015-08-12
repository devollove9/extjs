/**
 * Created by devo on 6/23/2015.
 */
Ext.define('517Employee.store.Orders', {
    extend: 'Ext.data.Store',
    storeId: 'Orders',
    model: '517Employee.model.order.Order',
    groupField: 'pickType',
    //remoteSort: false,
    pageSize: 1000,

    proxy: {
        type: 'ajax',
        //url: 'https://s3-us-west-2.amazonaws.com/order/get',
        //url:'/admin/test/orders.json',
        extraParams:{
            //method: 'get_by_region',
            //regionId: Ext.getCmp('operator-regionlist').regionId
            //fields: 'orderno,restaurant,status,charge.total,charge.payment,delivery_lat,delivery_lng,guest,driver'
            //regionId : '0',
            //fileds:'orderno'
        },
        reader:{
            type: 'json',
            rootProperty: 'data'
        }
    },
    //autoLoad:true,
    sorters: 'orderno',
    sortOnLoad: true,
    listeners:{
        load:function(store){
            console.log('load store');
            //517Employee.getApplication().fireEvent('ordersLoaded', store);
        }
    },



})