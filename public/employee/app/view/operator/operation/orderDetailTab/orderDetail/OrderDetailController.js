/**
 * Created by devo on 7/14/2015.
 */
Ext.define('517Employee.view.operator.operation.orderDetailTab.orderDetail.OrderDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-operator-operation-orderDetailTab-orderDetail-controller',
    requires: [
    ],
    copyOrder: function( button , click_event ) {
        console.log(button.up());


        var newOrder = Ext.ComponentQuery.query('#new-order')[0];
        console.log(newOrder);
        var userInfo = newOrder.lookupReference('user-info');
        //console.log(userInfo.getForm())
        userInfo.getForm().setValues(this.getView().getForm().getValues());

        var grid = newOrder.lookupReference('order-dish-list');
        var store = this.lookupReference('order-dish-list').getStore();
        grid.reconfigure(store);
        grid.columns[1].setVisible(false);

    },
    cancelOrder: function() {
        //console.log(this.getView().getForm());
        var me = this.getView(),
            tab = this.lookupReference('employee-operator-operation-orderDetailTab-orderDetail-orderStatus'),
            orderno = tab.lookupReference('orderno').getValue();
        var regionId = me.getForm().findField('regionId').getValue();
        var orderId = me.getForm().findField('orderId').getValue();
        Ext.Msg.prompt('Confirm', '请输入取消原因：', function(btn, text) {
            if (btn == 'ok') {
                me.setLoading(true);
                var body = new Object();
                body.query={};
                body.query.regionId = regionId;
                body.query.orderId = orderId;
                body.activeStatus = 9
                body.cancelReason = text;
                Ext.Ajax.request({
                    url: Ext.getCmp( 'Employee-Header').getServerUrl() + '/order', // you can fix a parameter like this : url?action=anAction1
                    headers:Ext.getCmp( 'Employee-Header').getHeaders( 'put' ),
                    method: 'put',
                    jsonData:JSON.stringify( body ),
                    success: function(result, request) {
                        me.setLoading(false);
                        tab.setLoading(false);
                        tab.lookupReference('status-tab').setActiveItem(status);
                        Ext.getCmp( 'Employee-Operator-Operation-OrderTab').refreshView();
                        me.up().close();
                    },
                    failure: function(result, request) {
                        me.setLoading(false);
                        //alert('Error in server' + result.responseText);
                        Ext.Msg.alert('Error', 'Update failed. Please contact technique staff');
                        me.up().close();
                    }
                });

            }
        })

    }

})