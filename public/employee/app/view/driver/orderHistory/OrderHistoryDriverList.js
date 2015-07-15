/**
 * Created by Yaxin on 5/29/2015.
 */
Ext.define('517Employee.view.driver.orderHistory.OrderHistoryDriverList', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.RowNumberer',
        //'517Employee.view.driver.orderHistory.OrderHistoryDriverListController'
    ],
    xtype: 'employee-driver-orderHistory-driverList',
    //controller:'employee-driver-orderHistory-driverList',
    //store: Ext.create( '517Employee.store.driver.Drivers'),
    //store:'Drivers',
    title:' Driver List',
    collapsible:true,
    bodyStyle:{ "background-color":"white",'border-color' : '#c1c1c1',},
    header:{ height:30 ,padding:'0 10 0 10',margin:'0 0 0 0', titleAlign:'center'},

    viewConfig: {
        enableTextSelection: true
    },
    columns: [
        {
            xtype: 'rownumberer'
        },
        {
            text: 'Name',
            sortable: true,
            dataIndex: 'name',
            flex: 2
        }
    ]

});