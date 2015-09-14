/**
 * Created by devo on 7/31/2015.
 */
var BillDriverBillCenterBillPaging =  Ext.create( '517Employee.store.bill.driver.billCenter.BillDriverPaging' );

Ext.define( '517Employee.view.bill.driver.billCenter.BillList', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.RowNumberer'

    ],
    xtype: 'employee-bill-driver-billCenter-billList',

    store : BillDriverBillCenterBillPaging,
    autoScroll:true,

    dockedItems:[
        {
            store : BillDriverBillCenterBillPaging,
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
            sortable: false,
        },
        {
            text: 'Document No.',
            flex: 5,
            minwidth: 200,
            sortable: false,
            dataIndex: 'documentNo'
        },
        {
            text: 'Start Date',
            sortable: true,
            maxwidth: 100,
            flex: 3,
            dataIndex: 'periodStart',
            renderer:function(val){
                return Ext.Date.format(new Date( val/1000 ), 'Y-m-d');
            }
        },
        {
            text: 'End Date',
            sortable: true,
            maxwidth: 100,
            flex: 3,
            dataIndex: 'periodEnd',
            renderer:function(val){
                return Ext.Date.format(new Date( val/1000 ), 'Y-m-d');
            }
        },
        {
            text: 'Total',
            sortable: false,
            maxwidth: 100,
            flex: 3,
            dataIndex: 'total',
            renderer:function(val){
                var value = parseFloat(val);
                return value.toFixed(3);
            }

        },
        {
            text: 'Earning',
            sortable: false,
            maxwidth: 100,
            flex: 3,
            dataIndex: 'earning',
            renderer:function(val){
                var value = parseFloat(val);
                return value.toFixed(3);
            }
        },
        {
            text: 'Hourly',
            sortable: false,
            maxwidth: 100,
            flex: 3,
            dataIndex: 'hourly',
            renderer:function(val){
                var value = parseFloat(val);
                return value.toFixed(3);
            }
        },
        {
            text: 'Pay Driver',
            sortable: false,
            maxwidth: 100,
            flex: 3,
            dataIndex: 'pay',
            renderer:function(val){
                var value = parseFloat(val);
                return value.toFixed(3);
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
            maxwidth: 80,
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
            minwidth: 55,
            width:55,
            items: [
                {
                    iconCls: 'download-col',
                    tooltip: 'Download',
                    handler: function(grid, rowIndex, colIndex) {
                        ////console.log(grid.store.getAt(rowIndex).data);
                        ////console.log(grid);
                        Ext.Ajax.request({
                            url: Ext.getCmp( 'Employee-Header').getServerUrl() + '/bill/driver/download', // you can fix a parameter like this : url?action=anAction1
                            method: 'GET',
                            headers: Ext.getCmp( 'Employee-Header').getHeaders( 'get' ) ,
                            disableCaching:false,
                            params: {
                                regionId : Ext.getCmp( 'Employee-Header-Region' ).regionId,
                                documentId: grid.store.getAt( rowIndex ).data.documentId,
                            },
                            success: function(result, request) {
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
                {
                    iconCls: 'send_email',
                    tooltip: 'Send Email',margin:'0 2 0 2',
                    //Post
                    handler:function(grid, rowIndex, colIndex) {
                        Ext.Ajax.request({
                            url: Ext.getCmp( 'Employee-Header').getServerUrl() + '/bill/driver/send', // you can fix a parameter like this : url?action=anAction1
                            method: 'GET',
                            headers: Ext.getCmp( 'Employee-Header').getHeaders( 'get' ) ,
                            disableCaching:false,
                            params: {
                                documentId: grid.store.getAt( rowIndex ).data.documentId
                            },
                            success: function(result, request) {
                                var response =  JSON.parse( result.responseText );
                                var Error = Ext.getCmp( 'Employee-Header').processErrorMessage( response );
                                if ( Error == false ) {
                                    Ext.Msg.alert( "Success" , "Email has been sent." );
                                }
                            },
                            failure: function(result, request) {
                                Ext.Msg.alert('Error', 'Send Email failed. Please contact technical staff');
                            }
                        });
                    }
                },
                // get
                {
                    iconCls: 'if_signed',
                    tooltip: 'Check if signed',margin:'0 2 0 2',
                    handler:function(grid, rowIndex, colIndex , d , e , f , g) {
                        Ext.Ajax.request({
                            url: Ext.getCmp( 'Employee-Header').getServerUrl() + '/bill/driver/status', // you can fix a parameter like this : url?action=anAction1
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
        var billSearchToolbar = Ext.getCmp( 'Employee-Bill-Driver-BillCenter-Toolbar');

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
                    url : Ext.getCmp( 'Employee-Header').getServerUrl() + '/bill/driver' ,
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