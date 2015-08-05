/**
 * Created by devo on 7/30/2015.
 */
Ext.define( '517Employee.store.bill.driver.DriverList' , {
    extend: 'Ext.data.Store',
    storeId: 'Employee-Bill-Driver-DriverList',
    model: '517Employee.model.driver.Driver',
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