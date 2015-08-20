/**
 * Created by devo on 7/6/2015.
 */
Ext.define('517Employee.view.operator.newOrder.checkout.CheckoutSearch', {
    extend: 'Ext.grid.Panel',

    //itemId:'restaurant-info',
    requires:[
        '517Employee.view.operator.newOrder.checkout.CheckoutSearchController'
    ],
    xtype: 'employee-operator-newOrder-checkout-checkoutSearch',
    store: Ext.create( '517Employee.store.operator.newOrder.checkout.checkoutSearch.UserRecord'),
    columnLines: true,

    title:'Search User',
    header:{ height:30 ,padding:'0 10 0 10',margin:'0 0 0 0', titleAlign:'left'},
    referenceHolder:true,
    controller:'employee-operator-newOrder-checkout-checkoutSearch-controller',
    autoScroll: true,
    userAddressRecords:[],
    userPaymentRecords:[],
    userAddressLoaded:false,
    userPaymentLoaded:false,
    userInfo:{},

    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 75,
        msgTarget: 'qtip'
    },
    initComponent: function() {
        var me = this;
        me.tbar = [
            'Search By',
            {

                xtype:'combobox',
                store:Ext.create( '517Employee.store.operator.newOrder.checkout.checkoutSearch.SearchType' ),
                id:'Employee-Operator-NewOrder-Checkout-CheckoutSearch-SearchType',
                displayField: 'name',
                editable:false,
                valueField: 'filterBy',
                width:100,
                listeners: {
                    change:function( field , newVal , oldVal , func ){

                        var phoneValueField = field.up().items.items[ 3 ];
                        var usernameValueFiled = field.up().items.items[ 4 ];

                        if ( newVal == 'phone' ) {
                            phoneValueField.show();
                            usernameValueFiled.hide();
                        } else {
                            phoneValueField.hide();
                            usernameValueFiled.show();
                        }

                    },
                    afterRender:function( field,b,c,d,e,f,g) {
                        field.setValue( this.getStore().getAt( 0 ).get('filterBy') );

                    }
                }

            },':',
            {
                xtype: 'textfield',
                name: 'phoneValueField',
                id:'Employee-Operator-NewOrder-Checkout-CheckoutSearch-SearchPhoneField',
                hideLabel: true,
                width: 200,
                enforceMaxLength: true,
                minLength: '10',
                maxLength: '10',
                maskRe: /[0-9.]/,

            },
            {
                xtype: 'textfield',
                name: 'usernameValueField',
                id:'Employee-Operator-NewOrder-Checkout-CheckoutSearch-SearchUsernameField',
                hideLabel: true,
                width: 200,
                listeners: {
                    afterRender:function(){
                        this.hide();
                    }
                }
            },
            {
                xtype: 'button',
                text: 'GO',
                tooltip: 'Search User',
                handler: 'searchUser'
                //scope: me
            },
            {
                xtype: 'button',
                text: 'Clear',
                tooltip: 'Clear Search',
                handler: function(){
                    this.up().up().resetAll()
                }
            }
        ];
        me.callParent(arguments);
    },
    columns: [
        {
            xtype: 'rownumberer',
            width:25,
        },
        {
            text: 'Name',
            //width:150,
            flex: 2,
            //sortable: true,
            dataIndex: 'fullName'
        },
        {
            xtype: 'actioncolumn',
            text: '+',
            menuDisabled: true,
            sortable: false,
            align:'center',
            maxwidth: 25,
            width:25,
            items: [
                {
                    iconCls: 'add',
                    tooltip: 'Choose Name',
                    handler: 'addName',
                    align: 'center',
                },
            ]

        },
        {
            text: 'Street',
            //width:60,
            flex: 5,
            //sortable: true,
            dataIndex: 'streetroom'
        },
        {
            xtype: 'actioncolumn',
            text: '+',
            menuDisabled: true,
            sortable: false,
            align:'center',
            maxwidth: 25,
            width:25,
            items: [
                {
                    iconCls: 'add',
                    tooltip: 'Choose Info',
                    handler: 'addStreet',
                    align: 'text-align:center',
                },
            ]

        },
        {
            text: 'Card',
            width:50,
            maxwidth:50,
            //flex: 2,
            //sortable: true,
            dataIndex: 'number'
        },
        {
            xtype: 'actioncolumn',
            text: '+',
            menuDisabled: true,
            sortable: false,
            align:'center',
            maxwidth: 25,
            width:25,
            items: [
                {
                    iconCls: 'add',
                    tooltip: 'Choose Info',
                    handler: 'addCard',
                    align: 'center',
                },
            ]

        },
        {
            text: 'Username',
            //width:60,
            flex: 4,
            //sortable: true,
            dataIndex: 'username'
        },
        {
            xtype: 'actioncolumn',
            text: '+',
            menuDisabled: true,
            sortable: false,
            align:'center',
            maxwidth: 25,
            width:25,
            items: [
                {
                    iconCls: 'add',
                    tooltip: 'Choose Username',
                    handler: 'addUsername',
                    align: 'center',
                },
            ]

        },
        {
            xtype: 'actioncolumn',
            text: '+',
            menuDisabled: true,
            sortable: false,
            align:'center',
            maxwidth: 25,
            width:25,
            items: [
                {
                    iconCls: 'buy-col',
                    tooltip: 'Choose Record',
                    handler: 'addRecord',
                    align: 'center',
                },
            ]

        },
    ],
    resetAll:function() {
        this.getStore().loadData( [] , false );
        this.setLoading( false );
        this.setTitle( 'Search User' );
        this.userAddressLoaded = false;
        this.userPaymentLoaded = false;
        this.userAddressRecords = [];
        this.userPaymentRecords = [];
        this.userInfo = {};
        var searchTypeCombo = Ext.getCmp( 'Employee-Operator-NewOrder-Checkout-CheckoutSearch-SearchType');
        var searchPhoneField = Ext.getCmp( 'Employee-Operator-NewOrder-Checkout-CheckoutSearch-SearchPhoneField');
        var searchUsernameField = Ext.getCmp( 'Employee-Operator-NewOrder-Checkout-CheckoutSearch-SearchPhoneField');
        if ( searchTypeCombo ) searchTypeCombo.setValue( searchTypeCombo.getStore().getAt( 0 ).get('filterBy') );
        if ( searchPhoneField ) searchPhoneField.setValue( '' );
        if ( searchUsernameField ) searchUsernameField.setValue( '' );

    },
    getAjaxRequestResponse:function( responseMessage , returnType ) {
        var me = this;
        switch ( returnType ) {
            case 'userInfo':
                me.getSearchRecord( responseMessage );
                break;
            case 'addressInfo':
                me.addUserInfo( 'addressInfo' , responseMessage );
                break;
            case 'paymentInfo':
                me.addUserInfo( 'paymentInfo' , responseMessage );
                break;
        }

    },
    getSearchRecord:function( responseMessage ) {
        var me = this;
        if ( responseMessage.error == false ) {
            if ( responseMessage.data.length > 0 ) {
                if ( responseMessage.data[ 0 ].userId ) {
                    var userId = responseMessage.data[ 0 ].userId;
                    me.userInfo = responseMessage.data[ 0 ];
                    Ext.getCmp( 'Employee-Header').searchUserInfo( me , '/user/address' , 'get' , 'userId' , userId , 'addressInfo' );
                    Ext.getCmp( 'Employee-Header').searchUserInfo( me , '/user/payment' , 'get' , 'userId' , userId , 'paymentInfo' );
                }
            }
        }
    },
    addUserInfo:function( type , responseMessage ) {
        var me = this;
        var url,returnType;
        if ( responseMessage.error == false ) {
            var data = responseMessage.data;
            if ( type == 'addressInfo' ) {
                me.userAddressRecords = data;
                me.userAddressLoaded = true;
            } else if ( type == 'paymentInfo' ) {
                me.userPaymentLoaded = true;
                me.userPaymentRecords = data;
            }
            if ( me.userAddressLoaded == true && me.userPaymentLoaded == true ) {
                me.loadSearchRecord();
            }
        }
    },
    loadSearchRecord:function() {
        console.log( this );
        var me = this;
        var mixedRecords = Ext.getCmp( 'Employee-Header').mergeObjects( 'array' , me.userAddressRecords , me.userPaymentRecords );
        if ( mixedRecords.length > 0 ) {
            var store = me.getStore();
            for ( var i = 0 ; i < mixedRecords.length ; i ++ ) {
                if ( me.userInfo.email ) {
                    mixedRecords[ i].username = me.userInfo.email;
                } else if ( me.userInfo.phone ) {
                    mixedRecords[ i].username = me.userInfo.phone;
                }
            }
            store.add( mixedRecords );
        }
    },
    resetSearchInfo:function(){
        this.userAddressLoaded = false;
        this.userPaymentLoaded = false;
        this.userAddressRecords = [];
        this.userPaymentRecords = [];
        this.userInfo = {};
        this.getStore().loadData( [] , false );
    }
});