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
        //console.log( this.items.items[1].items.items[0] );

        // Refresh Restaurant Panel
        this.items.items[1].items.items[0].refreshView();
        // Refresh Driver Panel
        this.items.items[1].items.items[1].refreshView();

    },
    resetAll:function() {
        // Reset Restaurant Panel
        this.items.items[1].items.items[0].resetAll();
        // Reset Driver Panel
        this.items.items[1].items.items[1].resetAll();
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