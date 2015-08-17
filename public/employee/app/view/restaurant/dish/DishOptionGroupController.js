/**
 * Created by Yaxin on 6/8/2015.
 */
Ext.define('517Employee.view.restaurant.dish.DishOptionGroupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-restaurant-dish-optionGroup-controller',
    requires: [

    ],
    CheckEdit: function( grid, rowIndex, colIndex , delete_col , clickEvent , recordLine, tr ) {
        ////console.log(a);
        ////console.log(b);
        ////console.log(grid);
        ////console.log( grid.store.getAt(rowIndex).data.option );
        ////console.log(i);
        ////console.log(recordLine);

    },
    Savechanges: function( button ) {
        var optionGroup = button.up().up();
        var curWindow = optionGroup.up();
        var optionList = optionGroup.items.items[3].items.items[0];
        var optionGroupList = Ext.getCmp( 'Employee-Restaurant-Dish-OptionGroupList' );
        optionGroupList.changedFlag = false;
        ////console.log(optionGroup.up());
        ////console.log(this.up().up().originRecord);

        var name = optionGroup.getForm().findField( 'name' ).getValue();
        var nameEn = optionGroup.getForm().findField( 'nameEn' ).getValue();
        var max = parseInt( optionGroup.getForm().findField( 'max' ).getValue() );
        var min = parseInt( optionGroup.getForm().findField( 'min' ).getValue() );
        var quantity = parseInt( optionGroup.getForm().findField( 'quantity' ).getValue() );
        var disabled = optionGroup.getForm().findField( 'disabledGroup' ).getValue().disabled;
        var total_optionNumber = optionList.getView().getStore().getCount();
        if ( optionGroup.currentMethod == 'saving' ) {
            var originRecord = optionGroup.originRecord.data;
            if ( name == '' || nameEn == '' || max == '' || min == '' || quantity == '' || total_optionNumber == 0 || max < min ) {
                Ext.Msg.alert( 'Error' , 'Please make sure all fields are filled.<br>Please make sure option list are not empty' );
            } else if ( optionGroup.itemId != Ext.getCmp( 'Employee-Restaurant-Dish-Detail' ).getForm().findField( 'itemId' ).getValue() ) {
                Ext.Msg.alert( 'Error' , 'Trying to edit option group of another dish' );
            } else {
                var changedFlag = false;
                if ( originRecord.information ) {
                    if ( typeof originRecord.information.disabled != 'undefined' ){
                        if ( originRecord.disabled != disabled ) {
                            changedFlag = true;
                        }
                    } else {
                        changedFlag = true;
                    }
                } else {
                    changedFlag = true;
                }

                if ( originRecord.name != name || originRecord.nameEn != nameEn || originRecord.max != max || originRecord.min != min || originRecord.quantity != quantity
                    || optionList.changedFlag == true ) {
                    changedFlag = true;

                }
                if ( changedFlag == true ) {
                    Ext.Msg.show({
                        title:'Warning',
                        msg: 'You will save changes to local.<br>Are you sure want to save the change?<br>(you will need to click save on Dish detail panel to post save to database)',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn,text){
                            if ( btn == 'yes' ) {
                                optionGroupList.changedFlag = true;
                                var old_record = optionGroupList.getStore().getAt(optionGroup.selectedRow);

                                if ( old_record.data.information ) {
                                    old_record.data.information.disabled = disabled;
                                } else {
                                    var information = new Object();
                                    information.disabled = disabled;
                                    old_record.data.information = information;
                                }
                                old_record.data.name = name;old_record.data.nameEn = nameEn;old_record.data.max = max;old_record.data.min = min;old_record.data.quantity = quantity;

                                if ( optionList.changedFlag == true ) {
                                    var new_options = [];
                                    ////console.log(optionList.getView().getStore().data.items);
                                    for ( var i = 0 ; i < optionList.getView().getStore().data.items.length ; i ++ ) {
                                        var cur_option = new Object();
                                        cur_option.name = optionList.getView().getStore().data.items[i].data.name;
                                        cur_option.price = optionList.getView().getStore().data.items[i].data.price;
                                        cur_option.nameEn = optionList.getView().getStore().data.items[i].data.nameEn;
                                        cur_option.quantity = optionList.getView().getStore().data.items[i].data.quantity;
                                        cur_option.information = optionList.getView().getStore().data.items[i].data.information;
                                        //cur_option.information = optionList.getView().getStore().data.items[i].data.information;
                                        new_options.push(cur_option);
                                    }
                                    old_record.data.option = new_options;
                                }
                                ////console.log(old_record);
                                optionGroupList.getView().refresh();
                                curWindow.close();

                            }
                        },
                        animEl: 'elId'
                    });
                }
            }
        }
        if ( optionGroup.currentMethod == 'adding' ) {
            if ( name == '' || nameEn == '' || max == '' || min == '' || quantity == '' || total_optionNumber == 0 || max < min ) {
                Ext.Msg.alert( 'Error' , 'Please make sure all fields are filled.<br>Please make sure option list are not empty.<br>Please make sure max >= min.' );
            } else {
                Ext.Msg.show({
                    title:'Warning',
                    msg: 'You will add Option Group to local.<br>Are you sure want to add the Option Group?<br>(you will need to click save on Dish detail panel to post save to database)',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn,text){
                        if ( btn == 'yes' ) {
                            optionGroupList.changedFlag = true;
                            //var old_record = optionGroupList.getStore().getAt(optionGroup.selectedRow);
                            var newOptionGroup = new Object();
                            var information = new Object();
                            information.disabled = disabled;
                            newOptionGroup.information = information;
                            newOptionGroup.name = name; newOptionGroup.nameEn = nameEn; newOptionGroup.max = max; newOptionGroup.min = min; newOptionGroup.quantity = quantity;
                            var new_options = [];
                            for ( var i = 0 ; i < optionList.getView().getStore().data.items.length ; i ++ ) {
                                var cur_option = new Object();
                                cur_option.name = optionList.getView().getStore().data.items[i].data.name;
                                cur_option.price = optionList.getView().getStore().data.items[i].data.price;
                                cur_option.nameEn = optionList.getView().getStore().data.items[i].data.nameEn;
                                cur_option.quantity = optionList.getView().getStore().data.items[i].data.quantity;
                                cur_option.information = optionList.getView().getStore().data.items[i].data.information;
                                new_options.push(cur_option);
                            }
                            newOptionGroup.option = new_options;
                            optionGroupList.getStore().add( newOptionGroup );

                            optionGroupList.getView().refresh();
                            curWindow.close();

                        }
                    },
                    animEl: 'elId'
                });
            }
        }

    }
})