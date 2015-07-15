/**
 * Created by Yaxin on 5/29/2015.
 */
Ext.define('517Employee.view.restaurant.dish.DishRestaurantList', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.RowNumberer',
        '517Employee.view.restaurant.dish.DishRestaurantListController'
    ],
    xtype: 'employee-restaurant-dish-restaurantList',
    controller:'employee-restaurant-dish-restaurantList-controller',
    store: Ext.create( '517Employee.store.restaurant.RestaurantList' ),

    title:' Restaurant List',
    collapsible:true , columnLines:true ,
    bodyStyle:{ "background-color":"white",'border-color' : '#c1c1c1' },
    header:{ height:30 ,padding:'0 10 0 10',margin:'0 0 0 0', titleAlign:'center'},
    viewConfig: {
        enableTextSelection: true
    },

    /*  View Content  */
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
                handler: 'Refreshlist'
            },
            {
                xtype: 'button',
                iconCls: 'fa fa-times',
                tooltip: 'De-select Restaurant list',
                handler:'DeSelectAll'
            },
            {
                xtype:'tbfill'
            }
        ]
    }],
    columns: [
        {
            xtype : 'rownumberer',
            width : 28 ,
            align : 'center'
        },
        {
            text: 'Name',
            sortable: true,
            dataIndex: 'name',
            flex: 2
        }
    ],
    listeners:{
        selectionchange:function( model , records ) {
            var dishPanel = Ext.getCmp( 'Employee-Restaurant-Dish-CenterView' ); dishPanel.resetAll();
            var dishCategory = Ext.getCmp( 'Employee-Restaurant-Dish-Category' );

            if ( records[ 0 ] ) {
                var record = records[ 0 ];

                dishPanel.setTitle(  record.data.name + '/' + record.data.nameEn + ' | 517 Employee Restaurant Service : Dish' );

                /* Load category of restaurant */
                var categoryStore = dishCategory.getStore();
                //dishCategory.setLoading( true );
                categoryStore.load( {
                    params:{
                        method: 'get_by_storeid',
                        store_id: record.data.storeId
                    },
                    callback:function( records , operation , success ) {
                        if ( records[ 0 ] ) {
                            dishCategory.setLoading(false);
                            var firstRecord = records[ 0 ].data;
                            if ( firstRecord.errorCode ) {
                                Ext.getStore( 'RestaurantList').loadData( [] , false );
                                var errorMessage = 'Unknown error, please contact technique staff.'
                                if ( firstRecord.errorMessage ) {
                                    errorMessage = firstRecord.errorMessage.toString();
                                }
                                Ext.Msg.alert( firstRecord.errorCode.toString() , errorMessage );
                            }
                        }
                    }
                });
            } else {
            }
        }
    },
    refreshGrid:function() {
        if ( Ext.getCmp( 'Employee-Header-Region' ).regionId != -1 ) {
            Ext.getCmp( 'Employee-Restaurant-Dish-CenterView' ).resetAll();
            var me = this;
            me.resetAll();
            this.getStore().load( {
                params:{
                    method: 'get_by_region',
                    region_id: Ext.getCmp( 'Employee-Header-Region').regionId
                },
                callback:function( records , operation , success ) {
                    var firstRecord = records[ 0 ].data;
                    if ( firstRecord.errorCode ) {
                        Ext.getStore( 'RestaurantList').loadData( [] , false );
                        var errorMessage = 'Unknown error, please contact technique staff.'
                        if ( firstRecord.errorMessage ) {
                            errorMessage = firstRecord.errorMessage.toString();
                        }
                        Ext.Msg.alert( firstRecord.errorCode.toString() , errorMessage );
                    }
                    me.setLoading( false );
                },
                failure:function() {
                    me.setLoading( false );
                }

            });
        }
    },
    resetAll:function() {
        this.getStore().loadData( [] , false );
        this.setTitle( 'Restaurant List' );
        this.setDisabled( false );
        Ext.getCmp( 'Employee-Restaurant-Dish-CenterView' ).resetAll();
    }


});