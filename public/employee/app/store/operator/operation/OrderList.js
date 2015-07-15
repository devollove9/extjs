/**
 * Created by devo on 6/26/2015.
 */
Ext.define('517Employee.store.operator.operation.OrderList', {
    extend: 'Ext.data.Store',
    storeId: 'Employee-Operator-Operation-OrderList',
    model: '517Employee.model.order.Order',

    // Grouping
    groupField: 'pickType',

    // Page size
    pageSize: 1000,

    proxy: {
        type: 'ajax',
        pageParam: false, //to remove param "page"
        startParam: false, //to remove param "start"
        limitParam: false, //to remove param "limit"
        noCache: false, //to remove param "_dc"
        reader: {
            type:'json',
            root: 'data'
        }
    },
    sorters: 'invoiceNo',
    sortOnLoad: true

})