Ext.define('517Employee.view.driverUnique.orderHistory.OrderHistoryCenterView', {
    extend: 'Ext.panel.Panel',
    requires: [
        '517Employee.view.driverUnique.orderHistory.OrderHistoryOrderList',
        '517Employee.view.driverUnique.orderHistory.OrderHistoryToolbar',

    ],
    xtype: 'employee-driverUnique-orderHistory-centerView',
    frame:false , border:false , split:true ,
    bodyStyle:{ "background-color":"white" , 'border-color' : 'black' , 'border-width':'0px' } ,
    layout: 'border',
    items:[
        {
            region: 'north',
            margin: '0 0 5 0',
            xtype: 'employee-driverUnique-orderHistory-toolbar',
            id: 'Employee-DriverUnique-OrderHistory-Toolbar',
            height:150,maxHeight:350,
        },
        {
            region: 'center',
            xtype: 'employee-driverUnique-orderHistory-orderList',
            id: 'Employee-DriverUnique-OrderHistory-OrderList',
            flex:1
        }

    ],

    doNavigation:function(panel){
        console.log( panel );
    },

    resetAll:function() {

        // Reset Order List
        this.items.items[ 1 ].resetAll();

    },

    refreshView:function() {
        // Reset Order List
        this.items.items[ 1 ].resetAll();
    }


});