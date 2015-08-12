
/**
 * Created by Yaxin on 6/4/2015.
 */
Ext.define('517Employee.model.restaurant.dish.List', {
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
                var typeMap = Ext.getCmp( 'Employee-Header').getPreLoad( 'typeMap' );
                if ( typeMap[ value ] ) {
                    return typeMap[ value ].name + '(' + typeMap[ value ].nameEn +')';
                }
            }
        },
        {name: 'dishCategoryName' , mapping:'categoryId' ,
            convert:function( value ) {
                var categoryMap = Ext.getCmp( 'Employee-Header').getPreLoad( 'categoryMap' );
                if ( categoryMap[ value ] ) {
                    return categoryMap[ value ].name +'('+ categoryMap[ value ].nameEn + ')';
                }
            }
        }

    ]
});