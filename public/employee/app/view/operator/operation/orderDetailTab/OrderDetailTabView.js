/**
 * Created by devo on 6/30/2015.
 */
Ext.define( '517Employee.view.operator.operation.orderDetailTab.OrderDetailTabView' , {
    extend: 'Ext.tab.Panel',
    requires:[
        //'517Employee.view.operator.operation.orderTab.OrderDetailTabController'
    ],
    xtype:'employee-operator-operation-orderDetailTab',
    //controller:'employee-operator-operation-orderDetailTab-controller',

    layout:'fit',
    referenceHolder:true,
    title: 'Orders(Developing)',
    header:{ titleAlign: 'left' , height:30 , padding:'0 10 0 10', margin:'0 0 0 0' },
    columnLines: true,
    collapsible:true,
    collapsed:true,
    tabBarHeaderPosition: 2,
    overflowX: 'auto',
    tabBar:{
        defaults: {
            flex: 1, // if you want them to stretch all the way
            height: 24, // set the height
            margin:'5.5 10 0 10'
        }
    },

    /*  Variables  */
    // Variable detect if editing
    gridEditing: false ,
    // Window Opend in this View
    windowPopUp:[],

    /*  View Content  */
    items: [

        /*
        {
            xtype:'employee-operator-operation-orderTab-orderList',
            itemId:'active-orders',
            reference:'active-orders',
            bind: {
                title: 'Active Orders <span class="badge">{activeTotal}</span>',
                store: '{activeOrder}',
            },
            reserveScrollbar:true
        },*/

    ]

});
