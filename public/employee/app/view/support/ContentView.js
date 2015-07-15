Ext.define( '517Employee.view.support.ContentView' , {
    extend: 'Ext.panel.Panel',
    xtype: 'employee-support-content',
    requires: [
        '517Employee.view.support.contactcenter.ContactCenterView',
    ],
    border: false,frame:false,
    layout: { type:'card' , padding:0 },
    items: [
        {
            border:false,frame:false,
            xtype: 'employee-support-contactCenter',
            id: 'Employee-Support-ContactCenter',
        },
        {
            border:false,frame:false,
            //xtype: 'employee-support-xxxx',
            id: 'Employee-Support-Xxxx',
        },/*
       {
            border:false,frame:false,
            //xtype: 'employee-support-xxxx',
            id: 'employee-Support-Xxxx',
        }, 
        {
            border:false,frame:false,
            xtype: 'employee-order-xxxx',
            id: 'employee-Order-Xxxx',
        } */
        
    ]
});