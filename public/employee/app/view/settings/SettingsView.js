Ext.define('517Employee.view.settings.SettingsView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.settings.Sidebar',
        '517Employee.view.settings.ContentView'
    ],   
    xtype: 'employee-settings',
    frame:false , border:false,
    bodyStyle:{ "background-color":"white"},
    layout: 'border',
    autoScroll:true,
    items:[
        {
            region: 'west',
            xtype: 'employee-settings-sidebar',
            // Border Color
            style:{ "background-color":"none"},
            id: 'employee-Settings-Sidebar',
        },
        {
            region: 'center',
            xtype: 'employee-settings-content',
            margin: '0 0 0 10' , frame:false , border:false , 
            id: 'employee-Settings-Content',
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
        var settingsContent = Ext.getCmp( 'employee-Settings-Content' );
        var employeeContent = Ext.getCmp( 'Employee-Main-ContentView' );
        if ( tab ) {           
            if ( tab.navigateAction ) {
                /* 0: My Profile
                *  1: xxx
                *  2: Main 
                */
                switch ( tab.navigateAction ) { 
                    case 'myProfile' : 
                        settingsContent.setActiveItem(0);
                        break;
                        
                    case 'xxxxX' : 
                        settingsContent.setActiveItem(1);
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