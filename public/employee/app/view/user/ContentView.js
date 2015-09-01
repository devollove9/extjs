Ext.define( '517Employee.view.user.ContentView' , {
    extend: 'Ext.panel.Panel',
    xtype: 'employee-user-content',
    requires: [
        //'517Employee.view.user.userHistory.UserHistoryView',
        '517Employee.view.user.information.InformationView',
    ],
    border: false,frame:false,
    layout: { type:'card' , padding:0 },
    bodyStyle:{ "background-color":"white",'buser-color' : 'black','buser-width':'0px'},
    items: [
        {
            border:false,frame:false,
            //xtype: 'employee-user-userHistory',
            id: 'Employee-User-UserHistory',
        },
        {
            border:false,frame:false,
            xtype: 'employee-user-information',
            id: 'Employee-User-Information',
        },
        {
            border:false,frame:false,
            //xtype: 'employee-user-xxxx',
            id: 'Employee-User-Xxxx',
        },/*
       {
            buser:false,frame:false,
            //xtype: 'employee-user-xxxx',
            id: 'employee-User-Xxxx',
        }, 
        {
            buser:false,frame:false,
            xtype: 'employee-user-xxxx',
            id: 'employee-User-Xxxx',
        } */
        
    ]
});