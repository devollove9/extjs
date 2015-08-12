/**
 * Created by devo on 7/9/2015.
 */
Ext.define('517Employee.store.operator.operation.Order', {
    extend: 'Ext.data.Store',
    storeId: 'Employee-Operator-Operation-Order',
    model: '517Employee.model.order.Order',

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
    }

})