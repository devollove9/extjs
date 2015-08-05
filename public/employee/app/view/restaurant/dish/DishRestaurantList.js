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
    store: Ext.create( '517Employee.store.restaurant.dish.RestaurantList' ),

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
            flex: 2,
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
            var dishPanel = Ext.getCmp( 'Employee-Restaurant-Dish-CenterView' ); dishPanel.resetAll();
            var dishCategory = Ext.getCmp( 'Employee-Restaurant-Dish-Category' );
            var region = Ext.getCmp( 'Employee-Header-Region');
            Ext.getCmp( 'Employee-Restaurant-Dish-CenterView').resetAll();
            if ( records[ 0 ] ) {
                var record = records[ 0 ];
                dishPanel.setTitle(  record.data.name + '/' + record.data.nameEn + ' | 517 Employee Restaurant Service : Dish' );
                /* Load category of restaurant */
                var categoryStore = dishCategory.getStore();
                categoryStore.proxy.headers = Ext.getCmp( 'Employee-Header').getHeaders( 'get' );
                categoryStore.load( {
                    method:'get',
                    url:Ext.getCmp( 'Employee-Header' ).getServerUrl()+'/store/category',
                    params:{
                        regionId:region.regionId ,
                        storeId: record.data.storeId
                    }
                });
            } else {
            }
        }
    },
    refreshView:function() {
        var region = Ext.getCmp( 'Employee-Header-Region');
        var store =  this.getStore();
        if ( region.regionId != -1 ) {
            var me = this;
            me.resetAll();
            store.proxy.headers = Ext.getCmp( 'Employee-Header').getHeaders( 'get' );
            store.load( {
                method:'get',
                url:Ext.getCmp( 'Employee-Header' ).getServerUrl()+'/store',
                params:{
                    regionId:region.regionId
                }
            });
        }  else {
            store.loadData( [] , false );
        }
    },
    resetAll:function() {
        this.getStore().loadData( [] , false );
        this.setTitle( 'Restaurant List' );
        this.setDisabled( false );
        Ext.getCmp( 'Employee-Restaurant-Dish-CenterView' ).resetAll();
    }


});