/**
 * Created by devo on 8/6/2015.
 */
Ext.define( '517Employee.view.restaurant.information.restaurant.RestaurantView' , {
    extend: 'Ext.form.Panel',


    requires:[
        '517Employee.view.restaurant.information.restaurant.businessHour.BusinessHourView',
        '517Employee.view.restaurant.information.restaurant.announcement.Announcement',
        '517Employee.view.restaurant.information.restaurant.announcement.AnnouncementEn'
        //'Ext517.view.restaurant.RestaurantInfo_Business_Hour',
        //'Ext517.view.restaurant.RestaurantInfo_Badge',
        //'Ext517.view.restaurant.RestaurantInfo_Announcement_En',
        //'Ext517.view.restaurant.RestaurantInfo_Announcement',
    ],
    //title: '餐馆信息',
    //controller:'restaurant-restaurantInfo',
    //store: 'Restaurantdetail',
    xtype: 'employee-restaurant-information-restaurant',
    bodyPadding: 20,
    autoScroll: true,
    title: 'Restaurant Information',
    header:{ titleAlign: 'left' , height:30 , padding:'0 10 0 10', margin:'0 0 0 0' },
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 115,
        msgTarget: 'side'
    },
    // Origin Restaurant Info
    originData:null,

    // Variable determing if adding new restaurant
    newRestaurant:false,
    changedInfo:{},
    newInfo:{},
    items: [
        // Disabled 0
        {
            xtype: 'radiogroup',
            margin:0,
            fieldLabel: 'Status',
            name:'isDisabled',
            defaults:{
                labelWidth:0
            },
            items: [
                {
                    boxLabel: 'Open',
                    name: 'disabled',
                    checked: true,
                    inputValue: false
                },
                {
                    boxLabel: 'Close',
                    name: 'disabled',
                    inputValue: true
                }
            ]
        },
        // Restaurant Info 1
        {
            xtype: 'fieldset',
            title: 'Restaurant Info',
            defaultType: 'textfield',
            width : '50%',
            layout: {
                //type:'vbox',
                align: 'stretch'
            },
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    combineErrors: true,
                    defaultType: 'textfield',
                    items: [
                        {
                            name: 'name',
                            fieldLabel: 'Name',
                            flex: 2,
                            allowBlank: false
                        },
                        {
                            name: 'nameEn',
                            fieldLabel: 'English Name',
                            flex: 2,
                            //margin: '0 0 0 6',
                            allowBlank: false
                        },
                        {
                            flex: 2,
                            xtype:'hiddenfield',
                            name:'storeId'
                        },
                        {
                            flex: 2,
                            xtype:'hiddenfield',
                            name:'regionId'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    combineErrors: true,
                    defaultType: 'textfield',
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            fieldLabel: 'Payment Type',
                            cls: 'x-check-group-alt',
                            width:600,
                            //columns: 3,
                            //max:max,
                            min:1,
                            //rid: optionGroupRid,
                            vertical: true,
                            items: [
                                {
                                    boxLabel: 'Cash',
                                    inputValue:0,
                                    name:'paymentType.cash'
                                },
                                {
                                    boxLabel: 'Card',
                                    inputValue:1,
                                    name:'paymentType.card'
                                }
                            ]
                        },
                        {
                            name: 'information.rangeIndex1',
                            fieldLabel: 'Index',
                            flex: 2,
                            //margin: '0 0 0 6',
                            allowBlank: false
                        }


                    ]
                }
            ]
        },

        // Salse 2
        {
            xtype: 'fieldset',
            title: 'Sales',
            defaultType: 'textfield',
            width : '50%',
            layout: {
                align: 'stretch'
            },
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    combineErrors: true,
                    defaultType: 'textfield',
                    items: [
                        {
                            name: 'sales.day',
                            fieldLabel: 'Day',
                            flex: 2,
                            readOnly:true
                        },
                        {
                            name: 'sales.week',
                            fieldLabel: 'Week',
                            flex: 2,
                            readOnly:true
                        },
                        {
                            name: 'sales.month',
                            fieldLabel: 'Month',
                            flex: 2,
                            readOnly:true
                        },
                        {
                            name: 'sales.total',
                            fieldLabel: 'Total',
                            flex: 2,
                            readOnly:true
                        }
                    ]
                }
            ]
        },

        // Logos 3
        {
            xtype: 'fieldset',
            title: 'Logos',
            defaultType: 'textfield',
            defaults:{
                anchor: '100%'
            },
            items:[
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    combineErrors: true,
                    defaultType: 'textfield',
                    items: [
                        {
                            xtype:'fileuploadfield',
                            flex: 3,
                            name:'logo.mini',
                            fieldLabel:'Mini Logo',fileTransfered :false,fileData:null,
                            listeners:{
                                change:function( field , filepath , filePath , me){
                                    Ext.getCmp( 'Employee-Restaurant-Information-Restaurant' ).setLoading( true );
                                    //console.log(field.up());
                                    var file = field.getEl().down( 'input[type=file]' ).dom.files[ 0 ];
                                    var reader = new FileReader();
                                    reader.onload = ( function( theFile ) {
                                        return function( e ) {
                                            Ext.getCmp( 'Employee-Restaurant-Information-Restaurant' ).setLoading( false );
                                            var result = e.target.result;
                                            field.fileData = result;
                                            field.fileTransfered = true;
                                            //console.log(field.fileData);
                                        };
                                    })( file );reader.readAsDataURL( file );
                                }
                            }
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    combineErrors: true,
                    defaultType: 'textfield',
                    items: [
                        {
                            xtype:'fileuploadfield',
                            flex: 3,
                            name:'logo.phone',
                            fieldLabel:'Phone Logo',fileTransfered :false,fileData:null,
                            listeners:{
                                change:function( field , filepath , filePath , me){
                                    Ext.getCmp( 'Employee-Restaurant-Information-Restaurant' ).setLoading( true );
                                    //console.log(field.up());
                                    var file = field.getEl().down( 'input[type=file]' ).dom.files[ 0 ];
                                    var reader = new FileReader();
                                    reader.onload = ( function( theFile ) {
                                        return function( e ) {
                                            Ext.getCmp( 'Employee-Restaurant-Information-Restaurant' ).setLoading( false );
                                            var result = e.target.result;
                                            field.fileData = result;
                                            field.fileTransfered = true;
                                            //console.log(field.fileData);
                                        };
                                    })( file );reader.readAsDataURL( file );
                                }
                            }
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    combineErrors: true,
                    defaultType: 'textfield',
                    items: [
                        {
                            xtype:'fileuploadfield',
                            flex: 3,
                            name:'logo.web',
                            fieldLabel:'Web Logo',fileTransfered :false,fileData:null,
                            listeners:{
                                change:function( field , filepath , filePath , me){
                                    Ext.getCmp( 'Employee-Restaurant-Information-Restaurant' ).setLoading( true );
                                    //console.log(field.up());
                                    var file = field.getEl().down( 'input[type=file]' ).dom.files[ 0 ];
                                    var reader = new FileReader();
                                    reader.onload = ( function( theFile ) {
                                        return function( e ) {
                                            Ext.getCmp( 'Employee-Restaurant-Information-Restaurant' ).setLoading( false );
                                            var result = e.target.result;
                                            field.fileData = result;
                                            field.fileTransfered = true;
                                            //console.log(field.fileData);
                                        };
                                    })( file );reader.readAsDataURL( file );
                                }
                            }
                        },
                    ]
                }
            ]
        },

        // Delivery 4
        {
            xtype: 'fieldset',
            title: 'Delivery',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items:[
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    combineErrors: true,
                    defaultType: 'textfield',
                    items: [
                        {
                            name: 'delivery.time',
                            fieldLabel: 'Delivery Time',
                            flex: 2,
                            allowBlank: false
                        },
                        {
                            name: 'delivery.minimum',
                            fieldLabel: 'Delivery Minimum',
                            flex: 2,
                            //margin: '0 0 0 6',
                            allowBlank: false
                        },
                        {
                            flex: 2,
                            name:'delivery.distance',
                            fieldLabel:'Delivery Distance',
                            allowBlank: false
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    combineErrors: true,
                    defaultType: 'textfield',
                    items: [
                        {
                            name: 'delivery.feeFactor',
                            fieldLabel: 'Delivery Fee Factor',
                            labelWidth:180,
                            flex: 2,
                            allowBlank: false
                        },
                        {
                            name: 'delivery.flatFactor',
                            fieldLabel: 'Delivery Flat Factor',
                            flex: 2,
                            labelWidth:180,
                            //margin: '0 0 0 6',
                            allowBlank: false
                        },

                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    combineErrors: true,
                    defaultType: 'textfield',
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            fieldLabel: 'Delivery Type',
                            cls: 'x-check-group-alt',
                            width:600,
                            //columns: 3,
                            //max:max,
                            min:1,
                            //rid: optionGroupRid,
                            vertical: true,
                            items: [
                                {
                                    boxLabel: '517 Deliver',
                                    inputValue:0,
                                    name:'delivery.method.type0'
                                },
                                {
                                    boxLabel: 'Pick Up',
                                    inputValue:1,
                                    name:'delivery.method.type1'
                                },
                                {
                                    boxLabel: 'Restaurant Deliver',
                                    inputValue:3,
                                    name:'delivery.method.type3'
                                },
                            ]
                        }
                    ]
                }
            ]
        },

        // Business Hour 5 and Announcements
        {
            xtype:'fieldcontainer',
            layout:'hbox',
            items:[
                {
                    xtype:'employee-restaurant-information-restaurant-businessHour',
                    id:'Employee-Restaurant-Information-Restaurant-BusinessHour',
                    margin:'0 5 0 0',
                    flex:3
                },
                {
                    xtype:'employee-restaurant-information-restaurant-announcement',
                    id:'Employee-Restaurant-Information-Restaurant-Announcement',
                    margin:'0 5 0 5',
                    flex:2
                },
                {
                    xtype:'employee-restaurant-information-restaurant-announcementEn',
                    id:'Employee-Restaurant-Information-Restaurant-AnnouncementEn',
                    margin:'0 0 0 5',
                    flex:2
                },
            ]
        },


        // Description
        {
            xtype: 'fieldset',
            title: 'Description',
            defaultType: 'textfield',
            layout: 'anchor',
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'textareafield',
                            name: 'information.description',
                            fieldLabel: '中文',
                            //value: '中文描述',
                            flex: 1
                        },
                        {
                            xtype: 'textareafield',
                            name: 'information.descriptionEn',
                            fieldLabel: 'English',
                            // value: 'English Description',
                            flex: 1
                        }
                    ]
                }
            ]

        },

        // Address
        {
            xtype: 'fieldset',
            title: 'Address',
            defaultType: 'textfield',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    labelWidth: 110,
                    fieldLabel: 'Street Address',
                    name: 'information.address',
                    billingFieldName: 'billingStreet',
                    allowBlank: false
                },
                {
                    xtype: 'button',
                    text: 'GEOCODE',
                    handler:function(){
                        this.up().up().setGeoLocation();
                    }
                },
            ]
        },

        // Location
        {
            xtype: 'fieldset',
            title: 'Location',

            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items:[
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    combineErrors: true,
                    defaultType: 'textfield',
                    items: [
                        {
                            name: 'location.latitude',
                            fieldLabel: 'Latitude',
                            flex: 2,
                            allowBlank: false
                        },
                        {
                            name: 'location.longitude',
                            fieldLabel: 'Longitude',
                            flex: 2,
                            //margin: '0 0 0 6',
                            allowBlank: false
                        }
                    ]
                }
            ]
        }


    ],
    dockedItems: [{
        dock: 'bottom',
        xtype: 'toolbar',
        items: [{
            xtype: 'tbfill'
        },
            {
                xtype: 'button',
                iconCls: 'fa fa-pencil-square-o',
                text: 'Save Changes',
                handler:function(){
                    this.up().up().saveChanges();
                }
            },
            {
                xtype:'tbfill'
            }]

    }],
    addRestaurant:function(){
        var me = this;
        me.resetAll();
        me.newRestaurant = true;
        me.setTitle( 'Creating new restaurant' );
        me.dockedItems.items[ 1 ].items.items[ 1 ].setText( 'Add Restaurant' );
        me.getSpecificField(  'businessHour' ).loadBusinessHour( '' );
    },
    getStoreData:function( data ) {
        var me = this;

        if ( data ) {
            var storeId = data.data.storeId;
            Ext.Ajax.request({
                url:Ext.getCmp( 'Employee-Header' ).getServerUrl() + '/store',
                method:'get',
                headers:Ext.getCmp( 'Employee-Header' ).getHeaders( 'get' ),
                disableCaching:false,
                params:{
                    regionId: Ext.getCmp( 'Employee-Header-Region').regionId ,
                    storeId: storeId
                },
                success:function( result , request ) {
                    var response = Ext.decode( result.responseText );
                    var Error = Ext.getCmp( 'Employee-Header' ).processErrorMessage( response );
                    if ( Error == false ) {
                        me.loadStoreData( response.data[ 0 ] );
                    }
                }
            });

        }
    },
    getSpecificField:function( fieldName ) {
        var field;
        switch( fieldName ) {
            case 'businessHour':
                field = this.items.items[ 5 ].items.items[ 0 ];
                break;
            case 'announcement':
                field = this.items.items[ 5 ].items.items[ 1 ];
                break;
            case 'announcementEn':
                field = this.items.items[ 5 ].items.items[ 2 ];
                break;
        }
        return field;
    },
    handleDisabled:function( method , value ){
        var me = this;
        var openRadio = me.items.items[ 0 ].items.items[ 0 ];
        var closeRadio = me.items.items[ 0 ].items.items[ 1 ];
        if ( method == 'set' ) {

            if ( typeof value != 'undefined' ) {
                if ( value == true ) {
                    openRadio.setValue( false );
                    closeRadio.setValue( true );
                } else if ( value == false ) {
                    openRadio.setValue( true );
                    closeRadio.setValue( false );
                }
            } else {
                openRadio.setValue( true );
                closeRadio.setValue( false );
            }
        } else if ( method == 'get' ) {
            return me.getForm().findField( 'isDisabled' ).getValue().disabled;
        }
    },
    loadStoreData:function( data ) {
        var me = this;
        me.resetAll();
        me.originData = data;
        var form = this.getForm();
        var businessHour = me.getSpecificField( 'businessHour' );
        var announcement = me.getSpecificField( 'announcement' );
        var announcementEn = me.getSpecificField( 'announcementEn' );
        me.setLoading( true );
        if ( data ) {
            me.loadFieldData( 'storeId' , data.storeId );
            me.loadFieldData( 'regionId' , data.regionId );
            me.loadFieldData( 'name' , data.name );
            me.loadFieldData( 'nameEn' , data.nameEn );

            // Delivery
            me.loadFieldData( 'delivery.distance' , data.delivery.distance );
            me.loadFieldData( 'delivery.feeFactor' , data.delivery.feeFactor );
            me.loadFieldData( 'delivery.flatFactor' , data.delivery.flatFactor );
            me.loadFieldData( 'delivery.minimum' , data.delivery.minimum );
            me.loadFieldData( 'delivery.time' , data.delivery.time );
            // Method
            me.loadSpecialField( 'delivery.method' , data.delivery.method );

            if ( data.information ) {
                // Information
                me.loadFieldData( 'information.description' , data.information.description );
                me.loadFieldData( 'information.descriptionEn' , data.information.descriptionEn );
                me.loadFieldData( 'information.rangeIndex1' , data.information.rangeIndex1 );
                me.loadFieldData( 'information.address' , data.information.address );

                // disabled
                me.handleDisabled( 'set' , data.information.disabled );
                // Business Hour
                businessHour.loadBusinessHour( data.information.businessHour );

                // Announcement
                announcement.loadAnnouncement( data.information.announcement );

                // English Announcement
                //announcementEn.loadBusinessHour( data.information.announcementEn );
            }


            // Logo
            me.loadFieldData( 'logo.web' , data.logo.web );
            me.loadFieldData( 'logo.phone' , data.logo.phone );
            me.loadFieldData( 'logo.mini' , data.logo.mini );

            // Sales
            me.loadFieldData( 'sales.day' , data.sales.day );
            me.loadFieldData( 'sales.week' , data.sales.week );
            me.loadFieldData( 'sales.month' , data.sales.month );
            me.loadFieldData( 'sales.total' , data.sales.total );


            // PaymentType
            me.loadSpecialField( 'paymentType' , data.paymentType );

            // Location
            me.loadFieldData( 'location.latitude' , data.location.latitude );
            me.loadFieldData( 'location.longitude' , data.location.longitude );

        }
        me.setLoading( false );
    },
    loadFieldData:function( field , value ) {
        var me = this;
        var form = this.getForm();
        if ( value ) {
            if ( form.findField( field ) ) {
                form.findField( field ).setValue( value );
            }

        }
    },
    loadSpecialField:function( field , value ) {
        var me = this;
        var form = this.getForm();
        if ( field && typeof value[ 0 ] != 'undefined' ) {
            switch ( field ) {
                case 'paymentType' :
                    var cash = false;
                    var card = false;
                    if ( value[ 0 ] == 0 ) {
                        cash = true;
                    }
                    if ( value[ 0 ] == 1 ) {
                        card = true;
                    }
                    if ( value[ 1 ] ) {
                        if ( value[ 1 ] == 0 ) {
                            cash = true;
                        }
                        if ( value[ 1 ] == 1 ) {
                            card = true;
                        }
                    }
                    form.findField( field + '.cash' ).setValue( cash );
                    form.findField( field + '.card' ).setValue( card );
                    break;
                case 'delivery.method' :
                    var type0 = false;
                    var type1 = false;
                    var type3 = false;
                    for ( var i = 0 ; i < value.length ; i ++ ) {
                        if ( value[ i ] == 0 ) {
                            type0 = true;
                        }
                        if ( value[ i ] == 1 ) {
                            type1 = true;
                        }
                        if ( value[ i ] == 3 ) {
                            type3 = true;
                        }
                    }
                    form.findField( field + '.type0' ).setValue( type0 );
                    form.findField( field + '.type1' ).setValue( type1 );
                    form.findField( field + '.type3' ).setValue( type3 );
                    break;
            }
        }

    },
    resetAll:function(){
        //Ext.getStore('Restaurantdetail').loadData( [] , false );
        this.originData = null;
        this.changedInfo = {};
        this.newInfo = {};
        this.newRestaurant = false;
        this.setLoading( false );
        this.setTitle( 'Restaurant Information' );
        this.dockedItems.items[ 1 ].items.items[ 1 ].setText( 'Save Changes' );
        // Reset Business Hour
        this.getSpecificField( 'businessHour' ).resetAll();

        // Reset Announcement
        this.getSpecificField( 'announcement' ).resetAll();

        // Reset English Announcement
        this.getSpecificField( 'announcementEn' ).resetAll();

        this.getForm().reset();
    },
    saveChanges:function() {
        var me = this;
        var restaurantList = Ext.getCmp( 'Employee-Restaurant-Information-RestaurantList' );
        var region = Ext.getCmp( 'Employee-Header-Region' );
        if ( me.newRestaurant == false && restaurantList.getSelectionModel().hasSelection() == false ) {
            Ext.Msg.alert( 'Error' , 'Please choose a restaurant!' );
        } else if ( me.newRestaurant == false ) {
            var changed = me.getChangedInfo();
            if ( changed == true ) {
                me.postData( 'put' , me.changedInfo );
            }

        } else if ( me.newRestaurant == true && region.regionId != -1 ) {
            var valid = me.getNewInfo();
            if ( valid == true ) {
                me.postData( 'put' , me.newInfo );
            }
        }
        me.changedInfo = {};
        me.newInfo = {};

    },
    getNewInfo:function(){
        var me = this;
        var form = me.getForm();
        var valid = false;
        var newInfo = me.newInfo;
        var ErrorNumber = 1;
        var ErrorMessage = '';
        var name = me.forceCompareViewDataNew( 'name' );
        var Error = false ;
        if ( ! name ) {
            ErrorMessage += ErrorNumber + '. Name is Required. <br>'; ErrorNumber ++; Error = true;
        }

        var nameEn = me.forceCompareViewDataNew( 'nameEn' );
        if ( ! nameEn ) {
            ErrorMessage += ErrorNumber + '. English Name is Required. <br>'; ErrorNumber ++; Error = true;
        }

        // Delivery
            var deliveryMinimum = me.forceCompareViewDataNew( 'delivery.minimum' );
            if ( ! deliveryMinimum ) {
                ErrorMessage += ErrorNumber + '. Delivery Minimum is Required. <br>'; ErrorNumber ++; Error = true;
            }

            var deliveryTime = me.forceCompareViewDataNew( 'delivery.time' );
            if ( ! deliveryTime ) {
                ErrorMessage += ErrorNumber + '. Delivery Time is Required. <br>'; ErrorNumber ++; Error = true;
            }

            var deliveryDistance = me.forceCompareViewDataNew( 'delivery.distance' );
            if ( ! deliveryDistance ) {
                ErrorMessage += ErrorNumber + '. Delivery Distance( Miles ) is Required. <br>'; ErrorNumber ++; Error = true;
            }

            var deliveryMethod = me.compareViewArrayData( 'delivery.method' );
            if ( deliveryMethod.length == 0 ) {
                ErrorMessage += ErrorNumber + '. Delivery Method is Required. <br>'; ErrorNumber ++; Error = true;
            } else {
                newInfo.delivery.method = deliveryMethod;
            }

            var deliveryFeeFactor = me.forceCompareViewDataNew( 'delivery.feeFactor' );
            var deliveryFlatFactor = me.forceCompareViewDataNew( 'delivery.flatFactor' );

        // paymentType
            var paymentType = me.compareViewArrayData( 'paymentType' );
            if ( paymentType.length == 0 ) {
                ErrorMessage += ErrorNumber + '. Delivery Method is Required. <br>'; ErrorNumber ++; Error = true;
            } else {
                newInfo.delivery.method = paymentType;
            }

        // logo
            var miniLogo = form.findField( 'logo.mini');
            var phoneLogo = form.findField( 'logo.phone');
            var webLogo = form.findField( 'logo.web');
            if ( miniLogo.fileTransfered == true || phoneLogo.fileTransfered == true || webLogo.fileTransfered == true ) {
                if ( typeof newInfo.logo == 'undefined' ) {
                    newInfo.logo = {};
                }
                if ( miniLogo.fileTransfered == true ) {
                    newInfo.logo.mini = miniLogo.fileData;
                } else {
                    newInfo.logo.mini = '';
                }
                if ( phoneLogo.fileTransfered == true ) {
                    newInfo.logo.phone = phoneLogo.fileData;
                } else {
                    newInfo.logo.phone = '';
                }
                if ( webLogo.fileTransfered == true ) {
                    newInfo.logo.web = webLogo.fileData;
                } else {
                    newInfo.logo.web = '';
                }
            }

        // information
        var informationAddress = me.forceCompareViewDataNew( 'information.address' );
        if ( ! informationAddress ) {
            ErrorMessage += ErrorNumber + '. Address is Required. <br>'; ErrorNumber ++; Error = true;
        }

        var informationDescription = me.forceCompareViewDataNew( 'information.description' );
        if ( ! informationDescription ) {
            ErrorMessage += ErrorNumber + '. Description is Required. <br>'; ErrorNumber ++; Error = true;
        }

        var informationDescriptionEn = me.forceCompareViewDataNew( 'information.description' );
        if ( ! informationDescription ) {
            ErrorMessage += ErrorNumber + '. Description is Required. <br>'; ErrorNumber ++; Error = true;
        }

        var latitude = me.forceCompareViewDataNew( 'location.latitude' );
        if ( ! latitude ) {
            ErrorMessage += ErrorNumber + '. Location Latitude is Empty. <br>';
            ErrorNumber ++; Error = true;
        }

        var longitude = me.forceCompareViewDataNew( 'location.longitude' );
        if ( ! longitude ) {
            ErrorMessage += ErrorNumber + '. Location Longitude is Empty. <br>';
            ErrorNumber ++; Error = true;
        }

        if ( nameChange == true || nameEnChange == true || latitudeChange == true || longitudeChange == true ) {
            changed = true;

        }

        return valid;
    },
    compareViewData:function( field ) {
        var me = this;
        var originData = this.originData;
        var changed = false ;
        var changedInfo = this.changedInfo;
        if ( originData ) {
            var fieldArray = field.split( '.' );


            var data = this.getForm().findField( field ).getValue();

            // Check if data exist
            if ( typeof data != 'undefined' ) {
                // Copy Origin Data to dataObject
                var dataObject = JSON.parse( JSON.stringify( originData ) );
                dataObject = dataObject[ fieldArray[ 0 ] ];

                if ( fieldArray.length == 1 ) {

                } else if ( fieldArray.length == 2 ) {
                    dataObject = dataObject[ fieldArray[ 1 ] ];

                }

                if ( dataObject != data || typeof dataObject == 'undefined' ) {

                    changed = true;
                    //if ( field == 'delivery.time' ) console.log( changed ); 
                }
            }
        }

        return changed;
    },
    forceCompareViewData:function( field ) {
        var me = this;
        var originData = this.originData;
        var changedInfo = this.changedInfo;
        if ( originData ) {
            var fieldArray = field.split( '.' );
            var data = this.getForm().findField( field ).getValue();
            if ( typeof data != 'undefined' ) {
                //console.log( field , fieldArray );
                var newData = data;
                if ( fieldArray.length == 2 ) {
                    if ( typeof changedInfo[ fieldArray[ 0 ] ] == 'undefined' ) {
                        changedInfo[ fieldArray[ 0 ] ] = {};
                    }
                    changedInfo[ fieldArray[ 0 ] ][ fieldArray[ 1 ] ] = newData;
                } else {
                    changedInfo[ fieldArray[ 0 ] ] = newData;
                }


            }
        }

    },
    forceCompareViewDataNew:function( field ) {
        var me = this;
        var newInfo = this.newInfo;

        var fieldArray = field.split( '.' );
        var data = this.getForm().findField( field ).getValue();
        if ( typeof data != 'undefined' ) {
            //console.log( field , fieldArray );
            var newData = data;
            if ( fieldArray.length == 2 ) {
                if ( typeof newInfo[ fieldArray[ 0 ] ] == 'undefined' ) {
                    newInfo[ fieldArray[ 0 ] ] = {};
                }
                newInfo[ fieldArray[ 0 ] ][ fieldArray[ 1 ] ] = newData;
            } else {
                newInfo[ fieldArray[ 0 ] ] = newData;
            }
        }


    },
    getChangedInfo:function() {
        var me =this;
        var form = me.getForm();
        var originData = me.originData;
        var changedString = '';
        var changedInfo = this.changedInfo;
        var changed = false;
        changedInfo.storeId = form.findField( 'storeId' ).getValue();
        changedInfo.regionId = form.findField( 'regionId' ).getValue();
        var nameChange = me.compareViewData( 'name' );
        if ( nameChange == true ) me.forceCompareViewData( 'name' );

        var nameEnChange = me.compareViewData( 'nameEn' );
        if ( nameEnChange == true ) me.forceCompareViewData( 'nameEn' );

        var latitudeChange = me.compareViewData( 'location.latitude' );
        if ( latitudeChange == true ) me.forceCompareViewData( 'latitudeChange' );

        var longitudeChange = me.compareViewData( 'location.longitude' );
        if ( longitudeChange == true ) me.forceCompareViewData( 'longitudeChange' );

        if ( nameChange == true || nameEnChange == true || latitudeChange == true || longitudeChange == true ) {
            changed = true;

        }
        // Delivery
        var deliveryMinimumChange = me.compareViewData( 'delivery.minimum' );
        var deliveryTimeChange = me.compareViewData( 'delivery.time' );
        var deliveryFlatFactorChange = me.compareViewData( 'delivery.flatFactor' );
        var deliveryFeeFactorChange = me.compareViewData( 'delivery.feeFactor' );
        var deliveryDistanceChange = me.compareViewData( 'delivery.distance' );
        var deliveryMethodChange = me.compareViewArrayData( 'delivery.method' , 'check' );

        if ( deliveryMinimumChange == true || deliveryTimeChange == true || deliveryFlatFactorChange == true || deliveryFeeFactorChange == true || deliveryDistanceChange == true || deliveryMethodChange == true ) {
            me.forceCompareViewData( 'delivery.minimum' );
            me.forceCompareViewData( 'delivery.time' );
            me.forceCompareViewData( 'delivery.flatFactor' );
            me.forceCompareViewData( 'delivery.feeFactor' );
            me.forceCompareViewData( 'delivery.distance' );
            changedInfo.delivery.method =  me.compareViewArrayData( 'delivery.method' , 'get' );
            changed = true;
        }

        // Information
        var businessHour = me.getSpecificField( 'businessHour');
        var announcement = me.getSpecificField( 'announcement');
        var announcementEn = me.getSpecificField( 'announcementEn');

        var informationAddressChange = me.compareViewData( 'information.address' );
        var informationDescriptionChange = me.compareViewData( 'information.description' );
        var informationDescriptionEnChange = me.compareViewData( 'information.descriptionEn' );
        var informationRangeIndex1Change = me.compareViewData( 'information.rangeIndex1' );
        var businessHourChange = businessHour.changed;
        var announcementChange = announcement.changed;
        var announcementEnChange = announcementEn.changed;
        var disabledChange = false;
        if ( originData.information ) {
            if ( typeof originData.information.disabled != 'undefined' ) {
                if ( originData.information.disabled == me.handleDisabled( 'get' , false ) ) {

                } else {
                    disabledChange = true
                }
            } else {
                disabledChange = true;
            }
        }

        if ( informationAddressChange == true || informationDescriptionChange == true || informationDescriptionEnChange == true || informationRangeIndex1Change == true ||
            businessHourChange == true || announcementChange == true || announcementEnChange == true || disabledChange == true ) {
            me.forceCompareViewData( 'information.address' );
            me.forceCompareViewData( 'information.description' );
            me.forceCompareViewData( 'information.descriptionEn' );
            me.forceCompareViewData( 'information.rangeIndex1' );
            changedInfo.information.businessHour = businessHour.getViewData();
            changedInfo.information.announcement = announcement.getViewData();
            changedInfo.information.announcementEn = announcementEn.getViewData();

            changedInfo.information.disabled = me.handleDisabled( 'get' ,false );
            changed = true;
        }

        // PaymentType
        var paymentTypeChange = me.compareViewArrayData( 'paymentType' , 'check' );
        //console.log( paymentTypeChange);
        if ( paymentTypeChange == true ) changedInfo.paymentType = me.compareViewArrayData( 'paymentType' , 'get' );
        // Logos
        var miniLogo = form.findField( 'logo.mini');
        var phoneLogo = form.findField( 'logo.phone');
        var webLogo = form.findField( 'logo.web');
        if ( miniLogo.fileTransfered == true || phoneLogo.fileTransfered == true || webLogo.fileTransfered == true ) {
            if ( typeof changedInfo.logo == 'undefined' ) {
                changedInfo.logo = {};
            }
            if ( miniLogo.fileTransfered == true ) {
                changedInfo.logo.mini = miniLogo.fileData;
            } else {
                changedInfo.logo.mini = '';
            }
            if ( phoneLogo.fileTransfered == true ) {
                changedInfo.logo.phone = phoneLogo.fileData;
            } else {
                changedInfo.logo.phone = '';
            }
            if ( webLogo.fileTransfered == true ) {
                changedInfo.logo.web = webLogo.fileData;
            } else {
                changedInfo.logo.web = '';
            }
        }
        console.log( changedInfo );
        return changed;


    },
    compareViewArrayData:function( field , method ) {
        var me = this;
        var form = me.getForm();
        var originData = me.originData;

        var valueArray = [];
        var dataArray = [];
        switch ( field ) {
            case 'delivery.method':

                if ( originData.delivery ) {
                    if ( originData.delivery.method ) {
                        dataArray = originData.delivery.method;
                    }
                }
                if ( form.findField( 'delivery.method.type0').getValue() == 1 ) {
                    valueArray.push( 0 );
                }
                if ( form.findField( 'delivery.method.type1').getValue() == 1 ) {
                    valueArray.push( 1 );
                }
                if ( form.findField( 'delivery.method.type3').getValue() == 1 ) {
                    valueArray.push( 3 );
                }
                break;
            case 'paymentType':
                if ( originData.paymentType ) {
                    dataArray = originData.paymentType;
                }
                if ( form.findField( 'paymentType.cash').getValue() == 1 ) {
                    valueArray.push( 0 );
                }
                if ( form.findField( 'paymentType.card').getValue() == 1 ) {
                    valueArray.push( 1 );
                }
                break;
        }

        var changed = false;
        //console.log( valueArray );
        //console.log( dataArray );
        if ( method == 'check' ) {
            if ( ( valueArray.length > 0 && dataArray.length == 0 ) || ( valueArray.length == 0 && dataArray.length > 0 ) ) {
                changed == true;
            } else if ( valueArray.length == 0 && dataArray.length == 0 ) {

            } else {
                for ( var i = 0 ; i < valueArray.length ; i ++ ) {

                    if ( Ext.Array.contains( dataArray, valueArray[ i ] ) == false ) {
                        changed = true;
                        break;
                    }
                }
                for ( var i = 0 ; i < dataArray.length ; i ++ ) {

                    if ( Ext.Array.contains( valueArray, dataArray[ i ] ) == false ) {

                        changed = true;
                        break;
                    }
                }
                //console.log( changed );
            }

        } else if ( method == 'get' ) {
            return valueArray;
        }
        return changed;
    },

    postData:function( method , postData ) {
        var me = this;
        Ext.Ajax.request({
            url : Ext.getCmp( 'Employee-Header').getServerUrl() + '/store' ,
            headers: Ext.getCmp( 'Employee-Header').getHeaders( method ) ,
            method : method ,
            jsonData : postData ,
            disableCaching:false,
            success : function ( result , request ) {
                me.changedInfo = {};
                me.newINfo = {};
                var response = JSON.parse( result.responseText );
                var Error = Ext.getCmp( 'Employee-Header').processErrorMessage( response );
                if ( Error == true ) {

                } else {
                    Ext.Msg.alert( 'Success' , 'Change has been saved!' );
                }
            },
            failure : function ( result , request ) {
                me.changedInfo = {};
                me.newINfo = {};
                Ext.Msg.alert( 'Failure' , 'Unknown Error , Please Contact Technique Support.' );
            }
        });
    },
    setGeoLocation:function() {
        var me = this;
        var address = me.getForm().findField( 'information.address').getValue();
        if ( address ) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': address }, function(results, status) {
                var location = results[ 0 ].geometry.location;
                var latitude = location.lat();
                var longitude = location.lng();
                me.getForm().findField( 'location.latitude').setValue( latitude );
                me.getForm().findField( 'location.longitude').setValue( longitude );
            });
        }

    }
});



