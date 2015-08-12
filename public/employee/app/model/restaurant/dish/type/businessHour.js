/**
 * Created by Yaxin on 5/31/2015.
 */
Ext.define('517Employee.model.restaurant.dish.type.businessHour', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'start', type: 'int'},
        {name: 'end', type: 'int'},
        {name: 'day', type: 'int'}
    ]
});