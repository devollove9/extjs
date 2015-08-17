/**
 * Created by devo on 7/30/2015.
 */
Ext.define( '517Employee.view.bill.driver.billCenter.BillCenterView' , {
    extend: 'Ext.panel.Panel',
    requires: [
        '517Employee.view.bill.driver.billCenter.Toolbar',
        '517Employee.view.bill.driver.billCenter.BillList',
    ],
    xtype: 'employee-bill-driver-billCenter',
    frame:false , border:false , split:true ,
    bodyStyle:{ "background-color":"white" , 'border-color' : 'black' , 'border-width':'0px' } ,
    layout: 'border',
    items:[
        {
            region: 'north',
            margin: '0 0 5 0',
            xtype: 'employee-bill-driver-billCenter-toolbar',
            id: 'Employee-Bill-Driver-BillCenter-Toolbar',
            height:200,maxHeight:350,
        },
        {
            region: 'center',
            xtype: 'employee-bill-driver-billCenter-billList',
            id: 'Employee-Bill-Driver-BillCenter-BillList',
            flex:1
        }

    ],

    doNavigation:function(panel){
        // //console.log( panel );
    },

    resetAll:function() {

        // Reset Order List
        this.items.items[ 1 ].resetAll();

    },

    refreshView:function() {
        // Reset Order List
        this.items.items[ 1 ].resetAll();
    }


});