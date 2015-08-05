/**
 * Created by devo on 7/30/2015.
 */
/**
 * Created by Yaxin on 5/29/2015.
 */
Ext.define('517Employee.view.bill.driver.DriverList', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.RowNumberer',
        //'517Employee.view.driver.dish.DriverListController'
    ],
    xtype: 'employee-bill-driver-driverList',

    store: Ext.create( '517Employee.store.bill.driver.DriverList' ),
    title:' Driver List',
    collapsible:true , columnLines:true ,
    multiSelect: true,
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
                iconCls: 'fa fa-plus',
                text: 'All ',
                handler: function(){
                    //console.log(this.up().up().getSelectionModel());
                    this.up().up().getSelectionModel().selectAll();
                }
            },
            {
                xtype: 'button',
                iconCls: 'fa fa-refresh',
                tooltip: 'Refresh Driver list',
                handler: function(){
                    //console.log(this.up().up().getSelectionModel());
                    this.up().up().refreshView();
                }
            },
            {
                xtype: 'button',
                iconCls: 'fa fa-times',
                tooltip: 'De-select Driver list',
                handler: function(){
                    //console.log(this.up().up());
                    this.up().up().getSelectionModel().deselectAll();
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
    listeners:{
        selectionchange:function( model , records ) {
            var driverBillList  = Ext.getCmp( 'Employee-Bill-Driver-BillCenter-BillList' );
            var driverBillToolbar  = Ext.getCmp( 'Employee-Bill-Driver-BillCenter-Toolbar' );
            driverBillList.resetAll();
            if ( ! records[ 0 ] ) {

            }
            if ( records[ 0 ] ) {
                driverBillToolbar.setGenerateInfo( records[ 0 ].data.name , records[ 0 ].data.userId );

                if ( driverBillToolbar.getCurrentType() == 'New Bill' ) {
                    driverBillToolbar.setDocumentNo();
                }
            }
        }
    },
    
    refreshView:function() {

        var region = Ext.getCmp( 'Employee-Header-Region');
        var store =  this.getStore();
        if ( region.regionId != -1 ) {
            var me = this;
            me.resetAll();
            store.proxy.headers = Ext.getCmp( 'Employee-Header').getHeaders( 'get' );
            store.load( {
                method:'get',
                url:Ext.getCmp( 'Employee-Header' ).getServerUrl()+'/user/driver',
                params:{
                    regionId:region.regionId,
                    //lastUpdate:0
                }
            });
        }  else {
            store.loadData( [] , false );
        }
    },
    resetAll:function() {
        this.getStore().loadData( [] , false );
        this.setTitle( 'Driver List' );
        this.getSelectionModel().deselectAll();
        this.setDisabled( false );
    }


});