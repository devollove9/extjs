/**
 * Created by devo on 7/14/2015.
 */
Ext.define('517Employee.store.operator.operation.DriverList', {
    extend: 'Ext.data.Store',
    storeId: 'Employee-Operator-Operation-DriverList',
    model: '517Employee.model.driver.Driver',

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