/**
 * Created by devo on 7/9/2015.
 */
Ext.define('517Employee.view.operator.operation.orderDetailTab.orderDetail.orderStatus.OrderStatusController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-operator-operation-orderDetailTab-orderDetail-orderStatus-controller',
    requires: [
    ],
    sendToRes: function() {
        //console.log( this.lookupReference('orderno').getValue());
        var me=this;
        Ext.Msg.confirm('Confirm', '确认发送餐厅？', function(btn, text) {
            if (btn == 'yes') {
                me.updateStatus(2, null);
            }
        });
        //this.updateStatus(2);
    },
    confirmRes: function() {
        var me = this;
        Ext.Msg.prompt('Confirm', '确认已经联系过餐厅？输入所需时间：', function(btn, text) {
            if (btn == 'ok') {
                me.updateStatus(3, text);
            }
        });
    },
    assignDriver: function() {
        var me = this;
        Ext.Msg.confirm('Confirm', '确认选择司机？', function(btn, text) {
            if (btn == 'yes') {
                var val = me.lookupReference('employee-operator-operation-orderDetailTab-orderStatus-driverSelection').getValue();
                var userId;
                Ext.getStore( 'Employee-Operator-Operation-DriverList' ).each(function( record , idx ) {
                    if (record.data.userId.indexOf(val) > -1) {
                        userId = record.data.userId;
                    }


                });
                val = userId;
                me.updateStatus(4, val);
            }
        });

    },
    driverConfirm:function(){
        var me = this;
        Ext.Msg.confirm('Confirm', '确认手动帮司机确认？', function(btn, text) {
            if (btn == 'yes') {
                me.updateStatus(5, null);
            }
        });
    },
    driverPickedUp:function(){
        var me = this;
        Ext.Msg.prompt('Confirm', '确认司机已经拿到餐？请输入authCode：', function(btn, text) {
            if (btn == 'ok') {
                me.updateStatus(7, text);
            }
        });
    },
    deliverSubmit:function(){
        var me = this;
        Ext.Msg.confirm('Confirm', '确认手工修改？', function(btn, text) {
            if (btn == 'yes') {
                me.updateStatus(8, null);
            }
        });

    },


    restart:function(){
        var me = this;
        Ext.Msg.confirm('Confirm', '确定重新下单？', function(btn, text) {
            if (btn == 'yes') {
                me.updateStatus(2, null);
            }
        });
    },
    tabChange:function(tabs, newTab, oldTab){
        //console.log(newTab.title);
        //var permission =
        //return localStorage.getItem('permission')!='operator';
    },

    activeStatus: function(record) {
        var status = record.data.status,
            active = record.get('activeStatus'),
            status_tab = this.lookupReference('status-tab'),
            activeDate = Ext.Date.format(new Date(record.get('status')[active]/1000), 'h:i:s A');

        //cooking_time
        if ( active > 0 && active < 9 ) {
            this.getView().setActiveItem(0);
            status_tab.setActiveItem(active);
            //console.log(this.lookupReference('status8'));
            //status_tab.getActiveTab().tabConfig.style ='background-color:red';
            //console.log(status_tab.getActiveTab().tabConfig)
            //status_tab.doLayout();
            //console.log(status);
            var s, d, me = this;
            s = record.data.status;
            //d = Ext.Date.format(new Date(r.get('date')), 'h:i:s A')
            for ( var i = 1; i < 9 ; i++ ) {
                var statusDate = Ext.Date.format(new Date(status[i]/1000), 'h:i:s A');
                if ( status[i] != 0 ) {
                    if ( i==1 && active > 0 && active < 9 ) me.lookupReference('employee-operator-operation-orderDetailTab-orderStatus-placedDate').setValue(statusDate);
                    if ( i==2 && active > 1 && active < 9 ) me.lookupReference('employee-operator-operation-orderDetailTab-orderStatus-sentDate').setValue(statusDate);
                    if ( i==3 && active > 2 && active < 9 ) {
                        me.lookupReference('employee-operator-operation-orderDetailTab-orderStatus-confirmedDate').setValue(statusDate);
                        me.lookupReference('employee-operator-operation-orderDetailTab-orderStatus-prepareTime').setValue(record.get('pick').prepareTime + '分钟');
                    }
                    if ( i==4 && active > 3 && active < 9 ) me.lookupReference('employee-operator-operation-orderDetailTab-orderStatus-sentDriverDate').setValue(statusDate);
                    if ( i==5 && active > 4 && active < 9 ) me.lookupReference('employee-operator-operation-orderDetailTab-orderStatus-driverConfirmedDate').setValue(statusDate);
                    if ( i==6 && active < 9 ) {
                        me.lookupReference('employee-operator-operation-orderDetailTab-orderStatus-startPickUp').setValue(statusDate);
                        //if ( record.get('pick').authenticateCode ) me.lookupReference('authcode').setValue(record.get('pick').authenticateCode);
                    }

                    if ( i==7 && active > 6 && active < 9 ) me.lookupReference('employee-operator-operation-orderDetailTab-orderStatus-pickedDate').setValue(statusDate);
                    if ( i==8 && active > 7 && active < 9 ) me.lookupReference('employee-operator-operation-orderDetailTab-orderStatus-deliveredDate').setValue(statusDate);

                }

            }
            console.log( record );
            if ( record.data.pick.authenticateCode ) me.lookupReference('employee-operator-operation-orderDetailTab-orderStatus-authcode').setValue(record.data.pick.authenticateCode);
            if ( active === 1 ) {
                me.lookupReference('employee-operator-operation-orderDetailTab-orderStatus-placedDate').setValue(activeDate);
                //console.log(status_tab.items);
                status_tab.items.items[1].setTitle('<span class="badge badge-danger">1</span>');
            } else if ( active === 2 ) {
                me.lookupReference('employee-operator-operation-orderDetailTab-orderStatus-sentDate').setValue(activeDate);
                status_tab.items.items[2].setTitle('<span class="badge badge-blue">2</span>');
            } else if ( active === 3 ) {
                me.lookupReference('employee-operator-operation-orderDetailTab-orderStatus-confirmedDate').setValue(activeDate);
                status_tab.items.items[3].setTitle('<span class="badge badge-primary">3</span>');
                me.lookupReference('employee-operator-operation-orderDetailTab-orderStatus-prepareTime').setValue(record.get('pick').prepareTime + '分钟');
            } else if ( active === 4 ) {
                me.lookupReference('employee-operator-operation-orderDetailTab-orderStatus-sentDriverDate').setValue(activeDate);
                status_tab.items.items[4].setTitle('<span class="badge badge-yellow">4</span>');
            } else if ( active === 5 ) {
                me.lookupReference('employee-operator-operation-orderDetailTab-orderStatus-driverConfirmedDate').setValue(activeDate);
                status_tab.items.items[5].setTitle('<span class="badge badge-pink">5</span>');
            } else if ( active === 6 ) {
                me.lookupReference('employee-operator-operation-orderDetailTab-orderStatus-startPickUp').setValue(activeDate);
                status_tab.items.items[6].setTitle('<span class="badge badge-warning">6</span>');
                if ( record.get('pick').authenticateCode ) me.lookupReference('authcode').setValue(record.get('pick').authenticateCode);
            } else if ( active === 7 ) {
                me.lookupReference('employee-operator-operation-orderDetailTab-orderStatus-pickedDate').setValue(activeDate);
                status_tab.items.items[7].setTitle('<span class="badge badge-purple">7</span>');
            } else if ( active === 8 ) {
                me.lookupReference('employee-operator-operation-orderDetailTab-orderStatus-deliveredDate').setValue(activeDate);
                status_tab.items.items[8].setTitle('<span class="badge badge-success">8</span>')
            }

        } else if (active == 0){
            this.getView().setActiveItem(1);
            //var d =
            this.lookupReference('rejectDate').setValue(activeDate);
            var reject_reason = record.get('rejectReason');
            var message = reject_reason.toUpperCase();
            this.lookupReference('rejectMsg').setValue(message);
        } else {
            this.getView().setActiveItem(2);
            this.lookupReference('cancelDate').setValue(activeDate);
            this.lookupReference('cancelMsg').setValue(record.get('cancelReason'));
        }

    },
    updateStatus: function(status, val) {
        var orderId = this.lookupReference('orderId').getValue();
        var regionId = this.lookupReference('regionId').getValue();
        //console.log(orderId);
        var me = this,
            tab = this.getView();
        tab.setLoading(true);
        var body = new Object();
        body.query={};
        body.query.regionId = regionId;
        body.query.orderId = orderId;
        body.activeStatus = status;
        if ( status == 3 ) {
            body.prepareTime = val;
        }
        if ( status == 4 ) {
            body.orderDriverId = val;
        }
        if ( status == 7 ) {
            body.authenticateCode = val;
        }
        if ( status == 9 ) {
            body.cancelReason = val;
        }
        var header = Ext.getCmp( 'Employee-Header').getHeaders( 'put' );
        console.log( header );
        Ext.Ajax.request({
            url: Ext.getCmp( 'Employee-Header').getServerUrl() + '/order', // you can fix a parameter like this : url?action=anAction1
            headers:Ext.getCmp( 'Employee-Header').getHeaders( 'put' ),
            method: 'put',
            jsonData:JSON.stringify( body ),
            success: function(result, request) {
                tab.setLoading(false);
                tab.lookupReference('status-tab').setActiveItem(status);

            },
            failure: function(result, request) {
                me.getView().setLoading(false);
                //alert('Error in server' + result.responseText);
                Ext.Msg.alert('Error', 'Update failed. Please contact technical staff');
            }
        });
    }

})