Ext.define('517Employee.view.operator.OperatorView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.operator.Sidebar',
        '517Employee.view.operator.ContentView'
    ],
    xtype: 'employee-operator',
    frame:false , border:false,
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    layout: 'border',
    //autoScroll:true,

    /*  Variables */
    elapsedServerTime:0,


    items:[
        {
            region: 'west',
            xtype: 'employee-operator-sidebar',
            // Border Color
            style:{ "background-color":"none"},
            id: 'Employee-Operator-Sidebar'
        },
        {
            region: 'center',
            margin: '0 0 0 10' , frame:false , border:false ,
            xtype: 'employee-operator-content',
            id: 'Employee-Operator-Content'
        }
    ],
    listeners: {
        afterRender: function(c) {
           this.setServerTimeDifference();
        }

    },
    refreshView:function() {
        ////console.log( this.items.items[1].items.items[0] );
        // Refresh Operation Panel
        Ext.getCmp( 'Employee-Header').doRefreshView( 'Employee-Operator-Operation' );
        // Refresh New Order Panel
        Ext.getCmp( 'Employee-Header').doRefreshView( 'Employee-Operator-NewOrder' );

        // PreLoad Data
        var region = Ext.getCmp( 'Employee-Header-Region');

        if ( Ext.getStore( 'Employee-Temp-PreLoad-TypeMapPublic') ) {
            var typeMapPublicStore = Ext.getStore( 'Employee-Temp-PreLoad-TypeMapPublic')
        } else {
            var typeMapPublicStore = Ext.create('517Employee.store.temp.preLoad.TypeMapPublic');
        }

        Ext.getCmp( 'Employee-Header').deletePreLoadData( 'typeMapPublic' );
        typeMapPublicStore.proxy.headers = Ext.getCmp( 'Employee-Header').getHeaders( 'get' );
        typeMapPublicStore.load({
            method:'get',
            url:Ext.getCmp( 'Employee-Header' ).getServerUrl()+'/public/store/type',
            params:{
                regionId:region.regionId
            },
            callback:function( records ){
                if ( records [ 0 ] ){
                    var typeMapPublic = {};
                    for ( var i = 0 ; i < records.length ; i ++ ) {
                        var typeInfo = records[ i].data;
                        typeMapPublic[ typeInfo.typeId ] = typeInfo;
                    }
                    Ext.getCmp( 'Employee-Header').addPreLoadData( 'typeMapPublic' , typeMapPublic );
                }
            }
        });
        if ( Ext.getStore( 'Employee-Temp-PreLoad-CategoryMapPublic') ) {
            var categoryMapPublicStore = Ext.getStore( 'Employee-Temp-PreLoad-CategoryMapPublic')
        } else {
            var categoryMapPublicStore = Ext.create( '517Employee.store.temp.preLoad.CategoryMapPublic' );
        }
        Ext.getCmp( 'Employee-Header').deletePreLoadData( 'categoryMapPublic' );
        categoryMapPublicStore.proxy.headers = Ext.getCmp( 'Employee-Header').getHeaders( 'get' );
        categoryMapPublicStore.load({
            method:'get',
            url:Ext.getCmp( 'Employee-Header' ).getServerUrl()+'/public/store/category',
            params:{
                regionId:region.regionId
            },
            callback:function( records ){
                if ( records [ 0 ] ){
                    var categoryMapPublic = {};
                    for ( var i = 0 ; i < records.length ; i ++ ) {
                        var categoryInfo = records[ i].data;
                        categoryMapPublic[ categoryInfo.categoryId ] = categoryInfo;
                    }
                    Ext.getCmp( 'Employee-Header').addPreLoadData( 'categoryMapPublic' , categoryMapPublic );
                }
            }
        });

    },
    resetAll:function() {

        // Reset Operation Panel
        Ext.getCmp( 'Employee-Header').doResetView( 'Employee-Operator-Operation' );
        // Reset New Order Panel
        Ext.getCmp( 'Employee-Header').doResetView( 'Employee-Operator-NewOrder' );
    },
    doNavigation:function( tab ){
        var operatorContent = Ext.getCmp( 'Employee-Operator-Content' );
        var employeeContent = Ext.getCmp( 'Employee-Main-ContentView' );
        if ( tab ) {
            if ( tab.navigateAction ) {
                /* 0: Operation
                 *  1: NewOrder
                 *  2: Xxx
                 *  3: Main
                 */
                switch ( tab.navigateAction ) {
                    case 'operation' :
                        operatorContent.setActiveItem(0);
                        break;

                    case 'newOrder' :
                        operatorContent.setActiveItem(1);
                        break;

                    case 'xxxxX' :
                        operatorContent.setActiveItem(3);
                        break;

                    case 'employee-navigation' :
                        employeeContent.setActiveItem(0);
                        break;

                }
            } else {
                employeeContent.setActiveItem(0);
            }
        }
    },

    getServerTimeDifference:function() {
        var elapsedTime = this.elapsedServerTime;
        return elapsedTime;
    },

    setServerTimeDifference:function() {
        var me = this;

        Ext.Ajax.request({
            url:Ext.getCmp( 'Employee-Header' ).getServerUrl() + '/public/time',
            method:'get',
            success:function( result , request ) {
                var response = Ext.decode( result.responseText );
                var Error = Ext.getCmp( 'Employee-Header' ).processErrorMessage( response );
                if ( Error == false ) {
                    var elapsed = Ext.Date.getElapsed( new Date() , new Date( response.data/1000 ) );
                    me.elapsedServerTime = elapsed;
                }
            }
        });

    },

    // Function get start of current day
    getServerTime:function() {
        var now = new Date( ( new Date() ).getTime() +  this.getServerTimeDifference() );
        var timestamp = now.getTime();
        return timestamp;
    },

});