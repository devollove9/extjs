Ext.define('517Employee.view.operator.OperatorView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.operator.Sidebar',
        '517Employee.view.operator.ContentView'
    ],   
    xtype: 'employee-operator',
    frame:false , border:false,
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    layout: 'border',
    //autoScroll:true,

    /*  Variables */
    elapsedServerTime:0,

    initComponent:function() {
        this.setServerTimeDifference();
        this.callParent();
    },

    items:[
        {
            region: 'west',
            xtype: 'employee-operator-sidebar',
            // Border Color
            style:{ "background-color":"none"},
            id: 'Employee-Operator-Sidebar'
        },
        {
            region: 'center',
            margin: '0 0 0 10' , frame:false , border:false ,
            xtype: 'employee-operator-content',
            id: 'Employee-Operator-Content'
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
        // Refresh Operation Panel
        this.items.items[1].items.items[0].refreshView();
        // Refresh New Order Panel
        this.items.items[1].items.items[1].refreshView();
    },
    resetAll:function() {
        // Reset Operation Panel
        this.items.items[1].items.items[0].resetAll();
        // Reset New Order Panel
        this.items.items[1].items.items[1].resetAll();
    },
    doNavigation:function( tab ){
        var operatorContent = Ext.getCmp( 'Employee-Operator-Content' );
        var employeeContent = Ext.getCmp( 'Employee-Main-ContentView' );
        if ( tab ) {           
            if ( tab.navigateAction ) {
                /* 0: Operation
                *  1: NewOrder
                *  2: Xxx
                *  3: Main
                */
                switch ( tab.navigateAction ) { 
                    case 'operation' :
                        operatorContent.setActiveItem(0);
                        break;

                    case 'newOrder' :
                        operatorContent.setActiveItem(1);
                        break;

                    case 'xxxxX' :
                        operatorContent.setActiveItem(3);
                        break;
                        
                    case 'employee-navigation' :
                        employeeContent.setActiveItem(0);
                        break;

                }     
            } else {
                employeeContent.setActiveItem(0);
            }   
        }
    },

    getServerTimeDifference:function() {
        var elapsedTime = this.elapsedServerTime;
        return elapsedTime;
    },

    setServerTimeDifference:function() {
        this.elapsedServerTime = 0;
    }
    
});