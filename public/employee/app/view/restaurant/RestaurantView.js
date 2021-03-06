Ext.define('517Employee.view.restaurant.RestaurantView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.restaurant.Sidebar',
        '517Employee.view.restaurant.RestaurantViewController'
    ],   
    xtype: 'employee-restaurant',
    referenceHolder:true,
    controller: 'employee-restaurant-controller',
    frame:false , border:false,
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    layout: 'border',

    items:[
        {
            region: 'west',
            xtype: 'employee-restaurant-sidebar',
            // Border Color
            style:{ "background-color":"none"},
            id: 'Employee-Restaurant-Sidebar'
        },
        {
            region: 'center',
            reference:'restaurantContentHolder',
            border: false,frame:false,
            layout:'fit'
            //xtype: 'employee-restaurant-content',

        }
    ],
    listeners: {
        render: function(c) {
            c.el.on('click', function() { 
                //alert('onclick');
            });
        },
        scope: this
    },
    resetAll:function(){

        var controllerView = Ext.getCmp( 'Employee-Header' );

        // Reset Restaurant Order History
        if ( Ext.getCmp( 'Employee-Restaurant-OrderHistory' ) ) {
            controllerView.doResetView( 'Employee-Restaurant-OrderHistory' );
        }

        // Reset Restaurant Information
        if ( Ext.getCmp( 'Employee-Restaurant-Information' ) ) {
            controllerView.doResetView( 'Employee-Restaurant-Information' );
        }

        // Reset Restaurant Dish
        if ( Ext.getCmp( 'Employee-Restaurant-Dish' ) ) {
            controllerView.doResetView( 'Employee-Restaurant-Dish' );
        }
    },

    refreshView:function(){

        var controllerView = Ext.getCmp( 'Employee-Header' );

        // Refresh Restaurant Order History
        if ( Ext.getCmp( 'Employee-Restaurant-OrderHistory' ) ) {
            controllerView.doRefreshView( 'Employee-Restaurant-OrderHistory' );
        }

        // Refresh Restaurant Information
        if ( Ext.getCmp( 'Employee-Restaurant-Information' ) ) {
            controllerView.doRefreshView( 'Employee-Restaurant-Information' );
        }

        // Refresh Restaurant Dish
        if ( Ext.getCmp( 'Employee-Restaurant-Dish' ) ) {
            controllerView.doRefreshView( 'Employee-Restaurant-Dish' );
        }

        // PreLoad Data
        var region = Ext.getCmp( 'Employee-Header-Region');

        if ( Ext.getStore( 'Employee-Temp-PreLoad-TypeMap') ) {
            var typeMapStore = Ext.getStore( 'Employee-Temp-PreLoad-TypeMap')
        } else {
            var typeMapStore = Ext.create('517Employee.store.temp.preLoad.TypeMap');
        }

        Ext.getCmp( 'Employee-Header').deletePreLoadData( 'typeMap' );
        typeMapStore.proxy.headers = Ext.getCmp( 'Employee-Header').getHeaders( 'get' );
        typeMapStore.load({
            method:'get',
            url:Ext.getCmp( 'Employee-Header' ).getServerUrl()+'/store/type',
            params:{
                regionId:region.regionId
            },
            callback:function( records ){
                if ( records [ 0 ] ){
                    var typeMap = {};
                    for ( var i = 0 ; i < records.length ; i ++ ) {
                        var typeInfo = records[ i].data;
                        typeMap[ typeInfo.typeId ] = typeInfo;
                    }
                    Ext.getCmp( 'Employee-Header').addPreLoadData( 'typeMap' , typeMap );
                }
            }
        });
        if ( Ext.getStore( 'Employee-Temp-PreLoad-CategoryMap') ) {
            var categoryMapStore = Ext.getStore( 'Employee-Temp-PreLoad-CategoryMap')
        } else {
            var categoryMapStore = Ext.create( '517Employee.store.temp.preLoad.CategoryMap' );
        }
        Ext.getCmp( 'Employee-Header').deletePreLoadData( 'categoryMap' );
        categoryMapStore.proxy.headers = Ext.getCmp( 'Employee-Header').getHeaders( 'get' );
        categoryMapStore.load({
            method:'get',
            url:Ext.getCmp( 'Employee-Header' ).getServerUrl()+'/store/category',
            params:{
                regionId:region.regionId
            },
            callback:function( records ){
                if ( records [ 0 ] ){
                    var categoryMap = {};
                    for ( var i = 0 ; i < records.length ; i ++ ) {
                        var categoryInfo = records[ i].data;
                        categoryMap[ categoryInfo.categoryId ] = categoryInfo;
                    }
                    Ext.getCmp( 'Employee-Header').addPreLoadData( 'categoryMap' , categoryMap );
                }
            }
        });

    },

    doNavigation:function( tab ) {
        var restaurantContent = Ext.getCmp( 'Employee-Restaurant-Content' );
        var employeeContent = Ext.getCmp( 'Employee-Main-ContentView' );
        if ( tab ) {           
            if ( tab.navigateAction ) {
                /* 0: Order History
                *  1: Information
                *  2: Dish
                *  3: Main
                */
                switch ( tab.navigateAction ) { 
                    case 'orderHistory' :
                        restaurantContent.setActiveItem(0);
                        break;

                    case 'information' :
                        restaurantContent.setActiveItem(1);
                        break;

                    case 'dish' :
                        restaurantContent.setActiveItem(2);
                        break;

                    case 'xxxxX' :
                        restaurantContent.setActiveItem(3);
                        break;
                        
                    case 'employee-navigation' :
                        employeeContent.setActiveItem(0);
                        break;

                }     
            } else {
                employeeContent.setActiveItem(0);
            }   
        }
    }
    
});