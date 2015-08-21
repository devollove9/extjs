Ext.define('517Employee.view.bill.BillView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.bill.Sidebar',
        '517Employee.view.bill.ContentView'
    ],   
    xtype: 'employee-bill',
    frame:false , border:false,
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    layout: 'border',
    //autoScroll:true,

    /*  Variables */
    elapsedServerTime:0,

    initComponent:function() {
        var me = this;
        this.callParent();
    },

    items:[
        {
            region: 'west',
            xtype: 'employee-bill-sidebar',
            // Border Color
            style:{ "background-color":"none"},
            id: 'Employee-Bill-Sidebar'
        },
        {
            region: 'center',
            margin: '0 0 0 10' , frame:false , border:false ,
            xtype: 'employee-bill-content',
            id: 'Employee-Bill-Content'
        }
    ],
    refreshView:function() {
        // Refresh Restaurant Panel
        Ext.getCmp( 'Employee-Header' ).doRefreshView( 'Employee-Bill-Driver' );
        // Refresh Driver Panel
        Ext.getCmp( 'Employee-Header' ).doRefreshView( 'Employee-Bill-Restaurant' );
    },
    resetAll:function() {
        // Reset Restaurant Panel
        Ext.getCmp( 'Employee-Header' ).doResetView( 'Employee-Driver-OrderHistory' );
        // Reset Driver Panel
        Ext.getCmp( 'Employee-Header' ).doResetView( 'Employee-Driver-OrderHistory' );
    },
    doNavigation:function( tab ){
        var billContent = Ext.getCmp( 'Employee-Bill-Content' );
        var employeeContent = Ext.getCmp( 'Employee-Main-ContentView' );
        if ( tab ) {           
            if ( tab.navigateAction ) {
                /* 0: Restaurant
                *  1: Driver
                *  2: Xxx
                *  3: Main
                */
                switch ( tab.navigateAction ) { 
                    case 'restaurant' :
                        billContent.setActiveItem(0);
                        break;

                    case 'driver' :
                        billContent.setActiveItem(1);
                        break;

                    case 'xxxxX' :
                        billContent.setActiveItem(3);
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