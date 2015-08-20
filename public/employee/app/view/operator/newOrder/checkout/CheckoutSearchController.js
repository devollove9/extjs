/**
 * Created by devo on 7/6/2015.
 */
Ext.define('517Employee.view.operator.newOrder.checkout.CheckoutSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-operator-newOrder-checkout-checkoutSearch-controller',


    searchUser:function( model,rowindex,columns,button_object,event,lineRecord) {
        var me = this;
        var searchPanel = model.up().up();
        searchPanel.resetSearchInfo();
        var toolbar = model.up();
        var searchType = toolbar.items.items[ 1 ];
        var phoneValueField = toolbar.items.items[ 3 ];
        var usernameValueField = toolbar.items.items[ 4 ];
        if ( searchType.getValue() ) {
            var searchValue;

            if ( searchType.getValue() == 'phone' ) {
                searchValue = phoneValueField.getValue();
            } else{
                searchValue = usernameValueField.getValue();
            }
            if ( searchValue ) {
                Ext.getCmp( 'Employee-Header').searchUserInfo( searchPanel , '/user' , 'get' , searchType.getValue() , searchValue , 'userInfo' );
            }
        }
    },
    getAjaxRequestResponse:function( returnMessage ) {
        console.log( returnMessage );
    },

    addName:function(model,rowindex,columns,button_object,event,lineRecord) {
        ////console.log(model);
        ////console.log(rowindex);
        ////console.log(columns);
        ////console.log(button_object);
        ////console.log(event);
        ////console.log(dishRecord);
        if ( lineRecord.data.name ) {
            var firstName = lineRecord.data.firstName;
            var lastName = lineRecord.data.lastName;
            Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('firstName').setValue(firstName);
            Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('lastName').setValue(lastName);
        }

    },
    addStreet:function(model,rowindex,columns,button_object,event,lineRecord) {
        ////console.log(model);
        ////console.log(rowindex);
        ////console.log(columns);
        ////console.log(button_object);
        ////console.log(event);
        ////console.log(dishRecord);
        if ( lineRecord.data.streetroom ) {
            if ( Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').addressStatus == true ) {
                Ext.Msg.alert( 'Warning', 'You need to hit Re-Confirm to add new address');

            } else {
                var street = lineRecord.data.street;
                var state = lineRecord.data.state;

                var city = lineRecord.data.city;
                var zip = lineRecord.data.zip;
                Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('street').setValue(street);
                Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('state').setValue(state);
                Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('city').setValue(city);
                Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('zipAddress').setValue(zip);

                if ( lineRecord.data.room != 'undefined') {
                    var room = lineRecord.data.room;
                    Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('room').setValue(room);
                }

            }
        }
    },
    addCard:function(model,rowindex,columns,button_object,event,lineRecord) {
        ////console.log(model);
        ////console.log(rowindex);
        ////console.log(columns);
        ////console.log(button_object);
        ////console.log(event);
        ////console.log(dishRecord);
        if ( lineRecord.data.number ) {
            var card = lineRecord.data.card;
            Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('card').setReadOnly(false);
            Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('card').setValue('');
            Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('month').setValue('');
            Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('year').setValue('');
            Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('paymentCardIndex').setValue('');
            Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('paymentCardLoaded').setValue(false);
            //if (card != "cash"){
            ////console.log(lineRecord);

            Ext.getCmp('operator-checkout-payment-radio').items.items[0].items.items[0].setValue(true);
            Ext.getCmp('operator-checkout-payment-radio').items.items[0].items.items[1].setValue(false);
            var expireMonth = lineRecord.data.expire.substring(0,2);
            var expireYear = lineRecord.data.expire.substring(2,4);
            var paymentId = lineRecord.data.paymentId;
            Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('paymentCardLoaded').setValue(true);
            Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('paymentCardIndex').setValue( paymentId );
            Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('card').setValue('************'+ lineRecord.data.number);
            Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('month').setValue(expireMonth);
            Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('year').setValue(expireYear);
            Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('card').setReadOnly(true);
        }
        //} else {
        //    Ext.getCmp('operator-checkout-payment-radio').items.items[0].items.items[0].setValue(false);
        //    Ext.getCmp('operator-checkout-payment-radio').items.items[0].items.items[1].setValue(true);
        //}
    },
    addUsername:function(model,rowindex,columns,button_object,event,lineRecord) {
        ////console.log(model);
        ////console.log(rowindex);
        ////console.log(columns);
        ////console.log(button_object);
        ////console.log(event);
        ////console.log(dishRecord);
        if ( lineRecord.data.username ) {
            var username = lineRecord.data.username;
            if ( username != "Guest"  ) {
                Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('username').setValue(username);
                Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('username').setReadOnly(true);
                Ext.getCmp('operatorCheck_user_button').setText('Re-Enter');
                Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').guestStatus=false;
            } else {
                Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('username').setValue('Guest');
                Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('username').setReadOnly(false);
                Ext.getCmp('operatorCheck_user_button').setText('Check');
                Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').guestStatus=true;
            }
        }
    },
    addRecord:function(model,rowindex,columns,button_object,event,lineRecord) {
        ////console.log(model);
        ////console.log(rowindex);
        ////console.log(columns);
        ////console.log(button_object);
        ////console.log(event);
        ////console.log(dishRecord);
        this.addCard(model,rowindex,columns,button_object,event,lineRecord);
        this.addName(model,rowindex,columns,button_object,event,lineRecord);
        this.addStreet(model,rowindex,columns,button_object,event,lineRecord);
        this.addUsername(model,rowindex,columns,button_object,event,lineRecord);
    },


})
