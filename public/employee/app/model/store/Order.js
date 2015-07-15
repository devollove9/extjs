Ext.define('517Employee.model.order.Order', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'invoiceNo', type:'number'},
        { name: 'placeDate'},
        { name: 'driverId'},
        { name: 'driver_name'},
        { name: 'driver'},
        { name: 'operator'},
        { name: 'activeStatus'},
        { name: 'payment'},
        { name: 'address'},
        { name: 'pick'},
        { name: 'user'},
        { name: 'charge'},
        { name: 'cooking_time'},
        { name: 'guest', type:'boolean'},
        { name: 'delivery_lat'},
        { name: 'delivery_lng'},
        { name: 'rejected_reason'},
        { name: 'active'},
        { name: 'status'},
    ]
    
});
