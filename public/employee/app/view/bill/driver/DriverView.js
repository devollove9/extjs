/**
 * Created by devo on 7/30/2015.
 */
Ext.define( '517Employee.view.bill.driver.DriverView' , {
    extend: 'Ext.panel.Panel',
    requires: [
        //'517Employee.view.bill.driver.DriverViewController',
        '517Employee.view.bill.driver.billCenter.BillCenterView',
        '517Employee.view.bill.driver.DriverList',
    ],
    xtype:'employee-bill-driver',
    border: false, frame:false,
    layout: 'border',

    items: [
        {
            xtype: 'employee-bill-driver-driverList',
            id:'Employee-Bill-Driver-DriverList',
            region: 'west',
            width:150,
            margin: '0 5 0 0'
        },
        {
            xtype: 'employee-bill-driver-billCenter',
            id:'Employee-Bill-Driver-BillCenter',
            region : 'center'

        }
    ],
    refreshView:function() {
        // Refresh Driver List
        Ext.getCmp( 'Employee-Header' ).doRefreshView( 'Employee-Bill-Driver-DriverList' );

        // Refresh Bill Center
        Ext.getCmp( 'Employee-Header' ).doRefreshView( 'Employee-Bill-Driver-BillCenter' );
    },

    resetAll:function() {
        // Reset Driver List
        Ext.getCmp( 'Employee-Header' ).doResetView( 'Employee-Bill-Driver-DriverList' );

        // Reset Bill Center
        Ext.getCmp( 'Employee-Header' ).doResetView( 'Employee-Bill-Driver-BillCenter' );
    }
});