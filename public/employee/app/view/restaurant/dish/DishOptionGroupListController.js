/**
 * Created by Yaxin on 6/1/2015.
 */
Ext.define('517Employee.view.restaurant.dish.DishOptionGroupListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-restaurant-dish-optionGroupList-controller',
    requires: [

    ],
    CheckEdit: function( grid, rowIndex, colIndex , delete_col , clickEvent , recordLine, tr ) {
        ////console.log(a);
        ////console.log(b);
        ////console.log(grid);
        ////console.log( grid.store.getAt(rowIndex).data.option );
        ////console.log(i);
        ////console.log(recordLine);

        var gridPanel = grid.up();
        if ( gridPanel.gridEditing == true ) {
            Ext.Msg.alert( 'Error' , 'A window already opened, please close it first.' );
        } else {
            var win;
            if (!win) {
                var win = Ext.create('Ext.window.Window', {
                    xtype: 'employee-restaurant-dish-optionGroup-check-window',
                    title: 'Dish Option Group - ' + recordLine.data.name + '(' + recordLine.data.nameEn + ')',
                    width:800,resizable:false,
                    height:700,
                    listeners:{
                        'close':function( win ) {
                            Ext.getCmp( 'Employee-Restaurant-Dish-OptionGroupList' ).gridEditing = false;
                        }
                    }
                });
            }
            var OptionPanel = Ext.create( '517Employee.view.restaurant.dish.DishOptionGroup' );
            OptionPanel.currentMethod = 'saving';
            OptionPanel.getForm().findField( 'max' ).setValue( recordLine.data.max );
            OptionPanel.getForm().findField( 'min' ).setValue( recordLine.data.min );
            OptionPanel.getForm().findField( 'name' ).setValue( recordLine.data.name );
            OptionPanel.getForm().findField( 'nameEn' ).setValue( recordLine.data.nameEn );
            OptionPanel.getForm().findField( 'quantity' ).setValue( recordLine.data.quantity );

            if ( recordLine.data.information ) {
                if ( typeof recordLine.data.information.disabled != 'undefined' ) {
                    ////console.log( OptionPanel.getForm().findField('disabledGroup').items.items[0].checked = );
                    if ( recordLine.data.information.disabled == true ) {
                        OptionPanel.lookupReference( 'employee-restaurant-dish-optionGroup-disabled' ).items.items[ 0 ].items.items[ 0 ].setValue( false );
                        OptionPanel.lookupReference( 'employee-restaurant-dish-optionGroup-disabled' ).items.items[ 0 ].items.items[ 1 ].setValue( true );
                    }
                }
                if ( typeof recordLine.data.information.businessHour != 'undefined' ) {
                    if ( recordLine.data.information.businessHour.length == 0 ) {
                        OptionPanel.setBusinessHourGrid( recordLine.data.name + '/' + recordLine.data.nameEn , Ext.getCmp( 'Employee-Header').getDefaultValue( 'businessHour') );
                    } else {
                        OptionPanel.setBusinessHourGrid( recordLine.data.name + '/' + recordLine.data.nameEn , recordLine.data.information.businessHour );
                    }
                } else {
                    OptionPanel.setBusinessHourGrid( recordLine.data.name + '/' + recordLine.data.nameEn , Ext.getCmp( 'Employee-Header').getDefaultValue( 'businessHour') );
                }
            }
            OptionPanel.selectedRow = rowIndex;
            OptionPanel.originRecord = recordLine;
            if ( Ext.getCmp( 'Employee-Restaurant-Dish-Detail' ).newDish == true ) {

            } else {
                OptionPanel.itemId = Ext.getCmp( 'Employee-Restaurant-Dish-Detail' ).getForm().findField( 'itemId' ).getValue();
            }
            var optionList_store = Ext.create( '517Employee.store.restaurant.dish.detail.OptionList' );
            OptionPanel.items.items[1].items.items[0].getView().bindStore( optionList_store );
            OptionPanel.items.items[1].lookupReference( 'employee-restaurant-dish-optionGroup-option-businessHour').resetAll();
            for ( var i = 0 ; i < recordLine.data.option.length ; i ++ ) {
                var cur_option = JSON.parse( JSON.stringify( recordLine.data.option[ i ] ) );
                optionList_store.add( cur_option );
            }
            OptionPanel.items.items[1].items.items[0].getView().refresh();

            win.insert(OptionPanel);
            gridPanel.addOpenedWindow( win ) ;
            win.show();
        }
    },
    CreateNewOptionGroup:function( button ) {
        ////console.log(a);
        ////console.log(b);
        ////console.log(grid);
        ////console.log( grid.store.getAt(rowIndex).data.option );
        ////console.log(i);
        ////console.log(recordLine);
        ////console.log(Ext.getCmp( 'restaurant-dishlist' ).getSelectionModel().hasSelection());
        var gridPanel = button.up().up();
        if ( gridPanel.gridEditing == true ) {
            Ext.Msg.alert( 'Error' , 'A window already opened, please close it first.' );
        } else if ( Ext.getCmp( 'Employee-Restaurant-Dish-Detail' ).newDish == false && Ext.getCmp( 'Employee-Restaurant-Dish-List' ).getSelectionModel().hasSelection() == false ) {
            Ext.Msg.alert( 'Error' , 'Please choose a dish first.');
        } else {
            var win;
            if (!win) {
                var win = Ext.create('Ext.window.Window', {
                    xtype: 'employee-restaurant-dish-optionGroup-generate-window',
                    title: 'Dish Option Group - New',
                    width:800,resizable:false,
                    height:700,

                    listeners:{
                        'close':function( win ) {
                            Ext.getCmp( 'Employee-Restaurant-Dish-OptionGroupList' ).gridEditing = false;
                        }
                    }
                });
            }
            var OptionPanel = Ext.create( '517Employee.view.restaurant.dish.DishOptionGroup' );
            OptionPanel.currentMethod = 'adding';

            OptionPanel.getForm().findField( 'quantity' ).setValue( -1 );
            OptionPanel.selectedRow = -1;
            OptionPanel.originRecord = null;
            OptionPanel.itemId = Ext.getCmp( 'Employee-Restaurant-Dish-Detail' ).getForm().findField( 'itemId' ).getValue();
            var optionList_store = Ext.create( '517Employee.store.restaurant.dish.detail.OptionList' );
            OptionPanel.items.items[1].items.items[0].getView().bindStore( optionList_store );
            OptionPanel.items.items[1].lookupReference( 'employee-restaurant-dish-optionGroup-option-businessHour').resetAll();
            OptionPanel.setBusinessHourGrid( 'New' , Ext.getCmp( 'Employee-Header').getDefaultValue( 'businessHour') );
            OptionPanel.dockedItems.items[0].items.items[1].setText( 'Add Option Group' );
            win.insert(OptionPanel);
            gridPanel.addOpenedWindow( win ) ;
            win.show();
        }
    },
    Copy: function( grid, rowIndex, colIndex , delete_col , clickEvent , recordLine, tr ) {
        var newOptionGroup = Ext.getCmp( 'Employee-Header').copyOptionGroup( recordLine.data );
        console.log( newOptionGroup );
        Ext.getCmp( 'Employee-Restaurant-Dish' ).setOptionGroup( newOptionGroup );
    },
    AddCopiedOptionGroup:function(){
        var copiedGroupFlag = Ext.getCmp( 'Employee-Restaurant-Dish' ).getOptionGroupFlag();
        var optionGroupList = Ext.getCmp( 'Employee-Restaurant-Dish-OptionGroupList' );

        if ( Ext.getCmp( 'Employee-Restaurant-Dish-List' ).getSelectionModel().hasSelection() == false && Ext.getCmp( 'Employee-Restaurant-Dish-List').newDish == false ) {
            Ext.Msg.alert( 'Error' , 'Please choose a dish first.');
        }  else if ( copiedGroupFlag == false ) {
            Ext.Msg.alert( "Error" , 'No Option Group Copied' )
        }
        else {
            var copiedGroup = Ext.getCmp( 'Employee-Restaurant-Dish').getOptionGroup();
            ////console.log( copiedGroup );
            var newOptionGroup = Ext.getCmp( 'Employee-Header').copyOptionGroup( copiedGroup );
            optionGroupList.changedFlag = true;
            optionGroupList.getStore().add( newOptionGroup );
            console.log( newOptionGroup );
            optionGroupList.getView().refresh();
        }
    }
})