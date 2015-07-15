/**
 * Created by devo on 7/8/2015.
 */
Ext.define('517Employee.store.operator.newOrder.CheckoutList', {
    extend: 'Ext.data.Store',
    storeId: 'Employee-Operator-NewOrder-CheckoutList',
    model: '517Employee.model.operator.newOrder.checkout.CheckoutList',

    /*
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
    */
});