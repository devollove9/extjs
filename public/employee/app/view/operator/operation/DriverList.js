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
    /*  View Content  */
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',

            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'combobox',
                    labelWidth:50,
                    width:150,
                    margin:0,
                    timestamp:600000,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['minutes', 'timestamp'],
                        data : [
                            {minutes:"10 mins", timestamp:600000},
                            {minutes:"30 mins", timestamp:1800000},
                            {minutes:"60 mins", timestamp:3600000},
                            {minutes:"24 hours", timestamp:86400000},
                            {minutes:"7 days", timestamp:604800000},
                            {minutes:"30 days", timestamp:2592000000},
                            {minutes:"Ancient", timestamp:0},
                        ]
                    }),
                    fieldLabel:'Active:',
                    displayField:'minutes',
                    valueField:'timestamp',
                    listeners:{
                        afterrender:function( field,b,c,d,e,f,g) {
                            field.setValue( this.getStore().getAt( 0).get('minutes') );
                            this.timestamp = 600000;
                        },
                        select:function( combobox ,selection ,listener ) {
                            this.timestamp = selection[ 0 ].data.timestamp;
                            this.up().up().refreshView();
                        }
                    }
                },
                {
                    xtype:'tbfill'
                }
            ]
        }
    ],
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
            var lastUpdate = me.getRequestTime();
            me.setLoading( true );
            driverListStore.proxy.headers = Ext.getCmp( 'Employee-Header').getHeaders( 'get' );
            driverListStore.load({
                method:'get',
                url:Ext.getCmp( 'Employee-Header' ).getServerUrl()+'/user/driver',

                params:{
                    regionId:region.regionId,
                    lastUpdate: lastUpdate
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
    },

    // Function get ReqeustTime();
    getRequestTime:function() {
        var combox = this.dockedItems.items[ 2].items.items[ 1 ];
        var timeDeduction =  combox.timestamp;
        var timestamp = 0;
        if ( timeDeduction != 0 ) {
            var serverTime = Ext.getCmp( 'Employee-Operator').getServerTime();
            var timestamp = serverTime-timeDeduction;
            var timestamp = timestamp * 1000;
            //console.log( timestamp );
        }
        return timestamp;
    }



});