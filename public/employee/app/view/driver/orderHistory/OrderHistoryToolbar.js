Ext.define('517Employee.view.driver.orderHistory.OrderHistoryToolbar', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.driver.orderHistory.OrderHistoryToolbarController',
        '517Employee.view.driver.orderHistory.OrderHistoryToolbarCenter',
        '517Employee.view.driver.orderHistory.OrderHistoryToolbarWest'
    ],   
    xtype: 'employee-driver-orderHistory-toolbar',
    controller: 'employee-driver-orderHistory-toolbar-controller',
    bodyStyle:{ "background-color":"white",'border-color' : '#c1c1c1',},
    title: '517 Employee Driver Service : Order History',
    header:{ height:30 ,padding:'0 0 0 10',margin:'0 0 0 0'},
    //frame:false , border:false,
    layout: 'border',

    items:[
        {
            region: 'west',
            xtype:'employee-driver-orderHistory-toolbar-west',
            id:'Employee-Driver-OrderHistory-Toolbar-West',
            width: 124+124          
        },
        {
            region: 'center',
            border:false ,frame:false ,
            xtype:'employee-driver-orderHistory-toolbar-center',
            id:'Employee-Driver-OrderHistory-Toolbar-Center'
        }
        
    ],
 
    doNavigation:function(panel){
        //console.log( panel );
    }
    
});