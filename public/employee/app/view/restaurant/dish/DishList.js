/**
 * Created by Yaxin on 6/1/2015.
 */
Ext.define( '517Employee.view.restaurant.dish.DishList', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.RowNumberer',
        '517Employee.view.restaurant.dish.DishListController'
    ],
    xtype: 'employee-restaurant-dish-list',
    store: Ext.create( '517Employee.store.restaurant.dish.List' ),
    controller:'employee-restaurant-dish-list-controller',
    columnLines: true ,
    title:'Dish List',
    header:{ titleAlign: 'left' , height:30 , padding:'0 10 0 10', margin:'0 0 0 0' },
    viewConfig: { enableTextSelection: true },
    /*  Variables  */

    // Variable detect if showing all
    showingall:false,

    // Variable of selected row
    selectedRow: -1,

    initComponent: function() {
        var me = this;
        me.tbar = [
            {
                xtype: 'textfield',
                name: 'searchField',
                id:'Employee-Restaurant-Dish-List-SearchField',
                hideLabel: true,
                labelWidth:0,
                width: 100
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
                handler: me.refreshView

            },
            {
                xtype: 'button',
                iconCls: 'fa fa-times',
                tooltip: 'De-select Type list',
                handler:'DeSelectAll'
            },
            {
                xtype: 'button',
                iconCls: 'fa fa-plus',
                text: 'Show All',
                id:'Employee-Restaurant-Dish-List-ShowAll',
                handler: 'ShowAllDish'
            },
            {
                xtype: 'button',
                iconCls: 'fa fa-plus',
                text: 'New',
                reference:'newBtn',
                handler: 'NewDish'
            }
        ];
        me.callParent(arguments);
    },
    features: [
        {
            id: 'operator-group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }
    ],
    margin: '2 5 0 0',
    columns: [
        {
            xtype: 'rownumberer',
            width : 28 ,
            align : 'center'
        },
        {
            text: 'Name',
            flex: 2,
            sortable: true,
            dataIndex: 'name',
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
        },
        {
            text: 'NameEn',
            flex: 2,
            sortable: true,
            dataIndex: 'nameEn',
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
        },
        {
            text: 'Price',
            flex: 1,
            sortable: true,
            dataIndex: 'price',
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
        },
        {
            text: 'Category',
            flex: 1,
            sortable: true,
            dataIndex: 'dishCategoryName',
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
        },
        {
            xtype: 'hidden' ,
            dataIndex: 'sales'
        }
    ],
    listeners: {
        select:function( a , b , rowIdx , scope , e , f ) {
            this.selectedRow = rowIdx;
        },

        selectionchange:function( model ,records ) {
            var me = this;
            var dishDetail = Ext.getCmp( 'Employee-Restaurant-Dish-Detail' );dishDetail.resetAll();
            var dishList = Ext.getCmp( 'Employee-Restaurant-Dish-List' );
            // Reset Grid Title
            if ( dishList.showingall == false ) {
                dishList.setTitle( 'Dish List' );
            } else {
                dishList.setTitle( 'Dish List All' );
            }
            if ( records[ 0 ] ) {

                var record = records[ 0 ];
                dishList.setTitle( records[ 0 ].data.name + '/' + records[ 0 ].data.nameEn  );
                if ( Ext.getCmp( 'Employee-Restaurant-Dish-RestaurantList' ).getSelectionModel().hasSelection() ) {
                    dishDetail.setTitle('Dish detail -' +   Ext.getCmp( 'Employee-Restaurant-Dish-RestaurantList' ).getSelectionModel().getSelection()[ 0 ].data.name + '-' +
                    records[ 0 ].data.dishCategoryName + '-' +
                    records[ 0 ].data.dishTypeName + '-' + records[ 0 ].data.name );
                }
                dishDetail.setLoading( true );
                dishDetail.getForm().loadRecord( record );
                dishDetail.originRecord = record;
                ////console.log(Ext.getCmp( 'restaurant-dish-detail-disabled' ));
                var dishDetailBusinessHour = Ext.getCmp( 'Employee-Restaurant-Dish-Detail-BusinessHour' );
                if ( record.data.information ) {

                    if ( typeof record.data.information.disabled != 'undefined') {
                        if ( record.data.information.disabled == true ) {
                            Ext.getCmp( 'Employee-Restaurant-Dish-Detail-Disabled' ).items.items[0].setValue( false );
                            Ext.getCmp( 'Employee-Restaurant-Dish-Detail-Disabled' ).items.items[1].setValue( true );
                        }
                    }
                    if ( record.data.information.businessHour ) {
                        dishDetailBusinessHour.getStore().add( record.data.information.businessHour );
                    } else {
                        var defaultBusinessHour = [
                            {start:0,end:86400,day:1},
                            {start:0,end:86400,day:2},
                            {start:0,end:86400,day:3},
                            {start:0,end:86400,day:4},
                            {start:0,end:86400,day:5},
                            {start:0,end:86400,day:6},
                            {start:0,end:86400,day:7}
                        ];
                        dishDetailBusinessHour.changed = true;
                        dishDetailBusinessHour.changedString = [ ' Day: 1 Start:0 End: 86400 ',' Day: 2 Start:0 End: 86400 ',' Day: 3 Start:0 End: 86400 '
                            ,' Day: 4 Start:0 End: 86400 ',' Day: 5 Start:0 End: 86400 ',' Day: 6 Start:0 End: 86400 ',' Day: 7 Start:0 End: 86400 ']
                        dishDetailBusinessHour.getStore().add( defaultBusinessHour );
                        //console.log(dishDetailBusinessHour);
                    }
                } else {
                    Ext.getCmp( 'Employee-Restaurant-Dish-Detail-Disabled' ).items.items[1].setValue( false );
                    Ext.getCmp( 'Employee-Restaurant-Dish-Detail-Disabled' ).items.items[0].setValue( true );
                    var defaultBusinessHour = [
                        {start:0,end:86400,day:1},
                        {start:0,end:86400,day:2},
                        {start:0,end:86400,day:3},
                        {start:0,end:86400,day:4},
                        {start:0,end:86400,day:5},
                        {start:0,end:86400,day:6},
                        {start:0,end:86400,day:7}
                    ];
                    dishDetailBusinessHour.changed = true;
                    dishDetailBusinessHour.changedString = [ ' Day: 1 Start:0 End: 86400 ',' Day: 2 Start:0 End: 86400 ',' Day: 3 Start:0 End: 86400 '
                        ,' Day: 4 Start:0 End: 86400 ',' Day: 5 Start:0 End: 86400 ',' Day: 6 Start:0 End: 86400 ',' Day: 7 Start:0 End: 86400 ']
                    dishDetailBusinessHour.getStore().add( defaultBusinessHour );
                    //console.log(dishDetailBusinessHour);
                }

                ////console.log(record);
                if ( record.data.optionGroup ) {
                    for ( var i = 0 ; i < record.data.optionGroup.length ; i ++ ) {
                        var cur_optionGroup = JSON.parse( JSON.stringify( record.data.optionGroup[ i ] ) );
                        Ext.getCmp( 'Employee-Restaurant-Dish-OptionGroupList' ).getStore().add( cur_optionGroup );
                    }
                }
                dishDetail.setLoading( false );
            } else {

            }
        }
    },
    onPreviousClick: function( forward ) {
        var me = this, idx;
        if ( ( idx = Ext.Array.indexOf( me.indexes, me.currentIndex) ) !== -1 ) {
            me.currentIndex = me.indexes[ idx - 1 ] || me.indexes[ me.indexes.length - 1 ];
            me.getSelectionModel().select( me.currentIndex );
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
    searchgrid:function(){
        var me = this,
            count = 0;
        var search_value = Ext.getCmp( 'Employee-Restaurant-Dish-List-SearchField' ).getValue();
        me.getSelectionModel().deselectAll();
        if (search_value) {
            me.view.refresh();
            me.searchValue = search_value;
            me.indexes = [];
            me.currentIndex = null;
            if (me.searchValue !== null) {
                me.searchRegExp = new RegExp(me.searchValue, 'g' + (me.caseSensitive ? '' : 'i'));
                me.store.each(function(record, idx) {
                    if (record.data.name.indexOf(search_value) > -1) {
                        ////console.log(record.data.name.indexOf(search_value));
                        me.indexes.push(idx);
                        if (me.currentIndex === null) {
                            me.currentIndex = idx;
                        }
                    }
                    if (record.data.nameEn.toLowerCase().indexOf(search_value.toLowerCase()) > -1) {
                        ////console.log(record.data.name.indexOf(search_value));
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
    resetAll:function() {

        this.getStore().loadData( [] , false );
        this.setDisabled( false );
        this.setTitle( "Dish List" );
        this.showingall = false;
        this.selectedRow = -1;
        Ext.getCmp( 'Employee-Restaurant-Dish-Detail').resetAll();
        Ext.getCmp( 'Employee-Restaurant-Dish-List-ShowAll' ).setText( 'Show All' );
    },

    refreshView:function() {
        var me = Ext.getCmp( 'Employee-Restaurant-Dish-List' );
        var restaurantList = Ext.getCmp( 'Employee-Restaurant-Dish-RestaurantList' );
        if ( ! restaurantList.getSelectionModel().hasSelection() ) {
            //Ext.Msg.alert( 'Error' , 'Please choose a restaurant first' );
        } else {
            var dishDetail = Ext.getCmp( 'Employee-Restaurant-Dish-Detail' );
            dishDetail.resetAll();
            if ( me.showingall == true ) {
                me.setTitle( 'Dish List All' );
                me.loadDish( 'all' );
            } else {
                me.setTitle( 'Dish List' );
                me.loadDish( 'old' );
            }
        }
    },
    loadDish:function( method ) {
        var me = this;
        var dishListStore = me.getStore();
        dishListStore.loadData( [] ,false );
        var loadFlag = false;
        var filterBy , filterValue;
        var param={};
        if ( method == 'all' ) {
            loadFlag = true;
            filterValue = Ext.getCmp( 'Employee-Restaurant-Dish-RestaurantList' ).getSelectionModel().getSelection()[ 0 ].data.storeId;
            param.storeId = filterValue;
        } else if ( method == 'old' ) {
            if ( ! Ext.getCmp( 'Employee-Restaurant-Dish-Type' ).getSelectionModel().hasSelection() ) {

            } else {
                loadFlag = true;
                filterValue = Ext.getCmp( 'Employee-Restaurant-Dish-Type' ).getSelectionModel().getSelection()[ 0 ].data.typeId
                param.typeId = filterValue;
            }
        }
        if ( loadFlag == true ) {
            me.setLoading( true );
            if ( Ext.getStore( 'Employee-Temp-Restaurant-Dish-DishListTemp' ) )  {
                var dishTempStore = Ext.getStore( 'Employee-Temp-Restaurant-Dish-DishListTemp' );
                dishTempStore.loadData( [] , false );
            } else{
                var dishTempStore = Ext.create( '517Employee.store.temp.restaurant.dish.DishListTemp' );
            }
            var region = Ext.getCmp( 'Employee-Header-Region');
            param.regionId = region.regionId;
            dishTempStore.proxy.headers = Ext.getCmp( 'Employee-Header').getHeaders( 'get' );
            dishTempStore.load( {
                method:'get',
                url:Ext.getCmp( 'Employee-Header' ).getServerUrl()+'/store/item',
                params:param,
                callback:function( records , operation , success ) {

                    if ( records[ 0 ] ) {
                        var firstRecord = records[ 0 ].data;
                        if ( firstRecord.errorCode ) {
                            me.getStore().loadData( [] , false );
                            var errorMessage = 'Unknown error, please contact technique staff.'
                            if ( firstRecord.errorMessage ) {
                                errorMessage = firstRecord.errorMessage.toString();
                            }
                            Ext.Msg.alert( firstRecord.errorCode.toString() , errorMessage );
                        } else {
                            var dishRecords = [];
                            dishTempStore.each( function( r ) {
                                dishRecords.push( r.copy() );
                            } );
                            if ( records.length > 0 ) {
                                if ( dishTempStore.first().get( 'name' ) ) {
                                    dishListStore.add( dishRecords );
                                }
                            }
                        }
                    }

                    me.setLoading( false );
                }
            });
        }
    },

});