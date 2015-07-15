/**
 * Created by Yaxin on 6/1/2015.
 */
Ext.define( '517Employee.view.restaurant.dish.DishDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-restaurant-dish-detail-controller',
    requires: [

    ],
    SaveChange: function( button , event ) {
        //console.log(button);
        //console.log(b);
        //console.log(grid);
        //console.log( grid.store.getAt(rowIndex).data.option );
        //console.log(i);
        //console.log(record_line);
        var dishList = Ext.getCmp( 'Employee-Restaurant-Dish-List' );
        var dishDetail = Ext.getCmp( 'Employee-Restaurant-Dish-Detail' );
        var option_group_list = Ext.getCmp( 'Employee-Restaurant-Dish-OptionGroupList' );
        var dishBusinessHour = Ext.getCmp( 'Employee-Restaurant-Dish-Detail-BusinessHour' );
        //.log(dishDetail);
        //console.log(option_group_list);
        var name = dishDetail.getForm().findField( 'name' ).getValue();
        var logo_web = dishDetail.getForm().findField( 'logo.web' );
        var logo_mini = dishDetail.getForm().findField( 'logo.mini' );
        var logo_phone =  dishDetail.getForm().findField( 'logo.phone' );
        var nameEn = dishDetail.getForm().findField( 'nameEn' ).getValue();
        var price = dishDetail.getForm().findField( 'price' ).getValue();
        var quantity = dishDetail.getForm().findField( 'quantity' ).getValue();
        var disabled = dishDetail.getForm().findField( 'disabled_group' ).getValue().disabled;
        var total_optionGroup_number = option_group_list.getView().getStore().getCount();

        if ( dishDetail.newDish == false ) {
            // Editing dish

            if ( name == '' || nameEn == '' || price == '' || quantity == '' ) {
                Ext.Msg.alert( 'Error' , 'Please make sure all fields are filled.' );
            } else if ( dishList.getSelectionModel().hasSelection() == false ){
                Ext.Msg.alert( 'Error' , 'Please choose a dish first.' );
            } else {
                var originRecord = dishDetail.originRecord.data;
                //console.log(originRecord);
                var changedFlag = false;
                var changedString=''; var size = 1;
                if ( originRecord.name != name ) {
                    changedString = changedString + size + '. Name: ' + originRecord.name + ' => ' + name + '<br>' ;changedFlag=true;size ++;
                }
                if ( originRecord.nameEn != nameEn ) {
                    changedString = changedString + size + '. Name En: ' + originRecord.name + ' => ' + name + '<br>' ;changedFlag=true;size ++;
                }
                if ( originRecord.price != price ) {
                    changedString = changedString + size + '. Price: ' + originRecord.price + ' => ' + price + '<br>' ;changedFlag=true;size ++;
                }
                if ( originRecord.quantity != quantity ) {
                    changedString = changedString + size + '. Quantity: ' + originRecord.price + ' => ' + price + '<br>' ;changedFlag=true;size ++;
                }
                if ( dishBusinessHour.changed == true ) {
                    for ( var i = 0 ; i < dishBusinessHour.changedString.length ; i ++ ) {
                        changedString = changedString + size + '.' + dishBusinessHour.changedString[i] + '<br>' ;size ++;
                    }
                    changedFlag=true;
                }
                if ( originRecord.information ){
                    if ( typeof originRecord.information.disabled != 'undefined' ) {
                        if ( originRecord.information.disabled != disabled ) {
                            changedString = changedString + size + '. Disabled: ' + originRecord.information.disabled + ' => ' + disabled + '<br>' ;changedFlag=true;size ++;
                        }
                    } else {
                        changedString = changedString + size + '. Disabled: undefined => ' + disabled + '<br>' ;changedFlag=true;size ++;
                    }
                } else {
                    changedFlag = true;
                    changedString = changedString + size + '. Disabled: undefined => ' + disabled + '<br>' ;changedFlag = true; size ++;
                }
                if ( option_group_list.changedFlag == true ) {
                    changedFlag = true;
                }
                if ( changedFlag == true ) {
                    Ext.Msg.show({
                        title:'Warning',
                        msg: 'Are you sure want to save the change?<br>This call will save all changes and may not revert',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn,text){
                            if ( btn == 'yes' ) {
                                dishDetail.changedFlag = true;
                                var old_record = dishList.getStore().getAt(dishList.selectedRow);
                                //console.log(old_record);
                                old_record.data.name = name;old_record.data.nameEn = nameEn;old_record.data.price = price;old_record.data.quantity = quantity;old_record.data.disabled = disabled;
                                var dishInfo = new Object();
                                if ( option_group_list.changedFlag == true && total_optionGroup_number != 0) {

                                    var new_optionGroups = [];
                                    //console.log(option_group_list.getView().getStore().data.items);
                                    for ( var i = 0 ; i < option_group_list.getView().getStore().data.items.length ; i ++ ) {
                                        var cur_optionGroup = new Object();
                                        var edited_optionGroup = option_group_list.getView().getStore().data.items[i].data;
                                        cur_optionGroup.name = edited_optionGroup.name;
                                        cur_optionGroup.nameEn = edited_optionGroup.nameEn;
                                        cur_optionGroup.max = edited_optionGroup.max;
                                        cur_optionGroup.min = edited_optionGroup.min;
                                        cur_optionGroup.quantity = edited_optionGroup.quantity;
                                        cur_optionGroup.option = edited_optionGroup.option;
                                        //cur_optionGroup.information = edited_optionGroup.information;
                                        // for ( var j = 0 ; j < edited_optionGroup.option.length ++ ; j++ ) {
                                        //    var cur_option = new Object();
                                        //    cur_option. = edited_optionGroup.option[j].
                                        //}
                                        new_optionGroups.push(cur_optionGroup);
                                    }
                                    dishInfo.optionGroup=new_optionGroups;
                                    old_record.data.optionGroup = new_optionGroups;

                                }

                                dishInfo.information = new Object();
                                dishInfo.logo = new Object();
                                if ( logo_web.file_transfered == true) {
                                    dishInfo.logo.web = logo_web.file_data;
                                } else {}
                                if ( logo_phone.file_transfered == true) {
                                    dishInfo.logo.phone = logo_web.file_data;
                                }
                                if ( logo_mini.file_transfered == true) {
                                    dishInfo.logo.mini = logo_web.file_data;
                                }
                                dishInfo.information.businessHour = [];
                                if ( dishBusinessHour.changed == true ) {

                                    dishBusinessHour.getStore().each( function( record , idx ) {
                                        var new_businessHour = new Object();
                                        //console.log(record);
                                        new_businessHour.day = record.data.day;
                                        new_businessHour.start = record.data.start;
                                        new_businessHour.end = record.data.end;
                                        dishInfo.information.businessHour.push( new_businessHour );
                                    });
                                } else {
                                    if ( originRecord.information ) {
                                        if ( originRecord.information.businessHour ) {

                                            for ( var i = 0 ; i < originRecord.information.businessHour.length ; i ++ ){
                                                var new_businessHour = new Object();
                                                //console.log(record);
                                                new_businessHour.day = originRecord.information.businessHour[i].day;
                                                new_businessHour.start = originRecord.information.businessHour[i].start;
                                                new_businessHour.end = originRecord.information.businessHour[i].end;
                                                dishInfo.information.businessHour.push( new_businessHour );
                                            }
                                        }
                                    }
                                }
                                dishInfo.storeId = old_record.data.storeId;dishInfo.regionId = old_record.data.regionId;dishInfo.itemId = old_record.data.itemId;dishInfo.categoryId = old_record.data.categoryId;
                                dishInfo.typeId = old_record.data.typeId;

                                dishInfo.name = name;
                                dishInfo.nameEn = nameEn;
                                dishInfo.price = price;
                                dishInfo.quantity = quantity;

                                dishInfo.information.disabled = disabled;
                                dishInfo = JSON.stringify( dishInfo );
                                dishDetail.postChange( dishInfo , 'update_dish' );
                                //dishList.getView().refresh();
                                //dishList.getSelectionModel().select
                            }
                        },
                        animEl: 'elId'
                    });
                }
            }
        } else {
            // Creating dish
            if ( name == '' || nameEn == '' || price == '' || quantity == '' ) {
                Ext.Msg.alert( 'Error' , 'Please make sure all fields are filled.' );
            } else {
                Ext.Msg.show({
                    title:'Warning',
                    msg: 'Are you sure want to add the dish?<br>This call will save all changes and may not revert',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn,text){
                        if ( btn == 'yes' ) {
                            var dishInfo = new Object();
                            if ( option_group_list.changedFlag == true && total_optionGroup_number != 0) {
                                var new_optionGroups = [];
                                //console.log(option_group_list.getView().getStore().data.items);
                                for ( var i = 0 ; i < option_group_list.getView().getStore().data.items.length ; i ++ ) {
                                    var cur_optionGroup = new Object();
                                    var edited_optionGroup = option_group_list.getView().getStore().data.items[i].data;
                                    cur_optionGroup.name = edited_optionGroup.name;
                                    cur_optionGroup.nameEn = edited_optionGroup.nameEn;
                                    cur_optionGroup.max = edited_optionGroup.max;
                                    cur_optionGroup.min = edited_optionGroup.min;
                                    cur_optionGroup.quantity = edited_optionGroup.quantity;
                                    cur_optionGroup.option = edited_optionGroup.option;
                                    //cur_optionGroup.information = edited_optionGroup.information;
                                    // for ( var j = 0 ; j < edited_optionGroup.option.length ++ ; j++ ) {
                                    //    var cur_option = new Object();
                                    //    cur_option. = edited_optionGroup.option[j].
                                    //}
                                    new_optionGroups.push(cur_optionGroup);
                                }
                                dishInfo.information = new Object();
                                dishInfo.information.businessHour = [];
                                dishInfo.logo = new Object();
                                if ( logo_web.file_transfered == true) {
                                    dishInfo.logo.web = logo_web.file_data;
                                } else {}
                                if ( logo_phone.file_transfered == true) {
                                    dishInfo.logo.phone = logo_web.file_data;
                                }
                                if ( logo_mini.file_transfered == true) {
                                    dishInfo.logo.mini = logo_web.file_data;
                                }
                                dishBusinessHour.getStore().each( function( record , idx ) {
                                    var new_businessHour = new Object();
                                    //console.log(record);
                                    new_businessHour.day = record.data.day;
                                    new_businessHour.start = record.data.start;
                                    new_businessHour.end = record.data.end;
                                    dishInfo.information.businessHour.push( new_businessHour );
                                });

                                dishInfo.optionGroup=new_optionGroups;
                            }
                            dishInfo.storeId = dishDetail.storeId;dishInfo.regionId = dishDetail.regionId;dishInfo.categoryId = dishDetail.categoryId;
                            dishInfo.typeId = dishDetail.typeId;//dishInfo.information = new Object();
                            dishInfo.name = name;
                            dishInfo.nameEn = nameEn;
                            dishInfo.price = price;
                            dishInfo.quantity = quantity;
                            //dishInfo.disabled = disabled;
                            dishInfo = JSON.stringify( dishInfo );
                            //console.log(this.up());
                            dishDetail.postChange( dishInfo , 'new_dish' );

                        }
                    },
                    animEl: 'elId'
                });

            }
        }
    },
    NewBusinessHour:function( button , click_event ) {
        var gridpanel = button.up().up();
        if ( Ext.getCmp( 'Employee-Restaurant-Dish-Detail' ).newDish == false && Ext.getCmp( 'Employee-Restaurant-Dish-List' ).getSelectionModel().hasSelection() == false ) {
            Ext.Msg.alert( 'Error' , 'Please choose a dish first.');
        } else if ( gridpanel.gridEditing == true ){
            Ext.Msg.alert( 'Error' , 'A window already opened, please close it first.' );
        } else {
            var businessHourStore = gridpanel.getStore();
            var win = Ext.create('Ext.window.Window', {
                extend:'Ext.form.Panel',
                title: 'New Business Hour',
                width: 450, height: 110,
                autoScroll: false, resizable: false,
                items:[
                    {
                        xtype: 'fieldset',
                        layout: 'anchor',
                        labelWidth: 0,
                        border: false, frame: false,
                        margin: '10 0 0 0',
                        items: [
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                labelWidth: 0,
                                originRecord: null,
                                padding: '0 10 0 0',
                                border: false, frame: false,
                                fieldDefaults: {
                                    labelAlign: 'right',
                                    labelWidth: 40,
                                    msgTarget: 'qtip'

                                },
                                items: [
                                    { xtype:'textfield',fieldLabel: 'Day',flex:2,value:1, enforceMaxLength: true, maxLength: '1',  maskRe: /[0-9]/, maxValue:7, minValue:0},
                                    { xtype:'textfield',fieldLabel: 'Start', flex:3, value:0, enforceMaxLength: true, maxLength: '5',  maskRe: /[0-9]/, maxValue:86400, minValue:0},
                                    { xtype:'textfield',fieldLabel: 'End', flex:3, value:86400, enforceMaxLength: true, maxLength: '5',  maskRe: /[0-9]/, maxValue:86400, minValue:0 },
                                ]
                            }
                        ]
                    },
                ],
                dockedItems:[
                    {
                        xtype:'toolbar',
                        border:'false',frame:'false',
                        dock:'bottom',
                        items:[
                            {
                                xtype: 'tbfill'
                            },
                            {
                                xtype: 'button',
                                text:  'Save',
                                width:100,
                                handler:function( field , rowIndex ) {
                                    var curwin = this.up().up();
                                    var fields=this.up().up().items.items[0].items.items[0].items.items;
                                    var day = fields[0].getValue();
                                    var start = fields[1].getValue();
                                    var end = fields[2].getValue();
                                    if ( day > 7 || day < 1) Ext.Msg.alert( 'Error' , 'Day must be in 1 - 7 ' );
                                    else if ( start > 86400 || end > 86400 || start < 0 || end < 0 ) Ext.Msg.alert( 'Error' , 'Start/End must be in range 0 - 86400 ' );
                                    else if ( start > end ) Ext.Msg.alert( 'Error' , 'Start must be smaller or equal to End' );
                                    else {
                                        Ext.Msg.show({
                                            title:'Add Business Hour?',
                                            msg: 'You will add business hour: <br/>  Day: '+ day + ' Start: ' + start + ' End: ' + end + ' <br/>Would you like to add the business hour?',
                                            buttons: Ext.Msg.YESNO,
                                            fn: function(btn,text){
                                                if ( btn == 'yes' ) {
                                                    var new_business_hour = new Object();
                                                    new_business_hour.day =day;
                                                    new_business_hour.start =start;
                                                    new_business_hour.end =end;
                                                    businessHourStore.add( new_business_hour );
                                                    gridpanel.changed = true;
                                                    gridpanel.changedString.push('Added: Day:' + day + ' Start:' + start +' End:' + end);
                                                    curwin.close();
                                                    gridpanel.refresh();
                                                }
                                            },
                                            animEl: 'elId'
                                        });
                                    }
                                }
                            },
                            {
                                xtype:'tbfill'
                            }
                        ]
                    },
                ],
                listeners:{
                    'close':function( win ) {
                        gridpanel.gridEditing = false;
                    }
                }

            });
            gridpanel.addOpenedWindow( win );
            win.show();
        }
    },
    EditBusinessHour:function( grid , rowIdx , colIdx , edit_col , click_event , record_line , tr ) {
        var gridpanel = grid.up()

        if ( gridpanel.gridEditing == true ){
            Ext.Msg.alert( 'Error' , 'A window already opened, please close it first.' );
        } else {
            var win = Ext.create('Ext.window.Window', {
                extend: 'Ext.form.Panel',
                title: 'Edit Business Hour - at row ' + ( rowIdx + 1 ),
                width: 450, height: 110,
                autoScroll: false, resizable: false,
                items: [
                    {
                        xtype: 'fieldset',
                        layout: 'anchor',
                        labelWidth: 0,
                        border: false, frame: false,
                        margin: '10 0 0 0',
                        items: [
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                labelWidth: 0,
                                originRecord: null,
                                padding: '0 10 0 0',
                                border: false, frame: false,
                                fieldDefaults: {
                                    labelAlign: 'right',
                                    labelWidth: 40,
                                    msgTarget: 'qtip'

                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Day',
                                        flex: 2,
                                        value: record_line.data.day,
                                        enforceMaxLength: true,
                                        maxLength: '1',
                                        maskRe: /[0-9]/,
                                        maxValue: 7,
                                        minValue: 0
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Start',
                                        flex: 3,
                                        value: record_line.data.start,
                                        enforceMaxLength: true,
                                        maxLength: '5',
                                        maskRe: /[0-9]/,
                                        maxValue: 86400,
                                        minValue: 0
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'End',
                                        flex: 3,
                                        value: record_line.data.end,
                                        enforceMaxLength: true,
                                        maxLength: '5',
                                        maskRe: /[0-9]/,
                                        maxValue: 86400,
                                        minValue: 0
                                    },
                                ]
                            }
                        ]
                    },
                ],
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        border: 'false', frame: 'false',
                        dock: 'bottom',
                        items: [
                            {
                                xtype: 'tbfill'
                            },
                            {
                                xtype: 'button',
                                text: 'Save',
                                width: 100,
                                handler: function (field, rowIndex) {
                                    //console.log(this.up().up().items.items[0].items.items);
                                    var curwin = this.up().up();
                                    var fields = this.up().up().items.items[0].items.items[0].items.items;
                                    var day = fields[0].getValue();
                                    var start = fields[1].getValue();
                                    var end = fields[2].getValue();
                                    if (day > 7 || day < 1) Ext.Msg.alert('Error', 'Day must be in 1 - 7 ');
                                    else if (start > 86400 || end > 86400 || start < 0 || end < 0) Ext.Msg.alert('Error', 'Start/End must be in range 0 - 86400 ');
                                    else if (start > end) Ext.Msg.alert('Error', 'Start must be smaller or equal to End');
                                    else if (record_line.data.day != day || record_line.data.start != start || record_line.data.end != end) {
                                        Ext.Msg.show({
                                            title: 'Save Business Hour?',
                                            msg: 'You will change business hour to : <br/>  Day: ' + day + ' Start: ' + start + ' End: ' + end + ' <br/>Would you like to save the change?',
                                            buttons: Ext.Msg.YESNO,
                                            fn: function (btn, text) {
                                                if (btn == 'yes') {

                                                    record_line.data.day = day;
                                                    record_line.data.start = start;
                                                    record_line.data.end = end;
                                                    grid.up().changed = true;
                                                    grid.up().changedString.push('Edited: Day:' + day + ' Start:' + start + ' End:' + end);
                                                    curwin.close();
                                                    grid.refresh();
                                                }
                                            },
                                            animEl: 'elId'
                                        });
                                    } else {
                                        curwin.close();
                                    }
                                    //console.log(this.up().items.items.indexOf(1));
                                    //console.log(this.up().items.items.indexOf(2).value);
                                }
                            },
                            {
                                xtype: 'tbfill'
                            }
                        ]

                    },
                ],
                listeners:{
                    'close':function( win ) {
                        gridpanel.gridEditing = false;
                    }
                }

            });
            gridpanel.addOpenedWindow( win );
            win.show();
        }
    },
    DeleteBusinessHour:function( grid , rowIdx , colIdx , edit_col , click_event , record_line , tr ) {
        Ext.Msg.show({
            title:'Delete Business Hour?',
            msg: 'You will delete business hour : <br/>  Day: '+ record_line.data.day + ' Start: ' + record_line.data.start + ' End: ' + record_line.data.end + ' <br/>Would you like to save the change?',
            buttons: Ext.Msg.YESNO,
            fn: function(btn,text){
                if ( btn == 'yes' ) {
                    grid.up().changed = true;
                    grid.up().changedString.push('Removed: Day:' + record_line.data.day + ' Start:' + record_line.data.start +' End:' + record_line.data.end);
                    grid.up().getStore().removeAt(rowIdx);
                    grid.refresh();
                }
            },
            animEl: 'elId'
        });
    }

});
