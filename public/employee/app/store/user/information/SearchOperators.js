/**
 * Created by devo on 8/31/2015.
 */
Ext.define( '517Employee.store.user.information.SearchOperators' , {
    extend: 'Ext.data.Store',
    storeId: 'Employee-User-Information-SearchOperators',
    fields: ['name', 'filterOperator'],
    data : [
        //{ name:'less than' , filterOperator:'lt' },
        //{ name:'less than or equal to' , filterOperator:'lte' },
        //{ name:'greater than', filterOperator:'gt'},
        //{ name:'greater than equal to', filterOperator:'gte'},
        { name:'equal to', filterOperator:'equals'},
        //{ name:'not equal to', filterOperator:'ne'},
        //{ name:'between', filterOperator:'between'},
    ]

});