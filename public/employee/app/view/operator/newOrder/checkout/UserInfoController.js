/**
 * Created by devo on 7/6/2015.
 */
Ext.define('517Employee.view.operator.newOrder.checkout.UserInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-operator-newOrder-checkout-userInfo-controller',
    requires: [

    ],

    validateUsername:function(button,click_event){
        var username = Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').getForm().findField('username');
        ////console.log( Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').guestStatus);
        if ( Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').guestStatus == false ) {
            Ext.Msg.show({
                title:'Warning',
                msg: 'This will cancel confirmed username<br> and will check out as Guest, Continue?',
                buttons: Ext.Msg.YESNO,
                fn: function(btn,text){
                    if ( btn == 'yes' ) {
                        Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').guestStatus = true;
                        username.setValue('Guest');
                        username.setReadOnly(true);
                        button.setText('Check');
                    } else if ( btn == 'no' ) {

                    }
                },
                animEl: 'elId'
            });

        } else { /*
         if ( username.getValue().toLowerCase() == "guest" || !username.getValue() )  Ext.Msg.alert('Error','Username not valid.');
         else  {
         Ext.Ajax.request({
         url: 'operator/neworder/validation', // you can fix a parameter like this : url?action=anAction1
         method: 'GET',
         params: {
         item:'username',
         username:username.getValue()
         },
         success: function(result, request) {
         var obj = Ext.decode(result.responseText);
         //console.log(obj);
         if ( obj.success == 1) {
         Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').guestStatus = false;
         username.setReadOnly(true);
         button.setText('Re-Enter');

         }else if (obj.success == 2 ) {
         Ext.Msg.alert('Error','User not found.');
         } //not found
         else if (obj.success == -1) {
         Ext.Msg.alert('Error','Please contact technique staff.');
         } //Error
         }
         });
         }*/

        }
    },

    validateAddress:function(button,click_event){
        // Check if all information filled
        ////console.log(Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').addressStatus);
        var userInfo = Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo');
        var userInfoForm = userInfo.getForm();var regionView = Ext.getCmp( 'Employee-Header-Region' );
        if ( Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').addressStatus == true ) {
            Ext.Msg.show({
                title:'Warning',
                msg: 'This will cancel confirmed address<br> you will have to confirm address again, Continue?',
                buttons: Ext.Msg.YESNO,
                fn: function(btn,text){
                    if ( btn == 'yes' ) {
                        Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').addressStatus = false;
                        userInfo.unlockField('address');
                        userInfoForm.findField('delivery').setValue(0);
                        userInfo.deliveryInfo=null;
                        userInfo.calculateDelivery();
                        button.setText('Confirm');
                    }
                },
                animEl: 'elId'
            });

        } else {
            if ( Ext.getCmp( 'Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio' ).choosedType == 1 ) {}
            else if ( Ext.getCmp('Employee-Operator-NewOrder-Checkout-CheckoutList').checkoutStatus == false ) Ext.Msg.alert('Error', 'Please checkout first.');
            else if ( this.checkAddressEmpty() == false ) Ext.Msg.alert('Error', 'Please Fill out Street, Room, City, State, Zip.');
            else {

                var subtotal = userInfoForm.findField('subtotal').getValue();
                var storeId = userInfo.checkoutStoreId;
                var street = userInfoForm.findField('street').getValue();
                var city = userInfoForm.findField('city').getValue();
                var zip = userInfoForm.findField('zipAddress').getValue();
                var state= userInfoForm.findField('state').getValue();
                var room = userInfoForm.findField('room').getValue();


                ////console.log (userInfo.storeInfo);
                // Send request

                Ext.Ajax.request({
                    url: Ext.getCmp( 'Employee-Header').getServerUrl() + '/public/delivery', // you can fix a parameter like this : url?action=anAction1
                    method: 'GET',
                    disableCaching:false,
                    params: {
                        subtotal:subtotal,
                        storeId:storeId ,
                        street:street,
                        city:city,state:state,zip:zip
                    },
                    success: function(result, request) {

                        var response = Ext.decode(result.responseText);
                        ////console.log(obj);
                        if ( response.error ) {
                            if ( response.error.errorCode) {
                                Ext.Msg.alert( response.error.errorCode.toString(), response.error.errorMessage.toString() );
                            } else if ( response.data ){
                                userInfo.lockField( 'address' );
                                userInfoForm.findField( 'delivery' ).setValue( response.data.delivery );
                                userInfo.calculateDelivery();
                                userInfo.deliveryInfo = response;
                                button.setText('Re-Confirm');
                                Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').addressStatus = true;

                            } else {
                                Ext.Msg.alert( 'Error' , 'Unknown Error' );
                            }
                        } else {
                            Ext.Msg.alert( 'Server Error' , 'Unknown message received from server.' );
                        }

                    }
                });

            }
        }
        ////console.log();


    },

    checkAddressEmpty:function() {
        var flag = true;
        var userInfo = Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo');
        if ( !userInfo.getForm().findField('street').getValue() ||
            !userInfo.getForm().findField('room').getValue()   ||
            !userInfo.getForm().findField('city').getValue()   ||
            !userInfo.getForm().findField('state').getValue()  ||
            !userInfo.getForm().findField('zipAddress').getValue()
        ) flag = false;
        return flag;
    },

    submitOrder:function(){
        ////console.log(this.getView());
        var checkoutList = Ext.getCmp('Employee-Operator-NewOrder-Checkout-CheckoutList');
        var userInfo = Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo');
        var userInfoForm = userInfo.getForm();
        var type = userInfoForm.findField( 'typeGroup' ).getValue().types;

        // Check if checked out
        if ( checkoutList.checkoutStatus == false ) this.popOutAlerts('checkout');
        // Check if Name, phone, filled
        else if ( userInfo.checkEmptyField('namephone') == false ) this.popOutAlerts('namephone');
        // Check if address confirmed
        else if ( userInfo.addressStatus == false && type != 1 ) this.popOutAlerts('address');
        // Check if is card or cash
        else if ( userInfo.checkEmptyField('card') == false ) this.popOutAlerts('card');
        // Check cardno, month, year, cvv, card_zip if is card
        else {
            // Submit Order
            // Guest or non-Guest

            // Card or Cash

            this.getView().setLoading(true);
            var me=this;
            var checkoutInfo = userInfo.getCheckoutInfo();
            ////console.log(checkoutInfo);
            var dishes = [];
            for ( var i = 0 ; i < checkoutInfo.dish.length ; i ++) {
                var dish = new Object();
                dish.itemId = checkoutInfo.dish[i].data.itemId;
                dish.typeId = checkoutInfo.dish[i].data.typeId;
                dish.quantity = checkoutInfo.dish[i].data.quantity;

                ////console.log(checkoutInfo.dish[i].data.options);
                if ( checkoutInfo.dish[i].data.options ) {
                    var optionGroup = [];
                    for ( var j = 0 ; j < checkoutInfo.dish[i].data.options.length ; j ++ ) {
                        var curOption = checkoutInfo.dish[i].data.options[j];
                        var options = new Object();
                        options.index = curOption.groupRid;
                        options.option = curOption.rids;
                        optionGroup.push(options);
                    }
                    dish.optionGroup = optionGroup;
                }

                dishes.push(dish);
            }

            ////console.log(dishes);
            var delivery = checkoutInfo.delivery;
            var payment = checkoutInfo.payment;

            /*
             delivery.firstName = checkoutInfo.address.first_name;
             delivery.lastName = checkoutInfo.address.last_name;
             delivery.street = checkoutInfo.address.address;
             delivery.city = checkoutInfo.address.city;
             delivery.state = checkoutInfo.address.state;
             delivery.phone = checkoutInfo.address.phone;
             */

            var body = new Object();
            body.item = dishes;
            body.delivery = delivery;
            body.payment = payment;
            body.platform = 'opApp' ;
            var userId = userInfo.getForm().findField("userId").getValue();
            if ( userId != 'Guest' ) {
                body.userId = userId;
            } else {
                body.userId = '0';
            }
            //body.type = type;
            body.comment = checkoutInfo.comment;
            ////console.log(Ext.getCmp('operator-regionlist'));
            ////console.log(Ext.getCmp('operator-regionlist').getSelectionModel());
            ////console.log(Ext.getCmp('operator-regionlist').getSelectionModel().getSelecton());
            body = JSON.stringify( body );
            //console.log(body);
            Ext.Ajax.request({
                url: Ext.getCmp( 'Employee-Header').getServerUrl() + '/order', // you can fix a parameter like this : url?action=anAction1
                method: 'POST',
                headers: Ext.getCmp( 'Employee-Header').getHeaders( 'post' ),
                jsonData:body,
                success: function(result, request) {
                    me.getView().setLoading(false);
                    var response = Ext.decode( result.responseText );
                    if ( response.error ) {
                        if ( response.error.errorCode) {
                            Ext.Msg.alert( response.error.errorCode.toString(), response.error.errorMessage.toString() );
                        } else if ( response.data ){
                            Ext.Msg.alert( 'Success' , 'Order has been submitted.' );
                        } else {
                            Ext.Msg.alert( 'Error' , 'Unknown Error' );
                        }
                    } else {
                        Ext.Msg.alert( 'Server Error' , 'Unknown message received from server.' );
                    }
                }
            });
        }
    },

    popOutAlerts:function(item) {
        if ( item == 'namephone') Ext.Msg.alert('Error','Please fill out name and phone!');
        if ( item == 'address') Ext.Msg.alert('Error','Please confirm address!');
        if ( item == 'checkout') Ext.Msg.alert('Error','Please checkout first!');
        if ( item == 'card') Ext.Msg.alert('Error','Please fill out card information');
    }
})