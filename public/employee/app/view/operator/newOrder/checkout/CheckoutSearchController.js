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
        var userInfo = Ext.getCmp( 'Employee-Operator-NewOrder-Checkout-UserInfo' );
        if ( lineRecord.data.firstName ) {
            //console.log( lineRecord );
            var firstName = lineRecord.data.firstName;
            var lastName = lineRecord.data.lastName;
            userInfo.getForm().findField('firstName').setValue(firstName);
            userInfo.getForm().findField('lastName').setValue(lastName);
        }

    },
    addStreet:function(model,rowindex,columns,button_object,event,lineRecord) {
        ////console.log(model);
        ////console.log(rowindex);
        ////console.log(columns);
        ////console.log(button_object);
        ////console.log(event);
        ////console.log(dishRecord);
        var userInfo = Ext.getCmp( 'Employee-Operator-NewOrder-Checkout-UserInfo' );
        if ( lineRecord.data.streetroom ) {
            if ( userInfo.addressStatus == true ) {
                Ext.Msg.alert( 'Warning', 'You need to hit Re-Confirm to add new address');

            } else {
                var street = lineRecord.data.street;
                var state = lineRecord.data.state;

                var city = lineRecord.data.city;
                var zip = lineRecord.data.zip;
                userInfo.getForm().findField('street').setValue(street);
                userInfo.getForm().findField('state').setValue(state);
                userInfo.getForm().findField('city').setValue(city);
                userInfo.getForm().findField('zipAddress').setValue(zip);

                if ( typeof lineRecord.data.room != 'undefined') {
                    var room = lineRecord.data.room;
                    userInfo.getForm().findField('room').setValue(room);
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
        var userInfo = Ext.getCmp( 'Employee-Operator-NewOrder-Checkout-UserInfo' );
        if ( lineRecord.data.number &&  lineRecord.data.paymentId ) {
            var card = lineRecord.data.card;
            var paymentId = lineRecord.data.paymentId;
            userInfo.getForm().findField('card').setReadOnly(false);
            userInfo.getForm().findField('card').setValue('');
            userInfo.getForm().findField('month').setValue('');
            userInfo.getForm().findField('year').setValue('');
            userInfo.getForm().findField('paymentId').setValue('');
            userInfo.getForm().findField('paymentIdLoaded').setValue(false);
            //if (card != "cash"){
            ////console.log(lineRecord);

            Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-PaymentRadio').items.items[0].items.items[0].setValue(true);
            Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-PaymentRadio').items.items[0].items.items[1].setValue(false);
            var expireMonth = lineRecord.data.expire.substring(0,2);
            var expireYear = lineRecord.data.expire.substring(2,4);
            var paymentId = lineRecord.data.paymentId;
            userInfo.getForm().findField('paymentIdLoaded').setValue(true);
            userInfo.getForm().findField('paymentId').setValue( paymentId );
            userInfo.getForm().findField('card').setValue('************'+ lineRecord.data.number);
            userInfo.getForm().findField('month').setValue(expireMonth);
            userInfo.getForm().findField('year').setValue(expireYear);
            userInfo.getForm().findField('card').setReadOnly(true);
        }

    },
    addUsername:function(model,rowindex,columns,button_object,event,lineRecord) {
        ////console.log(model);
        ////console.log(rowindex);
        ////console.log(columns);
        ////console.log(button_object);
        ////console.log(event);
        ////console.log(dishRecord);
        var userInfo = Ext.getCmp( 'Employee-Operator-NewOrder-Checkout-UserInfo' );
        var validateUserButton = Ext.getCmp( 'Employee-Operator-NewOrder-Checkout-UserInfo-ValidateUserButton' );
        if ( lineRecord.data.username  &&  lineRecord.data.userId ) {
            var username = lineRecord.data.username;
            var userId = lineRecord.data.userId
            userInfo.getForm().findField('username').setValue( username );
            userInfo.getForm().findField('userId').setValue( userId );
            validateUserButton.setText('Re-Enter');
            userInfo.guestStatus = false;
        } else {
            userInfo.getForm().findField('username').setValue('Guest');
            userInfo.getForm().findField('userId').setValue( '0' );
            validateUserButton.setText('Check');
            userInfo.guestStatus=true;
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
