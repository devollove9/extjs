/**
 * Created by devo on 7/8/2015.
 */
Ext.define('517Employee.model.operator.newOrder.checkout.CheckoutList', {
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
        {name: 'priceTotal', type:'float'},
        {name: 'quantity'}

    ]
});