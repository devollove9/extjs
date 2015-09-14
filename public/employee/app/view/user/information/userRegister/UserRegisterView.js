/**
 * Created by devo on 9/3/2015.
 */
Ext.define('517Employee.view.user.information.userRegister.UserRegisterView', {
    extend: 'Ext.form.Panel',
    requires:[
    ],
    xtype: 'employee-user-information-userRegister',

    border: false , frame: false,
    margin:'10 10 0 10',
    /* Variables */
    // Variable detect if editing
    gridEditing: false ,
    // Window Opened in this View
    windowPopUp:[],

    userId:'',
    registerTypeName:'',
    username:'',
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
                    value : 'Create User By: '
                },
                {
                    xtype:'combobox',
                    store:Ext.create( '517Employee.store.user.information.userRegister.RegisterType' ),
                    name:'registerType',
                    displayField: 'name',
                    editable:false,
                    valueField: 'registerType',
                    width:100,
                    //margin: '0 0 0 6',
                    listeners: {
                        afterrender: function(combo) {
                            combo.setValue( combo.getStore().getAt(0).get('registerType') );

                        },
                        change:function ( combo ) {
                            combo.up().changeField();
                        }
                    }
                },
                {
                    // Email
                    xtype: 'textfield',
                    name:'email',
                    width:180
                },
                {
                    // Phone
                    xtype: 'textfield',
                    name:'phone',
                    width:140,
                    maskRe: /[0-9]/,
                    enforceMaxLength: true,
                    minLength: '10',
                    maxLength: '10',
                    listeners:{
                        afterrender:function( field ){
                            field.hide();
                        }
                    }
                }

            ],
            changeField:function(){
                var me = this;
                var email = me.items.items[ 2 ];
                var phone = me.items.items[ 3 ];
                var registerType = me.items.items[ 1 ];
                if ( registerType.getValue() == 'email' ) {
                    email.show();
                    phone.hide();
                } else if ( registerType.getValue() == 'phone' ) {
                    email.hide();
                    phone.show();
                }
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
                    value : 'Password: '
                },
                {
                    xtype:'textfield',
                    name:'password',
                    inputType:'password'
                }
            ]
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
                    value : 'Re-Enter: '

                },
                {
                    xtype:'textfield',
                    name:'passwordReEnter',
                    inputType:'password',
                    margin:'0 0 0 11'
                }
            ]
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
                labelAlign: 'right'
            },
            items: [
                {
                    xtype: 'checkbox',
                    name: 'activeAccount',
                    fieldLabel: 'Create Active Account',
                    checked:true,
                    labelWidth:135
                },
                {
                    xtype:'tbfill'
                },
                {
                    xtype:'button',
                    text: 'Create Account',
                    handler:function( me ) {
                        me.up().up().createUserAccount();
                    }
                }
            ]
        }
    ],
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
    getAjaxRequestResponse:function( returnMessage , returnType ) {
        var me = this;
        if ( returnMessage.error == false ) {
            switch( returnType ) {
                case 'createUserAccount':
                    var username = me.username;
                    var registerType = me.registerTypeName;
                    me.loadingMessage = 'Retrieving user...';
                    Ext.getCmp( 'Employee-Header').searchUserInfo( me , '/user' , 'get' , registerType , username , 'searchUserInfoAccount' );
                    me.setLoading( false );
                    break;
                case 'createActiveUserAccount':
                    // Search User Info - To searchUserInfo
                    var username = me.username;
                    var registerType = me.registerTypeName;
                    me.loadingMessage = 'Retrieving user...';
                    Ext.getCmp( 'Employee-Header').searchUserInfo( me , '/user' , 'get' , registerType , username , 'searchUserInfoActiveAccount' );
                    break;
                case 'searchUserInfoAccount':
                    Ext.Msg.alert( 'Success' , "User's account has been created" );
                    if ( returnMessage.data.userId ) {
                        me.userId = returnMessage.data.userId;
                    } else if ( returnMessage.data[ 0 ].userId ) {
                        me.userId = returnMessage.data[ 0 ].userId
                    }
                    var params = new Object();
                    params[ me.registerTypeName ] = me.username;
                    Ext.getCmp( 'Employee-User-Information-UserList').accountType = me.registerTypeName;
                    Ext.getCmp( 'Employee-User-Information-UserList')[ me.registerTypeName ] = me.username;
                    Ext.getCmp( 'Employee-User-Information-UserList').refreshViewByParams( params );
                    break;
                case 'searchUserInfoActiveAccount':
                    if ( returnMessage.data.userId ) {
                        me.loadingMessage = 'Activating account...';
                        me.userId = returnMessage.data.userId;
                        Ext.getCmp( 'Employee-Header').activeUserAccount( me , '/user/email' , returnMessage.data.userId , 'Activated' , '0' , false , 'activeUserAccount' );
                    } else if ( returnMessage.data[ 0 ].userId ) {
                        me.loadingMessage = 'Activating account...';
                        me.userId = returnMessage.data[ 0 ].userId
                        Ext.getCmp( 'Employee-Header').activeUserAccount( me , '/user/email' , returnMessage.data[ 0 ].userId , 'Activated' , '0' , false , 'activeUserAccount' );
                    }
                    break;
                case 'activeUserAccount':
                    Ext.Msg.alert( 'Success' , "User's account has been created" );
                    var params = new Object();
                    params[ me.registerTypeName ] = me.username;
                    Ext.getCmp( 'Employee-User-Information-UserList').accountType = me.registerTypeName;
                    Ext.getCmp( 'Employee-User-Information-UserList')[ me.registerTypeName ] = me.username;
                    Ext.getCmp( 'Employee-User-Information-UserList').refreshViewByParams( params );
                    me.setLoading( false );
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
        this.userId = '',
        this.registerTypeName= '';
        this.setTitle( 'Option Group Business Hour' );
        this.closeWindowPopUp();
    }

});