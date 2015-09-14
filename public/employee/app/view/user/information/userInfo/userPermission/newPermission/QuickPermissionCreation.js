/**
 * Created by devo on 9/3/2015.
 */
Ext.define('517Employee.view.user.information.userInfo.userPermission.newPermission.QuickPermissionCreation', {
    extend: 'Ext.form.Panel',
    requires:[
    ],
    xtype: 'employee-user-information-userInfo-userPermission-newPermission-quickPermissionCreation',

    border: false , frame: false,
    margin:'10 10 0 10',
    /* Variables */
    // Variable detect if editing
    gridEditing: false ,
    // Window Opened in this View
    windowPopUp:[],

    userId:'',
    permissionId:'',
    storeId:'',
    permissionProfile:{},
    items:[
        {
            margin: '0 0 0 0',
            xtype: 'fieldcontainer',
            combineErrors: true,
            layout:'hbox',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%',
                margin:'0 5 0 5' ,
                labelAlign: 'right',
                labelWidth:0
            },
            items: [
                {
                    xtype : 'displayfield',
                    value : 'Permission Type: '
                },
                {
                    xtype:'combobox',
                    store:Ext.create( '517Employee.store.user.information.userInfo.userPermission.newPermission.PermissionType' ),
                    name:'permissionType',
                    displayField: 'name',
                    editable:false,
                    valueField: 'permissionType',
                    width:100,
                    //margin: '0 0 0 6',
                    listeners: {
                        afterrender: function(combo) {
                            combo.setValue( combo.getStore().getAt(0).get('permissionType') );

                        },
                        select:function( combo ) {
                            var me = this;
                            var permissionType = me.getValue();
                            var storeCombo = combo.up().up().items.items[ 2 ].items.items[ 1 ];
                            if ( permissionType == 'store' ) {
                                storeCombo.up().show();
                                var regionCombo = combo.up().up().items.items[ 1 ].items.items[ 1 ];
                                regionCombo.setUpStores();
                            } else {
                                storeCombo.up().hide();
                            }
                        }
                    }
                }

            ],
            changeField:function(){
                var me = this;
                var permissionType = me.items.items[ 1 ];
                me.up().handleField( permissionType.getValue() );
            }

        },
        {
            margin: '0 0 0 0',
            xtype: 'fieldcontainer',
            combineErrors: true,
            layout:'hbox',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%',
                margin:'0 5 0 5' ,
                labelAlign: 'right',
                labelWidth:0
            },
            items: [
                {
                    xtype : 'displayfield',
                    value : 'Choose Region: '
                },
                {
                    xtype:'combobox',
                    store:Ext.create( '517Employee.store.user.information.userInfo.userPermission.newPermission.Region' ),
                    name:'region',
                    displayField: 'nameEn',
                    editable:false,
                    valueField: 'regionId',
                    width:140,
                    margin: '0 0 0 15',
                    listeners: {
                        afterrender: function(combo) {
                            var regionStore = Ext.getStore( 'Regions');
                            var regions = Ext.getCmp( 'Employee-Header' ).copyStoreToArray( regionStore );
                            combo.getStore().add( regions );
                            combo.setValue( combo.getStore().getAt(0).get( 'regionId' ) );

                        },
                        select:function( combo ) {
                            var me = this ;
                            var permissionType = combo.up().up().items.items[ 0 ].items.items[ 1].getValue();
                            if ( permissionType == 'store' ) {
                                me.setUpStores();
                            }

                        }
                    },
                    setUpStores:function() {
                        var me = this;
                        var regionId = me.getValue();
                        var storeCombo = me.up().up().items.items[ 2 ].items.items[ 1];
                        var storeComboStore = storeCombo.getStore();
                        storeComboStore.loadData( [] , false );
                        storeCombo.reset();
                        Ext.Ajax.request({
                            method:'get',
                            url:Ext.getCmp( 'Employee-Header' ).getServerUrl() + '/store',
                            headers:Ext.getCmp( 'Employee-Header' ).getHeaders( 'get' ),
                            params:{
                                regionId:regionId
                            },
                            disableCaching:false,
                            success:function( result ){
                                var response = Ext.decode( result.responseText );
                                var Error = Ext.getCmp( 'Employee-Header').processErrorMessage( response );
                                if ( Error == false ) {
                                    var storeData = response.data;
                                    storeComboStore.add( storeData );
                                    storeCombo.setValue( storeComboStore.getAt(0).get( 'storeId' ) );
                                } else {
                                    Ext.Msg.alert( 'Error' , 'Unable to get store information.' );
                                }
                            }
                        });
                    }
                }
            ]
        },
        {
            margin: '0 0 0 0',
            dock:'bottom',
            xtype: 'fieldcontainer',
            combineErrors: true,
            layout:'hbox',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%',
                margin:'0 5 0 5' ,
                labelAlign: 'right',
                labelWidth:0
            },
            items: [
                {
                    xtype : 'displayfield',
                    value : 'Choose Store: '

                },
                {
                    xtype:'combobox',
                    store:Ext.create( '517Employee.store.user.information.userInfo.userPermission.newPermission.Stores' ),
                    name:'store',
                    displayField: 'nameEn',
                    editable:false,
                    valueField: 'storeId',
                    width:250,
                    margin: '0 0 0 24',
                    listeners: {
                        afterrender:function(){
                            var me = this;
                            me.up().hide();
                        }
                    }
                }
            ]
        },
        {
            xtype:'tbfill'
        },
        {
            margin: '5 0 0 0',
            xtype: 'fieldcontainer',
            combineErrors: true,
            layout:'hbox',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%',
                margin:'0 5 0 5' ,
                labelAlign: 'right'
            },
            items: [
                {
                    xtype:'tbfill'
                },
                {
                    xtype:'button',
                    text: 'Add Permission',
                    handler:function( me ) {
                        me.up().up().addPermission();
                    }
                },
                {
                    xtype:'tbfill'
                }
            ]
        }
    ],
    handleField:function( permissionType ) {

    },
    addPermission:function(){
        var me = this;
        Ext.Msg.show({
            title:'Add Permission?',
            msg: 'You will add permission to Local <br/>Would you like to proceed?',
            buttons: Ext.Msg.YESNO,
            fn: function( btn,text ) {
                if ( btn == 'yes' ) {
                    var permissionType = me.items.items[ 0 ].items.items[ 1];
                    var regionCombo = me.items.items[ 1 ].items.items[ 1];
                    var storeCombo = me.items.items[ 2 ].items.items[ 1];
                    var userPermission = Ext.getCmp( 'Employee-User-Information-UserInfo-UserPermission' );
                    var permission = new Object();
                    permission.role = permissionType.getValue();
                    permission.regionId = regionCombo.getValue();
                    if ( permission.role == 'store' ) {
                        permission.storeId = storeCombo.getValue();
                    }
                    userPermission.addPermission( permission );
                    me.up().close();
                }
            },
            animEl: 'elId'
        });

    },
    createUserAccount:function(){
        var me = this;
        var form = me.getForm();
        var activeAccount = form.findField( 'activeAccount' ).getValue();
        var registerType = form.findField( 'registerType' ).getValue();
        var email = form.findField( 'email' ).getValue();
        var phone = form.findField( 'phone' ).getValue();
        var password = form.findField( 'password' ).getValue();
        var passwordReEnter = form.findField( 'passwordReEnter' ).getValue();
        var errorFlag = false;
        var username;
        if ( registerType == 'email' ) {
            if ( ! email || email == '' ) {
                Ext.Msg.alert( 'Error' , 'Please Input Email!' );
                errorFlag = true;
            }
            username = email;
        } else if ( registerType == 'phone' ) {
            if ( ! phone || phone == '' || phone.length != 10 ) {
                Ext.Msg.alert( 'Error' , 'Please Enter Valid Phone Number!' );
                errorFlag = true;
            }
            username = phone;
        }
        if ( ! password || ! passwordReEnter || password == '' || passwordReEnter == '' ) {
            Ext.Msg.alert( 'Error' , 'Please Enter Valid Password!' );
            errorFlag = true;
        } else if ( passwordReEnter != password ) {
            Ext.Msg.alert( 'Error' , 'Password You Entered Do Not Match!' );
            errorFlag = true;
        }
        if ( errorFlag == false ) {
            me.loadingMessage = 'Creating Account...';
            me.registerTypeName = registerType;
            me.username = username;
            var password = CryptoJS.MD5( password).toString();
            var params = {

                password:password
            };
            params[ registerType ] = username;
            var jsonData = JSON.stringify( params );
            if ( activeAccount == true ) {
                if ( registerType == 'phone' ) {
                    Ext.Msg.alert( 'Error' , 'Phone Requires Active Code!' );
                } else {
                    Ext.getCmp( 'Employee-Header').createUserAccount( me , registerType , 'post' , jsonData , 'createActiveUserAccount' );
                }
            } else {
                Ext.getCmp( 'Employee-Header').createUserAccount( me , registerType , 'post' , jsonData , 'createUserAccount' );
            }
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
        this.getStore().loadData( [] , false );
        this.username = '';
        this.userId = '',
            this.registerTypeName= '';
        this.setTitle( 'Create New Permission' );
        this.closeWindowPopUp();
    }

});