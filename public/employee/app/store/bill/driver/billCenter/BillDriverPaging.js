/**
 * Created by devo on 7/31/2015.
 */
Ext.define('517Employee.store.bill.driver.billCenter.BillDriverPaging', {
    extend: 'Ext.data.Store',
    model: '517Employee.model.bill.BillDriver',
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