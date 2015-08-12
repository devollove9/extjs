/**
 * Created by devo on 7/7/2015.
 */
Ext.define('517Employee.store.operator.newOrder.DishList', {
    extend: 'Ext.data.Store',
    storeId: 'Employee-Operator-NewOrder-DishList',
    model: '517Employee.model.dish.DishPublic',
    groupField: 'dishTypeName',

    proxy: {
        type: 'ajax',
        pageParam: false, //to remove param "page"
        startParam: false, //to remove param "start"
        limitParam: false, //to remove param "limit"
        noCache: false, //to remove param "_dc"
        reader: {
            type:'json',
            root: 'data'
        }
    }
});