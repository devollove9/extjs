/**
 * Created by devo on 7/6/2015.
 */
Ext.define('517Employee.view.operator.newOrder.neworder.CheckoutSearch', {
    extend: 'Ext.grid.Panel',
    xtype: 'operator-checkout-search',
    //itemId:'restaurant-info',
    requires:[
        '517Employee.view.operator.newOrder.neworder.CheckoutSearchController'
    ],
    store: 'Operator.neworder.UserRecord',
    columnLines: true,
    //layout: 'hbox',
    border:false,
    title:'Search user by phone ',
    frame: false,
    referenceHolder:true,
    controller:'operator-search',
    autoScroll: true,

    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 75,
        msgTarget: 'qtip'
    },
    initComponent: function() {
        var me = this;
        me.tbar = ['Search Phone',{
            xtype: 'textfield',
            name: 'searchField',
            id:'userrecordsearchfield',
            hideLabel: true,
            width: 200,
            enforceMaxLength: true,
            minLength: '10',
            maxLength: '10',
            maskRe: /[0-9.]/,
            listeners: {
                change: {
                    fn: function(field,search_value,inputs,this_obj){

                    },
                    scope: this,
                    buffer: 500
                },
            }
        }, {
            xtype: 'button',
            text: 'GO',
            tooltip: 'Search User',
            handler: 'searchUser',
            //scope: me
        },
            {
                xtype: 'button',
                text: 'Clear',
                tooltip: 'Clear Search',
                handler: 'clearSearch',
                //scope: me
            },
        ];
        me.callParent(arguments);
    },
    columns: [
        {
            xtype: 'rownumberer',
            width:25,
        }, {
            text: 'Name',
            //width:150,
            flex: 2,
            //sortable: true,
            dataIndex: 'name'
        },
        {
            xtype: 'actioncolumn',
            text: '+',
            menuDisabled: true,
            sortable: false,
            align:'center',
            maxwidth: 25,
            width:25,
            items: [
                {
                    iconCls: 'add',
                    tooltip: 'Choose Name',
                    handler: 'addName',
                    align: 'center',
                },
            ]

        },
        {
            text: 'Street',
            //width:60,
            flex: 5,
            //sortable: true,
            dataIndex: 'streetroom'
        },{
            xtype: 'actioncolumn',
            text: '+',
            menuDisabled: true,
            sortable: false,
            align:'center',
            maxwidth: 25,
            width:25,
            items: [
                {
                    iconCls: 'add',
                    tooltip: 'Choose Info',
                    handler: 'addStreet',
                    align: 'text-align:center',
                },
            ]

        },
        {
            text: 'Card',
            width:50,
            maxwidth:50,
            //flex: 2,
            //sortable: true,
            dataIndex: 'number'
        },{
            xtype: 'actioncolumn',
            text: '+',
            menuDisabled: true,
            sortable: false,
            align:'center',
            maxwidth: 25,
            width:25,
            items: [
                {
                    iconCls: 'add',
                    tooltip: 'Choose Info',
                    handler: 'addCard',
                    align: 'center',
                },
            ]

        },
        {
            text: 'Username',
            //width:60,
            flex: 4,
            //sortable: true,
            dataIndex: 'username'
        },
        {
            xtype: 'actioncolumn',
            text: '+',
            menuDisabled: true,
            sortable: false,
            align:'center',
            maxwidth: 25,
            width:25,
            items: [
                {
                    iconCls: 'add',
                    tooltip: 'Choose Username',
                    handler: 'addUsername',
                    align: 'center',
                },
            ]

        },
        {
            xtype: 'actioncolumn',
            text: '+',
            menuDisabled: true,
            sortable: false,
            align:'center',
            maxwidth: 25,
            width:25,
            items: [
                {
                    iconCls: 'buy-col',
                    tooltip: 'Choose Record',
                    handler: 'addRecord',
                    align: 'center',
                },
            ]

        },
    ],
});