/**
 * Created by Yaxin on 6/2/2015.
 */
Ext.define('517Employee.store.region.Regions', {
    extend: 'Ext.data.Store',
    storeId: 'Regions',
    model: '517Employee.model.region.Region',

    remoteSort: false,
    pageSize: 100,

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
    autoLoad:true,
    //listeners:{
    //}

})