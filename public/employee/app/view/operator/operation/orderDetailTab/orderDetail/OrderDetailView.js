/**
 * Created by devo on 7/6/2015.
 */
Ext.define('517Employee.view.operator.operation.orderDetailTab.orderDetail.OrderDetailView', {
    extend: 'Ext.form.Panel',


    requires: [
        '517Employee.view.operator.operation.orderDetailTab.orderDetail.orderStatus.OrderStatusView',
        '517Employee.view.operator.operation.orderDetailTab.orderDetail.DishList',
        '517Employee.view.operator.operation.orderDetailTab.orderDetail.OrderDetailController'
    ],
    xtype: 'employee-operator-operation-orderDetailTab-orderDetail',
    controller: 'employee-operator-operation-orderDetailTab-orderDetail-controller',

    reference: 'employee-operator-operation-orderDetailTab-orderDetail',
    referenceHolder: true,

    bodyPadding: 10,
    autoScroll: true,
    border: false,
    bodyBorder: false,
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 80,
        msgTarget: 'side'
    },
    items: [
        {
            xtype: 'fieldset',
            title: 'Status',
            collapsible: false,
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'employee-operator-operation-orderDetailTab-orderDetail-orderStatus',
                    reference: 'employee-operator-operation-orderDetailTab-orderDetail-orderStatus'
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'User Info',
            collapsible: true,
            defaultType: 'displayfield',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'displayfield',
                    items: [
                        {
                            name: 'user.username',
                            fieldLabel: 'Username',
                            flex: 1,
                        },
                        {
                            xtype: 'checkbox',
                            name: 'guest',
                            fieldLabel: 'Guest',
                            flex: 1,
                        },
                        {
                            name: 'platform',
                            fieldLabel: 'Platform',
                            flex: 1,
                        }

                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    defaultType: 'textfield',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Name',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'textfield',
                            defaults: {
                                hideLabel: 'true'
                            },
                            flex:2,
                            items: [{
                                name: 'address.firstName',
                                fieldLabel: 'First Name',
                                flex: 2,
                                emptyText: 'First',
                                allowBlank: false
                            }, {
                                name: 'address.lastName',
                                fieldLabel: 'Last Name',
                                flex: 3,
                                margin: '0 0 0 6',
                                emptyText: 'Last',
                                allowBlank: false
                            }]
                        },
                        {
                            name: 'address.phone',
                            fieldLabel: 'Phone',
                            flex: 1,
                            readOnly: true
                        }]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    items: [
                        {
                            fieldLabel: 'Street',
                            name: 'address.street',
                            flex: 3
                        },
                        {
                            name: 'address.room',
                            fieldLabel: 'Room',
                            value:'',
                            flex: 1,
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    items: [
                        {
                            fieldLabel: 'City',
                            name: 'address.city',
                            flex: 2
                        }, {
                            name: 'address.state',
                            fieldLabel: 'State',
                            flex: 1
                        }, {
                            name: 'address.zip',
                            fieldLabel: 'Zip',
                            flex: 1
                        }]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items:
                        [
                            {
                                xtype: 'textareafield',
                                name: 'comment',
                                fieldLabel: 'Comments',
                                flex:1,
                            },
                        ]
                },
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Restaurant Info',
            collapsible: true,
            collapsed: true,
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    combineErrors: true,
                    defaultType: 'textfield',
                    items: [
                        {
                            name: 'restaurant.name',
                            fieldLabel: 'Name',
                            width: '50%'
                        },
                        {
                            name: 'restaurant.nameEn',
                            fieldLabel: 'English Name',
                            width: '50%'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    combineErrors: true,
                    defaultType: 'textfield',
                    items: [
                        {
                            name: 'restaurant.address',
                            fieldLabel: 'Address',
                            flex: 3,
                        },

                    ]
                }

            ]
        },
        {
            xtype: 'employee-operator-operation-orderDetailTab-orderDetail-dishList',
            reference: 'employee-operator-operation-orderDetailTab-orderDetail-dishList',
            collapsible: false,
            layout: {
                type: 'vbox',
                align: 'stretch'
            }
        },
        {
            xtype: 'hidden',
            name: 'orderId',

        },
        {
            xtype: 'hidden',
            name: 'regionId',

        },
    ],
    buttons: [
        '->',
        {
            text: '复制订单',

            handler: function(a,b,c,d,e,f,g){
                var record = this.up().up().getForm()._record.data;
                ////console.log(this.up().up().getForm().Record.data);
                var checkoutDishlist = Ext.getCmp('Employee-Operator-NewOrder-Checkout-CheckoutList');
                // Check if region selected match region in detail
                if ( checkoutDishlist.checkoutStatus == true ) {
                    Ext.Msg.alert( 'Error', 'Please Reset Checkout List First!' );
                } else {
                    // Copy the order
                    var index= 0;
                    var counter = 0;
                    Ext.getStore('Employee-Operator-NewOrder-RestaurantListPublic').each( function( storeRecord ,id ) {
                            if ( record.storeId == storeRecord.data.storeId ) {
                                index = counter;
                            } else {
                                counter ++;
                            }
                        });

                    Ext.getCmp('Employee-Operator-NewOrder-RestaurantList').getSelectionModel().select( index );
                    var checkoutDishlistStore = checkoutDishlist.getStore();
                    checkoutDishlistStore.loadData( [] , false );


                    // Add dishes
                    var dishes = record.item;
                    for( var i = 0 ; i < dishes.length ; i ++ ) {
                        if ( dishes[i].optionName ) {
                            var name = dishes[i].name + '(' + dishes[i].optionName + ')';
                        } else {
                            var name = dishes[i].name;
                        }
                        if ( dishes[i].optionNameEn ) {
                            var nameEn = dishes[i].nameEn + '(' + dishes[i].optionNameEn + ')';
                        } else {
                            var nameEn = dishes[i].nameEn;
                        }

                        checkoutDishlistStore.add({
                            storeId: record.storeId,
                            itemId: dishes[i].itemId,
                            typeId: dishes[i].typeId,
                            name: name,
                            nameEn: nameEn,
                            price: dishes[i].price,
                            priceTotal: dishes[i].subtotal,
                            quantity: dishes[i].quantity,
                            options: dishes[i].option,
                        });
                        checkoutDishlist.checkoutStoreId = record.storeId;
                        checkoutDishlist.getView().refresh();checkoutDishlist.getView().getFeature('summaryRow').onStoreUpdate();
                    }

                    var userInfo = Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo');
                    var userInfoForm = userInfo.getForm();

                    // Add address
                    var address = record.delivery;
                    userInfoForm.findField('street').setValue( address.street );
                    userInfoForm.findField('city').setValue( address.city );
                    userInfoForm.findField('zipAddress').setValue( address.zip );
                    userInfoForm.findField('state').setValue( address.state );
                    if ( address.room ) userInfoForm.findField('room').setValue( address.room );

                    // Add user info
                    userInfoForm.findField('firstName').setValue( address.firstName );
                    userInfoForm.findField('lastName').setValue( address.lastName );
                    userInfoForm.findField('phone').setValue( address.phone );
                    if ( record.userId != '0') {
                        userInfoForm.findField('username').setValue( record.userId );
                    } else {

                    }

                    // Add comments
                    userInfoForm.findField('comments').setValue( record.comment );
                    Ext.Msg.alert('Success','Order copied.');
                }
            }
        },
        {
            text: '取消订单',
            cls: 'btn btn-danger',
            handler:'cancelOrder'
        },
        '->'
    ]
});
