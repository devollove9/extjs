/**
 * Created by devo on 7/28/2015.
 */
Ext.define( '517Employee.store.restaurant.orderHistory.SearchFilters' , {
    extend: 'Ext.data.Store',
    storeId: 'Employee-Restaurant-OrderHistory-SearchFilters',
    fields: ['name', 'filterBy'],
    data : [
        { name:'Date(日期)' , filterBy:'placeDate' },
        { name:'active status' , filterBy:'activeStatus' },
        { name:'invoice no.', filterBy:'invoiceNo'},
        { name:'order id', filterBy:'orderId'},
        { name:'user id', filterBy:'userId'},

    ]

});