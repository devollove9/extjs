Ext.define('517Employee.store.order.OrderPaging', {
    extend: 'Ext.data.Store',    
    model: '517Employee.model.order.Order',
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