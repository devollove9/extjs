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
    controller:'index',
    referenceHoder:'true',
    border:false, frame:false,
    userInfo:null,
    restaurant_info:null,
    initComponent:function() {

        var me = this;
        this.initialSetting();
        //me.loadUserInfo();
        me.loadRegionInfo();
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
        Load User Info
    */
    loadUserInfo:function() {
        var userCookie = Ext.decode( Ext.util.Cookies.get( '517Employee' ) );
        this.userInfo = userCookie ;
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

        store.load({
            method: 'get',
            url: 'https://apiv2-test.517.today/public/region',
            headers: {
                'Authorization-Token': '1e29f85a4e442b42d09e551104124fb674f920f805038220977a7f03d25091b35c949acbb5c201d2ac9d621637c28bcf158c78a7b3ae5b091902a8e6d9e66f25bd271de03d3302e51fcf128ed6eb5a792d9297e7058f880c550a0ffd55e2463619cb9931a966481ab0518efe21d3966d2b529e7a7faa6b9369f480e582df5bda519e9c6694bad'
            },
            callback: function (records, operation, success) {
            }
        });

    }
});