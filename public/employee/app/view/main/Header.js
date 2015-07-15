Ext.define('517Employee.view.main.Header', {
    extend: 'Ext.panel.Panel',
    xtype: 'top-header',
    requires: [
        '517Employee.view.main.HeaderController'
    ],
    border:false,
    frame:false,
    //store : Ext.create( '517Employee.store.region.Regions'),
    controller: 'header',
    referenceHolder:true,

    /*  Variables  */
    // Variable Contains refresh list
    refreshList:[],
    regionMenu:[],

    // Server Url
    serverUrl:'https://apiv2-test.517.today',
    //serverUrl:'https://apiv2-dev.517.today',

    initComponent: function() {
        this.height = 50;
        this.frame = false; this.border = false;
        this.style = {
            'margin':'0 25 0 25',
            'border-bottom':'1px solid #c1c1c1'
        };
        // Generate region list
        //var regionMenu = this.getRegionMenu();

        var serviceMenu = this.createServiceMenu();
        this.tbar = new Ext.Toolbar({ 
            margin: '5 0 5 0 ',
            padding: '0 0 25 0',
       
            defaultButtonUI: 'default',
            items: [
                {
                    xtype: 'container',
                    html: '<img src="https://s3-us-west-2.amazonaws.com/static.djwong.net/public_html/images/logo.png" height="40" ></img>',
                    style: 'cursor:pointer;',
                    width:120,
                    listeners: {
                        afterrender: function(c){
                            c.el.on('tap', function(){
                                var win = window.open('https://517.today', '_blank');
                                win.focus();
                            });
                        }
                    }
                },
                {
                    xtype: 'label',
                    text: ' 517 Employee System',
                    style: 'font-size:20px;font-weight: bold;cursor:pointer;',
                    listeners: {
                        afterrender: function(c){
                            c.el.on('click', function(){
                                var panel = new Object();
                                panel.navigateAction = 'employee-navigation';
                                Ext.getCmp( 'Employee-Navigation' ).doNavigation( panel );
                            });
                        }
                    }
                },'-',
                {
                    xtype: 'button',
                    id:'Employee-Header-Region',
                    text: '地区 / Region',
                    regionId:-1,
                    height: 35,
                    width: 140,
                    cls:'header-menus',
                    menu: {
                        xtype: 'menu',
                        plain: true,
                        floating:{ shadow:false },
                        width:170,
                        id: 'Employee-Header-Region-Menu',
                        style: {
                            //overflow: 'visible',
                            'text-align': 'left',
                            margin:'10 0 10 0'
                            //color:'blue'
                        },
                        items:this.regionMenu,

                    },
                    listeners:{
                        beforerender:function(){
                            //console.log( this );
                        },
                        afterrender:function(){
                            var me = this;
                            var items = [];
                            var store = Ext.getStore( 'Regions' );
                            store.on('load', function(storeRef, records, successful){
                                var regionMenu = Ext.getCmp( 'Employee-Header-Region' );
                                //console.log( Ext.getCmp('Employee-Header-Region'));
                                var count = store.getTotalCount();
                                if ( count != 0 ) {
                                    store.each(function (record, idx) {
                                        var item = new Object();
                                        item.text = record.data.name + ' / ' + record.data.nameEn;
                                        item.align = 'left';
                                        item.height = 35;
                                        item.padding = '7 0 0 10';
                                        item.regionId = record.data.regionId;
                                        item.regionInfo = record;
                                        item.cancelInfo = false;
                                        item.handler = 'switchRegion';
                                        items.push(item);
                                        me.menu.add( item );
                                        if (idx != count - 1 ) {
                                            items.push('-');
                                            me.menu.add( '-' );
                                        }

                                    });
                                    items.push('-');
                                    me.menu.add( '-' );
                                    var item = new Object();
                                    item.text = '取消 / Cancel' ;
                                    item.align = 'left';
                                    item.height = 35;
                                    item.padding = '7 0 0 10';
                                    item.cancelInfo = true;
                                    item.handler = 'switchRegion';
                                    items.push( items );
                                    me.menu.add( item );
                                }

                            }, this);
                        },
                        render:function() {
                            //console.log( this );
                        }
                    }
                },
                {
                    xtype: 'tbfill'
                },
                {
                    text:'Services',
                    reference:'services',
                    width:150,
                    height: 35,

                    menu: {
                        
                        xtype: 'menu',
                        plain: true,
                        width:150,
                        floating:{ shadow:false },
                        id: 'serviceMenu',
                        style: {
                            //overflow: 'visible',
                            'text-align': 'center',
                            margin:'7 0 7 0',
                            //color:'blue'
                        },
                        items: serviceMenu
                    }
                },'-',
                {
                    text:'     Menu    ',
                    reference:'welcome-label',
                    width:200,
                    height: 35,
                    menu: {
                        
                        xtype: 'menu',
                        plain: true,
                        width:200,
                        floating:{ shadow:false },
                        id: 'userMenu',
                        style: {
                            //overflow: 'visible',
                            'text-align': 'center',
                            margin:'10 0 10 0',
                            //color:'blue'
                        },
                        items: [
                            {
                                text: 'My Profile',
                                align: 'center',
                                height: 40, padding: '8 0 0 0',
                                navigateAction:'employee-settings myProfile',
                                handler:'switchView'
                                //glyph: 'xf013@FontAwesome',
                            }, '-' , {
                                text: 'Sign Out',
                                //glyph: 'xf08b@FontAwesome',
                                height: 40, padding: '8 0 0 0',
                                handler: 'logout'
                                //menu: dateMenu // <-- submenu by reference
                            }
                        ]
                    }
                }/*
                {
                    text: '切换界面',
                    iconCls: null,
                    glyph: 'xf12e@FontAwesome',
                    height:29,
                    reference:'switch-btn',
                    menu: [{
                            text: 'Admin View',
                            handler:'switchView'
                        },{
                            text: 'Operator View',
                            handler:'switchView'
                        }
                    ]
                }, */

            ]
        });
        this.callParent();
    },
    createServiceMenu:function(){
        var menu = [];
        var MainMenu = this.createMenuItem( 'Main Menu' , 'employee-navigation');
        menu.push( MainMenu );menu.push( '-' );
        // If Driver Only
            //var DriverOrderHistory = this.createMenuItem( 'Order History' , 'employee-driver orderHistorySingle' );
        // Else
            var DriverMenu =[];
            var DriverOrderHistory = this.createMenuItem( 'Order History' , 'employee-driver orderHistory' );
            DriverMenu.push( DriverOrderHistory );
            var Driver = this.createMenuItemWithMenu( 'Driver' , 'employee-driver' , DriverMenu );
            menu.push( Driver );

        // If Operator
           // Ext.create( '517Employee.store.restaurant.RestaurantList' );
            menu.push( '-');
            var OperatorMenu =[];
            var OperatorOperation = this.createMenuItem( 'Operation' , 'employee-operator operation' );
            var OperatorNewOrder = this.createMenuItem( 'New Order' , 'employee-operator newOrder' );
            OperatorMenu.push( OperatorOperation );OperatorMenu.push( '-' );OperatorMenu.push( OperatorNewOrder );
            var Operator = this.createMenuItemWithMenu( 'Operator' , 'employee-operator' , OperatorMenu );
              Ext.create( '517Employee.store.operator.operation.OrderList' );
            this.refreshList.push( 'Employee-Operator' );

            menu.push( Operator );
            //this.refreshList.push( 'Employee-Operator-Operation-DriverList' );
            // If Only Operator
            //menu.push( '-');
            //var RestaurantMenu =[];
            //var RestaurantOrderHistory = this.createMenuItem( 'Order History' , 'employee-restaurant orderHistory' );
            //RestaurantMenu.push( RestaurantOrderHistory );
            //var Restaurant = this.createMenuItemWithMenu( 'Restaurant' , 'employee-restaurant' , RestaurantMenu );
            //menu.push( Restaurant );
        // If Admin
            menu.push( '-');
            //Ext.create( '517Employee.store.restaurant.RestaurantList');
            var RestaurantMenu =[];
            var RestaurantOrderHistory = this.createMenuItem( 'Order History' , 'employee-restaurant orderHistory' );
            var RestaurantInformation = this.createMenuItem( 'Information' , 'employee-restaurant information' );
            var RestaurantDish = this.createMenuItem( 'Dish' , 'employee-restaurant dish' );
            RestaurantMenu.push( RestaurantOrderHistory );RestaurantMenu.push( '-' );RestaurantMenu.push( RestaurantInformation );RestaurantMenu.push( '-' );RestaurantMenu.push( RestaurantDish );
            var Restaurant = this.createMenuItemWithMenu( 'Restaurant' , 'employee-restaurant' , RestaurantMenu );
            //this.refreshList.push( 'Employee-Restaurant-Dish-RestaurantList' );
            menu.push( Restaurant );

            menu.push( '-');
            var BillMenu =[];
            var BillRestaurant = this.createMenuItem( 'Restaurant' , 'employee-bill restaurant' );
            var BillDriver = this.createMenuItem( 'Driver' , 'employee-bill driver' );
            BillMenu.push( BillRestaurant );BillMenu.push( '-' );BillMenu.push( BillDriver );
            var Bill = this.createMenuItemWithMenu( 'Bill' , 'employee-bill' , BillMenu );
            menu.push( Bill );

        return menu;
    },
    createMenuItem:function( text , action ) {
        var Item = new Object();
        Item.text = text;
        Item.height = 40;
        Item.padding = '8 0 0 0';

        Item.navigateAction = action;
        Item.handler = 'switchView';
        return Item;
    },
    createMenuItemWithMenu:function( text , action , menuItems ) {
        var Item = new Object();
        Item.text = text;
        Item.height = 40;
        Item.padding = '8 0 0 0';
        Item.navigateAction = action;
        //Item.handler = 'switchView';
        Item.menu = new Object();
        Item.menu.items = menuItems;
        Item.menu.plain = true;
        Item.menu.xtype = 'menu';
        Item.menu.floating ={ shadow:false };
        Item.menu.width = 150;
        Item.menu.style = { 'text-align': 'center' , margin:'10 0 10 0' };
        return Item;
    },
    getRegionMenu:function() {


    },
    getServerUrl:function() {
        return this.serverUrl;
    },

    getToken:function() {
        var userCookie = Ext.decode( Ext.util.Cookies.get( '517Employee' ) );
        if ( userCookie ) {
            if ( userCookie.token ) {
                return userCookie.token;
            }
        }
        return 'Error';
    },
    getHeaders:function( method ) {
        var Token = this.getToken();
        var header = '';
        if ( Token == 'Error' ) {
            Ext.Msg.alert( 'Unable to get token, please refresh');
        } else {

            switch ( method ) {
                case 'put':
                    header = {
                        'Authorization-Token': Token,
                        'Content-Type':'application/json'
                    };
                    break;
                case 'post':
                    header = {
                        'Authorization-Token': Token,
                        'Content-Type':'application/json'
                    };
                    break;
                case 'get':
                     header = {
                        'Authorization-Token': Token,
                    }
                    break;
            }

        }
        //console.log( header );
        return header;
    },

    listeners:{
        beforerender:function( grid ) {
            var items = [];
            var store = Ext.getStore( 'Regions' );
            store.on('load', function(storeRef, records, successful){
                var regionMenu = Ext.getCmp( 'Employee-Header-Region' );
                //console.log( Ext.getCmp('Employee-Header-Region'));
                var count = store.getTotalCount();
                if ( count != 0 ) {
                    store.each(function (record, idx) {
                        var item = new Object();
                        item.text = record.data.name + ' / ' + record.data.nameEn;
                        item.align = 'left';
                        item.height = 35;
                        item.padding = '7 0 0 10';
                        item.regionId = record.data.regionId;
                        item.regionInfo = record;
                        item.cancelInfo = false;
                        item.handler = 'switchRegion'
                        items.push(item);
                        if (idx != count - 1) {
                            items.push('-');
                        }
                    });
                    items.push('-');
                    var item = new Object();
                    item.text = '取消 / Cancel' ;
                    item.align = 'left';
                    item.height = 35;
                    item.padding = '7 0 0 10';
                    item.cancelInfo = true;
                    item.handler = 'switchRegion'
                    items.push( items );
                    this.regionMenu = ( items );
                }

            }, this);
        }
    }




});