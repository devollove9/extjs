/**
 * Created by devo on 8/26/2015.
 */
Ext.define('517Employee.view.user.information.InformationView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.user.information.userInfo.UserInfoView',
        '517Employee.view.user.information.UserList',
        '517Employee.view.user.information.Toolbar'
    ],
    xtype: 'employee-user-information',
    frame:false , border:false, split:true,
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    layout: 'border',

    items:[
        {
            region: 'west',
            xtype: 'panel',
            flex:4 ,
            border:false,frame:false,split:true,
            margin:'0 0 0 0',
            layout:'border',
            items:[
                {
                    region: 'north',
                    xtype: 'employee-user-information-toolbar',
                    id: 'Employee-User-Information-Toolbar',
                    height:150,maxHeight:350,margin:'0 0 0 0',
                    split:true
                },
                {
                    region: 'center',
                    xtype: 'employee-user-information-userList',
                    id: 'Employee-User-Information-UserList',
                    flex:1,
                    split:true
                }
            ]
        },
        {
            region: 'center',
            split:true,
            xtype: 'employee-user-information-userInfo',
            id: 'Employee-User-Information-UserInfo',
            flex:3
        },

    ],

    doNavigation:function(panel){
        //console.log( panel );
    },
    resetAll:function() {
        // Refresh User List
        Ext.getCmp( 'Employee-Header' ).doResetView( 'Employee-User-Information-UserList' );
    },

    refreshView:function() {
        // Refresh User List
        Ext.getCmp( 'Employee-Header' ).doRefreshView( 'Employee-User-Information-UserList' );
    }

});