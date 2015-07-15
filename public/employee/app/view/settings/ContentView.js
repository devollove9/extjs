Ext.define( '517Employee.view.settings.ContentView' , {
    extend: 'Ext.panel.Panel',
    xtype: 'employee-settings-content',
    requires: [
        '517Employee.view.settings.myprofile.MyProfileView',
    ],
    border: false,frame:false,
    layout: { type:'card' , padding:0 },
    items: [
        {
            border:false,frame:false,
            xtype: 'employee-settings-myProfile',
            id: 'employee-Settings-MyProfile',
        },
        {
            border:false,frame:false,
            //xtype: 'employee-settings-xxxx',
            id: 'employee-Settings-Xxxx',
        },/*
       {
            border:false,frame:false,
            //xtype: 'employee-settings-xxxx',
            id: 'employee-Settings-Xxxx',
        }, 
        {
            border:false,frame:false,
            xtype: 'employee-settings-xxxx',
            id: 'employee-Settings-Xxxx',
        } */
        
    ]
});