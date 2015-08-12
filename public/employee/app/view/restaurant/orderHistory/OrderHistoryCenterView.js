Ext.define('517Employee.view.restaurant.orderHistory.OrderHistoryCenterView', {
    extend: 'Ext.panel.Panel',
    requires: [
        '517Employee.view.restaurant.orderHistory.OrderHistoryOrderList',
        '517Employee.view.restaurant.orderHistory.OrderHistoryToolbar',

    ],
    xtype: 'employee-restaurant-orderHistory-centerView',
    frame:false , border:false , split:true ,
    bodyStyle:{ "background-color":"white" , 'border-color' : 'black' , 'border-width':'0px' } ,
    layout: 'border',
    items:[
        {
            region: 'north',
            margin: '0 0 5 0',
            xtype: 'employee-restaurant-orderHistory-toolbar',
            id: 'Employee-Restaurant-OrderHistory-Toolbar',
            height:150,maxHeight:350,
        },
        {
            region: 'center',
            xtype: 'employee-restaurant-orderHistory-orderList',
            id: 'Employee-Restaurant-OrderHistory-OrderList',
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