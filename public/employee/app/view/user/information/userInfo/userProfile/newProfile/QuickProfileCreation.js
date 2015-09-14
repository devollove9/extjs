/**
 * Created by devo on 9/3/2015.
 */
Ext.define('517Employee.view.user.information.userInfo.userProfile.newProfile.QuickProfileCreation', {
    extend: 'Ext.form.Panel',
    requires:[
    ],
    xtype: 'employee-user-information-userInfo-userProfile-newProfile-quickProfileCreation',

    border: false , frame: false,
    margin:'10 10 0 10',
    /* Variables */
    // Variable detect if editing
    gridEditing: false ,
    // Window Opened in this View
    windowPopUp:[],

    userId:'',
    profileId:'',
    storeId:'',
    profileProfile:{},
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
                    value : 'Profile Type: '
                },
                {
                    xtype:'combobox',
                    store:Ext.create( '517Employee.store.user.information.userInfo.userProfile.newProfile.ProfileType' ),
                    name:'profileType',
                    displayField: 'name',
                    editable:false,
                    valueField: 'profileType',
                    width:100,
                    margin: '0 0 0 38',
                    listeners: {
                        afterrender: function(combo) {
                            combo.setValue( combo.getStore().getAt(0).get('profileType') );

                        },
                        select:function( combo ) {
                            var me = this;
                            var profileType = me.getValue();
                            var storeCombo = combo.up().up().items.items[ 2 ].items.items[ 1 ];
                            var driverName = combo.up().up().items.items[ 3 ].items.items[ 1 ];
                            if ( profileType == 'store' ) {
                                storeCombo.up().show();
                                driverName.up().hide();
                                var regionCombo = combo.up().up().items.items[ 1 ].items.items[ 1 ];
                                regionCombo.setUpStores();
                            } else if ( profileType == 'driver' ) {
                                driverName.up().show();
                                storeCombo.up().hide();
                            }
                        }
                    }
                }

            ],
            changeField:function(){
                var me = this;
                var profileType = me.items.items[ 1 ];
                me.up().handleField( profileType.getValue() );
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
                    store:Ext.create( '517Employee.store.user.information.userInfo.userProfile.newProfile.Region' ),
                    name:'region',
                    displayField: 'nameEn',
                    editable:false,
                    valueField: 'regionId',
                    width:140,
                    margin: '0 0 0 20',
                    listeners: {
                        afterrender: function(combo) {
                            var regionStore = Ext.getStore( 'Regions');
                            var regions = Ext.getCmp( 'Employee-Header' ).copyStoreToArray( regionStore );
                            combo.getStore().add( regions );
                            combo.setValue( combo.getStore().getAt(0).get( 'regionId' ) );

                        },
                        select:function( combo ) {
                            var me = this ;
                            var profileType = combo.up().up().items.items[ 0 ].items.items[ 1].getValue();
                            if ( profileType == 'store' ) {
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
                    store:Ext.create( '517Employee.store.user.information.userInfo.userProfile.newProfile.Stores' ),
                    name:'store',
                    displayField: 'nameEn',
                    editable:false,
                    valueField: 'storeId',
                    width:250,
                    margin: '0 0 0 28',
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
                    value : 'Input Driver Name:'

                },
                {
                    margin:'0 0 0 4',
                    xtype:'textfield',
                    name:'driverName',
                    width:140,
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
                    value : 'Input Email: '

                },
                {
                    xtype:'textfield',
                    margin:'0 0 0 42',
                    name:'email',
                    width:200,
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
                    text: 'Add Profile',
                    handler:function( me ) {
                        me.up().up().addProfile();
                    }
                },
                {
                    xtype:'tbfill'
                }
            ]
        }
    ],

    addProfile:function(){
        var me = this;
        var profileType = me.items.items[ 0 ].items.items[ 1 ];
        var regionCombo = me.items.items[ 1 ].items.items[ 1 ];
        var storeCombo = me.items.items[ 2 ].items.items[ 1 ];
        var driverNameField = me.items.items[ 3 ].items.items[ 1 ];
        var emailField = me.items.items[ 4 ].items.items[ 1 ];
        Ext.Msg.show({
            title:'Add Profile?',
            msg: 'You will add profile to server <br/>Would you like to proceed?',
            buttons: Ext.Msg.YESNO,
            fn: function( btn,text ) {
                if ( btn == 'yes' ) {
                    var profile = new Object();
                    profile.userId = me.userId;
                    profile.regionId = regionCombo.getValue();
                    profile.email = emailField.getValue();
                    var returnType = '';

                    if ( emailField.getValue() == '' ) {
                        Ext.Msg.alert( 'Error' , 'Email is required' );
                    } else if ( profileType.getValue() == 'store' ) {
                        profile.storeId = storeCombo.getValue();
                        profile = JSON.stringify( profile );
                        returnType = 'createStoreProfile';
                        Ext.getCmp( 'Employee-Header' ).createUserProfile( me , profile , returnType );
                    } else if ( profileType.getValue() == 'driver' && driverNameField.getValue() != '' ) {
                        profile.name = driverNameField.getValue();
                        profile = JSON.stringify( profile );
                        returnType = 'createDriverProfile';
                        Ext.getCmp( 'Employee-Header' ).createUserProfile( me , profile , returnType );
                    } else {
                        Ext.Msg.alert( 'Error' , 'Driver name is required' );
                    }
                }
            },
            animEl: 'elId'
        });
    },
    getAjaxRequestResponse:function( returnMessage , returnType ) {
        var me = this;
        if ( returnMessage.error == false ) {
            switch( returnType ) {
                case 'createDriverProfile':
                    Ext.Msg.alert( 'Success' , "User's driver profile has been created" );
                    me.setLoading( false );
                    me.up().close();
                    break;
                case 'createStoreProfile':
                    Ext.Msg.alert( 'Success' , "User's store profile has been created" );
                    me.setLoading( false );
                    me.up().close();
                    break;
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
        this.userId = '';
        this.registerTypeName= '';
        this.setTitle( 'Create New Profile' );
        this.closeWindowPopUp();
    }

});