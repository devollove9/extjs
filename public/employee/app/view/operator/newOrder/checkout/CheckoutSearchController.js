/**
 * Created by devo on 7/6/2015.
 */
Ext.define('517Employee.view.operator.newOrder.neworder.CheckoutSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.operator-search',
    requires: [

    ],

    searchUser:function(model,rowindex,columns,button_object,event,lineRecord) {
        var search_field = Ext.getCmp('userrecordsearchfield');
        var resultList = Ext.getCmp('operator-checkoutsearch');
        var region = Ext.getCmp( 'operator-regionlist' );
        var resultStore = resultList.getStore();
        resultStore.loadData([],false);
        //console.log(resultList);
        if ( region.getSelectionModel().hasSelection() ) {
            var phone_number=search_field.value;
            resultList.setTitle('Search user by phone: ' +phone_number);
            resultList.setLoading(true);
            Ext.Ajax.request({
                url: 'operator/information/getInformation', // you can fix a parameter like this : url?action=anAction1
                method: 'GET',
                params: {
                    method : 'search_user' ,
                    regionId: region.getSelectionModel().getSelection()[0].data.regionId,
                    phone : phone_number
                },
                success: function(result, request) {
                    var obj = Ext.decode(result.responseText);
                    //console.log(obj);
                    if ( obj.success == 1) {
                        console.log("search success");
                        var records= obj.addresses;
                        //console.log(model);
                        resultStore.add(records);
                        resultList.reconfigure();
                        console.log(resultStore);
                    } else if (obj.success == 2 ) { //not found
                    } else if (obj.success == -1) {
                    } //Error
                    resultList.setLoading(false);
                    Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('phone').setValue(phone_number);
                }
            });
            //console.log(columns);
            //console.log(button_object);
            //console.log(event);
            //console.log(dishRecord);
        } else {
            Ext.Msg.alert( 'Error' , 'Please choose a region first.' );
        }


    },
    clearSearch:function(model,rowindex,columns,button_object,event,lineRecord) {
        var search_field = Ext.getCmp('userrecordsearchfield');
        var resultList = Ext.getCmp('operator-checkoutsearch');

        var resultStore = resultList.getStore();
        resultStore.loadData([],false);
        //console.log(resultList);
        search_field.reset();
        resultList.setTitle('Search User ');


    },
    addName:function(model,rowindex,columns,button_object,event,lineRecord) {
        //console.log(model);
        //console.log(rowindex);
        //console.log(columns);
        //console.log(button_object);
        //console.log(event);
        //console.log(dishRecord);
        if ( lineRecord.data.name ) {
            var first_name = lineRecord.data.firstName;
            var last_name = lineRecord.data.lastName;
            Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('first_name').setValue(first_name);
            Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('last_name').setValue(last_name);
        }

    },
    addStreet:function(model,rowindex,columns,button_object,event,lineRecord) {
        //console.log(model);
        //console.log(rowindex);
        //console.log(columns);
        //console.log(button_object);
        //console.log(event);
        //console.log(dishRecord);
        if ( lineRecord.data.streetroom ) {
            if ( Ext.getCmp('employee-operator-newOrder-checkout-userInfo').addressStatus == true ) {
                Ext.Msg.alert( 'Warning', 'You need to hit Re-Confirm to add new address');

            } else {
                var street = lineRecord.data.street;
                var state = lineRecord.data.state;

                var city = lineRecord.data.city;
                var zip = lineRecord.data.zip;
                Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('street').setValue(street);
                Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('state').setValue(state);
                Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('city').setValue(city);
                Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('zip_address').setValue(zip);

                if ( lineRecord.data.room != 'undefined') {
                    var room = lineRecord.data.room;
                    Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('room').setValue(room);
                }

            }
        }
    },
    addCard:function(model,rowindex,columns,button_object,event,lineRecord) {
        //console.log(model);
        //console.log(rowindex);
        //console.log(columns);
        //console.log(button_object);
        //console.log(event);
        //console.log(dishRecord);
        if ( lineRecord.data.number ) {
            var card = lineRecord.data.card;
            Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('card').setReadOnly(false);
            Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('card').setValue('');
            Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('month').setValue('');
            Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('year').setValue('');
            Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('payment_cardIndex').setValue('');
            Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('payment_cardLoaded').setValue(false);
            //if (card != "cash"){
            //console.log(lineRecord);

            Ext.getCmp('operator-checkout-payment-radio').items.items[0].items.items[0].setValue(true);
            Ext.getCmp('operator-checkout-payment-radio').items.items[0].items.items[1].setValue(false);
            var expire_month = lineRecord.data.expire.substring(0,2);
            var expire_year = lineRecord.data.expire.substring(2,4);
            var paymentId = lineRecord.data.paymentId;
            Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('payment_cardLoaded').setValue(true);
            Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('payment_cardIndex').setValue( paymentId );
            Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('card').setValue('************'+ lineRecord.data.number);
            Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('month').setValue(expire_month);
            Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('year').setValue(expire_year);
            Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('card').setReadOnly(true);
        }
        //} else {
        //    Ext.getCmp('operator-checkout-payment-radio').items.items[0].items.items[0].setValue(false);
        //    Ext.getCmp('operator-checkout-payment-radio').items.items[0].items.items[1].setValue(true);
        //}
    },
    addUsername:function(model,rowindex,columns,button_object,event,lineRecord) {
        //console.log(model);
        //console.log(rowindex);
        //console.log(columns);
        //console.log(button_object);
        //console.log(event);
        //console.log(dishRecord);
        if ( lineRecord.data.username ) {
            var username = lineRecord.data.username;
            if ( username !="Guest" ) {
                Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('username').setValue(username);
                Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('username').setReadOnly(true);
                Ext.getCmp('operator_check_user_button').setText('Re-Enter');
                Ext.getCmp('employee-operator-newOrder-checkout-userInfo').guestStatus=false;
            } else {
                Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('username').setValue('Guest');
                Ext.getCmp('employee-operator-newOrder-checkout-userInfo').getForm().findField('username').setReadOnly(false);
                Ext.getCmp('operator_check_user_button').setText('Check');
                Ext.getCmp('employee-operator-newOrder-checkout-userInfo').guestStatus=true;
            }
        }
    },
    addRecord:function(model,rowindex,columns,button_object,event,lineRecord) {
        //console.log(model);
        //console.log(rowindex);
        //console.log(columns);
        //console.log(button_object);
        //console.log(event);
        //console.log(dishRecord);
        this.addCard(model,rowindex,columns,button_object,event,lineRecord);
        this.addName(model,rowindex,columns,button_object,event,lineRecord);
        this.addStreet(model,rowindex,columns,button_object,event,lineRecord);
        this.addUsername(model,rowindex,columns,button_object,event,lineRecord);
    },


})
