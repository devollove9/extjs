/**
 * Created by devo on 7/24/2015.
 */
Ext.define( '517Employee.store.temp.preLoad.CategoryMapPublic', {
    extend: 'Ext.data.Store',
    storeId: 'Employee-Temp-PreLoad-CategoryMapPublic',
    model: '517Employee.model.preLoad.CategoryMap',
    pageSize: 1000,
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