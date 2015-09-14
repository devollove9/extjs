
var DriverUniqueOrderHistoryPagingStore =  Ext.create( '517Employee.store.driverUnique.orderHistory.OrderPaging' );
/*
var that_store = new Ext.ux.data.PagingArrayStore({
    fields: ['invoiceNo'],
    lastOptions: {params: {start: 0, limit: 10}}
});*/
Ext.define('517Employee.view.driverUnique.orderHistory.OrderHistoryOrderList', {
    extend: 'Ext.grid.Panel',
    requires: [
        '517Employee.view.driverUnique.orderHistory.OrderHistoryOrderListController'
    ],   
    xtype: 'employee-driverUnique-orderHistory-orderList',
    controller:'employee-driverUnique-orderHistory-orderList-controller',
    autoScroll:true,
    store: DriverUniqueOrderHistoryPagingStore ,
    dockedItems:[
        {
            store : DriverUniqueOrderHistoryPagingStore,
            xtype:'pagingtoolbar',
            dock:'bottom',
            margin:'0 0 1 0',
            displayInfo: true,
            displayMsg: 'Orders {0} - {1} of {2}',
            emptyMsg: "No orders to display",
            listeners: {
                afterRender: function( field ) {
                    ////console.log( field );
                    ////console.log( this );
                    ////console.log(store);
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
                return '$' + val.subtotal.toFixed(2);
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
                if ( record.data.pick.method != 0 &&  record.data.pick.method != 1 &&  record.data.pick.method != 3 ) return '$0';
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
                if ( record.data.pick.method != 0 &&  record.data.pick.method != 1 &&  record.data.pick.method != 3 ) return '$0';
                else return '$' + val.delivery.toFixed(2);
            }
        },
        {
            text: 'Status',
            flex: 2,
            dataIndex: 'activeStatus',
            minWidth: 200,
            align: 'center',
            renderer: function(val, metaData, record) {
                var timestamp = record.data.status[val]/1000;
                var date = new Date(timestamp);
                var span = "<span class='label",

                    time = Ext.Date.format(new Date(date), 'h:i:s A');
                switch (val) {
                    case 1:
                        span += " label-danger arrowed-right'>New Order";
                        break;
                    case 2:
                        span += " label-blue arrowed-in arrowed-right'>Sent Restaurant";
                        break;
                    case 3:
                        span += " label-primary arrowed-in arrowed-right'>Restaurant Respond";
                        break;
                    case 4:
                        span += " label label-yellow arrowed-in arrowed-right'>Sent DriverUnique";
                        break;
                    case 5:
                        span += " label label-pink arrowed-in arrowed-right'>Driver Confirm"
                        break;
                    case 6:
                        span += " label-warning arrowed-in arrowed-right'>Picking";
                        break;
                    case 7:
                        span += " label-purple arrowed-in arrowed-right'>Delivering";
                        break;
                    case 8:
                        span += " label-success arrowed-in'>Delivered";
                        break;
                    case 0:
                        span += " label-danger'>Rejected";
                        break;
                    case 9:
                        span += " label-grey'>Cancelled";
                        break;
                }
                return span += "  " + time + "</span>";
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
                if ( val.method == 3 ) return 'DriverUnique';
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
        var orderSearchToolbar = Ext.getCmp( 'Employee-DriverUnique-OrderHistory-Toolbar-Center');

        // Order List Panel
        var orderList = Ext.getCmp( 'Employee-DriverUnique-OrderHistory-OrderList' );

        // Order List Store
        var orderListStore = orderList.getStore();
        var getDriverInfo = me.getDriverInfo( params );
        if ( getDriverInfo == false ) {

        } else {
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

        var orderSearchToolbar = Ext.getCmp( 'Employee-DriverUnique-OrderHistory-Toolbar-Center');

        // Order List Panel
        var orderList = Ext.getCmp( 'Employee-DriverUnique-OrderHistory-OrderList' );

        // Order List Store
        var orderListStore = orderList.getStore();
        var getDriverInfo = me.getDriverInfo( params );
        if ( getDriverInfo == false ) {

        } else {

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



    },
    getDriverInfo:function( params ){
        var userInfo = Ext.getCmp( 'Index').getUserInfo();
        var valid = false;
        if ( userInfo ) {
            var driverId = userInfo.userId;
            params.driverId = driverId;
            if ( userInfo.permission ) {
                var permission = userInfo.permission;
                if ( permission.length > 0 ) {
                    for ( var i = 0 ; i < permission.length ; i ++ ) {
                        var userPermission = permission[ i ];
                        if ( userPermission.role == "driver" ) {
                            if( userPermission.criteria ) {
                                if ( userPermission.criteria.regionId ) {
                                    var regionId = userPermission.criteria.regionId;
                                    params.regionId = regionId;
                                    valid = true
                                }
                            }
                        }
                    }
                }
            }
        }
        return valid;
    }

    
});