Ext.define('517Employee.view.driver.DriverView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.driver.Sidebar',
        '517Employee.view.driver.ContentView'
    ],   
    xtype: 'employee-driver',
    frame:false , border:false,
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    layout: 'border',
    //autoScroll:true,
    items:[
        {
            region: 'west',
            xtype: 'employee-driver-sidebar',
            // Border Color
            style:{ "background-color":"none"},
            id: 'Employee-Driver-Sidebar',
        },
        {
            region: 'center',
            margin: '0 0 0 10' , frame:false , border:false , 
            xtype: 'employee-driver-content',
            id: 'Employee-Driver-Content',
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
    refreshView:function() {
        // Refresh Order History
        Ext.getCmp( 'Employee-Header' ).doRefreshView( 'Employee-Driver-OrderHistory' );
    },
    resetAll:function() {
        // Reset Order History
        Ext.getCmp( 'Employee-Header' ).doResetView( 'Employee-Driver-OrderHistory' );
    },
    doNavigation:function( tab ){
        var driverContent = Ext.getCmp( 'Employee-Driver-Content' );
        var employeeContent = Ext.getCmp( 'Employee-Main-ContentView' );
        if ( tab ) {           
            if ( tab.navigateAction ) {
                /* 0: Order History
                *  1: xxx
                *  2: Main 
                */
                switch ( tab.navigateAction ) { 
                    case 'orderHistory' :
                        driverContent.setActiveItem(0);
                        break;
                        
                    case 'xxxxX' :
                        driverContent.setActiveItem(1);
                        break;
                        
                    case 'employee-navigation' :
                        employeeContent.setActiveItem(0);
                        break;

                }     
            } else {
                employeeContent.setActiveItem(0);
            }   
        }
    }
    
});