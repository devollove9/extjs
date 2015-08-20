/**
 * Created by devo on 8/17/2015.
 */
Ext.define( '517Employee.store.operator.newOrder.checkout.checkoutSearch.SearchType' , {
    extend: 'Ext.data.Store',
    storeId: 'Employee-Operator-NewOrder-Checkout-CheckoutSearch-SearchType',
    fields: ['name', 'filterBy'],
    data : [
        { name:'Phone' , filterBy:'phone' },
        { name:'Username' , filterBy:'email' }

    ]

});