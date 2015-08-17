/**
 * Created by devo on 6/23/2015.
 */
Ext.define('517Employee.view.operator.operation.orderTab.OrderTabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-operator-operation-orderTab-controller',
    requires: [
    ],
    init: function() {
        // //console.log(this.lookupReference('active-orders').getStore());
        this.lookupReference('active-orders').getStore().addListener('refresh', function() {
            //console.log('active order refresh' + store.getCount());
        });
    }

})
