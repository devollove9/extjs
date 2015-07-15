/**
 * Created by devo on 7/6/2015.
 */
Ext.define('517Employee.view.operator.newOrder.checkout.CheckoutView', {
    extend: 'Ext.panel.Panel',
    requires: [
        '517Employee.view.operator.newOrder.checkout.CheckoutList',
        '517Employee.view.operator.newOrder.checkout.UserInfo'
    ],
    xtype: 'employee-operator-newOrder-checkout',
    border: false,
    layout: 'border',
    bodyPadding: 0,
    //bodyStyle:'backgroundColor:white',
    defaults: {
        collapsible: false,
        split: true,
        //bodyStyle: 'backgroundColor:#cecece',
    },
    items: [
        {
            region: 'west',
            layout: 'border',
            xtype: 'panel',
            border:false,frame:false,split:true,
            width: '52%',
            items: [
                {
                    region: 'center',
                    xtype: 'employee-operator-newOrder-checkout-checkoutList',
                    id: 'Employee-Operator-NewOrder-Checkout-CheckoutList',
                    height: '50%',
                    margin:'0 0 5 0'
                },
                {
                    region:'south',
                    height: '50%',
                    //xtype:'employee-operator-newOrder-checkout-checkoutSearch',
                    id: 'Employee-Operator-NewOrder-Checkout-CheckoutSearch',
                }
            ]

        },
        {
            xtype: 'employee-operator-newOrder-checkout-userInfo',
            id:'Employee-Operator-NewOrder-Checkout-UserInfo',
            region: 'center',
            //collapsible: true,
            width: '48%',
        }


    ],

    refreshView:function() {

    },

    resetAll:function() {

    }
});