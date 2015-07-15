/**
 * Created by Yaxin on 6/1/2015.
 */
Ext.define('517Employee.view.restaurant.dish.DishOptionGroupListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-restaurant-dish-optionGroupList-controller',
    requires: [

    ],
    CheckEdit: function( grid, rowIndex, colIndex , delete_col , click_event , record_line, tr ) {
        //console.log(a);
        //console.log(b);
        //console.log(grid);
        //console.log( grid.store.getAt(rowIndex).data.option );
        //console.log(i);
        //console.log(record_line);

        var gridPanel = grid.up();
        if ( gridPanel.gridEditing == true ) {
            Ext.Msg.alert( 'Error' , 'A window already opened, please close it first.' );
        } else {
            var win;
            if (!win) {
                var win = Ext.create('Ext.window.Window', {
                    xtype: 'employee-restaurant-dish-optionGroup-check-window',
                    title: 'Dish Option Group - ' + record_line.data.name + '(' + record_line.data.nameEn + ')',
                    width:850,
                    minWidth:800,
                    height:500,
                    minHeight:500,
                    listeners:{
                        'close':function( win ) {
                            Ext.getCmp( 'Employee-Restaurant-Dish-OptionGroupList' ).gridEditing = false;
                        }
                    }
                });
            }
            var OptionPanel = Ext.create( '517Employee.view.restaurant.dish.DishOptionGroup' );
            OptionPanel.currentMethod = 'saving';
            OptionPanel.getForm().findField( 'max' ).setValue( record_line.data.max );
            OptionPanel.getForm().findField( 'min' ).setValue( record_line.data.min );
            OptionPanel.getForm().findField( 'name' ).setValue( record_line.data.name );
            OptionPanel.getForm().findField( 'nameEn' ).setValue( record_line.data.nameEn );
            OptionPanel.getForm().findField( 'quantity' ).setValue( record_line.data.quantity );

            if ( record_line.data.information ) {
                if ( typeof record_line.data.information.disabled != 'undefined' ) {
                    //console.log( OptionPanel.getForm().findField('disabled_group').items.items[0].checked = );
                    if ( record_line.data.information.disabled == true ) {
                        OptionPanel.items.items[ 0 ].items.items[ 0 ].setValue( false );
                        OptionPanel.items.items[ 0 ].items.items[ 1 ].setValue( true );
                    }
                }
            }
            OptionPanel.selectedRow = rowIndex;
            OptionPanel.originRecord = record_line;
            if ( Ext.getCmp( 'Employee-Restaurant-Dish-Detail' ).newDish == true ) {

            } else {
                OptionPanel.itemId = Ext.getCmp( 'Employee-Restaurant-Dish-Detail' ).getForm().findField( 'itemId' ).getValue();
            }
            var optionList_store = Ext.create( '517Employee.store.restaurant.dish.detail.OptionList' );
            OptionPanel.items.items[3].items.items[0].getView().bindStore( optionList_store );
            for ( var i = 0 ; i < record_line.data.option.length ; i ++ ) {
                var cur_option = JSON.parse( JSON.stringify( record_line.data.option[ i ] ) );
                optionList_store.add( cur_option );
            }
            OptionPanel.items.items[3].items.items[0].getView().refresh();

            win.insert(OptionPanel);
            gridPanel.addOpenedWindow( win ) ;
            win.show();
        }
    },
    Copy: function( grid, rowIndex, colIndex , delete_col , click_event , record_line, tr ) {
        console.log(record_line);
        var oldOptionGroup= record_line.data;
        var newOptionGroup = new Object();
        var information = new Object();
        information.disabled = false;
        if ( oldOptionGroup.information ) {
            if ( typeof oldOptionGroup.information.disabled != 'undefined' ) {
                information.disabled = oldOptionGroup.information.disabled
            }
        }
        //newOptionGroup.information = information;
        newOptionGroup.name = oldOptionGroup.name; newOptionGroup.nameEn = oldOptionGroup.nameEn; newOptionGroup.max = oldOptionGroup.max; newOptionGroup.min = oldOptionGroup.min; newOptionGroup.quantity = oldOptionGroup.quantity;
        var new_options = [];
        for ( var i = 0 ; i < oldOptionGroup.option.length ; i ++ ) {
            var cur_option = new Object();
            cur_option.name = oldOptionGroup.option[i].name;
            cur_option.price = oldOptionGroup.option[i].price;
            cur_option.nameEn = oldOptionGroup.option[i].nameEn;
            cur_option.quantity = oldOptionGroup.option[i].quantity;
            //cur_option.information = oldOptionGroup.option[i].information;
            new_options.push(cur_option);
        }
        newOptionGroup.option = new_options;
        Ext.getCmp( 'Employee-Restaurant-Dish' ).setOptionGroup( newOptionGroup );
    },
    CreateNewOptionGroup:function( button ) {
        //console.log(a);
        //console.log(b);
        //console.log(grid);
        //console.log( grid.store.getAt(rowIndex).data.option );
        //console.log(i);
        //console.log(record_line);
        //console.log(Ext.getCmp( 'restaurant-dishlist' ).getSelectionModel().hasSelection());
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
                    width:850,
                    minWidth:800,
                    height:500,
                    minHeight:500,
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
            OptionPanel.items.items[3].items.items[0].getView().bindStore( optionList_store );

            OptionPanel.dockedItems.items[0].items.items[1].setText( 'Add Option Group' );
            win.insert(OptionPanel);
            gridPanel.addOpenedWindow( win ) ;
            win.show();
        }
    },
    AddCopiedOptionGroup:function(){
        var copiedGroupFlag = Ext.getCmp( 'Employee-Restaurant-Dish' ).getOptionGroupFlag();
        var option_group_list = Ext.getCmp( 'Employee-Restaurant-Dish-OptionGroupList' );

        if ( Ext.getCmp( 'Employee-Restaurant-Dish-List' ).getSelectionModel().hasSelection() == false && Ext.getCmp( 'Employee-Restaurant-Dish-List').newDish == false ) {
            Ext.Msg.alert( 'Error' , 'Please choose a dish first.');
        }  else if ( copiedGroupFlag == false ) {
            Ext.Msg.alert( "Error" , 'No Option Group Copied' )
        }
        else {
            var copiedGroup = Ext.getCmp( 'Employee-Restaurant-Dish').getOptionGroup();
            //console.log( copiedGroup );
            var newOptionGroup = new Object();
            var information = new Object();
            information.disabled = false;
            if ( copiedGroup.information ) {
                if ( typeof copiedGroup.information.disabled != 'undefined' ) {
                    information.disabled = copiedGroup.information.disabled
                }
            }
            //newOptionGroup.information = information;

            newOptionGroup.name = copiedGroup.name; newOptionGroup.nameEn = copiedGroup.nameEn; newOptionGroup.max = copiedGroup.max; newOptionGroup.min = copiedGroup.min; newOptionGroup.quantity = copiedGroup.quantity;
            var new_options = [];
            for ( var i = 0 ; i < copiedGroup.option.length ; i ++ ) {
                var cur_option = new Object();
                cur_option.name = copiedGroup.option[i].name;
                cur_option.price = copiedGroup.option[i].price;
                cur_option.nameEn = copiedGroup.option[i].nameEn;
                cur_option.quantity = copiedGroup.option[i].quantity;
                //cur_option.information = copiedGroup.option[i].information;
                new_options.push(cur_option);
            }
            newOptionGroup.option = new_options;
            option_group_list.changedFlag = true;
            option_group_list.getStore().add( newOptionGroup );

            option_group_list.getView().refresh();
        }
    }
})