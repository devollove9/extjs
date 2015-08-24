/**
 * Created by devo on 7/30/2015.
 */
Ext.define( '517Employee.view.bill.restaurant.billCenter.BillCenterView' , {
    extend: 'Ext.panel.Panel',
    requires: [
        '517Employee.view.bill.restaurant.billCenter.Toolbar',
        '517Employee.view.bill.restaurant.billCenter.BillList',
    ],
    xtype: 'employee-bill-restaurant-billCenter',
    frame:false , border:false , split:true ,
    bodyStyle:{ "background-color":"white" , 'border-color' : 'black' , 'border-width':'0px' } ,
    layout: 'border',
    items:[
        {
            region: 'north',
            margin: '0 0 5 0',
            xtype: 'employee-bill-restaurant-billCenter-toolbar',
            id: 'Employee-Bill-Restaurant-BillCenter-Toolbar',
            height:200,maxHeight:350,
        },
        {
            region: 'center',
            xtype: 'employee-bill-restaurant-billCenter-billList',
            id: 'Employee-Bill-Restaurant-BillCenter-BillList',
            flex:1
        }

    ],

    doNavigation:function(panel){
        ////console.log( panel );
    },

    resetAll:function() {

        // Reset Order List
        Ext.getCmp( 'Employee-Header' ).doResetView( 'Employee-Bill-Restaurant-BillCenter-BillList' );

    },

    refreshView:function() {
        // Reset Order List
        Ext.getCmp( 'Employee-Header' ).doResetView( 'Employee-Bill-Restaurant-BillCenter-BillList' );
    }


});