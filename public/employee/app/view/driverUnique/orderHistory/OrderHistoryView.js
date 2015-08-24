Ext.define('517Employee.view.driverUnique.orderHistory.OrderHistoryView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.driverUnique.orderHistory.OrderHistoryCenterView',
        //'517Employee.view.driverUnique.orderHistory.OrderHistoryDriverUniqueList',
    ],   
    xtype: 'employee-driverUnique-orderHistory',
    frame:false , border:false, split:true,
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    layout: 'border',
    //autoScroll:true,
    items:[
        /*{
            region: 'west',
            xtype: 'employee-driverUnique-orderHistory-driverUniqueList',
            id: 'Employee-DriverUnique-OrderHistory-DriverUniqueList',
            width:150,
            margin:'0 5 0 0'
        },*/
        {
            region: 'center',
            xtype: 'employee-driverUnique-orderHistory-centerView',
            id: 'Employee-DriverUnique-OrderHistory-CenterView',
            flex:1,
        },
        
    ],
    refreshView:function(){
        // Refresh DriverUnique List
        //this.items.items[ 0 ].refreshView();

        // Refresh Order History Center
        Ext.getCmp( 'Employee-Header' ).doRefreshView( 'Employee-DriverUnique-OrderHistory-CenterView' );
    },
    resetAll:function(){
        // Refresh DriverUnique List
        // this.items.items[ 0 ].resetAll();

        // Refresh Order History
        Ext.getCmp( 'Employee-Header' ).doResetView( 'Employee-DriverUnique-OrderHistory-CenterView' );
    },
    doNavigation:function(panel){
        //console.log( panel );
    }
    
});