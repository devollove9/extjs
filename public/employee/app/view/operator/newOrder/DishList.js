/**
 * Created by devo on 7/6/2015.
 */
Ext.define('517Employee.view.operator.newOrder.DishList', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.RowNumberer',
        '517Employee.view.operator.newOrder.DishListController',
        'Ext.ux.statusbar.StatusBar'
    ],
    xtype: 'employee-operator-newOrder-dishList',
    store: Ext.create( '517Employee.store.operator.newOrder.DishList' ),
    columnLines: true,
    title:'Dish List',
    bodyStyle:{ "background-color":"white",'border-color' : '#c1c1c1' },
    header:{ height:30 ,padding:'0 10 0 10',margin:'0 0 0 0', titleAlign:'left'},
    referenceHolder:true,
    controller:'employee-operator-newOrder-dishList-controller',
    autoScroll: true,
    //margin: '2 5 0 0',
    initComponent: function() {
        var me = this;
        me.tbar = [
            'Search',
            {
                xtype: 'textfield',
                name: 'searchField',
                id:'Employee-Operator-NewOrder-DishList-SearchField',
                hideLabel: true,
                width: 150,
             },
            {
                xtype: 'button',
                iconCls: 'fa fa-search',
                tooltip: 'search',
                handler: me.searchgrid,
                scope: me
            },
            {
                xtype: 'button',
                text: '&lt;',
                tooltip: 'Find Previous Row',
                handler: me.onPreviousClick,
                scope: me
            },
            {
                xtype: 'button',
                text: '&gt;',
                tooltip: 'Find Next Row',
                handler: me.onNextClick,
                scope: me
            },
            {
                xtype: 'button',
                iconCls: 'fa fa-refresh',
                tooltip: 'Refresh Dish list',
                handler: me.refreshView,
                scope: me
            }
        ];
        me.callParent(arguments);
    },
    features: [{
        id: 'operator-group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '{name}',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    columns: [
        {
            xtype: 'rownumberer',
            flex: 1,
            align : 'center'
        }, {
            text: 'Name',
            //width:150,
            flex: 7,
            sortable: true,
            dataIndex: 'name'
        },
        {
            text: 'English Name',
            //width:150,
            flex: 7,
            sortable: true,
            dataIndex: 'nameEn'
        },
        {
            text: 'Price',
            //width:60,
            flex: 3,
            sortable: true,
            dataIndex: 'price'
        }, {
            align: 'center',
            text: '+',
            menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            maxwidth: 25,
            width: 25,
            items: [
                {
                    iconCls: 'add',
                    tooltip: 'Add Dish',
                    handler: 'addDish',
                    align: 'center',
                },
            ]

        },
    ],
    dockedItems: [
    ],
    listeners: {
        selectionchange:function(model,records){

            if (records[0]){

            } else {

            }
        }
    },

    onPreviousClick: function(forward) {
        var me = this, idx;
        if ((idx = Ext.Array.indexOf(me.indexes, me.currentIndex)) !== -1) {
            me.currentIndex = me.indexes[idx - 1] || me.indexes[me.indexes.length - 1];
            me.getSelectionModel().select(me.currentIndex);
        }
    },
    onNextClick: function() {
        var me = this,
            idx;

        if ((idx = Ext.Array.indexOf(me.indexes, me.currentIndex)) !== -1) {
            me.currentIndex = me.indexes[idx + 1] || me.indexes[0];
            me.getSelectionModel().select(me.currentIndex);
        }
    },
    refreshView:function(){
        var restaurantList = Ext.getCmp( 'Employee-Operator-NewOrder-RestaurantList');
        if ( restaurantList.getSelectionModel().hasSelection() ) {
            var region = Ext.getCmp( 'Employee-Header-Region' );
            var me = this;
            me.resetAll();
            var store = this.getStore();
            if ( region.regionId != -1 ) {
                me.setLoading( true );
                store.load({
                    method:'get',
                    url:Ext.getCmp( 'Employee-Header' ).getServerUrl()+'/public/store/item',
                    params:{
                        regionId:region.regionId,
                        storeId:restaurantList.getSelectionModel().getSelection()[0].data.storeId
                    },
                    callback:function( records, operation, success ) {
                        me.setLoading( false );
                    }
                });
            } else {
                store.loadData( [] , false );
                me.setLoading( false );
            }
        }

    },
    resetAll:function() {
        var me = this ;
        Ext.getCmp( 'Employee-Operator-NewOrder-DishList-SearchField').setValue( '' );
        me.gridEditing = false;
        me.setLoading( false );
        me.windowPopUp = [];
        me.getStore().loadData( [] , false );
    },
    searchgrid:function(){
        var me = this,
            count = 0;
        var search_value = Ext.getCmp( 'Employee-Operator-NewOrder-DishList-SearchField' ).getValue();
        me.getSelectionModel().deselectAll();
        if (search_value) {
            me.view.refresh();
            me.searchValue = search_value;
            me.indexes = [];
            me.currentIndex = null;
            if (me.searchValue !== null) {
                me.searchRegExp = new RegExp(me.searchValue, 'g' + (me.caseSensitive ? '' : 'i'));
                me.store.each(function(record, idx) {
                    //console.log(record);
                    //console.log(idx);
                    if (record.data.name.indexOf(search_value) > -1) {
                        //console.log(record.data.name.indexOf(search_value));
                        me.indexes.push(idx);
                        if (me.currentIndex === null) {
                            me.currentIndex = idx;
                        }
                    }
                    if (record.data.nameEn.toLowerCase().indexOf(search_value.toLowerCase()) > -1) {
                        //console.log(record.data.name.indexOf(search_value));
                        me.indexes.push(idx);
                        if (me.currentIndex === null) {
                            me.currentIndex = idx;
                        }
                    }

                }, me);

                // results found
                if (me.currentIndex !== null) {
                    me.getSelectionModel().select(me.currentIndex);

                }
            }
            if (me.currentIndex === null) {
                me.getSelectionModel().deselectAll();
            }
        } else me.getSelectionModel().deselectAll();
    },

    //plugins: Ext.create('Ext.grid.plugin.gridsearch', {}),
});