/**
 * Created by devo on 7/6/2015.
 */
Ext.define( '517Employee.view.operator.newOrder.checkout.UserInfo' , {
    extend: 'Ext.form.Panel',

    requires:[
        '517Employee.view.operator.newOrder.checkout.UserInfoController'
    ],
    xtype: 'employee-operator-newOrder-checkout-userInfo',
    controller:'employee-operator-newOrder-checkout-userInfo-controller',

    title: 'Checkout Info',
    header:{ titleAlign: 'left' , height:30 , padding:'0 10 0 10', margin:'0 0 0 0' },
    bodyPadding: 20,
    autoScroll: true,
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 75,
        msgTarget: 'qtip'
    },

    /* Variables */
    // Delivery Types
    deliverType:0,

    // If is Guest order
    guestStatus:true,

    // Field **** is empty
    userIdStatus:false,
    addressStatus:false,
    couponStatus:false,
    tipStatus:false,

    // Store Information
    checkoutStoreId:null,

    // Delivery Information
    deliveryInfo:null,

    // Dish Information
    dishInfo:null,


    items: [
        {
            xtype: 'fieldset',
            title: 'Choose Type',
            id:'Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio',
            defaultType: 'textfield',
            choosedType:0,
            defaults: {
                anchor: '100%'
            },
            items:[
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Type',

                    name:'typeGroup',
                    width:300,
                    items: [
                        {
                            boxLabel: 'Delivery',checked: true,
                            name: 'types',
                            inputValue: 0
                        }, {
                            boxLabel: 'Pick Up',
                            name: 'types',
                            inputValue: 1
                        },
                        {
                            boxLabel: 'Rest-Deliver',
                            name: 'types',
                            inputValue: 3
                        }
                    ],
                    listeners:{
                        change:function( field , newVal , oldVal ) {
                            var restaurantModel = Ext.getCmp( 'Employee-Operator-NewOrder-RestaurantList' ).getSelectionModel();
                            var typeMap = [];
                            Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').choosedType = newVal.types;
                            typeMap[ 0 ] = 'Delivery';
                            typeMap[ 1 ] = 'Pick Up';
                            typeMap[ 3 ] = 'Restaurant Deliver';
                            if ( restaurantModel.hasSelection() ) {
                                var deliverType = restaurantModel.getSelection()[0].data.delivery.method;
                                ////console.log( restaurantModel.getSelection()[0].data );
                                if ( deliverType.indexOf( newVal.types ) > -1 ) {
                                    Ext.getCmp( 'Employee-Operator-NewOrder-Checkout-UserInfo' ).resetAddress();
                                    Ext.getCmp( 'Employee-Operator-NewOrder-Checkout-UserInfo' ).calculateTip();
                                } else {
                                    var string = '';
                                    string = string + 'Restaurant "'+ restaurantModel.getSelection()[0].data.name  + '" does not support '+ typeMap[newVal.types];
                                    if ( oldVal.types == 0 ) {
                                        Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').items.items[0].items.items[1].setValue(false);
                                        Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').items.items[0].items.items[2].setValue(false);
                                        Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').items.items[0].items.items[0].setValue(true);
                                        Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').choosedType = 0;
                                    } else if ( oldVal.types == 1 ) {
                                        Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').items.items[0].items.items[0].setValue(false);
                                        Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').items.items[0].items.items[2].setValue(false);
                                        Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').items.items[0].items.items[1].setValue(true);
                                        Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').choosedType = 1;
                                    } else if ( oldVal.types == 3 ) {
                                        Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').items.items[0].items.items[0].setValue(false);
                                        Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').items.items[0].items.items[1].setValue(false);
                                        Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').items.items[0].items.items[2].setValue(true);
                                        Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').choosedType = 2;
                                    }
                                    //Ext.Msg.alert( 'Warning' , string );
                                }
                            }
                        },
                    }
                },
            ]
        },
        {
            xtype: 'fieldset',
            title: 'User Info',
            defaultType: 'textfield',
            layout: 'anchor',
            defaults: {
                anchor: '100%',
            },
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
                    items: [{
                        name: 'firstName',
                        fieldLabel: 'First Name',
                        flex: 3,
                        emptyText: 'First',
                        allowBlank: false,
                    }, {
                        name: 'lastName',
                        fieldLabel: 'Last Name',
                        flex: 2,
                        margin: '0 0 0 6',
                        emptyText: 'Last',
                        allowBlank: false
                    }]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    //margin: '0 0 5 0',
                    items: [{
                        fieldLabel: 'userId',
                        name: 'userId',
                        value:'Guest',
                        flex: 1,
                        readOnly:true,
                        allowBlank: false
                    },
                        {
                            xtype: 'button',
                            text: 'Check',
                            id: 'operatorCheckUserButton',
                            margin: '0 0 0 5',
                            handler: 'validateuserId'

                        },
                        {
                            fieldLabel: 'Phone',
                            //labelWidth: 100,
                            name: 'phone',
                            flex: 1,
                            emptyText: 'xxx-xxx-xxxx',
                            enforceMaxLength: true,
                            //minLength: '15',
                            maxLength: '10',
                            maskRe: /[0-9.]/,
                            regexText: 'Must be in the format xxx-xxx-xxxx'
                        }]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    items: [
                        {
                            fieldLabel: 'Street',
                            name: 'street',
                            flex: 5
                        },
                        {
                            fieldLabel: 'Room',
                            name: 'room',
                            flex: 2
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
                            name: 'city',
                            value:'East Lansing',
                            flex: 5
                        }, {
                            name: 'state',
                            fieldLabel: 'State',
                            value:'MI',
                            flex: 3
                        }, {
                            name: 'zipAddress',
                            fieldLabel: 'Zip',
                            //width: 150,
                            flex: 4,
                            maskRe: /[0-9.]/,
                        }]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'right',  // or 'right'
                        pack: 'center' // controls vertical align

                    },
                    items: [
                        {
                            xtype: 'button',
                            text: 'Confirm',
                            id: 'Employee-Operator-NewOrder-Checkout-UserInfo-ConfirmAddressButton',
                            margin: '5 0 5 0',
                            handler: 'validateAddress'

                        }
                    ]
                },
            ]

        },
        {
            xtype: 'fieldset',
            title: 'Payment Info',
            id: 'Employee-Operator-NewOrder-Checkout-UserInfo-PaymentRadio',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items:[
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Method',
                    width:300,
                    name:'paymentGroup',
                    items: [ {
                        checked: true,
                        boxLabel: 'Card',
                        name: 'paymentMethod',
                        inputValue: 1,

                    }, {
                        boxLabel: 'Cash',
                        name: 'paymentMethod',
                        inputValue: 0
                    }],
                    listeners:{
                        change:function( field , newVal , oldVal ) {
                            var regionModel = Ext.getCmp( 'Employee-Operator-NewOrder-RestaurantList' ).getSelectionModel();
                            var typeMap = [];
                            typeMap[ 0 ] = 'Cash';
                            typeMap[ 1 ] = 'Card';
                            if ( regionModel.hasSelection() ) {
                                var paymentType = regionModel.getSelection()[0].data.paymentType;
                                if ( paymentType.indexOf( newVal.paymentMethod ) > -1 ) {
                                } else {
                                    var string = '';
                                    string = string + 'Restaurant "'+ regionModel.getSelection()[0].data.name  + '" does not support '+ typeMap[newVal.paymentMethod];
                                    if ( oldVal.paymentMethod == 0 ) {
                                        Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-PaymentRadio').items.items[0].items.items[0].setValue(false);
                                        Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-PaymentRadio').items.items[0].items.items[1].setValue(true);
                                    } else if ( oldVal.paymentMethod == 1 ) {
                                        Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-PaymentRadio').items.items[0].items.items[1].setValue(false);
                                        Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-PaymentRadio').items.items[0].items.items[0].setValue(true);
                                    }
                                    Ext.Msg.alert( 'Warning' , string );
                                }
                            }

                        },

                    }
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    combineErrors: true,
                    defaultType: 'textfield',
                    items: [
                        {
                            xtype : 'hidden',  //should use the more standard hiddenfield
                            name  : 'paymentCardLoaded',
                            value : false
                        },
                        {
                            name: 'card',
                            fieldLabel: 'Card No.',
                            flex: 5,
                            enforceMaxLength: true,
                            //minLength: '15',
                            maxLength: '16',
                            maskRe: /[0-9.]/,
                            listeners: {
                                change: {
                                    fn: function(field,field_value,inputs,this_obj){
                                        //var me = this;
                                        ////console.log(field_value);
                                    },
                                    scope: this,
                                    buffer: 1500
                                },
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'New',
                            tooltip: 'Enable Change',
                            margin: '0 0 0 5',
                            handler: function(button,click_event) {
                                var paymentLoaded=this.up().items.items[0];
                                var cardField = this.up().items.items[1];
                                var paymentIndex = this.up().items.items[4];
                                ////console.log(paymentLoaded.getValue());
                                if ( paymentLoaded.getValue() == 'true' ) {
                                    Ext.Msg.show({
                                        title:'Warning',
                                        msg: 'This will cancel saved card information, Continue?',
                                        buttons: Ext.Msg.YESNO,
                                        fn: function(btn,text){
                                            if ( btn == 'yes' ) {
                                                paymentLoaded.setValue(false);
                                                cardField.setReadOnly(false);
                                                cardField.setValue('');
                                                paymentIndex.setValue('');
                                                //console.log(paymentLoaded.getValue());
                                            } else if ( btn == 'no' ) {

                                            }
                                        },
                                        animEl: 'elId'
                                    });
                                }



                            },
                            //scope: me
                        },
                        {
                            name: 'cvv',
                            fieldLabel: 'CVV',
                            enforceMaxLength: true,
                            maxLength: '4',
                            maskRe: /[0-9.]/,
                            flex: 2,
                        },
                        {
                            xtype : 'hidden',  //should use the more standard hiddenfield
                            name  : 'paymentCardIndex',
                            value : ''
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    combineErrors: true,
                    defaultType: 'textfield',
                    items: [{
                        name: 'month',
                        fieldLabel: 'Month',
                        flex: 2,
                        enforceMaxLength: true,
                        maxLength: '2',
                        maskRe: /[0-9.]/,
                    }, {
                        name: 'year',
                        fieldLabel: 'Year',
                        flex: 2,
                        enforceMaxLength: true,
                        maxLength: '2',
                        maskRe: /[0-9.]/,
                    },{
                        name: 'zipCard',
                        fieldLabel: 'Zip',
                        //width: 150,
                        flex: 2,
                        enforceMaxLength: true,
                        maxLength: '5',
                        maskRe: /[0-9.]/,
                    }
                    ]
                },

            ]
        },
        {
            xtype: 'fieldset',
            title: 'Choose Tip',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items:[
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Tip',
                    name:'tipGroup',
                    width:300,
                    items: [ {

                        boxLabel: '10%',
                        name: 'tips',
                        inputValue: '0.1'
                    }, {
                        boxLabel: '15%',
                        name: 'tips',
                        checked: true,
                        inputValue: '0.15'
                    },
                        {
                            boxLabel: '20%',
                            name: 'tips',
                            inputValue: '0.2'
                        }
                    ],
                    listeners:{
                        change:function(){
                            this.up().up().calculateTip();
                        }
                    }
                },
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Other Info',
            defaultType: 'textfield',
            layout: 'anchor',
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    //margin: '0 0 5 0',
                    items: [
                        {
                            fieldLabel: 'Coupon',
                            name: 'coupon',
                            //vtype: 'email',
                            flex: 3,
                            allowBlank: false
                        },
                        {
                            xtype: 'button',
                            type: 'vbox',
                            align: 'right',  // or 'right'
                            pack: 'center', // controls vertical align

                            text: 'Check',
                            margin: '0 10 0 10',
                            flex: 1,
                            //handler: 'searchUser'

                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items:
                        [
                            {
                                xtype: 'textareafield',
                                name: 'comments',
                                fieldLabel: 'Comments',
                                flex:1,
                            },
                        ]
                },

            ]

        },
        {
            xtype: 'fieldset',
            title: 'Order Info',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'displayfield',
                    name:'subtotal',
                    fieldLabel: 'Sub Total',
                    fieldStyle: 'text-align:right;margin-right:50px;',

                    value: '0',
                    labelWidth:100,
                    renderer:function(val){
                        var value = parseFloat(val);
                        return value.toFixed(2);
                    }
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Delivery Fee',
                    fieldStyle: 'text-align:right;margin-right:50px;',
                    name:'delivery',
                    value: '0',
                    labelWidth:100,
                    renderer:function(val){
                        var value = parseFloat(val);
                        return value.toFixed(2);
                    }
                },
                {
                    xtype: 'displayfield',
                    name:'tax',
                    fieldLabel: 'Tax',
                    fieldStyle: 'text-align:right;margin-right:50px;',
                    value: '0',
                    labelWidth:100,
                    renderer:function(val){
                        var value = parseFloat(val);
                        return value.toFixed(2);
                    }
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Tip',
                    fieldStyle: 'text-align:right;margin-right:50px;',
                    name:'tip',
                    value: '0',
                    labelWidth:100,
                    renderer:function(val){
                        var value = parseFloat(val);
                        return value.toFixed(2);
                    }
                },
                {
                    xtype: 'displayfield',
                    name:'total',
                    fieldLabel: 'Total',
                    fieldStyle: 'text-align:right;margin-right:50px;',
                    value: '0',
                    labelWidth:100,
                    renderer:function(val){
                        var value = parseFloat(val);
                        return value.toFixed(2);
                    }
                },

            ]
        },
        {
            xtype:'tbfill'
        },
        {
            dock: 'bottom',
            xtype: 'toolbar',
            border:false,
            items: [
                {
                    xtype: 'tbfill'
                },

                {
                    xtype: 'button',
                    text: 'Submit',
                    handler:'submitOrder'
                }
            ]
        }
    ],

    resetAll:function(){

        this.checkoutStoreId = null;
        this.dishInfo = null;
        this.deliveryInfo = null;

        this.guestStatus = false;
        this.userIdStatus = false;
        this.addressStatus = false;
        this.couponStatus = false;
        this.tipStatus = false;

    },

    calculateDelivery:function(){
        this.calculateTip();
    },

    calculateTip:function(){
        var tipRate = this.getForm().findField("tipGroup").getValue().tips;
        var subtotal= this.getForm().findField('subtotal').getValue();
        var delivery= this.getForm().findField('delivery').getValue();
        var tax= this.getForm().findField('tax').getValue();
        var tip = ( subtotal + delivery + tax ) * tipRate;
        if (  Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').choosedType == 1 ) {
            this.getForm().findField('tip').setValue(0);
        } else {
            this.getForm().findField('tip').setValue(tip);
        }

        this.calculateTotal();
    },
    calculateTotal:function(){
        var userform = this.getForm();
        var subtotal= userform.findField('subtotal').getValue();
        var tip= userform.findField('tip').getValue();
        var delivery= userform.findField('delivery').getValue();
        var tax= userform.findField('tax').getValue();
        var total = subtotal + tip + delivery + tax;
        userform.findField('total').setValue(total);
    },
    calculateCoupon:function() {

    },
    resetOrderInfo:function(){
        this.getForm().findField("subtotal").setValue(0);
        this.getForm().findField("tip").setValue(0);
        this.getForm().findField("tax").setValue(0);
        this.getForm().findField("total").setValue(0);
        this.getForm().findField("delivery").setValue(0);
        this.deliveryInfo=null;
        this.dishInfo=null;
    },
    resetAddress:function(){
        var userInfoForm = this.getForm();
        Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo').addressStatus = false;
        userInfoForm.findField('street').setReadOnly(false);
        userInfoForm.findField('zipAddress').setReadOnly(false);
        userInfoForm.findField('city').setReadOnly(false);
        userInfoForm.findField('state').setReadOnly(false);
        userInfoForm.findField('room').setReadOnly(false);
        userInfoForm.findField("delivery").setValue(0);
        Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-ConfirmAddressButton').setText('Confirm');
    },
    unlockField:function(field){
        if ( field == 'address' ) {
            this.getForm().findField('street').setReadOnly(false);
            this.getForm().findField('zipAddress').setReadOnly(false);
            this.getForm().findField('city').setReadOnly(false);
            this.getForm().findField('state').setReadOnly(false);
            this.getForm().findField('room').setReadOnly(false);
        }
    },
    lockField:function(field){
        if ( field == 'address' ) {
            this.getForm().findField('street').setReadOnly(true);
            this.getForm().findField('zipAddress').setReadOnly(true);
            this.getForm().findField('city').setReadOnly(true);
            this.getForm().findField('state').setReadOnly(true);
            this.getForm().findField('room').setReadOnly(true);
        }
    },
    checkEmptyField:function(field){
        var flag = true;
        switch(field) {
            case 'card':
                //if ( this.getForm().findField("paymentGroup").getValue().typeGroup == 0 || this.getForm().findField("paymentGroup").getValue().typeGroup == 1 ) break;
                if ( this.getForm().findField("paymentGroup").getValue().paymentMethod != 1 ) break;
                var card = this.getForm().findField('card').getValue();
                var month = this.getForm().findField('month').getValue();
                var year = this.getForm().findField('year').getValue();
                var cvv = this.getForm().findField('cvv').getValue();
                var zip = this.getForm().findField('zipCard').getValue();
                if (!card || !month || !year || !cvv || !zip ||
                    card.lenth<15 || month.length!=2 || year.length!=2 || cvv.length < 3 || zip.length != 5 ) flag =false;
                break;
            case 'namephone':
                var firstName = this.getForm().findField('firstName').getValue();
                var lastName = this.getForm().findField('lastName').getValue();
                var phone = this.getForm().findField('phone').getValue();
                if (!firstName || !lastName) flag =false;
                if (!phone || phone.length != 10 ) flag = false;
                break;
        }
        return flag;
    },
    getCheckoutInfo:function() {
        var data = new Object();
        data.address={};
        data.charge={};
        data.payment = new Object();
        data.delivery = new Object();
        data.guest = true;
        data.guestInfo = '';
        data.paymentLoaded = false;
        if ( this.getForm().findField('comments').getValue() ) data.comment = this.getForm().findField('comments').getValue();
        data.delivery.type = this.getForm().findField( 'typeGroup' ).getValue().types;
        data.delivery.firstName = this.getForm().findField('firstName').getValue();
        data.delivery.lastName = this.getForm().findField('lastName').getValue();
        data.delivery.phone = this.getForm().findField('phone').getValue();
        if ( Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').choosedType != 1 ) data.delivery.street = this.getForm().findField('street').getValue();
        if ( this.getForm().findField('room').getValue() && Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').choosedType != 1 ) data.delivery.room = this.getForm().findField('room').getValue();
        if ( Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').choosedType != 1 ) data.delivery.city = this.getForm().findField('city').getValue();
        if ( Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').choosedType != 1 ) data.delivery.state = this.getForm().findField('state').getValue();
        if ( Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').choosedType != 1 ) data.delivery.zip= this.getForm().findField('zipAddress').getValue();

        data.payment.method = this.getForm().findField("paymentGroup").getValue().paymentMethod;
        if ( Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').choosedType != 1 ) data.payment.tip = this.getForm().findField("tipGroup").getValue().tips;
        if ( data.payment.method == 1 ) {
            ////console.log(this.getForm().findField("paymentCardLoaded").getValue());
            data.payment.card = new Object();
            if (this.getForm().findField("paymentCardLoaded").getValue() == 'true') {
                //data.paymentLoaded = true;
                data.payment.paymentId  = this.getForm().findField('paymentCardIndex').getValue();
            } else {
                data.payment.card.number = this.getForm().findField("card").getValue();
                data.payment.card.expire = this.getForm().findField("month").getValue() + '' + this.getForm().findField('year').getValue();
                //data.payment.year =
            }

            data.payment.card.cvv = this.getForm().findField("cvv").getValue();
            data.payment.card.zip = this.getForm().findField("zipCard").getValue();
        }
        data.guest = this.guestStatus;


        //if ( data.guest == false ) {
        //    data.userId = this.getForm().findField('userId').getValue();
        //}

        /*
         data.charge.subtotal = this.getForm().findField('subtotal').getValue();
         data.charge.delivery = this.getForm().findField('delivery').getValue();
         data.charge.tax = this.getForm().findField('tax').getValue();
         data.charge.tip = this.getForm().findField('tip').getValue();
         data.charge.total = this.getForm().findField('total').getValue();
         data.charge.zip = this.getForm().findField('zipCard').getValue();
         */
        data.comments = this.getForm().findField('comments').getValue();
        data.dish = this.dishInfo;
        ////console.log( this.dishInfo);
        //data.charge.discount = this.getForm().findField('discount').getValue();
        return data;
    }

});




