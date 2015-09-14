/**
 * Created by devo on 9/10/2015.
 */
/**
 * Created by devo on 8/9/2015.
 */
Ext.define('517Employee.view.user.information.userInfo.userPermission.UserPermission', {
    extend: 'Ext.grid.Panel',

    xtype: 'employee-user-information-userInfo-userPermission',
    //controller: 'employee-user-information-userInfo-userPermission-controller',
    store: Ext.create( '517Employee.store.user.information.userInfo.userPermission.UserPermission' ),
    title: 'User Permissions',

    header:{ titleAlign: 'left' , height:30 , padding:'0 10 0 10' },
    collapsible: true, columnLines:true ,
    maxHeight: 270 , autoScroll:true ,

    /* Variables */
    changed:false,changedString:[],
    // Variable detect if editing
    gridEditing: false ,
    // Window Opened in this View
    windowPopUp:[],
    // Permission Loaded
    permissionLoaded:false,
    // Permission Id
    permissionId:'',
    // permission Data
    permissionData:[],
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
                        this.up().up().savePermissions();
                    }
                },
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    iconCls: 'fa fa-plus',
                    text: '(Temporary)New Permission',
                    handler:function(){
                        this.up().up().newQuickPermission();
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'fa fa-plus',
                    text: 'New',
                    handler:function(){
                        this.up().up().newPermission();
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
                    tooltip: 'Check/Edit Permission',
                    handler:function( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine , tr ){
                        //Ext.getCmp( 'Employee-Header').editPermission( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine , tr );
                    }
                },
                {
                    iconCls:'delete-col',
                    tooltip:'Delete Permission',
                    handler:function( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine , tr ){
                        var me = this;
                        var grid = me.up().up();
                        Ext.getCmp( 'Employee-Header').deletePermission( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine , tr );
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
    loadPermission:function( permissionData ) {
        var me = this;
        me.resetAll();
        var data = permissionData.data;

        me.permissionData =  permissionData.data;
        if ( data ) {
            var permission = [];
            if ( data[ 0].permissionId ) {
                me.permissionLoaded = true;
                permission = data[ 0 ].permission;
                me.permissionId = data[ 0 ].permissionId;
            } else if ( data.permissionId ) {
                me.permissionLoaded = true;
                permission = data.permission;
                me.permissionId = data.permissionId;
            }
        }

        me.getStore().add( permission );
    },
    addPermission:function( permission ) {
        var me = this;
        if ( permission ) {
            var newPermission = new Object();
            if (permission.role) {
                newPermission.role = permission.role;
            }
            newPermission.parameter = [];
            newPermission.restrict = [];
            newPermission.action =[ '*' ];
            if ( permission.role != 'admin' ) {
                var newParam = new Object();
                newParam[ 'key' ] = 'regionId';
                newParam[ 'value' ] = permission.regionId;
                newPermission.parameter.push( newParam );
            }
            if ( permission.role == 'store ' ) {
                var newParam = new Object();
                newParam[ 'key' ] = 'storeId';
                newParam[ 'value' ] = permission.storeId;
                newPermission.parameter.push( newParam );
            }
            me.changed = true;
            me.getStore().add( newPermission );


        }

    },
    getPermissions:function ( userId ) {
        if ( userId ) {
            var me = this;
            me.userId = userId;
            Ext.getCmp( 'Employee-Header').searchUserPermission( me , userId , 'searchUserPermission' );
        }
    },
    getAjaxRequestResponse:function( returnMessage , returnType ) {
        var me = this;
        if ( returnMessage.error == false ) {
            switch( returnType ) {
                case 'searchUserPermission':
                    me.loadPermission( returnMessage );
                    break;
                case 'changeUserPermission':
                    Ext.Msg.alert( 'Success' , "User's permission has been changed." );
                    break;
            }
        }
    },
    savePermissions:function() {
        var me = this;
        var userInfo = me.up();

        if ( userInfo.userLoaded == true && me.changed == true ) {
            Ext.Msg.show({
                title:'Save Permission?',
                msg: 'You will save permission to server <br/>Would you like to proceed?',
                buttons: Ext.Msg.YESNO,
                fn: function( btn,text ) {
                    if ( btn == 'yes' ) {
                        var userId = me.up().userId;
                        var jsonData = new Object();
                        var method;
                        var oldPermissions = Ext.getCmp( 'Employee-Header').copyStoreToArray( me.getStore() );
                        jsonData.permission = Ext.getCmp( 'Employee-Header').copyPermission( oldPermissions );
                        if ( me.permissionLoaded == true ) {
                            jsonData.permissionId = me.permissionId;
                            method = 'put';
                        } else {
                            jsonData.userId = userId;
                            method = 'post'
                        }
                        if ( jsonData.permission.length > 0 ) {
                            jsonData = JSON.stringify( jsonData );
                            Ext.getCmp( 'Employee-Header').sendCustomAjaxRequest( me , '/user/permission' , method , null , jsonData , 'changeUserPermission' );
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
        this.permissionLoaded = false;
        this.permissionId = '';
        this.permissionData = [];
        this.changed = false;
        this.changedString = [];
        this.getStore().loadData( [] , false );
        this.setTitle( 'User Permissions' );
        this.closeWindowPopUp();
    },
    newQuickPermission:function() {
        var me = this;
        var win;
        if ( me.gridEditing == true ) {
            Ext.Msg.alert( 'Error' , 'A window already opened, please close it first.' );
        } else {
            if (!win) {
                var win = Ext.create( 'Ext.window.Window' , {
                    xtype: 'employee-user-information-userInfo-userPermission-newPermission-quickPermissionCreationWindow',
                    title: 'Create New Permission',
                    width:400,resizable:false,
                    height:165,
                    listeners:{
                        'close':function( win ) {
                            me.gridEditing = false;
                        }
                    }
                });
                var quickPermissionCreation = Ext.create( '517Employee.view.user.information.userInfo.userPermission.newPermission.QuickPermissionCreation' );
                win.insert( quickPermissionCreation );
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