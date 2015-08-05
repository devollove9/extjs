
var OrderHistoryPagingStore =  Ext.create( '517Employee.store.restaurant.orderHistory.OrderPaging' );
/*
var that_store = new Ext.ux.data.PagingArrayStore({
    fields: ['invoiceNo'],
    lastOptions: {params: {start: 0, limit: 10}}
});*/
Ext.define('517Employee.view.restaurant.orderHistory.OrderHistoryOrderList', {
    extend: 'Ext.grid.Panel',
    requires: [
        '517Employee.view.restaurant.orderHistory.OrderHistoryOrderListController'
    ],   
    xtype: 'employee-restaurant-orderHistory-orderList',
    controller:'employee-restaurant-orderHistory-orderList-controller',
    autoScroll:true,
    store: OrderHistoryPagingStore ,
    dockedItems:[
        {
            store : OrderHistoryPagingStore,
            xtype:'pagingtoolbar',
            dock:'bottom',
            margin:'0 0 1 0',
            displayInfo: true,
            displayMsg: 'Orders {0} - {1} of {2}',
            emptyMsg: "No orders to display",
            listeners: {
                afterRender: function( field ) {
                    //console.log( field );
                    //console.log( this );
                    //console.log(store);
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
            text: 'Order No.',
            flex: 2,
            sortable: true,
            minWidth: 130,
            dataIndex: 'invoiceNo',align : 'center',
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
                    handler: 'orderDetail'
                }
            ]
        },
        {
            text: 'Placed Date',
            flex: 2,
            minWidth: 160,
            sortable: true,
            dataIndex: 'placeDate',align : 'center',
            renderer: function(val) {
                return Ext.Date.format(new Date( val/1000 ), 'm/d/Y h:i A');
            }
        },
        {
            text: 'Subtotal',
            flex: 1,
            sortable: true,
            minWidth: 70,
            dataIndex: 'payment',
            align : 'center', 
            
            renderer: function(val) {
                return '$' + val.total.toFixed(2);
            }
        },
        {
            text: 'Tax',
            flex: 1,
            sortable: true,
            minWidth: 70,
            dataIndex: 'payment',
            align : 'center',
            renderer: function(val) {
                return '$' + val.tax.toFixed(2);
            }
        },
        {
            text: 'Tips',
            flex: 1,
            sortable: true,
            minWidth: 70,
            dataIndex: 'payment',
            align : 'center',
            renderer: function( val , a , record ) {
                if ( record.data.pick.type != 0 &&  record.data.pick.type != 1 &&  record.data.pick.type != 2 ) return '$0';
                else return '$' + val.tip.toFixed(2);
            }
        },
        {
            text: 'Delivery',
            flex: 1,
            sortable: true,
            minWidth: 70,
            dataIndex: 'payment',
            align : 'center',
            renderer: function( val , a , record ) {
                if ( record.data.pick.type != 0 &&  record.data.pick.type != 1 &&  record.data.pick.type != 2 ) return '$0';
                else return '$' + val.delivery.toFixed(2);
            }
        },
        {
            text: 'Total',
            flex: 1,
            sortable: true,
            minWidth: 70,
            dataIndex: 'payment',
            align : 'center',
            renderer: function(val) {
                return '$' + val.total.toFixed(2);
            }
        },
        {
            text: 'Type',
            flex: 2,
            sortable: true,
            minWidth: 130,
            dataIndex: 'pick',
            align : 'center',
            renderer: function(val) {
                if ( val.method == 0 ) return 'Delivery';
                if ( val.method == 1 ) return 'Pick Up';
                if ( val.method == 2 ) return 'Rest-Deliver';
                if ( val.method == 3 ) return 'Restaurant';
            }
        },
        {
            text: 'Method',
            flex: 1,
            sortable: true,
            minWidth: 70,
            dataIndex: 'payment',
            align : 'center',
            renderer: function(val) {
                if ( val.method == 0 )return '<span style="color:' + "#e75f5f" + ';">' + 'Cash' + '</span>';
                if ( val.method == 1 ) return 'Card';
            }
        }
    ],

    resetAll:function() {
        this.getStore().getProxy.data = [];
        this.getStore().clearData();
        this.getStore().removeAll();
        this.getView().refresh();

    },
    refreshViewByParams:function( param ){
        var me = this;
        this.resetAll();

        var params = param;
        // If not admin must have region
        var region = Ext.getCmp( 'Employee-Header-Region' );
        var orderSearchToolbar = Ext.getCmp( 'Employee-Restaurant-OrderHistory-Toolbar-Center');

        // Order List Panel
        var orderList = Ext.getCmp( 'Employee-Restaurant-OrderHistory-OrderList' );

        // Order List Store
        var orderListStore = orderList.getStore();
        if ( region.regionId == -1 ) {

        } else {
            params.regionId = region.regionId;
            var restaurant = Ext.getCmp( 'Employee-Restaurant-OrderHistory-RestaurantList' );
            if ( restaurant.getSelectionModel().hasSelection() ) {
                params.storeId = restaurant.getSelectionModel().getSelection()[ 0 ].data.storeId;
            }
            //orderSearchToolbar.updateSearchParams( params );

            orderListStore.getProxy().data = [];

            orderList.setLoading( true );
            // Send Request

            Ext.Ajax.request({
                url : Ext.getCmp( 'Employee-Header').getServerUrl() + '/order' ,
                headers: Ext.getCmp( 'Employee-Header').getHeaders( 'get' ) ,
                method : 'get' ,
                params : params ,
                disableCaching:false,
                success : function ( result , request ) {
                    var response = JSON.parse( result.responseText );
                    var Error = Ext.getCmp( 'Employee-Header').processErrorMessage( response );
                    if ( Error == true ) {
                        orderListStore.load();
                        orderList.setLoading( false );
                    } else {
                        orderListStore.getProxy().data = response.data;
                        orderListStore.load();
                        orderListStore.loadPage(1);
                        orderList.setLoading( false );
                    }
                },
                failure : function ( result , request ) {
                    orderListStore.load();
                    orderList.setLoading( false );
                    Ext.Msg.alert( 'Failure' , 'Unknown Error , Please Contact Technique Support.' );
                }
            });
        }

    },
    refreshView:function(){
        var me = this;
        this.resetAll();
        var params = {};

        // If not admin must have region
        var region = Ext.getCmp( 'Employee-Header-Region' );
        var orderSearchToolbar = Ext.getCmp( 'Employee-Restaurant-OrderHistory-Toolbar-Center');

        // Order List Panel
        var orderList = Ext.getCmp( 'Employee-Restaurant-OrderHistory-OrderList' );

        // Order List Store
        var orderListStore = orderList.getStore();
        if ( region.regionId == -1 ) {

        } else {
            params.regionId = region.regionId;
            var restaurant = Ext.getCmp( 'Employee-Restaurant-OrderHistory-RestaurantList' );
            if ( restaurant.getSelectionModel().hasSelection() ) {
                params.storeId = restaurant.getSelectionModel().getSelection()[ 0 ].data.storeId;
            }
            orderSearchToolbar.updateSearchParams( params );

            orderListStore.getProxy().data = [];

            orderList.setLoading( true );
            // Send Request

            Ext.Ajax.request({
                url : Ext.getCmp( 'Employee-Header').getServerUrl() + '/order' ,
                headers: Ext.getCmp( 'Employee-Header').getHeaders( 'get' ) ,
                method : 'get' ,
                params : params ,
                disableCaching:false,
                success : function ( result , request ) {
                    var response = JSON.parse( result.responseText );
                    var Error = Ext.getCmp( 'Employee-Header').processErrorMessage( response );
                    if ( Error == true ) {
                        orderListStore.load();
                        orderList.setLoading( false );
                    } else {
                        orderListStore.getProxy().data = response.data;
                        orderListStore.load();
                        orderListStore.loadPage(1);
                        orderList.setLoading( false );
                    }
                },
                failure : function ( result , request ) {
                    orderListStore.load();
                    orderList.setLoading( false );
                    Ext.Msg.alert( 'Failure' , 'Unknown Error , Please Contact Technique Support.' );
                }
            });
        }



    }

    
});