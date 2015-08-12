/**
 * Created by Yaxin on 6/2/2015.
 */
Ext.define('517Employee.model.region.Region', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id'},
        {name: 'regionId'},
        {name: 'name'},
        {name: 'nameEn'},
        {name: 'latitude'},
        {name: 'longitude'},
        {name: 'tax' },
    ]
});