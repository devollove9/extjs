/**
 * Created by devo on 8/9/2015.
 */
Ext.define( '517Employee.view.restaurant.information.restaurant.businessHour.BusinessHourController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-restaurant-information-restaurant-businessHour-controller',

    NewBusinessHour:function( button , clickEvent ) {
        var gridpanel = button.up().up();
        console.log( 'asd' );
        if ( Ext.getCmp( 'Employee-Restaurant-Information-Restaurant' ).newRestaurant == false && Ext.getCmp( 'Employee-Restaurant-Information-RestaurantList' ).getSelectionModel().hasSelection() == false ) {
            Ext.Msg.alert( 'Error' , 'Please choose a restaurant first.');
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
                                    //console.log(this.up().up().items.items[0].items.items);
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