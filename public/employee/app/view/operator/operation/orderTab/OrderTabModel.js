/**
 * Created by devo on 6/22/2015.
 */

Ext.define('517Employee.view.operator.operation.orderTab.OrderTabModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.employeeoperator', // connects to viewModel/type below

    stores: {
        activeOrder: {
            source: 'Employee-Operator-Operation-OrderList',
            groupField:'pickType',

            filters: [
                function(item) {
                    var status = parseInt(item.get('activeStatus'), 10);

                    if ( status >= 0 && status < 8 ) {
                        return true;
                    } else return  false;
                }
            ],
            listeners:{
                refresh:function(store){
                    Ext.getCmp( 'Employee-Operator-Operation-OrderTab' ).getViewModel().set('activeTotal', store.getCount());
                }
            }
        },
        cancelledOrder: {
            source: 'Employee-Operator-Operation-OrderList',
            groupField:'pickType',

            filters: [
                function(item) {
                    return item.get('activeStatus') == 9;
                }
            ],
            listeners:{
                refresh:function(store){
                    Ext.getCmp( 'Employee-Operator-Operation-OrderTab' ).getViewModel().set('cancelledTotal', store.getCount());
                }
            }
        },
        finishedOrder: {
            source: 'Employee-Operator-Operation-OrderList',
            groupField:'pickType',
            filters: [
                function(item) {
                    return item.get('activeStatus') == 8;
                }
            ],
            listeners:{
                refresh:function(store){
                    Ext.getCmp( 'Employee-Operator-Operation-OrderTab' ).getViewModel().set('finishedTotal', store.getCount());
                }
            }
        }
    },
    data:{
        activeTotal:0,
        finishedTotal:0,
        cancelledTotal:0
    }
});
