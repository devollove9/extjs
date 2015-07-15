Ext.define('517Employee.view.driver.orderHistory.OrderHistoryView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.driver.orderHistory.OrderHistoryCenterView',
        '517Employee.view.driver.orderHistory.OrderHistoryDriverList',
    ],   
    xtype: 'employee-driver-orderHistory',
    frame:false , border:false, split:true,
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    layout: 'border',
    autoScroll:true,
    items:[
        {
            region: 'west',
            xtype: 'employee-driver-orderHistory-driverList',
            id: 'Employee-Driver-OrderHistory-DriverList',
            width:150,
            margin:'0 5 0 0'
        },
        {
            region: 'center',
            xtype: 'employee-driver-orderHistory-centerView',
            id: 'Employee-Driver-OrderHistory-CenterView',
            flex:1,
        },
        
    ],
 
    doNavigation:function(panel){
        console.log( panel );
    }
    
});