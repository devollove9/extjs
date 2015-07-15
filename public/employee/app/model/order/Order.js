Ext.define( '517Employee.model.order.Order', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'invoiceNo'},
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
        { name: 'guest'},
        { name: 'delivery_lat'},
        { name: 'delivery_lng'},
        { name: 'rejected_reason'},
        { name: 'active'},
        { name: 'status'},
        { name: 'pickType' , mapping:'pick.method' ,
            convert:function( value ) {
                if ( value == 0 ) {
                    return '517 Delivery';
                } else if ( value == 1 ) {
                    return 'Pick Up';
                } else if ( value == 2 ) {
                    return 'Restaurant Handle';
                } else if ( value == 3 ) {
                    return 'Restaurant Deliver';
                } else return 'Unknown Type';
            }
        }
    ]
    
});
