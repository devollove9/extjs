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
        //'517Employee.view.operator.operation.OperationViewController'
    ],
    xtype: 'employee-operator-operation',
    frame:false , border:false, split:true,
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    layout: 'border',
    //controller:'employee-operator-operation-controller',
    //autoScroll:true,
    //title: 'operation',

    initComponent:function(){
        var me = this;
        var runner = new Ext.util.TaskRunner();
        var task = runner.start({
            run: me.refreshView , //function(){console.log('task');},
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
            border:false,frame:false,split:true,
            items: [
                {
                    region: 'center',
                    layout: 'border',
                    xtype: 'panel',
                    border:false,frame:false,split:true,
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
                            id: 'Employee-Operator-Operation-OrderDetailTab',
                        }
                    ]
                },
                {
                    margin: '0 0 0 5' ,
                    region: 'east',
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
        this.items.items[0].items.items[0].items.items[0].refreshView();

        // Refresh Driver List
        this .items.items[1].refreshView();

        var regionInfo = Ext.getCmp( 'Employee-Header-Region').regionInfo;
        //console.log( regionInfo );
        var map = Ext.getCmp( 'Employee-Operator-Operation-Map');
        map.lookupReference( 'map' ).reCenter({
            lat: regionInfo.latitude,
            lng: regionInfo.longitude
        });
    }


    ,
    resetAll:function(){
        // Reset Order Tab
        this.items.items[0].items.items[0].items.items[0].resetAll();

        // Reset Driver List
        this.items.items[1].resetAll();
    }




});