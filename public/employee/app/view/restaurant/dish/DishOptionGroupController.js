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
        var businessHour = optionGroup.lookupReference( 'employee-restaurant-dish-optionGroup-businessHour' );
        var curWindow = optionGroup.up();
        var optionList = optionGroup.lookupReference( 'employee-restaurant-dish-optionSelection' ).items.items[ 0 ];
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
            if ( !name || !nameEn || !max || typeof ( min ) == 'undefined' || !quantity || name == '' || nameEn == '' || max == '' || total_optionNumber == 0 || max < min ) {
                Ext.Msg.alert( 'Error' , 'Please make sure all fields are filled.<br>Please make sure option list are not empty' );
            } else if ( optionGroup.itemId != Ext.getCmp( 'Employee-Restaurant-Dish-Detail' ).getForm().findField( 'itemId' ).getValue() ) {
                Ext.Msg.alert( 'Error' , 'Trying to edit option group of another dish' );
            } else {
                var changedFlag = false;
                if ( originRecord.information ) {
                    if ( typeof originRecord.information.disabled != 'undefined' ){
                        if ( originRecord.information.disabled != disabled ) {
                            changedFlag = true;
                        }
                    } else {
                        changedFlag = true;
                    }
                    if ( typeof originRecord.information.businessHour != 'undefined' ) {
                        if ( originRecord.information.businessHour.length == 0 ) {
                            changedFlag = true;
                        }
                    } else {
                        changedFlag = true
                    }
                } else {
                    changedFlag = true;
                }
                if ( businessHour.changed == true ) {
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
                                    old_record.data.information.businessHour = businessHour.getBusinessHour();
                                } else {
                                    var information = new Object();
                                    information.disabled = disabled;
                                    information.businessHour = businessHour.getBusinessHour();
                                    old_record.data.information = information;
                                }
                                old_record.data.name = name;old_record.data.nameEn = nameEn;old_record.data.max = max;old_record.data.min = min;old_record.data.quantity = quantity;

                                if ( optionList.changedFlag == true ) {
                                    var newOption = Ext.getCmp( 'Employee-Header').copyStoreToArray( optionList.getView().getStore() );
                                    old_record.data.option = newOption;
                                }
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

            if ( min == '' ) console.log( min );
            if ( !name || !nameEn || !max || typeof ( min ) == 'undefined' || !quantity || name == '' || nameEn == '' || max == '' || total_optionNumber == 0 || max < min ) {
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

                            // Get Information
                            var information = new Object();
                            information.disabled = disabled;
                            information.businesssHour = businessHour.getBusinessHour();
                            newOptionGroup.information = information;

                            // Get name, nameEn , max , min ,quantity
                            newOptionGroup.name = name;
                            newOptionGroup.nameEn = nameEn;
                            newOptionGroup.max = max;
                            newOptionGroup.min = min;
                            newOptionGroup.quantity = quantity;

                            // Get Option
                            var newOption = Ext.getCmp( 'Employee-Header').copyStoreToArray( optionList.getView().getStore() );
                            newOptionGroup.option = newOption;

                            // Add Record
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