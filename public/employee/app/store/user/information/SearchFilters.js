/**
 * Created by devo on 7/28/2015.
 */
Ext.define( '517Employee.store.user.information.SearchFilters' , {
    extend: 'Ext.data.Store',
    storeId: 'Employee-User-Information-SearchFilters',
    fields: ['name', 'filterBy'],
    data : [
        { name:'Email' , filterBy:'email' },
        { name:'Phone' , filterBy:'phone' }
    ]
});