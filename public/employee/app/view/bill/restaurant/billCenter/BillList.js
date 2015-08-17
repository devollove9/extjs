/**
 * Created by devo on 7/31/2015.
 */
var BillRestaurantBillCenterBillPaging =  Ext.create( '517Employee.store.bill.restaurant.billCenter.BillRestaurantPaging' );

Ext.define( '517Employee.view.bill.restaurant.billCenter.BillList', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.RowNumberer'

    ],
    xtype: 'employee-bill-restaurant-billCenter-billList',

    store : BillRestaurantBillCenterBillPaging,
    autoScroll:true,

    dockedItems:[
        {
            store : BillRestaurantBillCenterBillPaging,
            xtype:'pagingtoolbar',
            dock:'bottom',
            margin:'0 0 1 0',
            displayInfo: true,
            displayMsg: 'Bills {0} - {1} of {2}',
            emptyMsg: "No bills to display",
            listeners: {
                afterRender: function( field ) {
                    field.down('#refresh').hide();
                },scope:this
            }
        }
    ],
    columns: [
        {
            xtype: 'rownumberer',
            width: 40,align : 'center',
        },
        {
            text: 'Document No.',
            flex: 5,
            minwidth: 270,
            sortable: false,
            dataIndex: 'documentNo'
        },
        {
            text: 'Start Date',
            sortable: true,
            maxwidth: 120,
            flex: 3,
            dataIndex: 'periodStart',
            renderer:function(val){
                return Ext.Date.format(new Date( val/1000 ), 'Y-m-d');
            }
        },
        {
            text: 'End Date',
            sortable: true,
            maxwidth: 120,
            flex: 3,
            dataIndex: 'periodEnd',
            renderer:function(val){
                return Ext.Date.format(new Date( val/1000 ), 'Y-m-d');
            }
        },
        {
            text: 'Sub Total',
            sortable: false,
            maxwidth: 120,
            flex: 3,
            dataIndex: 'subtotal',
            renderer:function(val){
                var value = parseFloat(val);
                return value.toFixed(2);
            }
        },
        {
            text: 'Tax',
            sortable: false,
            maxwidth: 120,
            flex: 2,
            dataIndex: 'tax',
            renderer:function(val){
                var value = parseFloat(val);
                return value.toFixed(2);
            }
        },

        {
            text: 'Generate Date',
            sortable: true,
            maxwidth: 120,
            flex: 3,
            dataIndex: 'generateDate',
            renderer:function(val){
                return Ext.Date.format(new Date( val/1000 ), 'Y-m-d h:i A');
            }
        },
        {
            text: 'Signed',
            sortable: true,
            maxwidth: 120,
            flex: 3,
            dataIndex: 'signed',
            renderer:function(val){
                if ( val === true ) {
                    return 'YES';
                } else if ( val === false ) {
                    return 'NO';
                } else {
                    return 'Unknown';
                }
            }
        },
        {

            //text:'下载',
            menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            minwidth: 50,
            width:50,
            items: [
                {
                    iconCls: 'download-col',
                    tooltip: 'Download',margin:'0 2 0 0',
                    handler: function( grid, rowIndex, colIndex) {
                        ////console.log(grid.store.getAt(rowIndex).data);
                        Ext.Ajax.request({
                            url: Ext.getCmp( 'Employee-Header').getServerUrl() + '/bill/store/download', // you can fix a parameter like this : url?action=anAction1
                            method: 'GET',
                            headers: Ext.getCmp( 'Employee-Header').getHeaders( 'get' ) ,
                            disableCaching:false,
                            params: {
                                regionId : Ext.getCmp( 'Employee-Header-Region' ).regionId,
                                documentId: grid.store.getAt( rowIndex ).data.documentId,
                            },
                            success: function( result , request ) {
                                var response =  JSON.parse( result.responseText );
                                var Error = Ext.getCmp( 'Employee-Header').processErrorMessage( response );
                                if ( Error == false ) {
                                    var link = document.createElement("a");
                                    link.download = '';
                                    link.href = response.data.signedUrl;
                                    link.click();
                                }
                            },
                            failure: function(result, request) {
                                Ext.Msg.alert('Error', 'Download failed. Please contact technical staff');
                            }
                        });
                    }
                },
                // get
                {
                    iconCls: 'if_signed',
                    tooltip: 'Check if signed',margin:'0 2 0 2',
                    handler:function(grid, rowIndex, colIndex) {
                        Ext.Ajax.request({
                            url: Ext.getCmp( 'Employee-Header').getServerUrl() + '/bill/store/status', // you can fix a parameter like this : url?action=anAction1
                            method: 'GET',
                            headers: Ext.getCmp( 'Employee-Header').getHeaders( 'get' ) ,
                            disableCaching:false,
                            params: {
                                regionId : Ext.getCmp( 'Employee-Header-Region' ).regionId,
                                documentId: grid.store.getAt( rowIndex ).data.documentId,
                            },
                            success: function( result , request ) {
                                var response =  JSON.parse( result.responseText );
                                var Error = Ext.getCmp( 'Employee-Header').processErrorMessage( response );
                                if ( Error == false ) {
                                    grid.store.getAt( rowIndex ).data.signed = response.data.signature.complete;
                                    grid.refresh();
                                }
                            },
                            failure: function(result, request) {
                                Ext.Msg.alert('Error', 'Download failed. Please contact technical staff');
                            }
                        });
                    }
                }
            ]
        }
    ],
    refreshView:function(){
        var me = this;
        this.resetAll();

        // If not admin must have region
        var region = Ext.getCmp( 'Employee-Header-Region' );
        var billSearchToolbar = Ext.getCmp( 'Employee-Bill-Restaurant-BillCenter-Toolbar');

        // Order List Store
        var billListStore = me.getStore();

        if ( region.regionId == -1 ) {
        } else {
            var params = {};
            var jsonData = {};
            var flag = billSearchToolbar.updateSearchParams( params , jsonData );
            if ( flag == true ) {

                var refreshType = billSearchToolbar.getCurrentType();
                var method = '';
                if( refreshType == 'Search' ) {
                    method = 'get';
                    jsonData = null;
                } else if ( refreshType == 'New Bill' ) {
                    method = 'post';
                    params = null;
                    jsonData = JSON.stringify( jsonData );
                }
                billListStore.getProxy().data = [];

                me.setLoading( true );
                // Send Request
                ////console.log( jsonData );
                Ext.Ajax.request({
                    url : Ext.getCmp( 'Employee-Header').getServerUrl() + '/bill/store' ,
                    headers: Ext.getCmp( 'Employee-Header').getHeaders( method ) ,
                    method : method ,
                    params : params ,
                    jsonData: jsonData,
                    disableCaching:false,
                    success : function ( result , request ) {
                        var response = JSON.parse( result.responseText );
                        var Error = Ext.getCmp( 'Employee-Header' ).processErrorMessage( response );
                        if ( Error == true ) {
                            billListStore.load();
                            me.setLoading( false );
                        } else {
                            if ( refreshType == 'New Bill') {
                                billListStore.getProxy().data = [ response.data ];
                            } else if ( refreshType == 'Search' ) {
                                billListStore.getProxy().data = response.data;
                            }
                            billListStore.load();
                            billListStore.loadPage(1);
                            me.setLoading( false );
                        }
                    },
                    failure : function ( result , request ) {
                        billListStore.load();
                        me.setLoading( false );
                        Ext.Msg.alert( 'Failure' , 'Unknown Error , Please Contact Technique Support.' );
                    }
                });
            }
        }
    },
    resetAll:function(){
        this.getStore().getProxy.data = [];
        this.getStore().clearData();
        this.getStore().removeAll();
        this.getView().refresh();
    }
});