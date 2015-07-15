/**
 * Created by devo on 7/9/2015.
 */

Ext.define('517Employee.view.operator.operation.orderDetailTab.orderDetail.orderStatus.OrderStatusView', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.layout.container.Card',
        '517Employee.view.operator.operation.orderDetailTab.orderDetail.orderStatus.OrderStatusController'
    ],
    xtype: 'employee-operator-operation-orderDetailTab-orderDetail-orderStatus',
    //style: 'background-color:#dfe8f6; ',
    referenceHolder: true,
    height: 120,
    border: false,
    bodyBorder: false,
    controller: 'employee-operator-operation-orderDetailTab-orderDetail-orderStatus-controller',

    layout: 'card',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            border: false,
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    //height:60,
                    defaultType: 'label',
                    padding: '0 10 0 10',
                    width: 620,
                    border: false,
                    defaults: {
                        //padding:10
                        //padding: '0 20 0 20'
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'active',
                            reference: 'active',
                            value: ''
                        },
                        {
                            text: '新入订单',
                            //text:'1',
                            //cls:'badge',
                            cls: 'label label-danger arrowed-right',
                            flex: 1
                        },
                        {
                            text: '已送餐厅',
                            cls: 'label label-blue arrowed-in arrowed-right',
                            flex: 1
                        },
                        {
                            text: '餐厅回应',
                            cls: 'label label-primary arrowed-in arrowed-right',
                            flex: 1
                        },
                        {
                            text: '已送司机',
                            cls: 'label label-yellow arrowed-in arrowed-right',
                            flex: 1
                        },
                        {
                            text: '司机确认',
                            cls: 'label label-pink arrowed-in arrowed-right"',
                            flex: 1
                        },
                        {
                            text: '正在取餐',
                            cls: 'label label-warning arrowed-in arrowed-right"',
                            flex: 1
                        },
                        {
                            text: '正在送餐',
                            cls: 'label label-purple arrowed-in arrowed-right',
                            flex: 1
                        },
                        {
                            text: '送达成功',
                            cls: 'label label-success arrowed-in',
                            flex: 1
                        }
                    ]

                }
            ]
        }

    ],


    items: [
        {
            xtype: 'tabpanel',
            minTabWidth: 70,
            plain: true,
            padding: '0 0 0 0',
            defaults: {
                layout: 'center',
                bodyPadding: '8 10 5 10',
                border: false,
            },
            border: false,
            //border:false,
            reference: 'status-tab',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'orderno',
                    reference: 'orderno',
                    value: ''
                },
                {
                    title: '<span class="badge">1</span>',
                    layout: 'center',
                    tabConfig: {
                        cls: 'label label-transparent',
                        height: 28
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: '下单时间',
                                    reference: 'employee-operator-operation-orderDetailTab-orderStatus-placedDate',
                                    flex: 2
                                },
                                {
                                    xtype: 'button',
                                    text: '发送餐厅',
                                    handler: 'sendToRes',
                                    reference:'employee-operator-operation-orderDetailTab-orderStatus-sendToRes',
                                    flex: 1,
                                    margin: '0 0 0 10',
                                }

                            ],

                        },
                    ]
                },
                {
                    title: '<span class="badge">2</span>',
                    tabConfig: {
                        cls: 'label label-transparent',
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: '送餐厅时间',
                                    reference: 'employee-operator-operation-orderDetailTab-orderStatus-sentDate',
                                    flex: 2
                                },
                                {
                                    xtype: 'button',
                                    text: '餐厅确认',
                                    flex: 1,
                                    handler: 'confirmRes',
                                    reference:'employee-operator-operation-orderDetailTab-orderStatus-confirmRes',
                                    margin: '0 0 0 10',
                                }
                            ],
                        }
                    ]

                },
                {
                    title: '<span class="badge">3</span>',
                    layout: 'center',
                    tabConfig: {
                        //title: '新入订单',
                        cls: 'label label-transparent',
                        //style: 'background-color:#ffffff',
                        //reference:'status8'
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: '确认时间',
                                    reference: 'employee-operator-operation-orderDetailTab-orderStatus-confirmedDate',
                                    flex: 2
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: '做餐时间',
                                    reference: 'employee-operator-operation-orderDetailTab-orderStatus-prepareTime',
                                    flex: 2
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Driver',
                                    flex: 2,
                                    margin: '0 10 0 0',
                                    store: Ext.create( '517Employee.store.operator.operation.orderDetailTab.orderDetail.orderStatus.DriverAssign' ),
                                    reference:'employee-operator-operation-orderDetailTab-orderStatus-driverSelection',
                                    displayField: 'name',
                                    valueField: 'userId',
                                    //reference: 'drivers',
                                    listeners:{
                                        render:function(a,b,c,d,e,f,g) {
                                            this.getStore().add(Ext.getStore( 'Employee-Operator-Operation-DriverList' ).data.items);
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: 'Submit',
                                    flex: 1,
                                    handler: 'assignDriver',
                                    reference:'employee-operator-operation-orderDetailTab-orderStatus-assignDriver',
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '<span class="badge">4</span>',
                    layout: 'center',
                    tabConfig: {
                        //title: '新入订单',
                        cls: 'label label-transparent',
                        //style: 'background-color:#ffffff',
                        //reference:'status8'
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: '发送司机时间',
                                    labelWidth: 100,
                                    reference: 'employee-operator-operation-orderDetailTab-orderStatus-sentDriverDate',
                                    flex: 2
                                },
                                {
                                    xtype: 'button',
                                    text: '司机确认',
                                    handler: 'driverConfirm',
                                    reference:'employee-operator-operation-orderDetailTab-orderStatus-driverConfirm',
                                    flex: 2,
                                    margin: '0 0 0 10',
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '<span class="badge">5</span>',
                    layout: 'center',
                    tabConfig: {
                        //title: '新入订单',
                        cls: 'label label-transparent',
                        //style: 'background-color:#ffffff',
                        //reference:'status8'
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: '司机确认时间',
                                    labelWidth: 100,
                                    reference: 'employee-operator-operation-orderDetailTab-orderStatus-driverConfirmedDate',
                                    flex: 2
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '<span class="badge">6</span>',
                    layout: 'center',
                    tabConfig: {
                        cls: 'label label-transparent',
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: '司机开始取餐',
                                    labelWidth: 100,
                                    reference: 'employee-operator-operation-orderDetailTab-orderStatus-startPickUp',
                                    flex: 2
                                },{
                                    xtype: 'displayfield',
                                    fieldLabel: 'Auth Code',
                                    labelWidth: 100,
                                    reference: 'employee-operator-operation-orderDetailTab-orderStatus-authcode',
                                    flex: 2
                                },
                                {
                                    xtype: 'button',
                                    text: '确认取餐',
                                    handler: 'driverPickedUp',
                                    reference:'employee-operator-operation-orderDetailTab-orderStatus-driverPickUp',
                                    flex: 2,
                                    margin: '0 0 0 10'
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '<span class="badge">7</span>',
                    layout: 'center',
                    tabConfig: {
                        cls: 'label label-transparent'
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: '司机取餐时间',
                                    labelWidth: 100,
                                    reference: 'employee-operator-operation-orderDetailTab-orderStatus-pickedDate',
                                    flex: 2
                                },
                                {
                                    xtype: 'button',
                                    text: '确认送达',
                                    flex: 1,
                                    handler: 'deliverSubmit',
                                    reference:'employee-operator-operation-orderDetailTab-orderStatus-deliverSubmit',
                                    margin: '0 0 0 10'
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '<span class="badge">8</span>',
                    tabConfig: {
                        cls: 'label label-transparent'
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: '送达时间',
                                    reference: 'employee-operator-operation-orderDetailTab-orderStatus-deliveredDate',
                                    flex: 2
                                },

                            ]
                        }
                    ]
                },
                {
                    xtype: 'hiddenfield',
                    name: 'orderId',
                    reference: 'orderId',
                    value: ''
                },
                {
                    xtype: 'hiddenfield',
                    name: 'regionId',
                    reference: 'regionId',
                    value: ''
                },
            ],

        },
        {
            xtype: 'panel',
            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'center'
            },
            border: false,
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: '拒绝时间',
                    reference: 'rejectDate',
                    margin: 0
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '拒绝理由',
                    reference: 'rejectMsg',
                    margin: 0
                }
            ]


        },
        {
            xtype: 'panel',
            border: false,
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'center'
            },
            padding: 0,
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: '取消时间',
                    reference: 'cancelDate',
                    margin: 0
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '取消理由',
                    reference: 'cancelMsg',
                    margin: 0
                }
            ]

        }



    ],
    activeStatus: function(status) {
        this.setActiveItem(status);
        console.log(this.getController().test());
    },
    hideButtons:function( hideArray ) {
        var statusTab = this.items.items[0].items.items;
        for ( var i = 0 ; i < hideArray.length ; i ++ ) {
            switch ( hideArray[i] ) {
                case 1:
                    //console.log(statusTab[2].items.items[0].items);
                    statusTab[1].items.items[0].items.items[1].hide();
                    //this.getForm().findField('orderstatus-sendtores')
                    break;
                case 2:
                    //console.log(statusTab[2].items.items[0].items);
                    statusTab[2].items.items[0].items.items[1].hide();
                    //this.getForm().findField('orderstatus-confirmres').setVisable(false);
                    break;
                case 3:
                    //console.log(statusTab[3].items.items[0].items);
                    statusTab[3].items.items[0].items.items[2].hide();
                    statusTab[3].items.items[0].items.items[3].hide();
                    //this.getForm().findField('orderstatus-driverslection').setVisable(false);
                    //this.getForm().findField('orderstatus-assigndriver').setVisable(false);
                    break;
                case 4:
                    //console.log(statusTab[4].items.items[0].items);
                    statusTab[4].items.items[0].items.items[1].hide();
                    //this.getForm().findField('orderstatus-driverconfirm').setVisable(false);
                    break;
                case 5:
                    break;
                case 6:
                    //console.log(statusTab[6].items.items[0].items);
                    statusTab[6].items.items[0].items.items[2].hide();
                    //this.getForm().findField('orderstatus-driverpickedup').setVisable(false);
                    break;
                case 7:
                    //console.log(statusTab[7].items.items[0].items);
                    statusTab[7].items.items[0].items.items[1].hide();
                    //this.getForm().findField('orderstatus-deliversubmit').setVisable(false);
                    break;

            }
        }
    }

});
