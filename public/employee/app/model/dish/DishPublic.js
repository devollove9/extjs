/**
 * Created by devo on 7/24/2015.
 */
Ext.define('517Employee.model.dish.DishPublic', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'name'},
        {name: 'nameEn'},
        {name: 'itemId'},
        {name: 'storeId'},
        {name: 'regionId'},
        {name: 'typeId'},
        {name: 'categoryId'},
        {name: 'price', type:'float'},
        {name: 'dishTypeName' , mapping:'typeId' ,
            convert:function( value ) {
                var typeMap = Ext.getCmp( 'Employee-Header').getPreLoad( 'typeMapPublic' );
                if ( typeMap[ value ] ) {
                    return typeMap[ value ].name + '(' + typeMap[ value ].nameEn +')';
                }
            }
        }
    ]
});