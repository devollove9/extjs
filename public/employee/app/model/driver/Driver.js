/**
 * Created by devo on 7/9/2015.
 */
Ext.define('517Employee.model.driver.Driver', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'userId'},
        {name: 'name'},
        {name: 'latitude'},
        {name: 'longitude'},
        {name: 'lastUpdate'},
        {name: 'profileId'},
        {name: 'regionId'},
        {name: 'token'},
        {name: 'account'}
    ]

});