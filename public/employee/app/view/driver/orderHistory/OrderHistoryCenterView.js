Ext.define('517Employee.view.driver.orderHistory.OrderHistoryCenterView', {
    extend: 'Ext.panel.Panel',
    requires: [
        '517Employee.view.driver.orderHistory.OrderHistoryOrderList',
        '517Employee.view.driver.orderHistory.OrderHistoryToolbar',

    ],
    xtype: 'employee-driver-orderHistory-centerView',
    frame:false , border:false , split:true ,
    bodyStyle:{ "background-color":"white" , 'border-color' : 'black' , 'border-width':'0px' } ,
    layout: 'border',
    items:[
        {
            region: 'north',
            margin: '0 0 5 0',
            xtype: 'employee-driver-orderHistory-toolbar',
            id: 'Employee-Driver-OrderHistory-Toolbar',
            height:150,maxHeight:350,
        },
        {
            region: 'center',
            xtype: 'employee-driver-orderHistory-orderList',
            id: 'Employee-Driver-OrderHistory-OrderList',
            flex:1
        }

    ],

    doNavigation:function(panel){
        //console.log( panel );
    },

    resetAll:function() {

        // Reset Order List
        Ext.getCmp( 'Employee-Header' ).doResetView( 'Employee-Driver-OrderHistory-OrderList' );

    },

    refreshView:function() {
        // Reset Order List
        Ext.getCmp( 'Employee-Header' ).doResetView( 'Employee-Driver-OrderHistory-OrderList' );
    }


});