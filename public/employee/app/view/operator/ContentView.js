Ext.define( '517Employee.view.operator.ContentView' , {
    extend: 'Ext.panel.Panel',
    xtype: 'employee-operator-content',
    requires: [
        '517Employee.view.operator.operation.OperationView',
        '517Employee.view.operator.newOrder.NewOrderView',
    ],
    border: false,frame:false,
    layout: { type:'card' , padding:0 },
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    items: [
        {
            border:false,frame:false,
            xtype: 'employee-operator-operation',
            id: 'Employee-Operator-Operation'
        },
        {
            border:false,frame:false,
            xtype: 'employee-operator-newOrder',
            id: 'Employee-Operator-NewOrder'
        },
        {
            border:false,frame:false,
            //xtype: 'employee-operator-xxxx',
            id: 'Employee-Operator-Xxxx',
        }
        
    ]
});