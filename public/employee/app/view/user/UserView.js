Ext.define('517Employee.view.user.UserView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.user.Sidebar',
        '517Employee.view.user.ContentView'
    ],   
    xtype: 'employee-user',
    frame:false , buser:false,
    bodyStyle:{ "background-color":"white",'buser-color' : 'black','buser-width':'0px'},
    layout: 'buser',
    autosSroll:true,
    items:[
        {
            region: 'west',
            xtype: 'employee-user-sidebar',
            // Buser Color
            style:{ "background-color":"none"},
            id: 'employee-User-Sidebar',
        },
        {
            region: 'center',
            margin: '0 0 0 10' , frame:false , buser:false ,
            xtype: 'employee-user-content',
            id: 'employee-User-Content',
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
        var userContent = Ext.getCmp( 'Employee-User-Content' );
        var employeeContent = Ext.getCmp( 'Employee-Content' );
        if ( tab ) {           
            if ( tab.navigateAction ) {
                /* 0: User History
                *  1: xxx
                *  2: Main 
                */
                switch ( tab.navigateAction ) { 
                    case 'userHistory' :
                        userContent.setActiveItem(0);
                        break;
                        
                    case 'xxxxX' : 
                        userContent.setActiveItem(1);
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