Ext.define('517Employee.view.order.OrderView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.order.Sidebar',
        '517Employee.view.order.ContentView'
    ],   
    xtype: 'employee-order',
    frame:false , border:false,
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    layout: 'border',
    autosSroll:true,
    items:[
        {
            region: 'west',
            xtype: 'employee-order-sidebar',
            // Border Color
            style:{ "background-color":"none"},
            id: 'employee-Order-Sidebar',
        },
        {
            region: 'center',
            margin: '0 0 0 10' , frame:false , border:false , 
            xtype: 'employee-order-content',
            id: 'employee-Order-Content',
        }
        
    ],
    listeners: {
        render: function(c) {
            c.el.on('click', function() { 
                //alert('onclick');
            });
        },
        scope: this
    },
    doNavigation:function( tab ){
        var orderContent = Ext.getCmp( 'employee-Order-Content' );
        var storeContent = Ext.getCmp( 'employee-content-view' );
        if ( tab ) {           
            if ( tab.navigateAction ) {
                /* 0: Order History
                *  1: xxx
                *  2: Main 
                */
                switch ( tab.navigateAction ) { 
                    case 'orderHistory' : 
                        orderContent.setActiveItem(0);
                        break;
                        
                    case 'xxxxX' : 
                        orderContent.setActiveItem(1);
                        break;
                        
                    case 'employee-navigation' :
                        storeContent.setActiveItem(0);
                        break;

                }     
            } else {
                storeContent.setActiveItem(0);
            }   
        }
    }
    
});