/**
 * Created by Yaxin on 6/8/2015.
 */
Ext.define( '517Employee.view.restaurant.dish.DishOptionDetailController' , {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-restaurant-dish-optionDetail-controller',
    requires: [

    ],
    SaveChanges:function( button ) {
        // Check changes

        var optionDetail = button.up().up();
        var optionList_cmp = button.up().up().up().items.items[0];
        var optionList = button.up().up().up().items.items[0].getView();
        var name = optionDetail.getForm().findField( 'name' ).getValue();
        var nameEn = optionDetail.getForm().findField( 'nameEn' ).getValue();
        var price = optionDetail.getForm().findField( 'price' ).getValue();
        var quantity = optionDetail.getForm().findField( 'quantity' ).getValue();
        var disabled = optionDetail.getForm().findField( 'disabled_group' ).getValue().disabled;
        if ( optionDetail.currentMethod == 'saving' ) {

            var changedFlag = false;
            var changedString = '';
            var size = 1;


            var selectedRow = optionDetail.getForm().findField('selectedRow').getValue();
            console.log(selectedRow);
            if ( selectedRow >= 0 && ( name == '' || nameEn == '' || price == '' || quantity == '' ) ){
                Ext.Msg.alert( 'Error' , 'Please fill all fields.' );
            } else {
                optionList.getStore().each(function(record, idx) {

                    if ( idx == selectedRow ) {
                        console.log(idx);
                        if ( record.data.name != name ) {
                            changedFlag = true;
                        }
                        if ( record.data.nameEn != nameEn ) {
                            changedFlag = true;
                        }
                        if ( record.data.price != price ) {
                            changedFlag = true;
                        }
                        if ( record.data.quantity != quantity ) {
                            changedFlag = true;
                        }
                        if ( record.data.inforamtion ) {
                            if ( typeof record.data.information.disabled != 'undefined') {
                                if ( record.data.information.disabled != disabled) {
                                    changedFlag = true;
                                }
                            }
                        } else {
                            changedFlag = true;
                        }
                    }
                });
                if ( changedFlag == true ) {
                    Ext.Msg.show({
                        title:'Warning',
                        msg: 'You will save changes to local.<br>Are you sure want to save the change?<br>(you will need to click save on Dish detail page to post to database)',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn,text){
                            if ( btn == 'yes' ) {
                                optionList_cmp.changedFlag = true;
                                optionList.getStore().each(function(record, idx) {
                                    if ( idx == selectedRow ) {
                                        record.data.changedString = '';
                                        if ( record.data.name != name ) {
                                            record.data.name = name;
                                            record.data.changedString = record.data.changedString + '  ' + size + '. "' + record.data.name + '" => "' + name + '".<br>';
                                        }
                                        if ( record.data.nameEn != nameEn ) {
                                            record.data.nameEn = nameEn;
                                            record.data.changedString = record.data.changedString + '  ' + size + '. "' + record.data.nameEn + '" => "' + nameEn + '".<br>';
                                        }
                                        if ( record.data.price != price ) {
                                            record.data.price = price;
                                            record.data.changedString = record.data.changedString + '  ' + size + '. "' + record.data.price + '" => "' + price + '".<br>';
                                        }
                                        if ( record.data.quantity != quantity ) {
                                            record.data.quantity = quantity;
                                            record.data.changedString = record.data.changedString + '  ' + size + '. "' + record.data.quantity + '" => "' + quantity + '".<br>';
                                        }
                                        if ( record.data.inforamtion ) {
                                            if ( typeof record.data.information.disabled != 'undefined') {
                                                if ( record.data.information.disabled != disabled) {
                                                    record.data.information.disabled = disabled;
                                                }
                                            }
                                        } else {
                                            var information = new Object();

                                            //information.disabled = disabled;
                                            //record.data.information = information;

                                            //if ( disabled == 0 ) {

                                            //    record.data.information.disabled = false;
                                            //}
                                            //if ( disabled == 1 ) {
                                            //    record.data.information.disabled = true;
                                            //}

                                            record.data.changedString = record.data.changedString + '  ' + size + '. "' + record.data.information.disabled + '".<br>';

                                        }
                                    }
                                });
                                optionList.refresh();
                            }
                        },
                        animEl: 'elId'
                    });
                }
            }
            //
        }
        if ( optionDetail.currentMethod == 'adding' ) {

            if ( name == '' || nameEn == '' || price == '' || quantity == '' ) {
                Ext.Msg.alert( 'Error' , 'Please fill all fields.' );
            } else {
                var cur_option = {
                    name:name,
                    nameEn:nameEn,
                    price:price,
                    quantity:quantity,
                    disabled:disabled
                }
                Ext.Msg.show({
                    title:'Warning',
                    msg: 'You will all new option to local.<br>Are you sure want to add the option?<br>(you will need to click save on Dish detail page to post to database)',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn,text){
                        if ( btn == 'yes' ) {
                            optionList_cmp.changedFlag = true;
                            optionList.getStore().add( cur_option );
                            optionList.refresh();
                        }
                    },
                    animEl: 'elId'
                });
            }
            optionDetail.resetAll();
        }
    }

});