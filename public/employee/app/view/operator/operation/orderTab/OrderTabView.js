/**
 * Created by devo on 6/22/2015.
 */
Ext.define('517Employee.view.operator.operation.orderTab.OrderTabView', {
    extend: 'Ext.tab.Panel',
    requires:[
        '517Employee.view.operator.operation.orderTab.orderList.OrderListView',
        '517Employee.view.operator.operation.orderTab.OrderTabModel',
        '517Employee.view.operator.operation.orderTab.OrderTabController',
        '517Employee.view.operator.operation.orderTab.Clock',
    ],
    xtype:'employee-operator-operation-orderTab',
    controller:'employee-operator-operation-orderTab-controller',
    viewModel:{
        type:'employeeoperator'
    },
    layout:'fit',
    referenceHolder:true,
    title: 'Order List',
    header:{ titleAlign: 'left' , height:30 , padding:'0 10 0 10', margin:'0 0 0 0' },
    columnLines: true,
    tabBarHeaderPosition: 2,
    overflowX: 'auto',
    tabBar:{
        defaults: {
            flex: 1, // if you want them to stretch all the way
            height: 24, // set the height
            margin:'5.5 10 0 10'
        }
    },

    initComponent:function(){
        var me = this;
        var OrderTabClock = Ext.TaskManager.start({
            run: me.updateClock,
            scope:me,
            interval: 1000
        });
        this.callParent();
    },

    /*  Variables  */
    // Variable detect if editing
    gridEditing: false ,
    // Window Opend in this View
    windowPopUp:[],

    /*  View Content  */
    items: [
        {
            xtype:'employee-operator-operation-orderTab-orderList',
            itemId:'active-orders',
            reference:'active-orders',
            bind: {
                title: 'Active Orders <span class="badge">{activeTotal}</span>',
                store: '{activeOrder}',
            },
            reserveScrollbar:true
        },
        {
            xtype:'employee-operator-operation-orderTab-orderList',
            bind:{
                title:'Finished Orders <span class="badge">{finishedTotal}</span>',
                store:'{finishedOrder}'
            },
            reserveScrollbar:true
        },
        {
            xtype:'employee-operator-operation-orderTab-orderList',
            bind:{
                title:'Cancelled Orders <span class="badge">{cancelledTotal}</span>',
                store:'{cancelledOrder}'
            },
            reserveScrollbar:true
        }
    ],
    listeners: {
        afterRender: function(grid) {

        }
    },
    tools: [

        {
            xtype:'tbfill'
        },
        {
            xtype:'employee-operator-operation-orderTab-clock',
            align:'right'
        },
        {
            id: 'refresh',
            align:'right',
            handler:function(){
                this.up().up().refreshView();
            }

        }
    ],
    refreshView:function() {
        var me = this;
        this.resetAll();
        var orderListStore = Ext.getStore( 'Employee-Operator-Operation-OrderList' );
        var region = Ext.getCmp( 'Employee-Header-Region');
        if ( region.regionId != -1 ) {
            var start_of_day = this.getStartOfDay()*1000;
            me.setLoading( true );
            orderListStore.proxy.headers = Ext.getCmp( 'Employee-Header').getHeaders( 'get' );

            orderListStore.load({
                method:'get',
                url:Ext.getCmp( 'Employee-Header' ).getServerUrl()+'/order',

                params:{
                    regionId:region.regionId,
                    filterBy:'placeDate',
                    filterValue:start_of_day,
                    filterOperator:'gt',
                    extra: 'store,driver'
                },
                callback:function( records, operation, success ) {

                    me.addMarkers( records );
                    me.setLoading( false );
                }
            });
        } else {
            orderListStore.loadData( [] , false );
            //Ext.ComponentQuery.query('#employee-operator-operation-orderTab-orderList')[0].getView().refresh();
            me.setLoading( false );
        }

    },
    resetAll:function() {
        var me = this ;
        this.gridEditing = false;
        this.setLoading( false );
        this.windowPopUp = [];
        var orderListStore = Ext.getStore( 'Employee-Operator-Operation-OrderList' );
        orderListStore.loadData( [] , false );
        //Ext.ComponentQuery.query('#employee-operator-operation-orderTab-orderList')[0].getView().refresh();

    },
    // Function get start of current day
    getStartOfDay:function() {
        var now = new Date( ( new Date() ).getTime() +  Ext.getCmp( 'Employee-Operator' ).getServerTimeDifference() );
        ////console.log( now );
        var startOfDay = new Date( now.getFullYear() , now.getMonth() , now.getDate() );
        var timestamp = startOfDay.getTime();
        return timestamp;
    },

    addMarkers:function( records ){
        ////console.log( records );
        var map = Ext.getCmp( 'Employee-Operator-Operation-Map').lookupReference( 'map' );
        map.clearMarkers('user');
        if ( records.length > 0 ) {

            for ( var i = 0 ; i < records.length ; i ++ ) {
                var r = records[ i ].data;
                if ( r.activeStatus > -1 && r.activeStatus < 8 ) {
                    map.addMarker(
                        {
                            lat: r.delivery.latitude,
                            lng: r.delivery.longitude
                        },
                        r.activeStatus,
                        Ext.util.Format.substr(r.invoiceNo , 12 ) ,
                        'user'
                    );
                    if ( r.store ) {
                        if ( r.store.logo && r.store.location ) {
                            if ( r.store.logo.mini && r.store.location.latitude && r.store.location.longitude ) {
                                map.addMarker(
                                    {
                                        lat: r.store.location.latitude,
                                        lng: r.store.location.longitude
                                    },
                                    r.store.logo.mini,
                                    Ext.util.Format.substr(r.invoiceNo , 12 ) ,
                                    'res'
                                );
                            }
                        }
                    }
                }
            }


        }
    },



    // Update Clock
    updateClock:function() {

        Ext.fly('Employee-Operator-Operation-OrderTab-LocalClock').setText(Ext.Date.format( new Date() , 'h:i:s A'));
        Ext.fly('Employee-Operator-Operation-OrderTab-ServerClock').setText(Ext.Date.format( new Date( ( new Date() ).getTime() -
                            Ext.getCmp( 'Employee-Header' ).getServerTimeDifference() ), ' h:i:s A') );

    }

});
