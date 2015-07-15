Ext.define('517Employee.view.support.SupportView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.support.Sidebar',
        '517Employee.view.support.ContentView'
    ],   
    xtype: 'employee-support',
    frame:false , border:false,
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    layout: 'border',
    autoScroll:true,
    items:[
        {
            region: 'west',
            xtype: 'employee-support-sidebar',
            // Border Color
            style:{ "background-color":"whitesmoke"},
            id: 'Employee-Support-Sidebar',
        },
        {
            region: 'center',
            xtype: 'employee-support-content',
            margin: '0 0 0 10' , frame:false , border:false , 
            id: 'Employee-Support-Content',
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
        var supportContent = Ext.getCmp( 'Employee-Support-Content' );
        var employeeContent = Ext.getCmp( 'Employee-Main-ContentView' );
        if ( tab ) {           
            if ( tab.navigateAction ) {
                /* 0: My Profile
                *  1: xxx
                *  2: Main 
                */
                switch ( tab.navigateAction ) { 
                    case 'contactCenter' : 
                        supportContent.setActiveItem(0);
                        break;
                        
                    case 'xxxxX' : 
                        supportContent.setActiveItem(1);
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