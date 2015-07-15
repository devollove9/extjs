Ext.define('517Employee.store.order.Order', {
    extend: 'Ext.data.Store',    
    model: '517Employee.model.order.Order',
    remoteSort: true,
    pageSize: 100,    
    
    proxy: {        
        type: 'ajax',
        url: '/admin/store/order/get_order',   
        extraParams:{},
        reader:{
           type: 'json',
           rootProperty: 'orders'
        }
    },
    
})