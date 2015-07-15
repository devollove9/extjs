/**
 * Created by Yaxin on 6/3/2015.
 */
Ext.define('517Employee.model.restaurant.dish.Category', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'regionId'},
        {name: 'storeId'},
        {name: 'categoryId'},
        {name: 'name'},
        {name: 'nameEn'},
        {name: 'information'},
        {name: 'sales'}
    ]
});