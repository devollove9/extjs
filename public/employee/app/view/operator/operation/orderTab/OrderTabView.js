/**
 * Created by devo on 6/22/2015.
 */
Ext.define('517Employee.view.operator.operation.orderTab.OrderTabView', {
    extend: 'Ext.tab.Panel',
    requires:[
        '517Employee.view.operator.operation.orderTab.orderList.OrderListView',
        '517Employee.view.operator.operation.orderTab.OrderTabModel',
        '517Employee.view.operator.operation.orderTab.OrderTabController'
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
            id: 'refresh',
            align:'right',
            handler:this.refreshView

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
        var now = new Date();
        var startOfDay = new Date( now.getFullYear() , now.getMonth() , now.getDate() );
        var timestamp = startOfDay.getTime();
        return timestamp;
    }

});
