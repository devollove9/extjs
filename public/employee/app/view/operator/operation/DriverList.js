/**
 * Created by Yaxin on 6/11/2015.
 */
Ext.define( '517Employee.view.operator.operation.DriverList' , {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.RowNumberer',
        '517Employee.view.operator.operation.DriverListController'
    ],
    xtype: 'employee-operator-operation-driverList',
    controller:'employee-operator-operation-driverList-controller',
    store: Ext.create( '517Employee.store.operator.operation.DriverList' ),
    title:'Driver List',
    header:{ titleAlign: 'left' , height:30 , padding:'0 10 0 10', margin:'0 0 0 0' },
    collapsible: true,  multiSelect: true,  columnLines: true,
    viewConfig: {
        enableTextSelection: true
    },

    columns: [

        {
            xtype: 'rownumberer',
            width : 28 ,
            align : 'center'
        },
        {
            text: 'Name',
            sortable: false,
            dataIndex: 'name',
            flex: 2
        },
        {
            xtype: 'actioncolumn',
            header: ' ',
            width: 30,
            align: 'center',
            items: [
                {
                    iconCls: 'x-tool-img x-tool-pin',
                    tooltip: 'Locate',
                    handler: 'driverPin'

                }
            ]
        }
    ],

    refreshView:function(){
        var me = this;
        this.resetAll();
        var driverListStore = Ext.getStore( 'Employee-Operator-Operation-DriverList' );
        var region = Ext.getCmp( 'Employee-Header-Region');
        if ( region.regionId != -1 ) {
            var start_of_day = this.getStartOfDay()*1000;
            me.setLoading( true );
            driverListStore.proxy.headers = Ext.getCmp( 'Employee-Header').getHeaders( 'get' );
            driverListStore.load({
                method:'get',
                url:Ext.getCmp( 'Employee-Header' ).getServerUrl()+'/user/driver',

                params:{
                    regionId:region.regionId,
                    lastUpdate: 0
                },
                callback:function( records, operation, success ) {
                    me.setLoading( false );
                }
            });
        } else {
            driverListStore.loadData( [] , false );
            me.setLoading( false );
        }
    },
    resetAll:function(){
        this.getStore().loadData( [] , false );
        this.title = 'Driver List';
    },
    // Function get start of current day
    getStartOfDay:function() {
        var now = new Date();
        var startOfDay = new Date( now.getFullYear() , now.getMonth() , now.getDate() );
        var timestamp = startOfDay.getTime();
        return timestamp;
    }

});