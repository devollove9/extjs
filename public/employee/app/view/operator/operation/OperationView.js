/**
 * Created by Yaxin on 6/10/2015.
 */
Ext.define('517Employee.view.operator.operation.OperationView', {
    extend: 'Ext.panel.Panel',
    requires: [
        '517Employee.view.operator.operation.map.MapView',
        '517Employee.view.operator.operation.orderTab.OrderTabView',
        '517Employee.view.operator.operation.orderDetailTab.OrderDetailTabView',
        '517Employee.view.operator.operation.DriverList',

    ],
    xtype: 'employee-operator-operation',
    frame:false , border:false,
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    layout: 'border',

    initComponent:function(){
        var me = this;
        var runner = new Ext.util.TaskRunner();
        var task = runner.start({
            run: me.refreshView , //function(){//console.log('task');},
            scope: me,
            interval: 30000
        });
        this.callParent();
    },

    items: [
        {
            region: 'center',
            layout: 'border',
            xtype: 'panel',
            border:false,frame:false,
            items: [
                {
                    region: 'center',
                    layout: 'border',
                    xtype: 'panel',
                    border:false,frame:false,split: true,
                    margin: '0 0 0 0',
                    width: '66%',
                    items: [
                        {
                            region: 'center',
                            xtype: 'employee-operator-operation-orderTab',
                            id: 'Employee-Operator-Operation-OrderTab',
                            height: '55%'
                        },
                        {
                            region:'south',
                            height: '45%',
                            xtype:'employee-operator-operation-orderDetailTab',
                            id: 'Employee-Operator-Operation-OrderDetailTab'
                        }
                    ]
                },
                {
                    margin: '0 0 0 0' ,split: true,
                    region: 'east',
                    layout:'fit',
                    width: '34%',
                    xtype: 'employee-operator-operation-map',
                    id:'Employee-Operator-Operation-Map'
                }
            ]
        },
        {
            region: 'east',
            margin: '0 0 0 5' ,
            width:180,
            xtype:'employee-operator-operation-driverList',
            id:'Employee-Operator-Operation-DriverList'
        }

    ],
    refreshView:function(){
        // Refresh Order Tab
        Ext.getCmp( 'Employee-Operator-Operation-OrderTab').refreshView();

        // Refresh Driver List
        Ext.getCmp( 'Employee-Operator-Operation-DriverList').refreshView();

    }


    ,
    resetAll:function(){
        // Reset Order Tab
        this.items.items[0].items.items[0].items.items[0].resetAll();

        // Reset Driver List
        Ext.getCmp( 'Employee-Operator-Operation-DriverList').resetAll();
    }




});