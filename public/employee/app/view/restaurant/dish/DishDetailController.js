/**
 * Created by Yaxin on 6/1/2015.
 */
Ext.define( '517Employee.view.restaurant.dish.DishDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-restaurant-dish-detail-controller',
    requires: [

    ],
    SaveChange: function( button , event ) {
        ////console.log(button);
        ////console.log(b);
        ////console.log(grid);
        ////console.log( grid.store.getAt(rowIndex).data.option );
        ////console.log(i);
        ////console.log(recordLine);
        var dishList = Ext.getCmp( 'Employee-Restaurant-Dish-List' );
        var dishDetail = Ext.getCmp( 'Employee-Restaurant-Dish-Detail' );
        var optionGroupList = Ext.getCmp( 'Employee-Restaurant-Dish-OptionGroupList' );
        var dishBusinessHour = Ext.getCmp( 'Employee-Restaurant-Dish-Detail-BusinessHour' );
        //.log(dishDetail);
        ////console.log(optionGroupList);
        var name = dishDetail.getForm().findField( 'name' ).getValue();
        var logoWeb = dishDetail.getForm().findField( 'logo.web' );
        var logoMini = dishDetail.getForm().findField( 'logo.mini' );
        var logoPhone =  dishDetail.getForm().findField( 'logo.phone' );
        var nameEn = dishDetail.getForm().findField( 'nameEn' ).getValue();
        var price = dishDetail.getForm().findField( 'price' ).getValue();
        var quantity = dishDetail.getForm().findField( 'quantity' ).getValue();
        var disabled = dishDetail.getForm().findField( 'disabledGroup' ).getValue().disabled;
        var totalOptionGroupNumber = optionGroupList.getView().getStore().getCount();

        if ( dishDetail.newDish == false ) {
            // Editing dish

            if ( name == '' || nameEn == '' || price == '' || quantity == '' ) {
                Ext.Msg.alert( 'Error' , 'Please make sure all fields are filled.' );
            } else if ( dishList.getSelectionModel().hasSelection() == false ){
                Ext.Msg.alert( 'Error' , 'Please choose a dish first.' );
            } else {
                var originRecord = dishDetail.originRecord.data;
                ////console.log(originRecord);
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
                if ( originRecord.information ) {
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
                if ( optionGroupList.changedFlag == true ) {
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
                                ////console.log(old_record);
                                old_record.data.name = name;old_record.data.nameEn = nameEn;old_record.data.price = price;old_record.data.quantity = quantity;old_record.data.disabled = disabled;
                                var dishInfo = new Object();
                                if ( optionGroupList.changedFlag == true && totalOptionGroupNumber != 0) {

                                    var newOptionGroups = [];
                                    ////console.log(optionGroupList.getView().getStore().data.items);
                                    for ( var i = 0 ; i < optionGroupList.getView().getStore().data.items.length ; i ++ ) {
                                        var curOptionGroup = new Object();
                                        var editedOptionGroup = optionGroupList.getView().getStore().data.items[i].data;
                                        curOptionGroup.name = editedOptionGroup.name;
                                        curOptionGroup.nameEn = editedOptionGroup.nameEn;
                                        curOptionGroup.max = editedOptionGroup.max;
                                        curOptionGroup.min = editedOptionGroup.min;
                                        curOptionGroup.quantity = editedOptionGroup.quantity;
                                        if ( editedOptionGroup.information ) curOptionGroup.information = editedOptionGroup.information;
                                        curOptionGroup.option = editedOptionGroup.option;

                                        //curOptionGroup.information = editedOptionGroup.information;
                                        // for ( var j = 0 ; j < editedOptionGroup.option.length ++ ; j++ ) {
                                        //    var curOption = new Object();
                                        //    curOption. = editedOptionGroup.option[j].
                                        //}
                                        newOptionGroups.push(curOptionGroup);
                                    }
                                    dishInfo.optionGroup=newOptionGroups;
                                    old_record.data.optionGroup = newOptionGroups;

                                }

                                dishInfo.information = new Object();
                                dishInfo.logo = new Object();
                                if ( logoWeb.fileTransfered == true) {
                                    dishInfo.logo.web = logoWeb.fileData;
                                } else {}
                                if ( logoPhone.fileTransfered == true) {
                                    dishInfo.logo.phone = logoWeb.fileData;
                                }
                                if ( logoMini.fileTransfered == true) {
                                    dishInfo.logo.mini = logoWeb.fileData;
                                }
                                dishInfo.information.businessHour = [];
                                if ( dishBusinessHour.changed == true ) {

                                    dishBusinessHour.getStore().each( function( record , idx ) {
                                        var newBusinessHour = new Object();
                                        ////console.log(record);
                                        newBusinessHour.day = record.data.day;
                                        newBusinessHour.start = record.data.start;
                                        newBusinessHour.end = record.data.end;
                                        dishInfo.information.businessHour.push( newBusinessHour );
                                    });
                                } else {
                                    if ( originRecord.information ) {
                                        if ( originRecord.information.businessHour ) {

                                            for ( var i = 0 ; i < originRecord.information.businessHour.length ; i ++ ){
                                                var newBusinessHour = new Object();
                                                ////console.log(record);
                                                newBusinessHour.day = originRecord.information.businessHour[i].day;
                                                newBusinessHour.start = originRecord.information.businessHour[i].start;
                                                newBusinessHour.end = originRecord.information.businessHour[i].end;
                                                dishInfo.information.businessHour.push( newBusinessHour );
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
                                dishDetail.postChange( dishInfo , 'put' );
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
                            if ( totalOptionGroupNumber != 0 ) {
                                var newOptionGroups = [];
                                ////console.log(optionGroupList.getView().getStore().data.items);
                                for ( var i = 0 ; i < optionGroupList.getView().getStore().data.items.length ; i ++ ) {
                                    var curOptionGroup = new Object();
                                    var editedOptionGroup = optionGroupList.getView().getStore().data.items[i].data;
                                    curOptionGroup.name = editedOptionGroup.name;
                                    curOptionGroup.nameEn = editedOptionGroup.nameEn;
                                    curOptionGroup.max = editedOptionGroup.max;
                                    curOptionGroup.min = editedOptionGroup.min;
                                    curOptionGroup.quantity = editedOptionGroup.quantity;
                                    curOptionGroup.option = editedOptionGroup.option;
                                    curOptionGroup.information = editedOptionGroup.information;
                                    // for ( var j = 0 ; j < editedOptionGroup.option.length ++ ; j++ ) {
                                    //    var curOption = new Object();
                                    //    curOption. = editedOptionGroup.option[j].
                                    //}
                                    newOptionGroups.push(curOptionGroup);
                                }
                                dishInfo.optionGroup = newOptionGroups;
                            }
                            dishInfo.logo = new Object();
                            dishInfo.logo.web = '';
                            dishInfo.logo.phone = '';
                            dishInfo.logo.mini = '';
                            if ( logoWeb.fileTransfered == true) {
                                dishInfo.logo.web = logoWeb.fileData;
                            } else {}
                            if ( logoPhone.fileTransfered == true) {
                                dishInfo.logo.phone = logoWeb.fileData;
                            }
                            if ( logoMini.fileTransfered == true) {
                                dishInfo.logo.mini = logoWeb.fileData;
                            }
                            dishInfo.information = new Object();
                            dishInfo.information.businessHour = [];
                            dishInfo.information.disabled = disabled;
                            dishBusinessHour.getStore().each( function( record , idx ) {
                                var newBusinessHour = new Object();
                                ////console.log(record);
                                newBusinessHour.day = record.data.day;
                                newBusinessHour.start = record.data.start;
                                newBusinessHour.end = record.data.end;
                                dishInfo.information.businessHour.push( newBusinessHour );
                            });

                            
                            dishInfo.storeId = dishDetail.storeId;dishInfo.regionId = dishDetail.regionId;dishInfo.categoryId = dishDetail.categoryId;
                            dishInfo.typeId = dishDetail.typeId;//dishInfo.information = new Object();
                            dishInfo.name = name;
                            dishInfo.nameEn = nameEn;
                            dishInfo.price = price;
                            dishInfo.quantity = quantity;
                            
             
                            dishInfo = JSON.stringify( dishInfo );
                            ////console.log(this.up());
                            dishDetail.postChange( dishInfo , 'post' );

                        }
                    },
                    animEl: 'elId'
                });

            }
        }
    },
    NewBusinessHour:function( button , clickEvent ) {
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
                                                    var newBusiness_hour = new Object();
                                                    newBusiness_hour.day =day;
                                                    newBusiness_hour.start =start;
                                                    newBusiness_hour.end =end;
                                                    businessHourStore.add( newBusiness_hour );
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
    EditBusinessHour:function( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine , tr ) {
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
                                        value: recordLine.data.day,
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
                                        value: recordLine.data.start,
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
                                        value: recordLine.data.end,
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
                                    ////console.log(this.up().up().items.items[0].items.items);
                                    var curwin = this.up().up();
                                    var fields = this.up().up().items.items[0].items.items[0].items.items;
                                    var day = fields[0].getValue();
                                    var start = fields[1].getValue();
                                    var end = fields[2].getValue();
                                    if (day > 7 || day < 1) Ext.Msg.alert('Error', 'Day must be in 1 - 7 ');
                                    else if (start > 86400 || end > 86400 || start < 0 || end < 0) Ext.Msg.alert('Error', 'Start/End must be in range 0 - 86400 ');
                                    else if (start > end) Ext.Msg.alert('Error', 'Start must be smaller or equal to End');
                                    else if (recordLine.data.day != day || recordLine.data.start != start || recordLine.data.end != end) {
                                        Ext.Msg.show({
                                            title: 'Save Business Hour?',
                                            msg: 'You will change business hour to : <br/>  Day: ' + day + ' Start: ' + start + ' End: ' + end + ' <br/>Would you like to save the change?',
                                            buttons: Ext.Msg.YESNO,
                                            fn: function (btn, text) {
                                                if (btn == 'yes') {

                                                    recordLine.data.day = day;
                                                    recordLine.data.start = start;
                                                    recordLine.data.end = end;
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
                                    ////console.log(this.up().items.items.indexOf(1));
                                    ////console.log(this.up().items.items.indexOf(2).value);
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
    DeleteBusinessHour:function( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine , tr ) {
        Ext.Msg.show({
            title:'Delete Business Hour?',
            msg: 'You will delete business hour : <br/>  Day: '+ recordLine.data.day + ' Start: ' + recordLine.data.start + ' End: ' + recordLine.data.end + ' <br/>Would you like to save the change?',
            buttons: Ext.Msg.YESNO,
            fn: function(btn,text){
                if ( btn == 'yes' ) {
                    grid.up().changed = true;
                    grid.up().changedString.push('Removed: Day:' + recordLine.data.day + ' Start:' + recordLine.data.start +' End:' + recordLine.data.end);
                    grid.up().getStore().removeAt(rowIdx);
                    grid.refresh();
                }
            },
            animEl: 'elId'
        });
    }

});
