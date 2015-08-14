Ext.define('517Employee.view.driverUnique.orderHistory.OrderHistoryToolbarWest', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.driverUnique.orderHistory.OrderHistoryToolbarController'
    ],   
    xtype: 'employee-driverUnique-orderHistory-toolbar-west',
    controller: 'employee-driverUnique-orderHistory-toolbar-controller',
    bodyStyle:{ "background-color":"white",'border-color' : 'white','border-right':'0px solid #c1c1c1' , padding:0 },

    frame:false ,// border:false,
    layout: 'absolute',

    items:[
        {
  
            xtype:'button',
            text:'Today',
            handler:'getOrderByDay',
            dayFactor:0,
            height:84,width:84,
            x:20,y:15,
        },
 
        {
            region: 'center',
            xtype:'splitbutton',
            text:'All',
            handler:'getOrderAll',
            height:84,width:104,
            x:124,y:15,
            menu: {
                        
                        xtype: 'menu',
                        plain: true,
                        width:104,
                        id: 'orderDaysMenu',
                        dayFactor:-1,
                        items:[
                            { text: 'Last 7 Days' , dayFactor:6 , handler: 'getOrderByDay' },
                            { text: 'Last 14 Days' , dayFactor:13 , handler: 'getOrderByDay' },
                            { text: 'Last 30 Days' , dayFactor:29 , handler: 'getOrderByDay' },
                            { text: 'Last 90 Days' , dayFactor:89 , handler: 'getOrderByDay' },
                            { text: 'Last 360 Days' , dayFactor:359 , handler: 'getOrderByDay' },
                        ]
            }
        }
    
    ],
 
    doNavigation:function(panel){
        console.log( panel );
    }
    
});