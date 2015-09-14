Ext.define('517Employee.view.Index', {
    extend: 'Ext.panel.Panel',
    xtype: 'index',
    requires: [
        'Ext.layout.container.Border',
        '517Employee.view.main.Header',
        '517Employee.view.main.Footer',
        '517Employee.view.IndexController',
    ],
    layout: {
        type: 'border',
        padding: 0
    },
    //store:'StoreInfo',
    id:'Employee-Index',
    controller:'index',
    referenceHoder:'true',
    border:false, frame:false,
    userInfo:null,
    restaurant_info:null,
    initComponent:function() {

        var me = this;
        this.initialSetting();
        me.loadUserInfo();
        me.loadRegionInfo();
        me.checkPermissions();
        me.callParent( arguments );
    },
    bodyStyle:{"background-color":"white" , 'border-width' : '0px'},
    defaults: {
        collapsible: false,
        bodyPadding: 0,
        split: false
    },
    items: [
        {
            xtype: "top-header",
            region: 'north',
            id:'Employee-Header',
            reference:'header'
            //border:false,frame:false,
        },
        {
            xtype:'panel',
            region:'center',
            layout:'fit',
            reference:'indexHolder',
            border:false, frame:false,
            style:{
                'margin' : '0 25 0 25'
            }
        },
        {
            region: 'south',
            xtype:'footer',
            //border:false, frame:false,
            height: 40
        }
    ],
    /*
     *  Get Restaurant Information
     */
    getRestaurantInfo:function(){
        return this.restaurant_info;
    },
    /*
     Initial Settings
     */
    initialSetting:function() {
        Ext.Msg.setAutoScroll( false );
    },
    /*
     Check Permission
     */
    checkPermissions:function() {
        var valid = false;
        if ( Ext.util.Cookies.get( '517Employee' ) ) {

            var userCookie = Ext.decode( Ext.util.Cookies.get( '517Employee' ) );
            //console.log( userCookie );
            if ( userCookie.role ) {
                if ( userCookie.role.length > 0 ) {

                    for( var i = 0 ; i < userCookie.role.length ; i ++ ) {
                        var role = userCookie.role[ i ];
                        if ( role == 'admin' || role == 'operator' || role == 'driver' ) {
                            valid = true;
                            break;
                        }
                    }
                }
            }
        }
        if ( valid == false ) {
            this.forceLogout( 'Sorry , No Permission.' );
        }
    },
    /*
     Load User Info
     */
    loadUserInfo:function() {
        if ( Ext.util.Cookies.get( '517Employee' ) ) {
            var userCookie = Ext.decode( Ext.util.Cookies.get( '517Employee' ) );
            this.userInfo = userCookie ;
        } else {
            //Ext.Msg.alert( 'Warning' , 'Unable to retrieve user information!' );
            this.forceLogout( 'Unable to retrieve user information!' );
        }
    },
    forceLogout:function( message ) {
        Ext.Msg.alert( 'Error' , message );
        Ext.util.Cookies.clear('517Employee');
        window.location = "../login";
    },
    /*
     Get User Info
     */
    getUserInfo:function() {
        var userInfo = this.userInfo;
        return userInfo;
    },

    /*
     Load Region Info
     */
    loadRegionInfo:function() {
        var store = Ext.create('517Employee.store.region.Regions');


    }
});
