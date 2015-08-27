Ext.define( '517Employee.view.user.ContentView' , {
    extend: 'Ext.panel.Panel',
    xtype: 'employee-user-content',
    requires: [
        '517Employee.view.user.userHistory.UserHistoryView',
    ],
    buser: false,frame:false,
    layout: { type:'card' , padding:0 },
    bodyStyle:{ "background-color":"white",'buser-color' : 'black','buser-width':'0px'},
    items: [
        {
            buser:false,frame:false,
            xtype: 'employee-user-userHistory',
            id: 'employee-User-UserHistory',
        },
        {
            buser:false,frame:false,
            //xtype: 'employee-user-xxxx',
            id: 'employee-User-Xxxx',
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