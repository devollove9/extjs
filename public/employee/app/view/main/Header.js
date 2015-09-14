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

    preLoadData:{},

    elapsedServerTime:0,

    activePanel:'',
    // Server Url
    serverUrl:'https://apiv2-test.517.today',
    //serverUrl:'https://apiv2-dev.517.today',
    userInfo:null,
    initComponent: function() {
        var headerView = this;
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
                    regionInfo:{
                        latitude: 42.7289,
                        longitude: -84.484773
                    },
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
                    loadRegionInfo:function( records ) {
                        var me = this;

                        var items = [];

                        var regionMenu = Ext.getCmp( 'Employee-Header-Region' );

                        var count = records.length;
                        if ( count != 0 ) {
                            for( var i = 0 ; i < records.length ; i ++ ) {
                                var record = records[ i ];
                                var item = new Object();
                                item.text = record.name + ' / ' + record.nameEn;
                                item.align = 'left';
                                item.height = 35;
                                item.padding = '7 0 0 10';
                                item.regionId = record.regionId;
                                item.regionInfo = record;
                                item.cancelInfo = false;
                                item.handler = 'switchRegion';
                                items.push(item);
                                me.menu.add( item );
                                if ( i != count - 1 ) {
                                    items.push('-');
                                    me.menu.add( '-' );
                                }

                            }
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
                    },
                    listeners:{
                        afterRender:function(  ){
                            var me = this;
                            Ext.Ajax.request({
                                method:'get',
                                url: me.up().up().getServerUrl() + '/region',
                                headers:me.up().up().getHeaders( 'get' ),
                                disableCaching:false,
                                success:function( result ){
                                    var response = Ext.decode( result.responseText );
                                    me.loadRegionInfo( response.data );
                                    Ext.getStore( 'Regions').add( response.data );
                                }
                            });
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
    listeners:{
        afterrender:function(){
            this.setServerTimeDifference();
        }
    },
    checkUserPermissions:function( type ) {
        var me = this;
        var userCookie = Ext.decode( Ext.util.Cookies.get( '517Employee' ) );
        var permissions = userCookie.role;
        var valid = me.compare( permissions , type );
        return valid;
    },
    compare:function( array , value ) {

        if ( typeof array != 'undefined' && typeof value != 'undefined' ) {
            if ( array.length ) {
                if ( array.length > 0 ) {
                    for ( var i = 0 ; i < array.length ; i ++ ) {
                        if ( array[ i ] === value ) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    },
    loadUserInfo:function() {


    },
    getUserInfo:function() {
        if ( Ext.util.Cookies.get( '517Employee' ) ) {
            var userCookie = Ext.decode( Ext.util.Cookies.get( '517Employee' ) );
            this.userInfo = userCookie ;
            return userCookie;
        } else {
            Ext.Msg.alert('Warning', 'Unable to retrieve user information!');
        }
    },
    createServiceMenu:function(){
        var me = this;
        var menu = [];
        var MainMenu = me.createMenuItem( 'Main Menu' , 'employee-navigation');
        menu.push( MainMenu );
        //if ( me.getUserInfo().email == 'test@test.test' ) {
        //    var DriverOrderHistory = me.createMenuItem('Order History', 'employee-driverUnique orderHistory');
        //    DriverMenu.push(DriverOrderHistory);
        //    var Driver = me.createMenuItemWithMenu('Driver', 'employee-driverUnique', DriverMenu);
        //    menu.push(Driver);
        //    this.refreshList.push( 'Employee-DriverUnique' );
        //} else {

        // If Admin
        if ( me.checkUserPermissions( 'admin' ) == true ) {

            // Restaurant
            menu.push( '-');
            var RestaurantMenu =[];
            var RestaurantOrderHistory = me.createMenuItem( 'Order History' , 'employee-restaurant orderHistory' );
            var RestaurantInformation = me.createMenuItem( 'Information' , 'employee-restaurant information' );
            var RestaurantDish = me.createMenuItem( 'Dish' , 'employee-restaurant dish' );
            RestaurantMenu.push( RestaurantOrderHistory );RestaurantMenu.push( '-' );RestaurantMenu.push( RestaurantInformation );RestaurantMenu.push( '-' );RestaurantMenu.push( RestaurantDish );
            var Restaurant = me.createMenuItemWithMenu( 'Restaurant' , 'employee-restaurant' , RestaurantMenu );
            me.refreshList.push( 'Employee-Restaurant' );
            menu.push( Restaurant );

            // Bill
            menu.push( '-');
            var BillMenu =[];
            var BillRestaurant = me.createMenuItem( 'Restaurant' , 'employee-bill restaurant' );
            var BillDriver = me.createMenuItem( 'Driver' , 'employee-bill driver' );
            BillMenu.push( BillRestaurant );BillMenu.push( '-' );BillMenu.push( BillDriver );
            var Bill = me.createMenuItemWithMenu( 'Bill' , 'employee-bill' , BillMenu );
            me.refreshList.push( 'Employee-Bill' );
            menu.push( Bill );

            // Operator
            menu.push( '-');
            var OperatorMenu =[];
            var OperatorOperation = me.createMenuItem( 'Operation' , 'employee-operator operation' );
            var OperatorNewOrder = me.createMenuItem( 'New Order' , 'employee-operator newOrder' );
            OperatorMenu.push( OperatorOperation );OperatorMenu.push( '-' );OperatorMenu.push( OperatorNewOrder );
            var Operator = me.createMenuItemWithMenu( 'Operator' , 'employee-operator' , OperatorMenu );
            Ext.create( '517Employee.store.operator.operation.OrderList' );
            this.refreshList.push( 'Employee-Operator' );
            menu.push( Operator );

            // Driver
            menu.push( '-');
            var DriverMenu = [];
            var DriverOrderHistory = me.createMenuItem('Order History', 'employee-driver orderHistory');
            DriverMenu.push(DriverOrderHistory);
            var Driver = me.createMenuItemWithMenu('Driver', 'employee-driver', DriverMenu);
            this.refreshList.push( 'Employee-Driver' );
            menu.push(Driver);

            // User
            menu.push( '-');
            var UserMenu = [];
            var UserInformation = me.createMenuItem('User Information', 'employee-user information');
            UserMenu.push(UserInformation);
            var User = me.createMenuItemWithMenu('User', 'employee-user', UserMenu);
            this.refreshList.push( 'Employee-User' );
            menu.push(User);

        } else if ( this.checkUserPermissions( 'operator' ) == true ) {
            //Ext.create( '517Employee.store.restaurant.RestaurantList' );
            menu.push( '-');
            var OperatorMenu =[];
            var OperatorOperation = me.createMenuItem( 'Operation' , 'employee-operator operation' );
            var OperatorNewOrder = me.createMenuItem( 'New Order' , 'employee-operator newOrder' );
            OperatorMenu.push( OperatorOperation );OperatorMenu.push( '-' );OperatorMenu.push( OperatorNewOrder );
            var Operator = me.createMenuItemWithMenu( 'Operator' , 'employee-operator' , OperatorMenu );
            Ext.create( '517Employee.store.operator.operation.OrderList' );
            this.refreshList.push( 'Employee-Operator' );
            menu.push( Operator );

            // Restaurant
            menu.push( '-');
            var RestaurantMenu =[];
            var RestaurantOrderHistory = this.createMenuItem( 'Order History' , 'employee-restaurant orderHistory' );
            RestaurantMenu.push( RestaurantOrderHistory );
            var Restaurant = this.createMenuItemWithMenu( 'Restaurant' , 'employee-restaurant' , RestaurantMenu );
            me.refreshList.push( 'Employee-Restaurant' );
            menu.push( Restaurant );

            // Driver
            menu.push( '-');
            var DriverMenu = [];
            var DriverOrderHistory = me.createMenuItem('Order History', 'employee-driver orderHistory');
            DriverMenu.push(DriverOrderHistory);
            var Driver = me.createMenuItemWithMenu('Driver', 'employee-driver', DriverMenu);
            this.refreshList.push( 'Employee-Driver' );
            menu.push(Driver);


        } else if ( this.checkUserPermissions( 'driver' ) == true ) {
            // If Driver Only
            //var DriverOrderHistory = this.createMenuItem( 'Order History' , 'employee-driver orderHistorySingle' );
            // Else
            menu.push( '-');
            var DriverMenu = [];
            var DriverOrderHistory = me.createMenuItem('Order History', 'employee-driverUnique orderHistory');
            DriverMenu.push(DriverOrderHistory);
            var Driver = me.createMenuItemWithMenu('Driver', 'employee-driverUnique', DriverMenu);
            menu.push(Driver);
            this.refreshList.push( 'Employee-DriverUnique' );
        }

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
    processErrorMessage:function( response ) {
        var Error = false;
        if ( response ) {
            if ( response.error ) {
                if ( response.error.errorCode) {
                    Error = true;
                    Ext.Msg.alert( response.error.errorCode.toString(), response.error.errorMessage.toString() );
                }
            } else {
                Error = true;
                Ext.Msg.alert( 'Server Error' , 'Unknown message received from server.' );
            }
        } else {
            Ext.Msg.alert( 'Error' , 'Unknown response.' )
        }
        return Error;
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
        ////console.log( header );
        return header;
    },

    addPreLoadData:function( key , data ){
        this.preLoadData[ key ] = data;
    },

    getPreLoad:function( key ){

        return this.preLoadData[ key ];
    },
    deletePreLoadData:function( key ) {
        this.preLoadData[ key ] = {};
    },
    getStartOfDay:function() {
        var me = this;
        var now = new Date( ( new Date() ).getTime() + me.getServerTimeDifference() );
        ////console.log( now );
        var startOfDay = new Date( now.getFullYear() , now.getMonth() , now.getDate() );
        var timestamp = startOfDay.getTime();
        return timestamp;
    },
    getServerTime:function() {
        var now = new Date( ( new Date() ).getTime()  -  this.getServerTimeDifference() );
        var timestamp = now.getTime();
        return timestamp;
    },
    getServerTimeDifference:function() {
        var elapsedTime = this.elapsedServerTime;
        return elapsedTime;
    },
    setServerTimeDifference:function() {
        var me = this;
        Ext.Ajax.request({
            url:me.getServerUrl() + '/public/time',
            method:'get',
            success:function( result , request ) {
                var response = Ext.decode( result.responseText );
                var Error = me.processErrorMessage( response );
                if ( Error == false ) {
                    //var elapsed = Ext.Date.getElapsed( new Date( response.data/1000 ) , new Date() );
                    var elapsed = ( new Date() ).getTime() - Math.round( response.data / 1000 );
                    console.log( elapsed );

                    me.elapsedServerTime = elapsed;
                }
            }
        });

    },
    refreshToken:function() {
        var me = this;
        var userCookie = Ext.decode( Ext.util.Cookies.get( '517Employee' ) );
        if ( userCookie ) {
            if ( userCookie.token ) {
                Ext.Ajax.request({
                    url:me.getServerUrl() + '/auth/refresh',
                    method:'get',
                    headers:me.getHeaders( 'get' ),
                    disableCaching:false,
                    params:{
                        maxAge:3600
                    },
                    success:function( result , request ) {
                        var response = Ext.decode( result.responseText );
                        var Error = me.processErrorMessage( response );
                        ////console.log( 'done' );
                    }
                });
            }
        }
    },
    refreshStore:function( view , url , params ) {
        var me = this;
        if ( view ) {
            var store = view.getStore();
            if ( store ) {
                var region = Ext.getCmp( 'Employee-Header-Region');
                params.regionId = region.regionId;
                if ( region.regionId != -1 ) {
                    view.resetAll();
                    store.proxy.useDefaultXhrHeader = false;
                    store.proxy.headers = me.getHeaders( 'get' );

                    store.load( {
                        method:'get',
                        url:me.getServerUrl()+ url ,
                        params: params
                    });
                }  else {
                    store.loadData( [] , false );
                }
            }
        }
    },
    sendCustomAjaxRequest:function( panel , url , method , params , jsonData ,returnType ) {
        var me = this;
        var returnMessage = {};
        returnMessage.error = true;
        returnMessage.data={};
        if ( panel.loadingMessage ) {
            panel.setLoading( panel.loadingMessage );
        } else {
            panel.setLoading( true );
        }
        Ext.Ajax.request({
            url: me.getServerUrl() + url,
            method: method,
            headers:me.getHeaders( method ),
            disableCaching:false,
            params:params,
            jsonData:jsonData,
            success:function( result , request ) {
                panel.setLoading( false );
                var response = Ext.decode( result.responseText );
                var Error = me.processErrorMessage( response );
                returnMessage.error = Error;
                returnMessage.data = response.data;
                //console.log( returnMessage );
                panel.getAjaxRequestResponse( returnMessage , returnType ) ;
            },
            failure:function( result ) {
                Ext.Msg.alert( "Error" , "Fail connect to server, please check your internet connection<br>If there is internet and still not working, <br> please contact technique staff");
                panel.setLoading( false );
            }
        });
    },
    setActivePanel:function ( panelId ) {
        this.activePanel = panelId;
    },

    getActivePanel:function () {
        var panelId = this.activePanel;
        return panelId;
    },
    doRefreshView:function ( view ) {
        Ext.getCmp( view ).refreshView();
    },
    doResetView:function ( view ) {
        Ext.getCmp( view ).resetAll();
    },
    searchUserInfo:function( panel , url , method , searchType , searchValue ,returnType ) {
        var me = this;
        if ( searchType && searchValue ) {
            var params = {};
            params[ searchType ] = searchValue;

            me.sendCustomAjaxRequest( panel , url , method , params , null , returnType );
        }
    },

    searchUserPermission:function( panel , userId , returnType ) {
        var me =this;
        if ( panel && userId && returnType ) {
            var params ={};
            params.userId = userId;
            me.sendCustomAjaxRequest( panel , '/user/permission' , 'get' , params , null , returnType );
        }
    },
    deepCopy:function( obj ) {
        if ( Object.prototype.toString.call( obj ) === '[object Array]' ) {
            var out = [], i = 0, len = obj.length;
            for ( ; i < len; i++ ) {
                out[i] = arguments.callee(obj[i]);
            }
            return out;
        }
        if (typeof obj === 'object') {
            var out = {}, i;
            for ( i in obj ) {
                out[i] = arguments.callee(obj[i]);
            }
            return out;
        }
        return obj;
    },
    handleObject:function( type , obj1 , obj2 ) {
        switch ( type ) {
            case 'extend':
                for ( var attributes in obj2 ) {
                    obj1[ attributes ] = obj2[ attributes ];
                }
                break;
        }
    },
    /*
     Copy Store Value Into Array
     - Require Store
     - Return Copied Array
     */
    copyStoreToArray:function( store ) {
        var me = this;
        var newArray = [];
        store.each( function ( record ) {
            if ( record.data ) {
                var newRecord = me.deepCopy( record.data )
                newArray.push( newRecord );
            }
        });
        return newArray
    },
    mergeObjects:function( objType , ojb1 , obj2 ) {
        var me = this;
        var returnObj;
        switch ( objType ) {
            case 'array':
                var newObj1 = me.deepCopy( ojb1 );
                var newObj2 = me.deepCopy( obj2 );
                returnObj = [];
                if ( ojb1.length == 0 && obj2.length == 0 ) {

                } else if ( ojb1.length > obj2.length ) {
                    for ( var i = 0 ; i < obj2.length ; i ++ ) {
                        me.handleObject( 'extend' , ojb1[ i ] , obj2[ i ] );
                    }
                    returnObj = ojb1;
                } else if ( obj2.length >= ojb1.length ) {
                    for ( var i = 0 ; i < obj2.length ; i ++ ) {
                        me.handleObject( 'extend' , obj2[ i ] , ojb1[ i ] );
                    }
                    returnObj = obj2;
                }
                break;
        }
        return returnObj;
    },
    getDefaultValue:function( name ) {
        var me = this;
        var returnObject;
        if ( typeof name != 'undefined' ) {
            switch ( name ) {
                case 'businessHour':
                    returnObject = [
                        {start:0,end:86400,day:1},
                        {start:0,end:86400,day:2},
                        {start:0,end:86400,day:3},
                        {start:0,end:86400,day:4},
                        {start:0,end:86400,day:5},
                        {start:0,end:86400,day:6},
                        {start:0,end:86400,day:7}
                    ];
                    break;
                case 'information':
                    returnObject={};
                    returnObject.disabled = false;
                    returnObject.businessHour = me.getDefaultValue( 'businessHour' );
                    break;
            }
        }
        return returnObject;
    },
    newBusinessHour:function( grid ){
        if ( grid.gridEditing == true ) {
            Ext.Msg.alert( 'Error' , 'A window already opened, please close it first.' );
        } else {
            var business_hour_store = grid.getStore();
            var win = Ext.create( 'Ext.window.Window' , {
                extend:'Ext.form.Panel',
                title: 'New Business Hour',
                width:450 , height:110,
                autoScroll:false , resizable:false ,
                items:[
                    {
                        xtype: 'fieldset',
                        layout: 'anchor',
                        labelWidth:0,
                        border: false ,frame: false ,
                        margin:'10 0 0 0',
                        items: [
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                labelWidth:0 ,
                                originRecord :null,
                                padding:'0 10 0 0',
                                border:false , frame: false ,
                                fieldDefaults: {
                                    labelAlign: 'right',
                                    labelWidth: 40,
                                    msgTarget: 'qtip'

                                },
                                items: [
                                    { xtype:'textfield',fieldLabel: 'Day',flex:2,value:1, enforceMaxLength: true, maxLength: '1',  maskRe: /[0-9]/, maxValue:7, minValue:0},
                                    { xtype:'textfield',fieldLabel: 'Start', flex:3, value:0, enforceMaxLength: true, maxLength: '5',  maskRe: /[0-9]/, maxValue:86400, minValue:0},
                                    { xtype:'textfield',fieldLabel: 'End', flex:3, value:86400, enforceMaxLength: true, maxLength: '5',  maskRe: /[0-9]/, maxValue:86400, minValue:0 },
                                ]
                            }
                        ]
                    },
                ],
                dockedItems:[
                    {
                        xtype:'toolbar',
                        border:false,frame:false,
                        dock:'bottom',
                        items:[
                            {
                                xtype: 'tbfill'
                            },
                            {
                                xtype: 'button',
                                text:  'Add',
                                width:100,
                                handler:function(field, rowIndex) {
                                    var curwin = this.up().up();
                                    var fields=this.up().up().items.items[0].items.items[0].items.items;
                                    var day = fields[0].getValue();
                                    var start = fields[1].getValue();
                                    var end = fields[2].getValue();
                                    if ( day > 7 || day < 1) Ext.Msg.alert( 'Error' , 'Day must be in 1 - 7 ' );
                                    else if ( start > 86400 || end > 86400 || start < 0 || end < 0 ) Ext.Msg.alert( 'Error' , 'Start/End must be in range 0 - 86400 ' );
                                    else if ( start > end ) Ext.Msg.alert( 'Error' , 'Start must be smaller or equal to End' );
                                    else {
                                        Ext.Msg.show({
                                            title:'Add Business Hour?',
                                            msg: 'You will add business hour: <br/>  Day: '+ day + ' Start: ' + start + ' End: ' + end + ' <br/>Would you like to add the business hour?',
                                            buttons: Ext.Msg.YESNO,
                                            fn: function(btn,text){
                                                if ( btn == 'yes' ) {
                                                    var newBusiness_hour = new Object();
                                                    newBusiness_hour.day =day;
                                                    newBusiness_hour.start =start;
                                                    newBusiness_hour.end =end;
                                                    business_hour_store.add( newBusiness_hour );
                                                    grid.changed = true;
                                                    grid.changedString.push('Added: Day:' + day + ' Start:' + start +' End:' + end);
                                                    curwin.close();
                                                    grid.getView().refresh();
                                                }
                                            },
                                            animEl: 'elId'
                                        });
                                    }

                                    ////console.log(this.up().items.items.indexOf(1));
                                    ////console.log(this.up().items.items.indexOf(2).value);
                                }
                            },
                            {
                                xtype:'tbfill'
                            }
                        ]

                    },
                ],

                listeners:{
                    'close':function( win ) {
                        grid.gridEditing = false;
                    }
                }

            });
            grid.addOpenedWindow( win );
            win.show();
        }
    },
    editBusinessHour:function( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine , tr ) {
        ////console.log( grid.up().up().up() );
        //var grid = grid.up().up().up();
        if ( grid.gridEditing == true ) {
            Ext.Msg.alert( 'Error' , 'A window already opened, please close it first.' );
        } else {
            var win = Ext.create('Ext.window.Window', {
                extend: 'Ext.form.Panel',
                title: 'Edit Business Hour - at row ' + ( rowIdx + 1 ),
                width: 450, height: 110,
                autoScroll: false, resizable: false,
                items: [
                    {
                        xtype: 'fieldset',
                        layout: 'anchor',
                        labelWidth: 0,
                        border: false, frame: false,
                        margin: '10 0 0 0',
                        items: [
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                labelWidth: 0,
                                originRecord: null,
                                padding: '0 10 0 0',
                                border: false, frame: false,
                                fieldDefaults: {
                                    labelAlign: 'right',
                                    labelWidth: 40,
                                    msgTarget: 'qtip'

                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Day',
                                        flex: 2,
                                        value: recordLine.data.day,
                                        enforceMaxLength: true,
                                        maxLength: '1',
                                        maskRe: /[0-9]/,
                                        maxValue: 7,
                                        minValue: 0
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Start',
                                        flex: 3,
                                        value: recordLine.data.start,
                                        enforceMaxLength: true,
                                        maxLength: '5',
                                        maskRe: /[0-9]/,
                                        maxValue: 86400,
                                        minValue: 0
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'End',
                                        flex: 3,
                                        value: recordLine.data.end,
                                        enforceMaxLength: true,
                                        maxLength: '5',
                                        maskRe: /[0-9]/,
                                        maxValue: 86400,
                                        minValue: 0
                                    },
                                ]
                            }
                        ]
                    },
                ],
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        border: false , frame:false ,
                        dock: 'bottom',
                        items: [
                            {
                                xtype: 'tbfill'
                            },
                            {
                                xtype: 'button',
                                text: 'Save',
                                width: 100,
                                handler: function (field, rowIndex) {
                                    ////console.log(this.up().up().items.items[0].items.items);
                                    var curwin = this.up().up();
                                    var fields = this.up().up().items.items[0].items.items[0].items.items;
                                    var day = fields[0].getValue();
                                    var start = fields[1].getValue();
                                    var end = fields[2].getValue();
                                    if (day > 7 || day < 1) Ext.Msg.alert('Error', 'Day must be in 1 - 7 ');
                                    else if (start > 86400 || end > 86400 || start < 0 || end < 0) Ext.Msg.alert('Error', 'Start/End must be in range 0 - 86400 ');
                                    else if (start > end) Ext.Msg.alert('Error', 'Start must be smaller or equal to End');
                                    else if (recordLine.data.day != day || recordLine.data.start != start || recordLine.data.end != end) {
                                        Ext.Msg.show({
                                            title: 'Save Business Hour?',
                                            msg: 'You will change business hour to : <br/>  Day: ' + day + ' Start: ' + start + ' End: ' + end + ' <br/>Would you like to save the change?',
                                            buttons: Ext.Msg.YESNO,
                                            fn: function (btn, text) {
                                                if (btn == 'yes') {

                                                    recordLine.data.day = day;
                                                    recordLine.data.start = start;
                                                    recordLine.data.end = end;
                                                    grid.changed = true;
                                                    grid.changedString.push('Edited: Day:' + day + ' Start:' + start + ' End:' + end);
                                                    curwin.close();
                                                    grid.getView().refresh();
                                                }
                                            },
                                            animEl: 'elId'
                                        });
                                    } else {
                                        curwin.close();
                                    }
                                    ////console.log(this.up().items.items.indexOf(1));
                                    ////console.log(this.up().items.items.indexOf(2).value);
                                }
                            },
                            {
                                xtype: 'tbfill'
                            }
                        ]

                    },
                ],
                listeners:{
                    'close':function( win ) {
                        grid.gridEditing = false;
                    }
                }

            });
            grid.addOpenedWindow( win );
            win.show();
        }
    },
    deleteBusinessHour:function( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine , tr ) {
        if ( grid.gridEditing == true ) {
            Ext.Msg.alert( 'Error' , 'A window already opened, please close it first.' );
        } else {
            Ext.Msg.show({
                title:'Delete Business Hour?',
                msg: 'You will delete business hour : <br/>  Day: '+ recordLine.data.day + ' Start: ' + recordLine.data.start + ' End: ' + recordLine.data.end + ' <br/>Would you like to save the change?',
                buttons: Ext.Msg.YESNO,
                fn: function(btn,text){
                    if ( btn == 'yes' ) {
                        grid.changed = true;
                        grid.changedString.push('Removed: Day:' + recordLine.data.day + ' Start:' + recordLine.data.start +' End:' + recordLine.data.end);
                        grid.getStore().removeAt(rowIdx);
                        grid.getView().refresh();
                    }
                },
                animEl: 'elId'
            });
        }
    },

    /*
     Create new permission
     - Require
     - Return Permission Data
     */
    newPermission:function( grid ) {

    },
    /*
     Delete permission
     - Require
     - Return Permission Data
     */
    deletePermission:function( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine , tr ) {
        if ( grid.gridEditing == true ) {
            Ext.Msg.alert( 'Error' , 'A window already opened, please close it first.' );
        } else {
            Ext.Msg.show({
                title:'Delete Permission?',
                msg: 'You will delete permission : '+ recordLine.data.role + ' <br/>Would you like to save the change?',
                buttons: Ext.Msg.YESNO,
                fn: function(btn,text){
                    if ( btn == 'yes' ) {
                        grid.changed = true;
                        grid.changedString.push('Removed: Permission:' + recordLine.data.role );
                        grid.getStore().removeAt(rowIdx);
                        grid.getView().refresh();
                    }
                },
                animEl: 'elId'
            });
        }
    },
    /*
     Create new permission parameter
     - Require
     - Return Permission Parameter Data
     */
    newParameter:function(){

    },

    copyBusinessHour:function( businessHour ){
        var newBusinessHours = [];
        if ( businessHour ) {
            if ( businessHour.length > 0 ) {
                for ( var i = 0 ; i < businessHour.length ; i ++ ) {
                    var newBusinessHour = new Object();
                    var oldBusinessHour = businessHour[ i ];
                    newBusinessHour.day = oldBusinessHour.day;
                    newBusinessHour.start = oldBusinessHour.start;
                    newBusinessHour.end = oldBusinessHour.end;
                    newBusinessHours.push( newBusinessHour );
                }
            }
        }
        return newBusinessHours;
    },
    copyInformation:function( newObject , information ) {
        var me = this;
        if ( information ) {
            newObject.information = new Object();
            if ( information.disabled ) {
                newObject.information.disabled = information.disabled;
            } else {
                newObject.information.disabled = false;
            }
            if ( information.businessHour ) {
                if ( information.businessHour.length > 0 ) {
                    newObject.information.businessHour = me.copyBusinessHour( information.businessHour );

                } else {
                    newObject.information.businessHour = me.getDefaultValue( 'businessHour' );
                }
            } else {
                newObject.information.businessHour = me.getDefaultValue( 'businessHour' );
            }
        } else {
            newObject.information = me.getDefaultValue( 'information' );
        }
    },
    copyOption:function( newObject , options ) {
        var me = this;
        newObject.option = [];
        if ( options ) {
            if ( options.length > 0 ) {
                for ( var i = 0 ; i < options.length ; i ++ ) {
                    var oldOption = options[ i ];
                    var newOption = new Object();
                    newOption.name = oldOption.name;
                    newOption.nameEn =oldOption.nameEn;
                    newOption.price = oldOption.price;
                    newOption.quantity = oldOption.quantity;
                    if ( oldOption.information ) {
                        me.copyInformation( newOption , oldOption.information );
                    } else {
                        newOption.information = me.getDefaultValue( 'information' );
                    }
                    newObject.option.push( newOption );
                }
            }
        }
    },
    copyOptionGroup:function( oldOptionGroup ) {
        var me = this;
        var newOptionGroup = new Object();

        // Copy Name , NameEn, Max , Min , Quantity
        newOptionGroup.name = oldOptionGroup.name;
        newOptionGroup.nameEn = oldOptionGroup.nameEn;
        newOptionGroup.max = oldOptionGroup.max;
        newOptionGroup.min = oldOptionGroup.min;
        newOptionGroup.quantity = oldOptionGroup.quantity;

        // Copy Information
        if ( oldOptionGroup.information ) {
            me.copyInformation( newOptionGroup , oldOptionGroup.information );
        } else {
            newOptionGroup.information = me.getDefaultValue( 'information' );
        }
        // Copy Option
        if ( oldOptionGroup.option.length == 0 ) {
            Ext.Msg.alert( "Warning" , "This Option Group Doesn't Have Any Option!" );
        } else {
            me.copyOption( newOptionGroup , oldOptionGroup.option );
        }
        return newOptionGroup;
    },

    copyPermission:function( oldPermissions ){
        var me = this;
        var newPermissions = [];
        if ( oldPermissions ) {
            if ( oldPermissions.length > 0 ) {
                for ( var i = 0 ; i < oldPermissions.length ; i ++ ) {
                    var newPermission = new Object();
                    var oldPermission = oldPermissions[ i ];
                    newPermission.role = oldPermission.role;
                    newPermission.restrict = me.copyPermissionRestricts( oldPermission.restrict );
                    newPermission.action = me.copyPermissionActions( oldPermission.action );
                    newPermission.parameter = me.copyPermissionParameters( oldPermission.parameter );
                    newPermissions.push( newPermission );
                }
            }
        }

        return newPermissions;
    },
    copyPermissionParameters:function( oldParameters ) {
        var newParameters = new Object();
        if ( oldParameters ) {
            for (var key in oldParameters) {
                if (oldParameters.hasOwnProperty(key)) {
                    var oldParameter = oldParameters[key];
                    newParameters[ oldParameter.key ] = oldParameter.value;
                }
            }

        }
        return newParameters;
    },
    copyPermissionRestricts:function( oldRestricts ) {
        var newRestricts = [];
        if ( oldRestricts ) {
            if ( oldRestricts.length > 0 ) {
                for ( var i = 0 ; i < oldRestricts.length ; i ++ ) {
                    var newRestrict = '';
                    var oldRestrict = oldRestricts[ i ];
                    newRestrict = oldRestrict;
                    newRestricts.push( newRestrict );
                }
            }
        }
        return newRestricts;
    },
    copyPermissionActions:function( oldActions ) {
        var newActions = [];
        if ( oldActions ) {
            if ( oldActions.length > 0 ) {
                for ( var i = 0 ; i < oldActions.length ; i ++ ) {
                    var newAction = '';
                    var oldAction = oldActions[ i ];
                    newAction = oldAction;
                    newActions.push( newAction );
                }
            }
        }
        return newActions;
    },
    getComboFields:function( type , width ) {

        var field = {};
        switch ( type ) {
            case 'dateStart':
                field = {
                    xtype: 'datefield',
                    width:width,
                    name: 'start',
                    maxValue: new Date(),
                    listeners: {
                        change: function(field , newVal ,oldVal ,func ) {
                            var end_field = field.up().items.items[ field.up().items.items.length - 2 ];
                            if ( typeof newVal == 'object' ) {
                                end_field.setMinValue( field.getValue() );
                            }
                        }
                    }
                };
                break;
            case 'dateEnd':
                field = {
                    xtype: 'datefield',
                    width:width,
                    name: 'end',
                    minValue: 0,
                    maxValue: new Date(),
                    listeners: {
                        afterrender:function( field ){
                            field.hide();
                        },
                        change: function( field , newVal ,oldVal ,func ) {
                            var start_field = field.up().items.items[ field.up().items.items.length - 4 ];
                            if ( typeof newVal == 'object'){
                                start_field.setMaxValue(field.getValue());
                            }
                        }
                    }
                };
                break;
            case 'dateEndShow':
                field = {
                    xtype: 'datefield',
                    width:width,
                    name: 'end',
                    minValue: 0,
                    maxValue: new Date(),
                    listeners: {
                        change: function( field , newVal ,oldVal ,func ) {
                            var start_field = field.up().items.items[ field.up().items.items.length - 4 ];
                            if ( typeof newVal == 'object'){
                                start_field.setMaxValue(field.getValue());
                            }
                        }
                    }
                };
                break;
            case 'and':
                field = {
                    xtype : 'displayfield',
                    value : 'And',
                    width : width,
                    listeners:{
                        afterrender:function( field ){
                            field.hide();
                        }
                    }
                };
                break;
            case 'andShow':
                field = {
                    xtype : 'displayfield',
                    value : 'And',
                    width : width
                };
                break;
            case 'statusField':
                field = {
                    xtype: 'textfield',
                    width:width,
                    enforceMaxLength: true,
                    maxLength: '1',
                    maskRe: /[0-9]/,
                    maxValue: 9,
                    minValue: 0,
                    listeners:{
                        afterrender:function( field ){
                            field.hide();
                        }
                    }
                };
                break;
            case 'statusFieldShow':
                field = {
                    xtype: 'textfield',
                    width:width,
                    enforceMaxLength: true,
                    maxLength: '1',
                    maskRe: /[0-9]/,
                    maxValue: 9,
                    minValue: 0
                };
                break;
            case 'numberField':
                field = {
                    xtype: 'textfield',
                    width:width,
                    maskRe: /[0-9]/,
                    listeners:{
                        afterrender:function( field ){
                            field.hide();
                        }
                    }
                };
                break;
            case 'phoneField':
                field = {
                    xtype: 'textfield',
                    width:width,
                    maskRe: /[0-9]/,
                    enforceMaxLength: true,
                    //minLength: '15',
                    maxLength: '10',
                    listeners:{
                        afterrender:function( field ){
                            field.hide();
                        }
                    }
                };
                break;
            case 'phoneFieldShow':
                field = {
                    xtype: 'textfield',
                    width:width,
                    enforceMaxLength: true,
                    //minLength: '15',
                    maxLength: '10',
                    maskRe: /[0-9]/
                };
                break;
            case 'valueField':
                field = {
                    xtype: 'textfield',
                    width:width,
                    maskRe: /[0-9a-zA-Z]/,
                    listeners:{
                        afterrender:function( field ){
                            field.hide();
                        }
                    }
                };
                break;
            case 'numberFieldShow':
                field = {
                    xtype: 'textfield',
                    width:width,
                    maskRe: /[0-9]/
                };
                break;
            case 'valueFieldShow':
                field = {
                    xtype: 'textfield',
                    width:width,
                    maskRe: /[0-9a-zA-Z]/
                };
                break;
            case 'textField':
                field = {
                    xtype: 'textfield',
                    width:width,
                    listeners:{
                        afterrender:function( field ){
                            field.hide();
                        }
                    }
                };
                break;
            case 'textFieldShow':
                field = {
                    xtype: 'textfield',
                    width:width
                };
                break;
            case 'close':
                field = {
                    xtype: 'displayfield',
                    value: 'X',
                    style: {
                        'border-width':'0px',
                        cursor:'pointer'
                    },
                    listeners:{
                        render: function( field , b , c , d , e , f , g ) {
                            this.getEl().on('click', function() {
                                field.up().up().removeSearch( field.up() );
                            });
                        }
                    }
                };
                break;
        }
        return field;
    },

    /*
     Create User Account
     - Require origin panel , registerType , request method , username and password (json) ,returnType
     activeStatus
     */
    createUserAccount:function( panel ,registerType , method , jsonData , returnType ) {
        var me = this;
        if ( panel && registerType && method && jsonData && returnType ) {
            me.sendCustomAjaxRequest( panel , '/request/' + registerType , method , null , jsonData , returnType );
        }
    },

    /*
     Create User Profile
     - Require origin panel , method , request method , userId ,  activationCode ,returnType
     */
    createUserProfile:function( panel , profileData , returnType ) {
        var me = this;
        var method = me.getRequestMethod( returnType );
        var url = me.getRequestUrl( returnType );
        me.sendCustomAjaxRequest( panel , url , method , null , profileData , returnType );
    },

    /*
     Active & Disable User Account
     - Require origin panel , method , request method , userId , reasonDisabled , codeDisabled , activeStatus ,returnType
     */
    activeUserAccount:function( panel , url , userId , reasonDisabled , codeDisabled , activeStatus , returnType ) {
        var me = this;
        if ( panel && url && userId && reasonDisabled && typeof codeDisabled != 'undefined' && typeof activeStatus != 'undefined' && returnType ) {
            var jsonData = new Object();
            jsonData.userId = userId;
            if ( activeStatus == false ) {
                jsonData.reasonDisabled = reasonDisabled;
                jsonData.codeDisabled = codeDisabled;
                jsonData.disabled = activeStatus;
            } else if ( activeStatus == true ) {
                jsonData.reasonDisabled = reasonDisabled;
                jsonData.codeDisabled = codeDisabled;
                jsonData.disabled = activeStatus;
            }
            jsonData = JSON.stringify( jsonData );
            me.sendCustomAjaxRequest( panel , url , 'put' , null , jsonData , returnType );
        }
    },
    /*
     Active & Disable User Account By Code
     - Require origin panel , method , request method , userId ,  activationCode ,returnType
     */
    activeUserAccountByCode:function( panel , url , userId , activationCode , returnType ) {
        var me = this;
        if ( panel && url && userId && activationCode && returnType ) {
            var jsonData = new Object();
            jsonData.userId = userId;
            jsonData.code = activationCode;
            jsonData = JSON.stringify( jsonData );
            me.sendCustomAjaxRequest( panel , url , 'put' , null , jsonData , returnType );
        }
    },


    getAjaxRequestResponse:function( returnMessage , returnType ) {
        var me = this;
        if ( returnMessage.error == false ) {
            switch( returnType ) {
                case 'createUserAccount':
                    Ext.Msg.alert( 'Success' , "User's account has been created" );
                    me.setLoading( false );
                    break;
                case 'createActiveUserAccount':
                    // Search User Info - To searchUserInfo
                    //Ext.getCmp( 'Employee-Header').sendCustomAjaxRequest( me , '/request/' + registerType , 'post' , null , params ,);
                    break;
            }
        }
    },

    getRequestMethod:function( requestName ) {
        var method = '';
        if ( requestName ) {
            switch( requestName ) {
                case 'createDriverProfile':
                    method = 'post';
                    break;
                case 'createStoreProfile':
                    method = 'post';
                    break;
            }
        }
        return method;
    },
    getRequestUrl:function( requestName ) {
        var method = '';
        if ( requestName ) {
            switch( requestName ) {
                case 'createDriverProfile':
                    method = '/user/driver';
                    break;
                case 'createStoreProfile':
                    method = '/user/store';
                    break;
            }
        }
        return method;
    }
});