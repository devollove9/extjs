/**
 * Created by devo on 8/31/2015.
 */

Ext.define( '517Employee.view.user.information.userInfo.UserInfoView' , {
    extend: 'Ext.form.Panel',
    xtype: 'employee-user-information-userInfo',
    //controller:'employee-user-information-userInfo-controller',
    requires:[
        '517Employee.view.user.information.userInfo.userPermission.UserPermission'
    ],
    title: 'User Info',
    header:{ titleAlign: 'left' , height:30 , padding:'0 10 0 10', margin:'0 0 0 0' },
    bodyPadding: 20,
    autoScroll: true,
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 75,
        msgTarget: 'qtip'
    },

    /* Variables */
    // Variable detect if editing
    gridEditing: false ,
    // Window Opened in this View
    windowPopUp:[],
    accountType:'email',
    userLoaded:false,
    userData:{},
    reasonDisabled:'',
    codeDisabled:'',
    userId:'',
    userDisabled:false,

    items: [

        {
            xtype: 'fieldset',
            title: 'Basic Info',
            defaultType: 'textfield',
            layout: 'anchor',
            defaults: {
                anchor: '100%',
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Status',
                    name:'isDisabled',
                    layout: 'hbox',
                    combineErrors: true,
                    defaultType: 'textfield',
                    defaults: {
                        hideLabel: 'true'
                    },
                    items: [
                        {
                            name: 'status',
                            xtype:'displayfield',
                            value: 'Active',
                            editable:false,
                        },
                        {
                            xtype:'hiddenfield',
                            name:'disabled',
                            value:false,
                        },
                        {
                            xtype:'button',
                            margin:'0 20 0 20',
                            name:'activeButton',
                            text:'Disable',
                            handler:function(){
                                var me = this;
                                var disabled = me.up().items.items[ 1 ].getValue();
                                var active = true;

                                if ( disabled == false || disabled == 'false' ) {
                                    active = true;
                                } else if ( disabled == true || disabled == 'true' ) {
                                    active = false;
                                }
                                me.up().up().up().activeAccount( 'force'  , active );
                            }
                        },
                        {
                            xtype:'button',
                            text:'Active By Code',
                            handler:function(){
                                var me = this;
                                me.up().up().up().activeAccount( 'code' , false );
                            },
                            listeners:{
                                afterrender:function(){
                                    this.hide();
                                }
                            }
                        },
                        {
                            xtype:'tbfill'
                        }
                    ],
                    setActiveStatus:function( status ) {
                        var me = this;
                        if ( typeof status != 'undefined' ) {

                            me.items.items[ 1 ].setValue( status );
                            if ( status == true ) {
                                me.items.items[ 0 ].setValue( 'Disable' );
                                me.items.items[ 2 ].setText( 'Active' );
                                me.items.items[ 3 ].show();
                            } else if ( status == false ) {
                                me.items.items[ 0 ].setValue( 'Active' );
                                me.items.items[ 2 ].setText( 'Disable' );
                                me.items.items[ 3 ].hide();
                            }
                        }
                    }
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Status Message',
                    layout: 'hbox',
                    combineErrors: true,
                    defaultType: 'textfield',
                    defaults: {
                        hideLabel: 'true'
                    },
                    items: [
                        {
                            name: 'reasonDisabled',
                            fieldLabel: 'Status Detail',
                            flex: 3,
                            value: 'Activated',
                            editable:false,
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Name',
                    layout: 'hbox',
                    combineErrors: true,
                    defaultType: 'textfield',
                    defaults: {
                        hideLabel: 'true'
                    },
                    items: [
                        {
                            name: 'firstName',
                            fieldLabel: 'First Name',
                            flex: 3,
                            emptyText: 'First',
                            allowBlank: false,
                        },
                        {
                            name: 'lastName',
                            fieldLabel: 'Last Name',
                            flex: 2,
                            margin: '0 0 0 6',
                            emptyText: 'Last',
                            allowBlank: false
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    //margin: '0 0 5 0',
                    items: [
                        {
                            fieldLabel: 'User',
                            name: 'username',
                            value:'Guest',
                            flex: 1,
                            readOnly:true,
                            allowBlank: false
                        },
                        {
                            xtype:'hiddenfield',
                            name: 'userId',
                            value:'0'
                        },
                        {
                            xtype:'button',
                            margin:'0 20 0 20',
                            name:'activeButton',
                            text:'Create Profile( New Driver/Store Only(1 TIME ONLY) )',
                            handler:function(){
                                var me = this;
                                me.up().up().up().newQuickProfile();
                            }
                        },
                    ]
                },
                {
                    xtype:'tbfill'
                },/*
                 {
                 dock: 'bottom',
                 xtype: 'toolbar',
                 border:false,
                 items: [
                 {
                 xtype: 'tbfill'
                 },

                 {
                 align:'center',
                 xtype: 'button',
                 text: 'Save',
                 handler:function(){
                 this.up().up().saveUserInfo();
                 }
                 },
                 {
                 xtype: 'tbfill'
                 }
                 ]
                 }*/
            ]

        },
        {
            xtype:'employee-user-information-userInfo-userPermission',
            id:'Employee-User-Information-UserInfo-UserPermission'
        }

    ],

    resetAll:function() {
        var me = this;
        me.userIdLoaded = false;
        me.userId = '';
        me.userData = {};
        me.accountType = 'email';
        me.reasonDisabled = '';
        me.codeDisabled = '';
        me.userDisabeld = false;
        me.items.items[ 1 ].resetAll();
        me.setTitle( 'User Info' );
        this.closeWindowPopUp();
    },
    saveUserInfo:function() {

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
    setActiveStatus:function( status ) {
        var me = this;
        var disabledContainer = me.items.items[ 0 ].items.items[ 0 ];
        //me.getForm().findField( 'isDisabled' ).setActiveStatus( status );
        disabledContainer.setActiveStatus( status );
    },
    activeAccount:function( method , status ) {
        var me = this;
        if ( me.userLoaded == false ) {
            Ext.Msg.alert( 'Error' , 'No user selected!' )
        } else {
            var userId = me.userId;
            var codeDisabled = '0';
            if ( status == true ) {
                codeDisabled = '1';
            } else if (status = false ) {
                codeDisabled = '0';
            }
            switch ( method ) {

                case 'force' :
                    Ext.Msg.prompt('Confirm', 'Please Input Reason：', function(btn, text) {
                        if (btn == 'ok') {
                            var reasonDisabled = '';
                            if ( text ) {
                                reasonDisabled = text;
                            } else {
                                if ( status == true ) {
                                    reasonDisabled = 'Disabled';
                                } else if (status = false ) {
                                    reasonDisabled = 'Activated';
                                }
                            }
                            me.reasonDisabled = reasonDisabled;
                            me.codeDisabled = codeDisabled;
                            me.userDisabled = status;
                            Ext.getCmp( 'Employee-Header').activeUserAccount( me , '/user/' + me.accountType , userId , reasonDisabled , codeDisabled , status , 'activeUserAccount' );
                        }
                    });
                    break;

                case 'code' :
                    Ext.Msg.prompt('Confirm', 'Please Input The Code You Received：', function(btn, text) {
                        if (btn == 'ok') {
                            if ( text ) {
                                var code = text;
                                Ext.getCmp( 'Employee-Header').activeUserAccountByCode( me , '/request/' + me.accountType , userId , code , 'activeUserAccountByCode' );
                            } else {
                                Ext.Msg.alert( 'Error' , 'Code is required!' );
                            }
                        }
                    });
                    break;
            }
        }
    },
    getAjaxRequestResponse:function( returnMessage , returnType ) {
        var me = this;
        if ( returnMessage.error == false ) {
            switch( returnType ) {
                case 'createUserAccount':
                    var username = me.username;
                    var registerType = me.registerTypeName;
                    me.loadingMessage = 'Retrieving user...';
                    me.setLoading(false);
                    break;
                case 'activeUserAccount':
                    var userData = me.userData;
                    userData.data.disabled = me.userDisabled;
                    userData.data.reasonDisabled = me.reasonDisabled;
                    userData.data.codeDisabled = me.codeDisabled;
                    me.setActiveStatus ( me.userDisabled );
                    me.getForm().findField( 'reasonDisabled').setValue( userData.data.reasonDisabled );
                    Ext.getCmp( 'Employee-User-Information-UserList').getView().refresh();
                    break;
            }
        }
    },
    setUserInfo:function( userData ) {
        var me = this;
        me.resetAll();
        me.userData = userData;
        if ( userData.data.userId ) {
            me.userId = userData.data.userId;
            me.userLoaded = true;
            var userList = Ext.getCmp( 'Employee-User-Information-UserList' );
            me.accountType = userList.accountType;
            me.setTitle( 'User Info - ' + userList[ userList.accountType ] );

            // Permissions
            me.items.items[ 1 ].getPermissions(  userData.data.userId );
        }
        var disabled = false;
        if ( typeof userData.data.disabled != 'undefined' ) {
            disabled = userData.data.disabled;
        }
        if ( userData.data.reasonDisabled ) {
            me.getForm().findField( 'reasonDisabled').setValue( userData.data.reasonDisabled );
        }
        //console.log( userData);
        me.getForm().findField( 'username' ).setValue( userList[ userList.accountType ] );
        me.setActiveStatus( disabled );

    },
    newQuickProfile:function(){
        var me = this;
        var win;
        if ( me.userLoaded == true ) {
            if ( me.gridEditing == true ) {
                Ext.Msg.alert( 'Error' , 'A window already opened, please close it first.' );
            } else {
                if (!win) {
                    var win = Ext.create('Ext.window.Window', {
                        xtype: 'employee-user-information-userInfo-newProfile-quickProfileCreationWindow',
                        title: 'Create New Profile',
                        width:400,resizable:false,
                        height:200,
                        listeners:{
                            'close':function( win ) {
                                me.gridEditing = false;
                            }
                        }
                    });
                    var quickProfileCreation = Ext.create( '517Employee.view.user.information.userInfo.userProfile.newProfile.QuickProfileCreation' );
                    quickProfileCreation.userId = me.userId;
                    win.insert( quickProfileCreation );
                    me.addOpenedWindow( win ) ;
                    win.show();
                }
            }
        }

    },
    getSpecificField:function( fieldName ) {
        var me = this;
    }


});




