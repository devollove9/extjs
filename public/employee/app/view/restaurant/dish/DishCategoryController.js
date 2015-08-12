/**
 * Created by Yaxin on 5/31/2015.
 */
Ext.define( '517Employee.view.restaurant.dish.DishCategoryController' , {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-restaurant-dish-category-controller',
    requires: [

    ],

    NewCategory:function( grid , rowIdx , columnIdx , buttonIcon , clickEvent , recordLine , tr ) {
        if ( ! Ext.getCmp( 'Employee-Restaurant-Dish-RestaurantList' ).getSelectionModel().hasSelection() ) {
            Ext.Msg.alert( 'Error' , ' No Restaurant Select.' );
        } else {
            this.CreateNewWindow( Ext.getCmp( 'Employee-Restaurant-Dish-RestaurantList' ).getSelectionModel().getSelection()[ 0 ].data );
        }
    },

    EditCategory:function( grid , rowIdx , columnIdx , buttonIcon , clickEvent , recordLine , tr ) {
        this.CreateWindow( recordLine );
    },

    DeleteCategory:function(){
        Ext.Msg.alert( "Warning" , "Api 暂时没有 '删除 Dish Category' 功能" );

    },

    CreateWindow: function( record ) {
        if ( Ext.getCmp( 'Employee-Restaurant-Dish-Category' ).gridEditing == true ) {
            Ext.Msg.alert( 'Error' , ' A window already opened, please close it first.' );
        } else {
            Ext.getCmp( 'Employee-Restaurant-Dish-Category' ).gridEditing = true;
            var radioItems = [
                {
                    checked: true,
                    boxLabel: 'False',
                    name: 'disabled',
                    inputValue: false
                },
                {
                    boxLabel: 'True',
                    name: 'disabled',
                    inputValue: true
                }
            ];
            if ( record.data.information ) {
                if ( record.data.information.disabled == true) {
                    var radioItems = [
                        {
                            boxLabel: 'False',
                            name: 'disabled',
                            inputValue: false
                        },
                        {
                            checked: true,
                            boxLabel: 'True',
                            name: 'disabled',
                            inputValue: true
                        }
                    ];
                }
            }
            var defaultBusinessHour = [
                {start:0,end:86400,day:1},
                {start:0,end:86400,day:2},
                {start:0,end:86400,day:3},
                {start:0,end:86400,day:4},
                {start:0,end:86400,day:5},
                {start:0,end:86400,day:6},
                {start:0,end:86400,day:7}
            ];
            var categoryBusinessHourStore = Ext.create( '517Employee.store.restaurant.dish.category.businessHour' );
            //console.log( record.data.information.businessHour );
            if ( record.data.information ) {
                if ( record.data.information.businessHour ) {
                    categoryBusinessHourStore.add( record.data.information.businessHour );
                } else {
                    categoryBusinessHourStore.add( defaultBusinessHour );
                }
                var rangeIdx = 999;
                if ( record.data.information.rangeIndex1 ) {
                    rangeIdx = record.data.information.rangeIndex1;
                }
            } else {
                categoryBusinessHourStore.add( defaultBusinessHour );
            }

            var win = Ext.create('Ext.window.Window', {
                extend:'Ext.form.Panel',
                xtype: 'employee-restaurant-dish-category-window',
                title: 'Dish Category - ' + record.data.name + '(' + record.data.nameEn + ')',
                layout:'fit',
                width:500 , minWidth:400 , maxWidth:500 ,
                height:470 , minHeight:470 , maxHeight:470 ,
                autoScroll:false , resizable:true ,
                shadow:true , shadowOffset:10 ,
                gridEditing: false,
                windowPopUp:[],
                items: [
                    {
                        xtype: 'fieldset',
                        layout: 'anchor',
                        border: false ,frame: false ,
                        margin: '10 10 10 10',
                        defaultType: 'textfield',
                        defaults:{
                            lableWdith: 100,
                            margin: '5 0 5 0',
                            anchor: '100%'
                        },
                        items: [
                            {
                                xtype: 'hiddenfield',
                                itemId:'categoryId',
                                value:record.data.categoryId
                            },
                            {
                                xtype: 'hiddenfield',
                                itemId:'storeId',
                                value:record.data.storeId
                            },
                            {
                                xtype: 'hiddenfield',
                                itemId:'regionId',
                                value:record.data.regionId
                            },
                            {
                                xtype: 'radiogroup',
                                margin:0,
                                fieldLabel: 'Disabled',
                                itemId:'isDisabled',
                                defaults:{
                                    labelWidth:0
                                },
                                items: radioItems
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Name',
                                itemId:'name',
                                value:record.data.name
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'English Name',
                                itemId:'nameEn',
                                value:record.data.nameEn
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Range Index',value:rangeIdx,
                                itemId:'rangeIndex1',enforceMaxLength: true, maxLength: '4',  maskRe: /[0-9]/, maxValue:1000, minValue:0
                            },
                            {
                                xtype: 'gridpanel',
                                requires: [
                                    '517Employee.view.restaurant.dish.DishCategoryController'
                                ],
                                store:categoryBusinessHourStore,
                                localstoreId:categoryBusinessHourStore.id,
                                frame:true , columnLines:true , border:true ,
                                changed:false ,changedString:[] ,
                                height:240 , minHeight:70 , maxHeight: 240 , autoScroll:true ,
                                controller: 'employee-restaurant-dish-category-controller',
                                dockedItems: [
                                    {
                                        dock: 'top',
                                        xtype: 'toolbar',
                                        items: [
                                            'Business Hour',
                                            {
                                                xtype: 'tbfill'
                                            },
                                            {
                                                xtype: 'button',
                                                iconCls: 'fa fa-plus',
                                                text: 'New',
                                                handler:'NewBusinessHour'
                                            }
                                        ]
                                    }
                                ],
                                columns:[
                                    {
                                        text     : 'Day',
                                        flex     : 1,
                                        sortable : false,
                                        dataIndex: 'day'
                                    },
                                    {
                                        text     : 'Start',
                                        flex     : 2,
                                        sortable : false,
                                        dataIndex: 'start',
                                        renderer: function(val) {
                                            var Hour= Math.floor(val / 3600);
                                            if (Hour < 10) Hour = '0' + Hour;
                                            var Minutes = Math.floor(( val % 3600 ) / 60) ;
                                            if (Minutes < 10) Minutes = '0' + Minutes;
                                            var time = Hour + ":" + Minutes
                                            return time;
                                        }
                                    },
                                    {
                                        text     : 'End',
                                        flex     : 2,
                                        sortable : false,
                                        dataIndex: 'end',
                                        renderer: function(val) {
                                            var Hour= Math.floor(val / 3600);
                                            if (Hour < 10) Hour = '0' + Hour;
                                            var Minutes = Math.floor(( val % 3600 ) / 60) ;
                                            if (Minutes < 10) Minutes = '0' + Minutes;
                                            var time = Hour + ":" + Minutes
                                            return time;
                                        }
                                    },
                                    {
                                        menuDisabled: true,
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 45,

                                        items: [
                                            {
                                                iconCls: 'edit-col',
                                                tooltip: 'Check/Edit BusinessHour',
                                                handler: 'EditBusinessHour'
                                            },
                                            {
                                                iconCls:'delete-col',
                                                tooltip:'Delete BusinessHour',
                                                handler:'DeleteBusinessHour'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                text:  'Confirm Save',
                                anchor: '100%',
                                height: 50,
                                handler:function( field , rowIndex ) {
                                    var businessHourPanel = this.up().items.items[ this.up().items.items.length - 2 ];
                                    var curwin = this.up().getId();
                                    var curWindow = this.up('.window');
                                    var name = Ext.getCmp(curwin).getComponent('name').getValue();
                                    var nameEn = Ext.getCmp(curwin).getComponent('nameEn').getValue();
                                    var regionId = Ext.getCmp(curwin).getComponent('regionId').getValue();
                                    var storeId = Ext.getCmp(curwin).getComponent('storeId').getValue();
                                    var rangeIndex = Ext.getCmp(curwin).getComponent('rangeIndex1').getValue();
                                    var disabled = Ext.getCmp(curwin).getComponent("isDisabled").getValue().disabled;
                                    //if ( disabled == 'true' ) disabled = true;
                                    //if ( disabled == 'false' ) disabled = false;
                                    //console.log(disabled);
                                    var categoryId = Ext.getCmp(curwin).getComponent('categoryId').getValue();
                                    var string ='';
                                    var size = 1;
                                    var changed = [];
                                    var changeflag = false;
                                    if ( record.data.name != name ) {
                                        string = string + size + '.' + record.data.name + ' => ' + name + '<br>' ;
                                        changeflag = true;
                                        size ++ ;
                                    }
                                    if ( record.data.nameEn != nameEn ) {
                                        string = string + size + '.' + record.data.nameEn + ' => ' + nameEn + '<br>' ;
                                        size ++ ;
                                        changeflag = true;
                                    }
                                    if ( rangeIdx != rangeIndex ) {
                                        string = string + size + '.' + rangeIdx + ' => ' + rangeIndex + '<br>' ;
                                        size ++ ;
                                        changeflag = true;
                                    }
                                    if ( businessHourPanel.changed == true ) {
                                        for ( var i = 0 ; i < businessHourPanel.changedString.length ; i ++ ) {
                                            string = string + size + '. '+ businessHourPanel.changedString[i] + '<br>' ;
                                            size ++ ;
                                        }
                                        changeflag = true;
                                    }
                                    if ( record.data.information ) {
                                        if ( typeof (record.data.information.disabled) != 'undefined' ) {
                                            //console.log ( record.data.information.disabled );
                                            //console.log(disabled);
                                            if ( record.data.information.disabled != disabled ) {
                                                string = string + size + '. Disabled: ' + record.data.information.disabled + ' => ' + disabled + '<br>' ;
                                                changeflag = true;
                                                size ++ ;
                                            }
                                        } else {
                                            string = string + size + '. Disabled: ' + disabled + '<br>' ;
                                            changeflag = true;
                                            size ++ ;
                                        }
                                    } else {
                                        string = string + size + '. Disabled: ' + disabled + '<br>' ;
                                        changeflag = true;
                                        size ++ ;
                                    }
                                    if ( changeflag == true ) {
                                        Ext.Msg.show({
                                            title:'Save Changes?',
                                            msg: 'You have changed : <br/>  '+ string + ' <br/>Would you like to save your changes?',
                                            buttons: Ext.Msg.YESNO,
                                            fn: function(btn,text){
                                                if ( btn == 'yes' ) {
                                                    //Ext.Msg.alert("Warning","Api 暂时没有 '修改 Dish Category' 功能");
                                                    var categoryInfo = new Object();
                                                    categoryInfo.information = new Object();

                                                    categoryInfo.information.businessHour=[];
                                                    categoryBusinessHourStore.each( function( record , idx ) {
                                                        var newBusinessHour = new Object();
                                                        //console.log(record);
                                                        newBusinessHour.day = record.data.day;
                                                        newBusinessHour.start = record.data.start;
                                                        newBusinessHour.end = record.data.end;
                                                        categoryInfo.information.businessHour.push( newBusinessHour );
                                                    })
                                                    //categoryInfo.information.rangeIndex1 = rangeIndex1;
                                                    categoryInfo.logo = record.data.logo;
                                                    categoryInfo.name = name;
                                                    categoryInfo.nameEn = nameEn;
                                                    categoryInfo.regionId = record.data.regionId;
                                                    categoryInfo.categoryId = record.data.categoryId;
                                                    //categoryInfo.sales = record.data.sales;
                                                    categoryInfo.storeId = record.data.storeId;
                                                    categoryInfo.information.disabled = disabled;

                                                    var result_category = JSON.stringify( categoryInfo );
                                                    curWindow.setLoading(true);
                                                    Ext.Ajax.request({
                                                        url: Ext.getCmp( 'Employee-Header' ).getServerUrl()+'/store/category', // you can fix a parameter like this : url?action=anAction1
                                                        method: 'PUT',
                                                        headers: Ext.getCmp( 'Employee-Header').getHeaders( 'put' ),
                                                        jsonData:result_category,
                                                        success: function(result, request) {
                                                            var response = Ext.decode( result.responseText );
                                                            var Error = Ext.getCmp( 'Employee-Header').processErrorMessage( response );
                                                            if ( Error == false ) {
                                                                curWindow.setLoading(false);
                                                                Ext.Msg.alert( "Success" , "Category has been updated");
                                                                curWindow.close();
                                                                Ext.getCmp( 'Employee-Restaurant-Dish-Category' ).refreshView();
                                                            }
                                                            else {
                                                                curWindow.setLoading(false);
                                                            }
                                                        },
                                                        failure: function(result, request) {
                                                            Ext.Msg.alert( 'Error' , 'Failure' );
                                                            curWindow.setLoading(false);
                                                        }
                                                    });

                                                }
                                            },
                                            animEl: 'elId'
                                        });
                                    } else {
                                        curWindow.close();
                                    }

                                    //console.log(name,nameEn);

                                }
                            }
                        ]
                    }
                ],
                listeners:{
                    'close':function( win ){
                        Ext.getCmp( 'Employee-Restaurant-Dish-Category' ).gridEditing = false;
                        this.closeWindowPopUp();
                    }
                },
                addOpenedWindow:function( window ) {
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
                }
            });
            Ext.getCmp( 'Employee-Restaurant-Dish-Category' ).addOpenedWindow( win );
            win.show();
        }
    },

    CreateNewWindow: function( record ) {
        if ( Ext.getCmp( 'Employee-Restaurant-Dish-Category' ).gridEditing == true ) {
            Ext.Msg.alert( 'Error' , 'A window already opened, please close it first.' );
        } else {
            Ext.getCmp( 'Employee-Restaurant-Dish-Category' ).gridEditing = true;
            var categoryBusinessHourStore = Ext.create( '517Employee.store.restaurant.dish.category.businessHour' );
            //console.log( record.data.information.businessHour );
            var businessHour = [
                {start:0,end:86400,day:1},
                {start:0,end:86400,day:2},
                {start:0,end:86400,day:3},
                {start:0,end:86400,day:4},
                {start:0,end:86400,day:5},
                {start:0,end:86400,day:6},
                {start:0,end:86400,day:7}
            ];
            categoryBusinessHourStore.add( businessHour );
            var win = Ext.create('Ext.window.Window', {
                extend:'Ext.form.Panel',
                xtype: 'employee-restaurant-dish-category-window',
                title: 'New Dish Category - ' + record.name,
                layout:'fit',
                width:500 , minWidth:400 , maxWidth:500 ,
                height:470 , minHeight:470 , maxHeight:470 ,
                autoScroll:false , resizable:true ,
                shadow:true , shadowOffset:10 ,
                gridEditing: false,
                windowPopUp:[],
                items: [
                    {
                        xtype: 'fieldset',
                        border: false ,frame: false ,
                        margin: '10 10 10 10',
                        defaultType: 'textfield',
                        defaults:{
                            lableWdith: 100,
                            margin: '5 0 5 0',
                            anchor: '100%',
                            aligin:'center'
                        },
                        items: [
                            {
                                xtype: 'radiogroup',
                                margin:0,
                                fieldLabel: 'Disabled',
                                itemId:'isDisabled',
                                defaults:{
                                    labelWidth:0
                                },
                                items: [
                                    {
                                        checked: true,
                                        boxLabel: 'False',
                                        name: 'disabled',
                                        inputValue: false
                                    },
                                    {
                                        boxLabel: 'True',
                                        name: 'disabled',
                                        inputValue: true
                                    }
                                ]
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Name',
                                itemId:'name'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'English Name',
                                itemId:'nameEn'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Range Index',value:999,
                                itemId:'rangeIndex1',enforceMaxLength: true, maxLength: '4',  maskRe: /[0-9]/, maxValue:1000, minValue:0
                            },
                            {
                                xtype: 'gridpanel',
                                requires: [
                                    '517Employee.view.restaurant.dish.DishCategoryController'
                                ],
                                store:categoryBusinessHourStore,
                                localstoreId:categoryBusinessHourStore.id,
                                frame:true , columnLines:true , border:true ,
                                changed:false ,changedString:[] ,
                                height:240 , minHeight:70 , maxHeight: 240 , autoScroll:true ,
                                controller: 'employee-restaurant-dish-category-controller',
                                dockedItems: [
                                    {
                                        dock: 'top',
                                        xtype: 'toolbar',
                                        items: [
                                            'Business Hour',
                                            {
                                                xtype: 'tbfill'
                                            }, {
                                                xtype: 'button',
                                                iconCls: 'fa fa-plus',
                                                text: 'New',
                                                handler:'NewBusinessHour'
                                            }
                                        ]
                                    }
                                ],
                                columns:[
                                    {
                                        text     : 'Day',
                                        flex     : 1,
                                        sortable : false,
                                        dataIndex: 'day'
                                    },
                                    {
                                        text     : 'Start',
                                        flex     : 2,
                                        sortable : false,
                                        dataIndex: 'start',
                                        renderer: function(val) {
                                            var Hour= Math.floor(val / 3600);
                                            if (Hour < 10) Hour = '0' + Hour;
                                            var Minutes = Math.floor(( val % 3600 ) / 60) ;
                                            if (Minutes < 10) Minutes = '0' + Minutes;
                                            var time = Hour + ":" + Minutes
                                            return time;
                                        }
                                    },
                                    {
                                        text     : 'End',
                                        flex     : 2,
                                        sortable : false,
                                        dataIndex: 'end',
                                        renderer: function(val) {
                                            var Hour= Math.floor(val / 3600);
                                            if (Hour < 10) Hour = '0' + Hour;
                                            var Minutes = Math.floor(( val % 3600 ) / 60) ;
                                            if (Minutes < 10) Minutes = '0' + Minutes;
                                            var time = Hour + ":" + Minutes
                                            return time;
                                        }
                                    },
                                    {
                                        menuDisabled: true,
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 45,
                                        items: [
                                            {
                                                iconCls: 'edit-col',
                                                tooltip: 'Check/Edit BusinessHour',
                                                handler: 'EditBusinessHour'
                                            },
                                            {
                                                iconCls:'delete-col',
                                                tooltip:'Delete BusinessHour',
                                                handler:'DeleteBusinessHour'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                text:  'Confirm Add',
                                anchor: '100%',
                                height: 50,
                                handler:function( field , rowIndex ) {

                                    var curwin = this.up().getId();
                                    var curWindow = this.up('.window');
                                    var me = Ext.getCmp(curwin);
                                    var name = Ext.getCmp(curwin).getComponent('name').getValue();
                                    var nameEn = Ext.getCmp(curwin).getComponent('nameEn').getValue();
                                    var disabled = Ext.getCmp(curwin).getComponent("isDisabled").getValue().disabled;
                                    var rangeIndex1 = Ext.getCmp(curwin).getComponent("rangeIndex1").getValue();
                                    var string = '';
                                    var post_string = '';
                                    var size = 1;
                                    var changed = [];
                                    var unavailable = false;
                                    post_string = post_string + 'Disabled: ' + disabled + '<br>' ;
                                    if ( name == "" || ! name ) {
                                        string = string +  'Name: ' + name + ' is not available <br>' ;
                                        //Ext.Msg.alert( 'Error' , ' name is not available <br>' );
                                        unavailable = true;
                                    } else {
                                        post_string = post_string + 'name: ' + name + '<br>' ;
                                    }
                                    if ( nameEn == "" || ! nameEn ) {
                                        string = string + 'Name En: ' + nameEn + ' is not available <br>' ;
                                        //Ext.Msg.alert( 'Error' , ' nameEN is not available <br>' );
                                        unavailable = true;
                                    } else {
                                        post_string = post_string + 'nameEn: ' + nameEn + '<br>' ;
                                    }
                                    if ( rangeIndex1 < 0 ) {
                                        string = string + 'rangeIndex: ' + rangeIndex1 + ' is not available <br>' ;
                                        //Ext.Msg.alert( 'Error' , ' nameEN is not available <br>' );
                                        unavailable = true;
                                    } else {
                                        post_string = post_string + 'rangeIndex: ' + rangeIndex1 + '<br>' ;
                                    }
                                    if ( unavailable == false ) {
                                        Ext.Msg.show({
                                            title:'Add Category?',
                                            msg: 'You will add category: <br/>  '+ post_string + ' <br/>Would you like to add the category?',
                                            buttons: Ext.Msg.YESNO,
                                            fn: function(btn,text){
                                                if ( btn == 'yes' ) {
                                                    var categoryInfo = new Object();
                                                    categoryInfo.information = new Object();
                                                    categoryInfo.information.businessHour=[];
                                                    categoryInfo.information.disabled = disabled;
                                                    categoryBusinessHourStore.each( function( record , idx ) {
                                                        var newBusinessHour = new Object();
                                                        //console.log(record);
                                                        newBusinessHour.day = record.data.day;
                                                        newBusinessHour.start = record.data.start;
                                                        newBusinessHour.end = record.data.end;
                                                        categoryInfo.information.businessHour.push( newBusinessHour );
                                                    });
                                                    //categoryInfo.information.rangeIndex1 = rangeIndex1;
                                                    //categoryInfo.logo = record.data.logo;
                                                    categoryInfo.name = name;
                                                    categoryInfo.nameEn = nameEn;
                                                    categoryInfo.regionId = record.regionId;
                                                    categoryInfo.storeId = record.storeId;

                                                    var result_category = JSON.stringify( categoryInfo );
                                                    curWindow.setLoading(true);
                                                    Ext.Ajax.request({
                                                        url: Ext.getCmp( 'Employee-Header' ).getServerUrl()+'/store/category', // you can fix a parameter like this : url?action=anAction1
                                                        method: 'POST',
                                                        headers: Ext.getCmp( 'Employee-Header').getHeaders( 'post' ),
                                                        jsonData:result_category,
                                                        success: function(result, request) {
                                                            var response = Ext.decode( result.responseText );
                                                            var Error = Ext.getCmp( 'Employee-Header').processErrorMessage( response );
                                                            if ( Error == false ) {
                                                                curWindow.setLoading(false);
                                                                Ext.Msg.alert( "Success" , "Category has been added");
                                                                curWindow.close();
                                                                Ext.getCmp( 'Employee-Restaurant-Dish-Category' ).refreshView();
                                                            }
                                                            else {
                                                                curWindow.setLoading(false);
                                                            }
                                                        },
                                                        failure: function(result, request) {
                                                            Ext.Msg.alert( 'Error' , 'Failure' );
                                                            curWindow.setLoading(false);
                                                        }
                                                    });


                                                }
                                            },
                                            animEl: 'elId'
                                        });
                                    } else {
                                        Ext.Msg.alert( 'Error' , string );
                                        //curWindow.close();
                                    }
                                }
                            }
                        ]
                    }
                ],
                listeners:{
                    'close':function( win ) {
                        Ext.getCmp( 'Employee-Restaurant-Dish-Category' ).gridEditing = false;
                        this.closeWindowPopUp();
                    }

                },
                addOpenedWindow:function( window ) {
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
                }

            });
            Ext.getCmp( 'Employee-Restaurant-Dish-Category' ).addOpenedWindow( win );
            win.show();
        }
    },

    NewBusinessHour:function( button , clickEvent ) {
        //console.log( button.up().up().up().items.items[ button.up().up().up().items.items.length - 2 ] );
        var grid = button.up().up().up().items.items[ button.up().up().up().items.items.length - 2 ];
        var gridpanel = button.up().up();
        var categoryWindow = gridpanel.up().up();

        if ( categoryWindow.gridEditing == true ) {
            Ext.Msg.alert( 'Error' , 'A window already opened, please close it first.' );
        } else {
            var business_hour_store = grid.getStore();
            var win = Ext.create( 'Ext.window.Window' , {
                extend:'Ext.form.Panel',
                title: 'New Business Hour',
                width:450 , height:110,
                autoScroll:false , resizable:false ,
                items:[
                    {
                        xtype: 'fieldset',
                        layout: 'anchor',
                        labelWidth:0,
                        border: false ,frame: false ,
                        margin:'10 0 0 0',
                        items: [
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                labelWidth:0 ,
                                originRecord :null,
                                padding:'0 10 0 0',
                                border:false , frame: false ,
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
                        border:false,frame:false,
                        dock:'bottom',
                        items:[
                            {
                                xtype: 'tbfill'
                            },
                            {
                                xtype: 'button',
                                text:  'Add',
                                width:100,
                                handler:function(field, rowIndex) {
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
                                                    business_hour_store.add( newBusiness_hour );
                                                    gridpanel.changed = true;
                                                    gridpanel.changedString.push('Added: Day:' + day + ' Start:' + start +' End:' + end);
                                                    curwin.close();
                                                    grid.getView().refresh();
                                                }
                                            },
                                            animEl: 'elId'
                                        });
                                    }

                                    //console.log(this.up().items.items.indexOf(1));
                                    //console.log(this.up().items.items.indexOf(2).value);
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
                        categoryWindow.gridEditing = false;
                    }
                }

            });
            categoryWindow.addOpenedWindow( win );
            win.show();
        }
    },
    EditBusinessHour:function( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine , tr ) {
        //console.log( grid.up().up().up() );
        var categoryWindow = grid.up().up().up();
        if ( categoryWindow.gridEditing == true ) {
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
                        border: false , frame:false ,
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
                        categoryWindow.gridEditing = false;
                    }
                }

            });
            categoryWindow.addOpenedWindow( win );
            win.show();
        }
    },
    DeleteBusinessHour:function( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine , tr ) {
        var categoryWindow = grid.up().up().up();
        if ( categoryWindow.gridEditing == true ) {
            Ext.Msg.alert( 'Error' , 'A window already opened, please close it first.' );
        } else {
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
    },
    RefreshList:function() {
        Ext.getCmp( 'Employee-Restaurant-Dish-Category' ).refreshView();
    },
    DeSelectAll:function( field ) {
        field.up().up().getSelectionModel().deselectAll();
        Ext.getCmp( 'Employee-Restaurant-Dish-Category' ).closeWindowPopUp();
    }
})