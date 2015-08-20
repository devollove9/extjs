/**
 * Created by devo on 7/6/2015.
 */
Ext.define('517Employee.view.operator.newOrder.RestaurantList', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.RowNumberer',
    ],
    xtype: 'employee-operator-newOrder-restaurantList',
    store: Ext.create( '517Employee.store.operator.RestaurantListPublic' ),
    title:'Restaurants',
    collapsible:true , columnLines:true ,
    bodyStyle:{ "background-color":"white",'border-color' : '#c1c1c1' },
    header:{ height:30 ,padding:'0 10 0 10',margin:'0 0 0 0', titleAlign:'center'},
    width:150,
    padding:0,
    scroll:'vertical',
    viewConfig: { enableTextSelection: true },
    columns: [
        {
            xtype: 'rownumberer',
            width : 28 ,
            align : 'center'
        },
        {
            text: 'Name',
            sortable: false,
            dataIndex: 'name',
            width:150
        }
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                xtype: 'tbfill'
            },
            {
                xtype: 'button',
                iconCls: 'fa fa-refresh',
                tooltip: 'Refresh Restaurant list',
                handler:function() {
                    this.up().up().refreshView();
                }
            },
            {
                xtype: 'button',
                iconCls: 'fa fa-times',
                tooltip: 'De-select Restaurant list',
                handler:function() {
                    this.up().up().getSelectionModel().deselectAll();
                    Ext.getCmp( 'Employee-Operator-NewOrder-DishList').resetAll();
                }

            },
            {
                xtype:'tbfill'
            }
        ]
    }],
    listeners:{
        selectionchange: function(model,records,eOpts){
            var dishList=Ext.getCmp( 'Employee-Operator-NewOrder-DishList');
            if (records[0]){
                dishList.refreshView();
            }
        }
    },
    refreshView:function(){
        var me = this;
        var store =  this.getStore();
        var region = Ext.getCmp( 'Employee-Header-Region');
        if ( region.regionId != -1 ) {
            me.setLoading( true );
            store.load({
                method:'get',
                url:Ext.getCmp( 'Employee-Header' ).getServerUrl()+'/public/store',
                params:{
                    regionId:region.regionId
                },
                callback:function( records, operation, success ) {
                    me.setLoading( false );
                }
            });
        } else {
            store.loadData( [] , false );
            me.setLoading( false );
        }
    },
    resetAll:function() {
        var me = this;
        me.gridEditing = false;
        me.setLoading( false );
        me.windowPopUp = [];
        me.getStore().loadData( [] , false );
        Ext.getCmp( 'Employee-Operator-NewOrder-DishList').resetAll();
    }
});