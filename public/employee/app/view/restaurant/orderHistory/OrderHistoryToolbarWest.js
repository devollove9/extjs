Ext.define('517Employee.view.restaurant.orderHistory.OrderHistoryToolbarWest', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.restaurant.orderHistory.OrderHistoryToolbarController'
    ],   
    xtype: 'employee-restaurant-orderHistory-toolbar-west',
    controller: 'employee-restaurant-orderHistory-toolbar',
    bodyStyle:{ "background-color":"white",'border-color' : 'white','border-right':'0px solid #c1c1c1' , padding:0 },

    frame:false ,// border:false,
    layout: 'absolute',

    items:[
        {
  
            xtype:'button',
            text:'Today',
            handler:'getOrderByday',
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
                        items:[
                            { text: 'Last 7 Days' , dayFactor:6 , handler: 'getOrderByday' },
                            { text: 'Last 14 Days' , dayFactor:13 , handler: 'getOrderByday' },
                            { text: 'Last 30 Days' , dayFactor:29 , handler: 'getOrderByday' },
                            { text: 'Last 90 Days' , dayFactor:89 , handler: 'getOrderByday' },
                            { text: 'Last 360 Days' , dayFactor:359 , handler: 'getOrderByday' },
                        ]
            }
        }
    
    ],
 
    doNavigation:function(panel){
        console.log( panel );
    }
    
});