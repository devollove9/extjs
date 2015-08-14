Ext.define('517Employee.view.driverUnique.DriverUniqueView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.driverUnique.Sidebar',
        '517Employee.view.driverUnique.ContentView'
    ],   
    xtype: 'employee-driverUnique',
    frame:false , border:false,
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    layout: 'border',
    //autoScroll:true,
    items:[
        {
            region: 'west',
            xtype: 'employee-driverUnique-sidebar',
            // Border Color
            style:{ "background-color":"none"},
            id: 'Employee-DriverUnique-Sidebar',
        },
        {
            region: 'center',
            margin: '0 0 0 10' , frame:false , border:false , 
            xtype: 'employee-driverUnique-content',
            id: 'Employee-DriverUnique-Content',
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
        //console.log( this.items.items[1].items.items[0] );

        // Refresh Order History
        this.items.items[ 1 ].items.items[ 0 ].refreshView();

    },
    resetAll:function() {
        //console.log( this.items.items[1].items.items[0] );

        // Reset Order History
        this.items.items[ 1 ].items.items[ 0 ].resetAll();

    },
    doNavigation:function( tab ){
        var driverUniqueContent = Ext.getCmp( 'Employee-DriverUnique-Content' );
        var employeeContent = Ext.getCmp( 'Employee-Main-ContentView' );
        if ( tab ) {           
            if ( tab.navigateAction ) {
                /* 0: Order History
                *  1: xxx
                *  2: Main 
                */
                switch ( tab.navigateAction ) { 
                    case 'orderHistory' :
                        driverUniqueContent.setActiveItem(0);
                        break;
                        
                    case 'xxxxX' :
                        driverUniqueContent.setActiveItem(1);
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