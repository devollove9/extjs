/**
 * Created by Yaxin on 5/31/2015.
 */
Ext.define('517Employee.view.restaurant.dish.DishType', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.RowNumberer',
        '517Employee.view.restaurant.dish.DishTypeController'
    ],
    xtype: 'employee-restaurant-dish-type',
    store: Ext.create( '517Employee.store.restaurant.dish.Type' ),
    controller: 'employee-restaurant-dish-type-controller',
    columnLines: true , autoScroll: true ,
    title:'Dish Type',
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
                handler:'NewType'
            },
            {
                xtype: 'button',
                iconCls: 'fa fa-refresh',
                tooltip: 'Refresh Type list',
                handler: 'Refreshlist'
            },
            {
                xtype: 'button',
                iconCls: 'fa fa-times',
                tooltip: 'De-select Type list',
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
            menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            width: 25,
            items: [
                {
                    iconCls: 'edit-col',
                    tooltip: 'Check/Edit DishType',
                    handler: 'EditType'
                }, /*
                 {
                 iconCls:'delete-col',
                 tooltip:'Delete DishType',
                 handler:'DeleteType'
                 }*/
            ]
        }
    ],

    listeners: {
        selectionchange:function( model , records ) {
            var me = this;
            me.closeWindowPopUp();
            me.setTitle('Dish Type');
            var dishList = Ext.getCmp( 'Employee-Restaurant-Dish-List' );dishList.resetAll();

            /* Load Dish of Type */
            if ( records[ 0 ] ){
                me.setTitle( records[ 0] .data.name + '/' + records[ 0].data.nameEn );
                /* Load dish of restaurant */
                dishList.refreshView();
            }
        }
    },

    resetAll:function(){
        this.getStore().loadData( [] , false );
        this.setTitle( 'Dish Type' );
        this.setDisabled( false );
        this.setLoading( false );
        this.closeWindowPopUp();
        this.gridEditing = false;
        Ext.getCmp( 'Employee-Restaurant-Dish-List').resetAll();
    },

    refreshView:function(){
        if ( Ext.getCmp( 'Employee-Restaurant-Dish-Category' ).getSelectionModel().hasSelection() ) {
            var me = this;
            var store =  this.getStore();
            var region = Ext.getCmp( 'Employee-Header-Region');
            me.resetAll();
            store.proxy.headers = Ext.getCmp( 'Employee-Header').getHeaders( 'get' );
            store.load({
                method:'get',
                url:Ext.getCmp( 'Employee-Header' ).getServerUrl()+'/store/type',
                params:{
                    regionId:region.regionId ,
                    categoryId: Ext.getCmp( 'Employee-Restaurant-Dish-Category' ).getSelectionModel().getSelection()[0].data.categoryId
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