/**
 * Created by Yaxin on 5/29/2015.
 */
Ext.define('517Employee.view.driver.orderHistory.OrderHistoryDriverList', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.RowNumberer',
        //'517Employee.view.driver.orderHistory.OrderHistoryDriverListController'
    ],
    xtype: 'employee-driver-orderHistory-driverList',
    //controller:'employee-driver-orderHistory-driverList',
    store: Ext.create( '517Employee.store.driver.orderHistory.DriverList'),
    //store:'Drivers',
    title:' Driver List',
    collapsible:true,
    bodyStyle:{ "background-color":"white",'border-color' : '#c1c1c1' },
    header:{ height:30 ,padding:'0 10 0 10',margin:'0 0 0 0', titleAlign:'center'},

    viewConfig: {
        enableTextSelection: true
    },
    /*  View Content  */
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                xtype: 'tbfill'
            },
            {
                xtype: 'button',
                iconCls: 'fa fa-refresh',
                tooltip: 'Refresh Driver list',
                handler: function(){
                    this.up().up().refreshView();
                }
            },
            {
                xtype: 'button',
                iconCls: 'fa fa-times',
                tooltip: 'De-select Driver list',
                handler:function() {
                    this.up().up().getSelectionModel().deselectAll();
                    Ext.getCmp( 'Employee-Driver-OrderHistory-OrderList').resetAll();
                }
            },
            {
                xtype:'tbfill'
            }
        ]
    }],
    columns: [
        {
            xtype : 'rownumberer',
            width : 28 ,
            align : 'center'
        },
        {
            text: 'Name',
            sortable: true,
            dataIndex: 'name',
            flex: 2,
            renderer: function( val , metaData , record ) {
                if( record.data.information ) {
                    if ( typeof record.data.information.disabled != 'undefined' ) {
                        if ( record.data.information.disabled == true ) {
                            return '<span style="color:' + "#e75f5f" + ';">' + val + '</span>';
                        }
                    }
                }
                return val;
            }
        }
    ],
    resetAll:function(){
        this.getStore().loadData( [] , false );
        this.setLoading( false );
        this.setTitle( 'Driver List' );
    },
    refreshView:function(){
        var me = this;
        Ext.getCmp( 'Employee-Header').refreshStore( me , '/user/driver' , {} );
    }
});