/**
 * Created by devo on 7/6/2015.
 */
Ext.define( '517Employee.view.operator.newOrder.checkout.CheckoutList' , {
    extend: 'Ext.grid.Panel',
    requires:[
        '517Employee.view.operator.newOrder.checkout.CheckoutListController'
    ],

    xtype: 'employee-operator-newOrder-checkout-checkoutList',

    store: Ext.create( '517Employee.store.operator.newOrder.CheckoutList' ),
    controller:'employee-operator-newOrder-checkout-checkoutList-controller',
    columnLines: true,referenceHolder:true,
    title:'Checkout List',
    bodyStyle:{ "background-color":"white",'border-color' : '#c1c1c1' },
    header:{ height:30 ,padding:'0 10 0 10',margin:'0 0 0 0', titleAlign:'left'},

    checkoutStatus:false,
    checkoutStoreId:'',

    features: [
        {
            ftype: 'summary',
            dock: 'bottom' ,
            id:'summaryRow'
        }
    ],
    //margin: '2 5 0 0',
    columns: [
        {
            xtype: 'rownumberer'
        },
        {text: 'options',dataIndex: 'options',hidden:true,hideable: false},
        {text: 'itemId',dataIndex: 'itemId',hidden:true,hideable: false},
        {text: 'typeId',dataIndex: 'typeId',hidden:true,hideable: false},
        {
            text: 'Name',
            //width:150,
            flex: 2,
            sortable: true,
            dataIndex: 'name',
            summaryType: 'count',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return Ext.String.format('{0} dish{1}', value, value !== 1 ? 'es' : '');
            }
        },{
            text: 'English Name',
            //width:150,
            flex: 2,
            sortable: true,
            dataIndex: 'nameEn'
        },
        {
            text: 'Quantity',
            //width:60,
            flex: 1,
            sortable: true,
            dataIndex: 'quantity',
            summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex) {
                var sumObject = summaryData;
                var grid = this.up().up();
                var value = 0;
                grid.getStore().each(function(record,id){
                    value += record.data.quantity;
                });
                return Ext.String.format('{0} item{1}', value, value !== 1 ? 's' : '');
            }
        },
        {
            text: 'Price',
            //width:60,
            flex: 1,
            sortable: true,
            dataIndex: 'priceTotal',
            summaryType: 'sum',
        },
        {
            style: 'text-align:center',
            text: 'Modify',
            menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            width: 60,


            items: [
                {
                    iconCls: 'add',
                    tooltip: 'Add Quantity',
                    handler: 'addQuantity',
                    align: 'text-align:left',
                },
                {
                    iconCls: 'decrease-col',
                    tooltip: 'Decrease Quantity',
                    handler: 'decreaseQuantity',
                    align: 'text-align:center',
                },
                {
                    iconCls: 'delete-col',
                    tooltip: 'Delete Dish',
                    handler: 'deleteDish',
                    align: 'text-align:right',
                },
            ]

        },
    ],
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    type: 'vbox',
                    align: 'right',  // or 'right'
                    pack: 'center', // controls vertical align
                    text: 'Check Out',
                    margin: '0 10 0 10',
                    id:'Employee-Operator-NewOrder-Checkout-CheckoutList-CheckoutButton',
                    width:100,
                    handler: 'checkoutDish'

                },
                {
                    xtype: 'button',
                    type: 'vbox',
                    align: 'right',  // or 'right'
                    pack: 'center', // controls vertical align
                    text: 'Reset',
                    margin: '0 10 0 10',
                    width:100,
                    handler: function() {
                        var me = this;
                        Ext.Msg.show({
                            title:'Warning',
                            msg: 'It will reset checkout information, Continue?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn,text){
                                if ( btn == 'yes' ) {
                                    me.up().up().resetAll();
                                }
                            },
                            animEl: 'elId'
                        });

                    }
                }
            ]
        }
    ],

    resetAll:function() {
        this.checkoutStatus = false;
        this.checkoutStoreId = '';
        this.getStore().loadData( [] , false );
        this.dockedItems.items[ 2].items.items[ 1].setText( 'Check Out' );
        Ext.getCmp( 'Employee-Operator-NewOrder-Checkout-UserInfo').resetOrderInfo();
        Ext.getCmp( 'Employee-Operator-NewOrder-Checkout-UserInfo').resetAddress();
}
});