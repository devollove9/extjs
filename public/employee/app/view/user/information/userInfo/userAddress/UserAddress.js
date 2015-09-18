/**
 * Created by devo on 8/9/2015.
 */
Ext.define('517Employee.view.user.information.userInfo.userAddress.UserAddress', {
    extend: 'Ext.grid.Panel',

    xtype: 'employee-user-information-userInfo-userAddress',
    //controller: 'employee-user-information-userInfo-userAddress-controller',
    store: Ext.create( '517Employee.store.user.information.userInfo.userAddress.UserAddress' ),
    title: 'User Addresss',

    header:{ titleAlign: 'left' , height:30 , padding:'0 10 0 10' },
    collapsible: true, columnLines:true ,
    maxHeight: 270 , autoScroll:true ,

    /* Variables */
    changed:false,changedString:[],
    // Variable detect if editing
    gridEditing: false ,
    // Window Opened in this View
    windowPopUp:[],
    // Address Loaded
    paymentLoaded:false,
    // Address Id
    paymentId:'',
    // payment Data
    paymentData:[],
    /* Content */
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            height: 30,
            defaults:{
                height:19
            },
            items: [
                {
                    xtype: 'button',
                    iconCls: 'fa fa-plus',
                    text: 'Save To Server',
                    handler:function(){
                        this.up().up().saveAddresss();
                    }
                },
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    iconCls: 'fa fa-plus',
                    text: '(Temporary)New Address',
                    handler:function(){
                        this.up().up().newQuickAddress();
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'fa fa-plus',
                    text: 'New',
                    handler:function(){
                        this.up().up().newAddress();
                    }
                }
            ]
        }
    ],
    columns:[
        {
            text     : 'Role',
            flex     : 1,
            sortable : false,
            dataIndex: 'role'
        },
        {
            text     : 'Region',
            flex     : 1,
            sortable : false,
            dataIndex: 'parameter',
            renderer: function( value , metaData , record ) {
                var regionName = "*";
                if ( value ) {
                    if ( value.length > 0 ) {
                        for( var i = 0 ; i < value.length ; i ++ ) {
                            var param = value[ i ];
                            if ( param.key ) {
                                if ( param.key == 'regionId' ) {
                                    regionName = param.value;
                                }
                            }
                        }
                    }
                }
                return regionName;
            }
        },
        {
            menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            width: 45,
            items: [
                {
                    iconCls: 'edit-col',
                    tooltip: 'Check/Edit Address',
                    handler:function( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine , tr ){
                        //Ext.getCmp( 'Employee-Header').editAddress( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine , tr );
                    }
                },
                {
                    iconCls:'delete-col',
                    tooltip:'Delete Address',
                    handler:function( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine , tr ){
                        var me = this;
                        var grid = me.up().up();
                        Ext.getCmp( 'Employee-Header').deleteAddress( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine , tr );
                    }
                }
            ]
        }
    ],
    getViewData:function() {
        var me = this;
        var store = this.getStore();
        var businessHour = [];
        store.each( function( record , idx ) {
            var newBusinessHour = new Object();
            ////console.log(record);
            newBusinessHour.day = record.data.day;
            newBusinessHour.start = record.data.start;
            newBusinessHour.end = record.data.end;
            businessHour.push( newBusinessHour );
        });
        return businessHour;
    },
    loadAddress:function( paymentData ) {
        var me = this;
        me.resetAll();
        var data = paymentData.data;

        me.paymentData =  paymentData.data;
        if ( data ) {
            var payment = [];
            if ( data[ 0].paymentId ) {
                me.paymentLoaded = true;
                payment = data[ 0 ].payment;
                me.paymentId = data[ 0 ].paymentId;
            } else if ( data.paymentId ) {
                me.paymentLoaded = true;
                payment = data.payment;
                me.paymentId = data.paymentId;
            }
        }

        me.getStore().add( payment );
    },
    addAddress:function( payment ) {
        var me = this;
        if ( payment ) {
            var newAddress = new Object();
            if (payment.role) {
                newAddress.role = payment.role;
            }
            newAddress.parameter = [];
            newAddress.restrict = [];
            newAddress.action =[ '*' ];
            if ( payment.role != 'admin' ) {
                var newParam = new Object();
                newParam[ 'key' ] = 'regionId';
                newParam[ 'value' ] = payment.regionId;
                newAddress.parameter.push( newParam );
            }
            if ( payment.role == 'store ' ) {
                var newParam = new Object();
                newParam[ 'key' ] = 'storeId';
                newParam[ 'value' ] = payment.storeId;
                newAddress.parameter.push( newParam );
            }
            me.changed = true;
            me.getStore().add( newAddress );


        }

    },
    getAddresss:function ( userId ) {
        if ( userId ) {
            var me = this;
            me.userId = userId;
            Ext.getCmp( 'Employee-Header').searchUserAddress( me , userId , 'searchUserAddress' );
        }
    },
    getAjaxRequestResponse:function( returnMessage , returnType ) {
        var me = this;
        if ( returnMessage.error == false ) {
            switch( returnType ) {
                case 'searchUserAddress':
                    me.loadAddress( returnMessage );
                    break;
                case 'changeUserAddress':
                    Ext.Msg.alert( 'Success' , "User's payment has been changed." );
                    break;
            }
        }
    },
    saveAddresss:function() {
        var me = this;
        var userInfo = me.up();

        if ( userInfo.userLoaded == true && me.changed == true ) {
            Ext.Msg.show({
                title:'Save Address?',
                msg: 'You will save payment to server <br/>Would you like to proceed?',
                buttons: Ext.Msg.YESNO,
                fn: function( btn,text ) {
                    if ( btn == 'yes' ) {
                        var userId = me.up().userId;
                        var jsonData = new Object();
                        var method;
                        var oldAddresss = Ext.getCmp( 'Employee-Header').copyStoreToArray( me.getStore() );
                        jsonData.payment = Ext.getCmp( 'Employee-Header').copyAddress( oldAddresss );
                        if ( me.paymentLoaded == true ) {
                            jsonData.paymentId = me.paymentId;
                            method = 'put';
                        } else {
                            jsonData.userId = userId;
                            method = 'post'
                        }
                        if ( jsonData.payment.length > 0 ) {
                            jsonData = JSON.stringify( jsonData );
                            Ext.getCmp( 'Employee-Header').sendCustomAjaxRequest( me , '/user/payment' , method , null , jsonData , 'changeUserAddress' );
                        }
                    }
                },
                animEl: 'elId'
            });
        }
    },

    addOpenedWindow:function( window ) {
        this.windowPopUp.push( window );
        this.gridEditing = true;
    },
    closeWindowPopUp:function() {
        var windows = this.windowPopUp;
        for ( var i = 0 ; i < windows.length ; i ++ ) {
            var window = windows[ i ];
            window.close();
        }
        this.gridEditing = false;
        this.windowPopUp = [];
    },
    resetAll:function() {
        this.paymentLoaded = false;
        this.paymentId = '';
        this.paymentData = [];
        this.changed = false;
        this.changedString = [];
        this.getStore().loadData( [] , false );
        this.setTitle( 'User Addresss' );
        this.closeWindowPopUp();
    },
    newQuickAddress:function() {
        var me = this;
        var win;
        if ( me.gridEditing == true ) {
            Ext.Msg.alert( 'Error' , 'A window already opened, please close it first.' );
        } else {
            if (!win) {
                var win = Ext.create( 'Ext.window.Window' , {
                    xtype: 'employee-user-information-userInfo-userAddress-newAddress-quickAddressCreationWindow',
                    title: 'Create New Address',
                    width:400,resizable:false,
                    height:165,
                    listeners:{
                        'close':function( win ) {
                            me.gridEditing = false;
                        }
                    }
                });
                var quickAddressCreation = Ext.create( '517Employee.view.user.information.userInfo.userAddress.newAddress.QuickAddressCreation' );
                win.insert( quickAddressCreation );
                me.addOpenedWindow( win ) ;
                win.show();
            }
        }
    },

    newDriver:function(){
        var me = this;

    },
    newOperator:function(){

    }

});