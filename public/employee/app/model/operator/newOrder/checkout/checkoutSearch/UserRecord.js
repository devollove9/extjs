/**
 * Created by devo on 8/19/2015.
 */
Ext.define('517Employee.model.operator.newOrder.checkout.checkoutSearch.UserRecord', {
    extend: 'Ext.data.Model',

    fields: [

        {name: 'paymentId'},
        {name: 'userId'},
        {name: 'number'},
        {name: 'expire'},
        {name: 'city'},
        {name: 'state'},
        {name: 'lastName'},
        {name: 'firstName'},
        {name: 'addressId'},
        {name: 'zip'},
        {name: 'street'},
        {name: 'phone'},
        {name: 'room'},
        {name: 'username'},
        {name: 'streetroom' ,
            convert:function( value , data ) {
                var string = '';
                string = data.get( 'street' ) + ',' +  data.get( 'room' ) + ',' +  data.get( 'city' ) + ',' +  data.get( 'state' );
                return string;
            }
        },
        {name: 'fullName' ,
            convert:function( vale , data ) {

                var string = '';
                string = data.get( 'lastName' ) + ',' +  data.get( 'firstName' );
                return string;
            }
        }

    ]
});