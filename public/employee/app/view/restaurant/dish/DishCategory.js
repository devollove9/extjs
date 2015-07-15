/**
 * Created by Yaxin on 5/31/2015.
 */
Ext.define( '517Employee.view.restaurant.dish.DishCategory' , {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.RowNumberer',
        '517Employee.view.restaurant.dish.DishCategoryController'
    ],
    xtype: 'employee-restaurant-dish-category' ,
    store: Ext.create( '517Employee.store.restaurant.dish.Category' ),
    controller: 'employee-restaurant-dish-category-controller',
    columnLines: true , autoScroll: true ,
    title:'Dish Category',
    header:{ titleAlign: 'left' , height:30 , padding:'0 10 0 10', margin:'0 0 0 0' },
    viewConfig: { enableTextSelection: true },
    /*  Variables  */
    // Variable detect if editing
    gridEditing: false ,
    // Window Opend in this View
    windowPopUp:[],

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
                iconCls: 'fa fa-plus',
                text: 'New',
                handler:'NewCategory'
            },
            {
                xtype: 'button',
                iconCls: 'fa fa-refresh',
                tooltip: 'Refresh Category list',
                handler: 'Refreshlist'
            },
            {
                xtype: 'button',
                iconCls: 'fa fa-times',
                tooltip: 'De-select Category list',
                handler:'DeSelectAll'
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
            text: 'Name' ,
            flex: 2 ,
            sortable: true ,
            dataIndex: 'name' ,
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
            text: 'Name_en',
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
            menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            width: 25,
            items: [
                {
                    iconCls: 'edit-col',
                    tooltip: 'Check/Edit DishCategory',
                    handler: 'EditCategory'
                },     /*
                 {
                 iconCls:'delete-col',
                 tooltip:'Delete DishCategory',
                 handler:'DeleteCategory'
                 }*/
            ]
        }
    ],
    listeners: {
        selectionchange:function( model , records ) {
            var me = this;
            me.closeWindowPopUp();
            me.setTitle('Dish Category');
            var dishType = Ext.getCmp( 'Employee-Restaurant-Dish-Type' );dishType.resetAll();

            /* Load Type of Category */
            if ( records[ 0 ] ) {

                me.setTitle( records[ 0] .data.name + '/' + records[ 0].data.nameEn );
                var typeStore = dishType.getStore();

                typeStore.load( {
                    params:{
                        method:'get_by_specificid',
                        filterBy:'categoryId',
                        filterValue:records[ 0 ].data.categoryId
                    },
                    callback:function( records , operation , success ) {
                        if ( records[ 0 ] ) {
                            var firstRecord = records[ 0 ].data;
                            if ( firstRecord.errorCode ) {
                                dishType.getStore().loadData( [] , false );
                                var errorMessage = 'Unknown error, please contact technique staff.'
                                if ( firstRecord.errorMessage ) {
                                    errorMessage = firstRecord.errorMessage.toString();
                                }
                                Ext.Msg.alert( firstRecord.errorCode.toString() , errorMessage );
                            }
                            me.setLoading( false );
                        }

                    }
                })
            } else {
            }
        }
    },

    resetAll:function() {
        this.getStore().loadData( [] , false );
        this.setTitle( 'Dish Category' );
        this.setDisabled( false );
        this.closeWindowPopUp();
        this.gridEditing = false;
        Ext.getCmp( 'Employee-Restaurant-Dish-Type').resetAll();
    },

    refreshGrid:function() {
        if ( Ext.getCmp( 'Employee-Restaurant-Dish-RestaurantList' ).getSelectionModel().hasSelection() ) {
            var me = this;
            me.resetAll();
            this.getStore().load({
                params:{
                    method: 'get_by_storeid',
                    store_id: Ext.getCmp( 'Employee-Restaurant-Dish-RestaurantList' ).getSelectionModel().getSelection()[0].data.storeId
                },
                callback:function( records , operation , success ) {
                    me.setLoading( false );
                },
                failure:function(){
                    me.setLoading( false );
                }

            });
        }
    },

    addOpenedWindow:function ( window ) {
        this.windowPopUp.push( window );
        this.gridEditing = true;
    },

    closeWindowPopUp:function() {
        var windows = this.windowPopUp;
        //console.log( windows );

        for ( var i = 0 ; i < windows.length ; i ++ ) {
            var window = windows[ i ];
            window.close();
        }
        this.gridEditing = false;
        this.windowPopUp = [];
    },

    lockView:function() {
        this.disable();
        this.closeWindowPopUp();
    },

    unlockView:function() {
        this.setDisabled( false );
    }

});