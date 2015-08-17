/**
 * Created by devo on 8/9/2015.
 */
/**
 * Created by devo on 8/9/2015.
 */
Ext.define( '517Employee.view.restaurant.information.restaurant.announcement.AnnouncementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-restaurant-information-restaurant-announcement-controller',

    NewAnnouncementEn:function( button , clickEvent ) {
        var gridpanel = button.up().up();
        //console.log( 'asd' );
        if ( Ext.getCmp( 'Employee-Restaurant-Information-Restaurant' ).newRestaurant == false && Ext.getCmp( 'Employee-Restaurant-Information-RestaurantList' ).getSelectionModel().hasSelection() == false ) {
            Ext.Msg.alert( 'Error' , 'Please choose a restaurant first.');
        } else if ( gridpanel.gridEditing == true ){
            Ext.Msg.alert( 'Error' , 'A window already opened, please close it first.' );
        } else {
            var announcementEnStore = gridpanel.getStore();
            var win = Ext.create('Ext.window.Window', {
                extend:'Ext.form.Panel',
                title: 'New English Announcement',
                width: 800, height: 110,
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
                                    labelWidth: 90,
                                    msgTarget: 'qtip'

                                },
                                items: [
                                    { xtype:'textfield',fieldLabel: 'Announcement',flex:2}
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
                                    var announcementEn = fields[0].getValue();
                                    Ext.Msg.show({
                                        title:'Add English Announcement?',
                                        msg: 'You will add english announcement: <br/>'+ announcementEn +'<br/> Would you like to add the announcement?',
                                        buttons: Ext.Msg.YESNO,
                                        fn: function(btn,text){
                                            if ( btn == 'yes' ) {
                                                var announcementEnNew = {};
                                                announcementEnNew.announcementEn = announcementEn;
                                                announcementEnStore.add( announcementEnNew );
                                                gridpanel.changed = true;
                                                gridpanel.changedString.push('Added:' + announcementEn );
                                                curwin.close();
                                                gridpanel.getView().refresh();
                                            }
                                        },
                                        animEl: 'elId'
                                    });
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
    EditAnnouncementEn:function( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine , tr ) {
        var gridpanel = grid.up()

        if ( gridpanel.gridEditing == true ){
            Ext.Msg.alert( 'Error' , 'A window already opened, please close it first.' );
        } else {
            var win = Ext.create('Ext.window.Window', {
                extend: 'Ext.form.Panel',
                title: 'Edit English Announcement - at row ' + ( rowIdx + 1 ),
                width: 800, height: 110,
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
                                    labelWidth: 90,
                                    msgTarget: 'qtip'

                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Announcement',
                                        flex: 2,
                                        value: recordLine.data.announcementEn,
                                    }
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
                                    var curwin = this.up().up();
                                    var fields=this.up().up().items.items[0].items.items[0].items.items;
                                    var announcementEn = fields[0].getValue();
                                    Ext.Msg.show({
                                        title:'Save Announcement?',
                                        msg: 'You will Save announcement: <br/>'+ announcementEn +'<br/> Would you like to save the announcement?',
                                        buttons: Ext.Msg.YESNO,
                                        fn: function(btn,text){
                                            if ( btn == 'yes' ) {
                                                recordLine.data.announcementEn = announcementEn;
                                                gridpanel.changed = true;
                                                gridpanel.changedString.push('Edited:' + announcementEn );
                                                curwin.close();
                                                gridpanel.getView().refresh();
                                            }
                                        },
                                        animEl: 'elId'
                                    });
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
    DeleteAnnouncementEn:function( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine , tr ) {
        Ext.Msg.show({
            title:'Delete English Announcement?',
            msg: 'You will delete announcement : <br/>' +  recordLine.data.announcementEn + '<br/>Would you like to save the change?',
            buttons: Ext.Msg.YESNO,
            fn: function(btn,text){
                if ( btn == 'yes' ) {
                    grid.up().changed = true;
                    grid.up().changedString.push('Removed: Announcement:' + recordLine.data.announcementEn );
                    grid.up().getStore().removeAt( rowIdx );
                    grid.refresh();
                }
            },
            animEl: 'elId'
        });
    },
    NewAnnouncement:function( button , clickEvent ) {
        var gridpanel = button.up().up();
        //console.log( 'asd' );
        if ( Ext.getCmp( 'Employee-Restaurant-Information-Restaurant' ).newRestaurant == false && Ext.getCmp( 'Employee-Restaurant-Information-RestaurantList' ).getSelectionModel().hasSelection() == false ) {
            Ext.Msg.alert( 'Error' , 'Please choose a restaurant first.');
        } else if ( gridpanel.gridEditing == true ){
            Ext.Msg.alert( 'Error' , 'A window already opened, please close it first.' );
        } else {
            var announcementStore = gridpanel.getStore();
            var win = Ext.create('Ext.window.Window', {
                extend:'Ext.form.Panel',
                title: 'New Announcement',
                width: 800, height: 110,
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
                                    labelWidth: 90,
                                    msgTarget: 'qtip'

                                },
                                items: [
                                    { xtype:'textfield',fieldLabel: 'Announcement',flex:2}
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
                                    var announcement = fields[0].getValue();
                                    Ext.Msg.show({
                                        title:'Add Announcement?',
                                        msg: 'You will add announcement: <br/>'+ announcement +'<br/> Would you like to add the announcement?',
                                        buttons: Ext.Msg.YESNO,
                                        fn: function(btn,text){
                                            if ( btn == 'yes' ) {
                                                var announcementNew = {};
                                                announcementNew.announcement = announcement;
                                                announcementStore.add( announcementNew );
                                                gridpanel.changed = true;
                                                gridpanel.changedString.push('Added:' + announcement );
                                                curwin.close();
                                                gridpanel.getView().refresh();
                                            }
                                        },
                                        animEl: 'elId'
                                    });
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
    EditAnnouncement:function( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine , tr ) {
        var gridpanel = grid.up()

        if ( gridpanel.gridEditing == true ){
            Ext.Msg.alert( 'Error' , 'A window already opened, please close it first.' );
        } else {
            var win = Ext.create('Ext.window.Window', {
                extend: 'Ext.form.Panel',
                title: 'Edit Announcement - at row ' + ( rowIdx + 1 ),
                width: 800, height: 110,
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
                                    labelWidth: 90,
                                    msgTarget: 'qtip'

                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Announcement',
                                        flex: 2,
                                        value: recordLine.data.announcement,
                                    }
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
                                    var curwin = this.up().up();
                                    var fields=this.up().up().items.items[0].items.items[0].items.items;
                                    var announcement = fields[0].getValue();
                                    Ext.Msg.show({
                                        title:'Save Announcement?',
                                        msg: 'You will Save announcement: <br/>'+ announcement +'<br/> Would you like to save the announcement?',
                                        buttons: Ext.Msg.YESNO,
                                        fn: function(btn,text){
                                            if ( btn == 'yes' ) {
                                                recordLine.data.announcement = announcement;
                                                gridpanel.changed = true;
                                                gridpanel.changedString.push('Edited:' + announcement );
                                                curwin.close();
                                                gridpanel.getView().refresh();
                                            }
                                        },
                                        animEl: 'elId'
                                    });
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
    DeleteAnnouncement:function( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine , tr ) {
        Ext.Msg.show({
            title:'Delete Announcement?',
            msg: 'You will delete announcement : <br/>' +  recordLine.data +'<br/>Would you like to save the change?',
            buttons: Ext.Msg.YESNO,
            fn: function(btn,text){
                if ( btn == 'yes' ) {
                    grid.up().changed = true;
                    grid.up().changedString.push('Removed: Announcement:' + recordLine.data.announcementEn );
                    grid.up().getStore().removeAt( rowIdx );
                    grid.refresh();
                }
            },
            animEl: 'elId'
        });
    }

});