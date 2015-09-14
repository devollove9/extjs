/**
 * Created by Yaxin on 6/1/2015.
 */
Ext.define('517Employee.view.restaurant.dish.DishDetail', {
    extend: 'Ext.form.Panel',
    requires:[
        '517Employee.view.restaurant.dish.DishOptionGroupList',
        '517Employee.view.restaurant.dish.DishDetailController',
    ],
    xtype: 'employee-restaurant-dish-detail',
    controller:'employee-restaurant-dish-detail-controller',
    //store:'DishDetail',

    /* View Settings */
    columnLines: true , collapsible:true ,
    title: 'Dish details',
    header:{ titleAlign: 'left' , height:30 , padding:'0 10 0 10', margin:'0 0 0 0' },
    viewConfig: { enableTextSelection: true },
    defaults: {
        anchor: '99%'
    },
    defaultType:'textfield' ,
    bodyPadding: 5 ,
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 70,
        msgTarget: 'side'
    },
    autoScroll:true,

    /*  Variables  */
    // Variable detect if editing
    gridEditing: false ,
    // Variable of original record
    originRecord:null,
    // Variable detect if its creating new dish
    newDish:false,
    // Region id
    regionId:'',
    // Store id
    storeId:'',
    // Category id
    categoryId:'',
    // Type id
    typeId:'',

    /*  View Content  */
    items: [
        {
            xtype: 'radiogroup',
            fieldLabel: 'Disabled',
            name: 'disabledGroup',
            id: 'Employee-Restaurant-Dish-Detail-Disabled',
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
        {allowBlank: false, fieldLabel: 'Name', name: 'name'},
        {allowBlank: false, fieldLabel: 'En Name', name: 'nameEn'},
        {allowBlank: false, fieldLabel: 'Price', name: 'price'},
        {allowBlank: false, fieldLabel: 'Quantity', name: 'quantity' },

        //{allowBlank: false, fieldLabel: 'Rating', name: 'rating'},
        {
            xtype: 'fileuploadfield',
            name: 'logo.web',
            fieldLabel: 'Web Logo',fileTransfered :false,fileData:null,
            listeners:{
                change:function( field , filepath , filePath , me){
                    Ext.getCmp( 'Employee-Restaurant-Dish-Detail' ).setLoading( true );
                    ////console.log(field.up());
                    var file = field.getEl().down( 'input[type=file]' ).dom.files[ 0 ];
                    var reader = new FileReader();
                    reader.onload = ( function( theFile ) {
                        return function( e ) {
                            Ext.getCmp( 'Employee-Restaurant-Dish-Detail' ).setLoading( false );
                            var result = e.target.result;
                            field.fileData = result;
                            field.fileTransfered = true;
                            ////console.log(field.fileData);
                        };
                    })( file );reader.readAsDataURL( file );
                }
            }
        },
        {
            xtype: 'fileuploadfield',
            name: 'logo.phone',
            fieldLabel: 'Phone Logo',fileTransfered :false,fileData:null,
            listeners:{
                change:function( field , filepath , filePath , me){
                    Ext.getCmp( 'Employee-Restaurant-Dish-Detail' ).setLoading( true );
                    ////console.log(field.up());
                    var file = field.getEl().down( 'input[type=file]' ).dom.files[ 0 ];
                    var reader = new FileReader();
                    reader.onload = ( function( theFile ) {
                        return function( e ) {
                            Ext.getCmp( 'Employee-Restaurant-Dish-Detail' ).setLoading( false );
                            var result = e.target.result;
                            field.fileData = result;
                            field.fileTransfered = true;
                            ////console.log(field.fileData);
                        };
                    })( file );reader.readAsDataURL( file );
                }
            }
        },
        {
            xtype: 'fileuploadfield',
            name: 'logo.mini',
            fieldLabel: 'Mini Logo',fileTransfered :false,fileData:null,
            listeners:{
                change:function( field , filepath , filePath , me){
                    Ext.getCmp( 'Employee-Restaurant-Dish-Detail' ).setLoading( true );
                    ////console.log(field.up());
                    var file = field.getEl().down( 'input[type=file]' ).dom.files[ 0 ];
                    var reader = new FileReader();
                    reader.onload = ( function( theFile ) {
                        return function( e ) {
                            Ext.getCmp( 'Employee-Restaurant-Dish-Detail' ).setLoading( false );
                            var result = e.target.result;
                            field.fileData = result;
                            field.fileTransfered = true;
                            ////console.log(field.fileData);
                        };
                    })( file );reader.readAsDataURL( file );
                }
            }
        },
        {
            xtype: 'gridpanel',
            id: 'Employee-Restaurant-Dish-Detail-BusinessHour',
            requires: [
                '517Employee.view.restaurant.dish.DishDetailController'
            ],

            controller: 'employee-restaurant-dish-detail-controller',
            store: Ext.create( '517Employee.store.restaurant.dish.detail.BusinessHour' ),
            title: 'Business Hour',
            padding:'0 2 0 1', margin:'0 3 0 2',
            header:{ titleAlign: 'left' , height:30 , padding:'0 10 0 10' },
            collapsible: true, columnLines:true ,
            maxHeight: 270 , autoScroll:true ,

            /* Variables */
            changed:false,changedString:[],
            // Variable detect if editing
            gridEditing: false ,
            // Window Opend in this View
            windowPopUp:[],

            /* Content */
            dockedItems: [
                {
                    dock: 'top',
                    xtype: 'toolbar',
                    height: 30,
                    defaults:{
                      height:19
                    },
                    items: [
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
            ],
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
            },
            resetAll:function() {
                this.getStore().loadData( [] , false );
                this.setTitle( 'Business Hour' );
                this.closeWindowPopUp();
            }
        },
        {
            xtype: 'fieldset',
            title: 'Description',
            collapsible: true , collapsed: true,
            defaults: {
                type:'textfield',
                anchor: '100%'
            },
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 65,
                msgTarget: 'side'
            },
            padding: 5,
            items: [
                {
                    xtype: 'textareafield',
                    name: 'description',
                    fieldLabel: 'Chinese',
                    value: 'Textarea value'
                },
                {
                    xtype: 'textareafield',
                    name: 'descriptionEn',
                    fieldLabel: 'English',
                    value: 'Textarea value'
                }
            ]
        },
        {
            xtype: 'employee-restaurant-dish-optionGroupList',
            id: 'Employee-Restaurant-Dish-OptionGroupList',
            minHeigt:90,
            margin:'0 0 1 0'
        },
        { xtype:'hidden', name: 'itemId'},
        { xtype:'hidden', name: 'storeId'},
        { xtype:'hidden', name: 'categoryId'},
        { xtype:'hidden', name: 'typeId'},
    ],
    dockedItems:[
        {
            xtype:'toolbar',
            margin:'0 0 1 0',
            dock:'bottom',
            width: 100,
            items:[
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    id: 'Employee-Restaurant-Dish-Detail-SaveChange',
                    iconCls: 'fa fa-pencil-square-o',
                    text: 'Save',
                    handler:'SaveChange'
                },/*
                 {
                     xtype: 'button',
                     iconCls: 'fa fa-pencil-square-o',
                     text: 'Cancel',
                     handler:'CancelAdd',
                     hidden:'true'
                 },*/
                {
                    xtype:'tbfill'
                }
            ]

        },
    ],
    resetAll:function() {
        //this.getStore().loadData( [] , false );
        Ext.getCmp( 'Employee-Restaurant-Dish-Detail-BusinessHour').resetAll();
        Ext.getCmp( 'Employee-Restaurant-Dish-OptionGroupList' ).resetAll();
        Ext.getCmp( 'Employee-Restaurant-Dish-Detail-SaveChange' ).setText( 'Save' );
        this.setTitle( 'Dish details' );
        this.getForm().reset();
        this.getForm().findField( 'logo.web' ).fileTransfered = false;this.getForm().findField( 'logo.web' ).fileData = null;
        this.getForm().findField( 'logo.phone' ).fileTransfered = false;this.getForm().findField( 'logo.phone' ).fileData = null;
        this.getForm().findField( 'logo.mini' ).fileTransfered = false;this.getForm().findField( 'logo.mini' ).fileData = null;
        this.setDisabled( false );
        this.originRecord = null;
        this.newDish = false;
        this.regionId = '';
        this.storeId = '';
        this.categoryId = '';
        this.typeId = '';
    },
    postChange:function( dishInfo , method ) {
        var me = this;
        me.setLoading( true );
        Ext.Ajax.request({
            url: Ext.getCmp( 'Employee-Header' ).getServerUrl()+'/store/item', // you can fix a parameter like this : url?action=anAction1
            method: method,
            headers: Ext.getCmp( 'Employee-Header').getHeaders( method ),
            jsonData:dishInfo,
            success: function( result, request ) {
                me.setLoading( false );
                var response = Ext.decode( result.responseText );
                var Error = Ext.getCmp( 'Employee-Header').processErrorMessage( response );
                if ( Error == false ) {
                    me.setLoading( false );
                    if ( method == 'newDish' ) {
                        Ext.Msg.alert( "success" , 'Dish has been added.' );
                    } else {
                        Ext.Msg.alert( "success" , 'Dish has been saved.' );
                    }
            }},
            failure: function() {
                Ext.Msg.alert( 'Error' , 'Failure' );
                me.setLoading( false );
            }
        });
    }
});