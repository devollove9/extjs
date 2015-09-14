/**
 * Created by devo on 9/1/2015.
 */
var UserListPagingStore = Ext.create( '517Employee.store.user.information.UserPaging')

Ext.define('517Employee.view.user.information.UserList', {
    extend: 'Ext.grid.Panel',
    requires: [
      
    ],
    xtype: 'employee-user-information-userList',
    //controller:'employee-user-information-userList-controller',
    autoScroll:true,
    store: UserListPagingStore ,
    email:'',
    phone:'',
    accountType:'email',
    dockedItems:[
        {
            store : UserListPagingStore,
            xtype:'pagingtoolbar',
            dock:'bottom',
            margin:'0 0 1 0',
            displayInfo: true,
            displayMsg: 'Users {0} - {1} of {2}',
            emptyMsg: "No users to display",
            listeners: {
                afterRender: function( field ) {
                    field.down('#refresh').hide();
                },scope:this
            }
        }
    ],
    columns:[
        {
            xtype: 'rownumberer',
            width: 40,align : 'center',
        },
        {
            text: 'Email',
            flex: 2,
            sortable: true,
            minWidth: 130,
            dataIndex: 'email',align : 'center',
            renderer: function( val , metaData , record ) {
                if ( typeof record.data.disabled != 'undefined' ) {
                    if ( record.data.disabled == true ) {
                        return '<span style="color:' + "#e75f5f" + ';">' + val + '</span>';
                    }
                }
                return val;
            }
        },
        {
            text: 'Phone',
            flex: 2,
            sortable: true,
            minWidth: 130,
            dataIndex: 'phone',align : 'center',
            renderer: function( val , metaData , record ) {
                if ( typeof record.data.disabled != 'undefined' ) {
                    if ( record.data.disabled == true ) {
                        return '<span style="color:' + "#e75f5f" + ';">' + val + '</span>';
                    }
                }
                return val;
            }
        },
        {
            text: 'Register Date',
            flex: 2,
            minWidth: 160,
            sortable: true,
            dataIndex: 'registerDate',align : 'center',
            renderer: function( val , metaData , record ) {
                if ( typeof record.data.disabled != 'undefined' ) {
                    if ( record.data.disabled == true ) {
                        return '<span style="color:' + "#e75f5f" + ';">' + Ext.Date.format(new Date( val/1000 ), 'm/d/Y h:i A') + '</span>';
                    }
                }
                return Ext.Date.format(new Date( val/1000 ), 'm/d/Y h:i A');
            }

        },
        {
            text: 'Last Login',
            flex: 2,
            minWidth: 160,
            sortable: true,
            dataIndex: 'lastLoginDate',align : 'center',
            renderer: function( val , metaData , record ) {
                if ( typeof record.data.disabled != 'undefined' ) {
                    if ( record.data.disabled == true ) {
                        return '<span style="color:' + "#e75f5f" + ';">' + Ext.Date.format(new Date( val/1000 ), 'm/d/Y h:i A') + '</span>';
                    }
                }
                return Ext.Date.format(new Date( val/1000 ), 'm/d/Y h:i A');
            }
        },
        /*
        {
            text: 'Balance',
            flex: 1,
            sortable: true,
            minWidth: 70,
            dataIndex: 'balance',
            align : 'center',
            renderer: function( val , a , record ) {
                return '$' + val.delivery.toFixed( 3 );
            }
        },
        {
            text: 'Credit',
            flex: 1,
            sortable: true,
            minWidth: 70,
            dataIndex: 'credit',
            align : 'center',
            renderer: function( val , a , record ) {
                return '$' + val.delivery.toFixed( 3 );
            }
        },
        {
            xtype: 'actioncolumn',
            header: ' ',
            width: 30,
            maxWidth:30,
            align: 'center',
            items: [
                {
                    iconCls: 'x-tool-img x-tool-search',
                    tooltip: 'Detail',
                    handler: 'userDetail'
                }
            ]
        },*/
    ],
    listeners:{
        selectionchange:function( model , records ) {
            var userInfo = Ext.getCmp( 'Employee-User-Information-UserInfo' );
            if ( records[ 0 ] ) {
                userInfo.setUserInfo( records[ 0 ] );
            }
        }
    },
    resetAll:function() {
        this.getStore().getProxy.data = [];
        this.getStore().clearData();
        this.getStore().removeAll();
        this.getView().refresh();
    },
    refreshViewByParams:function( param ) {
        var me = this;
        this.resetAll();

        var params = param;

        // User List Store
        var userListStore = me.getStore();

        //userSearchToolbar.updateSearchParams( params );
        userListStore.getProxy().data = [];

        me.setLoading( 'Loading user...' );
        // Send Request

        Ext.Ajax.request({
            url : Ext.getCmp( 'Employee-Header').getServerUrl() + '/user' ,
            headers: Ext.getCmp( 'Employee-Header').getHeaders( 'get' ) ,
            method : 'get' ,
            params : params ,
            disableCaching:false,
            success : function ( result , request ) {
                var response = JSON.parse( result.responseText );
                var Error = Ext.getCmp( 'Employee-Header').processErrorMessage( response );
                if ( Error == true ) {
                    userListStore.load();
                    me.setLoading( false );
                } else {
                    userListStore.getProxy().data = response.data;
                    response.data[ 0 ][ me.accountType ] = [ me[ me.accountType ] ];
                    userListStore.load();
                    userListStore.loadPage(1);
                    me.setLoading( false );
                }
            },
            failure : function ( result , request ) {
                userListStore.load();
                me.setLoading( false );
                Ext.Msg.alert( 'Failure' , 'Unknown Error , Please Contact Technique Support.' );
            }
        });

    },
    refreshView:function(){
        var me = this;
        this.resetAll();

        // If not admin must have region

        // User List Store
        var userListStore = me.getStore();


        console.log( params );

        userListStore.getProxy().data = [];

        me.setLoading( 'Loading user...' );
        // Send Request

        Ext.Ajax.request({
            url : Ext.getCmp( 'Employee-Header').getServerUrl() + '/user' ,
            headers: Ext.getCmp( 'Employee-Header').getHeaders( 'get' ) ,
            method : 'get' ,
            params : params ,
            disableCaching:false,
            success : function ( result , request ) {
                var response = JSON.parse( result.responseText );
                var Error = Ext.getCmp( 'Employee-Header').processErrorMessage( response );
                if ( Error == true ) {
                    userListStore.load();
                    me.setLoading( false );
                } else {
                    userListStore.getProxy().data = response.data;
                    userListStore.load();
                    userListStore.loadPage(1);
                    me.setLoading( false );
                }
            },
            failure : function ( result , request ) {
                userListStore.load();
                me.setLoading( false );
                Ext.Msg.alert( 'Failure' , 'Unknown Error , Please Contact Technique Support.' );
            }
        });
    },
    searchUser:function() {
        var me = this;
        var userSearchToolbar = Ext.getCmp( 'Employee-User-Information-Toolbar');
        var getParams = {};
        userSearchToolbar.updateSearchParams( getParams );
        var params = new Object();
        params[ getParams.filterBy ] = getParams.filterValue;
        me[ getParams.filterBy ] = getParams.filterValue;
        me.accountType = getParams.filterBy;
        //me.refreshViewByParams( params , '/user/' + getParams.filterBy );
        me.refreshViewByParams( params );
        //Ext.getCmp( 'Employee-Header' ).searchUserInfo( me , '/user' , 'get' , getParams.filterBy , getParams.filterValue , 'searchUserInfoAccount' );
    },
    getAjaxRequestResponse:function( returnMessage , returnType ) {
        var me = this;
        if ( returnMessage.error == false ) {
            switch( returnType ) {
                case 'searchUserInfoAccount':
                    var userId;
                    if ( returnMessage.data.userId ) {
                        userId = returnMessage.data.userId;
                    } else if ( returnMessage.data[ 0 ].userId ) {
                       userId = returnMessage.data[ 0 ].userId
                    }
                    var params = new Object();
                    params.userId = userId;
                    me.refreshViewByParams( params );
                    me.setLoading( false );
                    break;
            }
        }
    }


});