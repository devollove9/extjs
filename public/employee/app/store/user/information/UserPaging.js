/**
 * Created by devo on 9/1/2015.
 */
Ext.define('517Employee.store.user.information.UserPaging', {
    extend: 'Ext.data.Store',
    model: '517Employee.model.user.User',
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