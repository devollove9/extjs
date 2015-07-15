/**
 * Created by devo on 7/7/2015.
 */
/**
 * Created by Yaxin on 6/4/2015.
 */
Ext.define('517Employee.model.dish.Dish', {
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

    ]
});