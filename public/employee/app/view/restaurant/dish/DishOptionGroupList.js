/**
 * Created by Yaxin on 6/1/2015.
 */
Ext.define('517Employee.view.restaurant.dish.DishOptionGroupList', {
    extend: 'Ext.grid.Panel',
    requires:[
        'Ext.grid.RowNumberer',
        '517Employee.view.restaurant.dish.DishOptionGroupListController'
    ],
    xtype: 'employee-restaurant-dish-optionGroupList',
    controller: 'employee-restaurant-dish-optionGroupList-controller',
    store: Ext.create( '517Employee.store.restaurant.dish.detail.OptionGroupList' ),

    /* View Settings */

    title: 'Dish Option Groups',
    padding:'0 2 0 1', margin:'0 3 0 2',
    header:{ titleAlign: 'left' , height:30 , padding:'0 10 0 10' },
    maxHeight: 270 , autoScroll:true ,
    columnLines: true , collapsible:true ,
    viewConfig: { enableTextSelection: true },

    /*  Variables  */
    // Variable detect if changed
    changedFlag:false,
    // Variable detect if editing
    gridEditing: false ,
    // Window Opend in this View
    windowPopUp:[],


    /*  View Content  */
    columns: [
        {
            xtype: 'rownumberer'
        },
        {
            text: 'Name',
            flex: 1,
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
            flex: 1,
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
            text: 'Max',
            flex: 1,
            sortable: true,
            dataIndex: 'max',
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
            text: 'Min',
            flex: 1,
            sortable: true,
            dataIndex: 'min',
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
        {   text: 'optionGroup',
            dataIndex: 'optionGroup',
            hidden:true,
            hideable: false
        },
        {
            menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            width: 40,
            items: [
                {
                    iconCls: 'copy-col',
                    tooltip: 'Copy Option Group',
                    handler: 'Copy'
                },
                {
                    iconCls: 'edit-col',
                    tooltip: 'Check/Edit Option Group',
                    handler: 'CheckEdit'
                }
            ]
        }
    ],
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            height: 30,
            defaults:{
                height:19
            },

            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    iconCls: 'fa fa-plus',
                    text: 'Add Copied Group',
                    handler: 'AddCopiedOptionGroup'
                },
                {
                    xtype: 'button',
                    iconCls: 'fa fa-plus',
                    text: 'New Option Group',
                    reference:'newOptionInstance',
                    handler: 'CreateNewOptionGroup'
                }
            ]
        }],

    resetAll:function() {
        this.getStore().loadData( [] , false );
        this.changedFlag = false;
        this.setTitle( 'Dish Option Groups' );
        this.setDisabled( false );
        this.closeWindowPopUp();
        this.gridEditing = false;
    },

    addOpenedWindow:function( win ) {
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
});



