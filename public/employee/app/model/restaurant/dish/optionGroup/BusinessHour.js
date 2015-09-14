/**
 * Created by Yaxin on 6/5/2015.
 */
Ext.define('517Employee.model.restaurant.dish.optionGroup.BusinessHour', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'start', type: 'int'},
        {name: 'end', type: 'int'},
        {name: 'day', type: 'int'},
    ]

});