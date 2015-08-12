/**
 * Created by Yaxin on 5/29/2015.
 */
Ext.define('517Employee.view.restaurant.information.InformationRestaurantList', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.RowNumberer',
        //'517Employee.view.restaurant.information.InformationRestaurantListController'
    ],
    xtype: 'employee-restaurant-information-restaurantList',
    //controller:'employee-restaurant-information-restaurantList',
    store: Ext.create( '517Employee.store.restaurant.information.RestaurantList'),
    //store:'Restaurants',
    title:' Restaurant List',
    collapsible:true,columnLines:true ,
    bodyStyle:{ "background-color":"white",'border-color' : '#c1c1c1',},
    header:{ height:30 ,padding:'0 10 0 10',margin:'0 0 0 0', titleAlign:'center'},

    viewConfig: {
        enableTextSelection: true
    },
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                xtype: 'tbfill'
            },
            {
                xtype: 'button',
                iconCls: 'fa fa-plus',
                text: 'New',
                handler : function() {
                    this.up().up().getSelectionModel().deselectAll();
                    Ext.getCmp( 'Employee-Restaurant-Information-Restaurant').addRestaurant();
                }
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
                }

            },
            {
                xtype:'tbfill'
            }
        ]
    }],
    columns: [
        {
            xtype: 'rownumberer',
            width : 28 ,
            align : 'center'
        },
        {
            text: 'Name',
            sortable: true,
            dataIndex: 'name',
            flex: 2 ,
            renderer: function( val , metaData , record ) {
                if( record.data.information ) {
                    if ( typeof record.data.information.disabled != 'undefined' ) {
                        if ( record.data.information.disabled == true ) {
                            return '<span style="color:' + "#e75f5f" + ';">' + val + '</span>';
                        }
                    }
                }
                return val;
            }
        }
    ],
    listeners:{
        selectionchange:function( model , records ) {

            var restaurantDetailView = Ext.getCmp( 'Employee-Restaurant-Information-Restaurant' );
            restaurantDetailView.resetAll();

            if ( records[ 0 ] ) {
                var record = records[ 0 ];
                restaurantDetailView.getStoreData( record );
            } else {
            }
        }
    },
    refreshView:function() {
        var me = this;
        Ext.getCmp( 'Employee-Header').refreshStore( me , '/store' , {} );
    },
    resetAll:function() {
        this.getStore().loadData( [] , false );
        this.setTitle( 'Restaurant List' );
        this.setDisabled( false );
        //Ext.getCmp( 'Employee-Restaurant-Dish-CenterView' ).resetAll();
    },
    newRestaurant:function() {
        var me = this;
        me.getSelectionModel().deselectAll();
        Ext.getCmp( 'Employee-Restaurant-Information' ).newRestaurant();
    }

});