/**
 * Created by devo on 7/31/2015.
 */
Ext.define( '517Employee.model.bill.BillDriver' , {
    extend: 'Ext.data.Model',
    fields: [
        // the 'name' below matches the tag name to read, except 'availDate'
        // which is mapped to the tag 'availability'

        {name: 'adjustment'},
        {name: 'documentId'},
        {name: 'documentNo'},
        {name: 'documentPath'},
        {name: 'driverId'},
        {name: 'earning'},
        {name: 'generateDate'},
        {name: 'pay'},
        {name: 'periodStart'},
        {name: 'periodEnd'},
        {name: 'regionId'},
        {name: 'userId'},
        {name: 'signature'},
        {name: 'signed' , mapping:'signature.complete',
            /*convert:function( value ) {
                if ( value == false ) {
                    return 'NO';
                } else if ( value == true ) {
                    return 'YES';
                } else return 'Unknown';
            }*/
        }
    ]
});
