/**
 * Created by devo on 7/14/2015.
 */
Ext.define('517Employee.model.order.OrderDish', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'dish'},
        {name: 'price', type:'float'},
        {name: 'quantity', type:'int'},
        {name: 'name'},
        {name: 'nameEn'},
        {
            name:'subtotal',
            calculate:function(data){
                return data.price* data.quantity;
            },
            type:'float'
        }

    ]
});