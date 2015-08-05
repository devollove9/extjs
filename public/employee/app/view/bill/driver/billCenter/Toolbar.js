/**
 * Created by devo on 7/31/2015.
 */


Ext.define('517Employee.view.bill.driver.billCenter.Toolbar', {
    extend: 'Ext.panel.Panel',
    requires: [
    ],

    xtype: 'employee-bill-driver-billCenter-toolbar',
    title: '517 Employee Bill Service : Driver Bill',
    header:{ height:30 ,padding:'0 0 0 10',margin:'0 0 0 0'},
    bodyStyle:{ "background-color":"white",'border-color' : '#c1c1c1'},
    layout: 'absolute',
    autoScroll:true,

    filterByString:'',
    filterOperator:'',
    filterValue:'',

    items:[
        {
            x:0 , y:17 , minHeight:94 , width:770 ,
            frame:false,
            bodyStyle:{'border-width':'0px',padding:0, "background-color":"none", },
            xtype: 'form',
            autoScroll:true,
            defaults: { labelWidth: 0 , margin:'0 0 10 25' },
            items:[
                {
                    xtype: 'fieldcontainer',
                    combineErrors: true,
                    margin:'0 0 10 20',
                    layout:'hbox',
                    defaultType: 'textfield',
                    chosenField:'Search',
                    defaults: {
                        anchor: '100%',
                        labelAlign: 'right',
                        labelWidth:0
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            name:'operatingType',
                            width:150,
                            items: [
                                {
                                    boxLabel: 'Search',
                                    checked: true,
                                    name: 'types',
                                    inputValue: 0
                                }, {
                                    boxLabel: 'New Bill',
                                    name: 'types',
                                    inputValue: 1
                                },
                            ],
                            listeners:{
                                change:function( field , newVal , oldVal ) {
                                    var me = this;
                                    var container = this.up();
                                    if ( oldVal.types == 1 && newVal.types == 0 ) {
                                        container.chosenField = 'Search';
                                        container.items.items[ 1 ].setText( 'Search' );
                                        container.up().hideFields( 'New Bill')
                                    } else if ( oldVal.types == 0 && newVal.types == 1 ) {
                                        container.chosenField = 'New Bill';
                                        container.items.items[ 1 ].setText( 'Generate' );
                                        container.up().hideFields( 'Search')
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            margin:'0 20 0 50',
                            width:84,
                            text:'Search',
                            handler:function(){
                                this.up().up().doOperation();
                            }
                        },
                        {
                            xtype: 'button',
                            width:104,
                            name:'circleType',
                            currentMethod:'Normal',
                            text:'Custom Cycle',
                            handler:function(){
                                if ( this.currentMethod == 'Normal') {
                                    this.setText( 'Normal Cycle' );
                                    this.currentMethod = 'Custom';
                                    this.up().up().hideCircle( 'Normal' );
                                } else if ( this.currentMethod == 'Custom') {
                                    this.setText( 'Custom Cycle' );
                                    this.currentMethod = 'Normal';
                                    this.up().up().hideCircle( 'Custom' );
                                }
                            }
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    combineErrors: true,
                    layout:'hbox',
                    defaultType: 'textfield',
                    defaults: {
                        anchor: '100%',
                        labelAlign: 'right',
                        margin: '0 5 0 0',
                        labelWidth:0
                    },
                    items: [
                        {
                            xtype : 'displayfield',
                            value : 'Billing Circle : ',

                        },
                        {
                            xtype:'combobox',
                            store:Ext.create( '517Employee.store.bill.driver.billCenter.DriverBillingCycle' ),
                            name:'driverBillingCycle',
                            displayField: 'name',
                            editable:false,
                            valueField: 'periods',
                            width:160,
                            listeners: {
                                afterRender: function(combo) {
                                    combo.setValue( combo.getStore().getAt( 0 ).get( 'periods' ) );
                                },
                                change:function( combo ){
                                    this.up().up().up().setDocumentNo();
                                }
                            }
                        },
                        {
                            xtype : 'displayfield',
                            value : ' from : '

                        },
                        {
                            // Filter Value 1
                            xtype: 'datefield',
                            width:140,
                            name: 'start',
                            maxValue: new Date(),
                            listeners: {
                                change: function(field , newVal ,oldVal ,func ) {
                                    var end_field = field.up().items.items[ 5 ];
                                    if ( typeof newVal == 'object' ) {
                                        end_field.setMinValue( field.getValue() );
                                    }
                                }
                            }
                        },
                        {
                            xtype : 'displayfield',
                            value : ' to ',
                            width : 30 ,
                        },
                        {
                            xtype: 'datefield',
                            width:140,
                            name: 'end',
                            minValue: 0,
                            maxValue: new Date(),
                            listeners: {
                                change: function( field , newVal ,oldVal ,func ) {
                                    var start_field = field.up().items.items[ 3 ];
                                    if ( typeof newVal == 'object'){
                                        start_field.setMaxValue(field.getValue());
                                    }
                                }
                            }
                        }

                    ],
                    listeners:{
                        afterRender:function( field ){
                            field.showFields( 'Normal Cycle' );
                        }
                    },
                    showFields:function( fieldName ) {
                        var me = this;
                        switch ( fieldName ) {
                            case 'Custom Cycle':
                                this.items.items[ 1 ].disable();
                                this.items.items[ 2 ].show();
                                this.items.items[ 3 ].show();
                                this.items.items[ 4 ].show();
                                this.items.items[ 5 ].show()
                                break;
                            case 'Normal Cycle':
                                this.items.items[ 1 ].enable();
                                this.items.items[ 2 ].hide();
                                this.items.items[ 3 ].hide()
                                this.items.items[ 4 ].hide();
                                this.items.items[ 5 ].hide()
                                break;
                            case 'Between':
                                this.items.items[ 4 ].show();
                                this.items.items[ 5 ].show()
                                break;
                        }
                    }

                },
                // Search
                {
                    xtype: 'fieldcontainer',
                    combineErrors: true,
                    layout:'hbox',
                    defaultType: 'textfield',
                    defaults: {
                        anchor: '100%',
                        labelAlign: 'right',
                        labelWidth:0,
                        margin: '0 5 0 0'
                    },
                    items:[
                        {
                            xtype:'displayfield',
                            value:'Document No. :'
                        },
                        {
                            xtype: 'textfield',
                            name:'documentNoSearch',
                            width:150,
                            maskRe: /[0-9a-zA-Z]/
                        },
                        {
                            xtype:'displayfield',
                            value:'(Optional)'
                        },
                        {
                            xtype:'hidden',
                            name:'driverIdSearch'
                        }
                    ],
                    setGenerateInfo:function( name , driverId ) {
                        var me = this;
                        //me.items.items[ 1 ].setValue( name );
                        me.items.items[ 3 ].setValue( driverId );
                    }
                },
                // New Bill
                {
                    xtype:'fieldcontainer',
                    layout:'hbox',
                    defaultType: 'textfield',
                    defaults: {
                        anchor: '100%',
                        labelAlign: 'right',
                        labelWidth:0
                    },
                    items:[
                        {
                            xtype:'fieldset',
                            autoScroll:true,
                            padding:'5 5 5 5',
                            items:[
                                {
                                    xtype: 'fieldcontainer',
                                    combineErrors: true,
                                    layout:'hbox',
                                    defaultType: 'textfield',
                                    defaults: {
                                        anchor: '100%',
                                        labelAlign: 'right',
                                        margin: '0 5 0 0',
                                        labelWidth:0
                                    },
                                    items:[
                                        {
                                            xtype:'displayfield',
                                            value:'Document No. : '
                                        },
                                        {
                                            name:'documentNo' ,
                                            width:150,
                                            maskRe: /[0-9a-zA-Z]/,
                                            allowBlank: false,
                                            margin:'0 10 0 0'
                                        },
                                        {
                                            xtype:'displayfield',
                                            value:'Adjustments : '
                                        },
                                        {
                                            name: 'adjustment' ,
                                            width:70,
                                            value:'0',
                                            enforceMaxLength: true,
                                            maxLength: '10',
                                            maskRe: /[\-0-9.]/,
                                            margin:'0 10 0 5'
                                        },
                                        {
                                            xtype:'displayfield',
                                            value:'Comments : '
                                        },
                                        {
                                            name: 'adjustmentComment' ,
                                            value:' ',
                                            flex: 4,
                                            margin:'0 10 0 5'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    combineErrors: true,
                                    layout:'hbox',
                                    defaultType: 'textfield',
                                    defaults: {
                                        anchor: '100%',
                                        labelAlign: 'right',
                                        margin: '0 5 0 0',
                                        labelWidth:0
                                    },
                                    items:[
                                        {
                                            xtype:'displayfield',
                                            value:'Hourly : ',
                                        },
                                        {
                                            name: 'hourly' ,
                                            width: 60,
                                            allowBlank: false,
                                            margin:'0 15 0 5',
                                            value:0.15,
                                        },
                                        {
                                            xtype:'displayfield',
                                            value:' Driver : '
                                        },
                                        {
                                            xtype:'displayfield',
                                            value:' '
                                        },
                                        {
                                            xtype:'hidden',
                                            name:'driverId'
                                        }
                                    ]
                                },
                            ],
                            setGenerateInfo:function( name , driverId ) {
                                var me = this;
                                me.items.items[ 1 ]. items.items[ 3 ].setValue( name );
                                me.items.items[ 1 ]. items.items[ 4 ].setValue( driverId );
                            },
                            setDocumentNo:function( documentNo ) {
                                var me = this;
                                me.items.items[ 0 ]. items.items[ 1 ].setValue( documentNo );
                            }
                        },
                        {
                            xtype: 'displayfield',
                            value: 'X',
                            margin:'25 0 0 20',
                            style: {
                                'border-width':'0px',
                                cursor:'pointer'
                            },
                            listeners:{
                                render: function( field , b , c , d , e , f , g ) {
                                    this.getEl().on('click', function() {
                                        if ( field.up().up().items.items.length <= 4 ) {

                                        } else {
                                            field.up().up().removeItems( field.up() );
                                        }
                                    });
                                }
                            }
                        }
                    ],
                    listeners:{
                        afterRender:function( field ) {
                            field.hide();
                        }
                    },

                }


            ],
            addBillInformation:function( driver ) {
                var me = this;
                this.add( this.createBillContainer( driver ) );
            },
            createBillContainer:function( driver ) {

            },
            removeItems:function( field ) {
                this.remove( field );
            },
            hideFields:function( fieldName ) {
                var me = this;
                if ( fieldName == 'Search' ) {
                    me.items.items[ 2 ].hide();

                    for ( var i = 3 ; i < me.items.items.length ; i ++ ) {
                        me.items.items[ i ].show();
                    }
                } else if ( fieldName == 'New Bill' ) {
                    me.items.items[ 2 ].show();
                    for ( var i = 3 ; i < me.items.items.length ; i ++ ) {
                        me.items.items[ i ].hide();
                    }
                }
            },
            hideCircle:function( circleType ) {
                switch ( circleType ) {
                    case 'Custom':
                        this.items.items[ 1 ].showFields( 'Normal Cycle' );
                        break;
                    case 'Normal':
                        this.items.items[ 1 ].showFields( 'Custom Cycle' );
                        break;
                }
            },
            removeSearch:function( fieldContainer ) {
                this.remove( fieldContainer );
                if ( this.items.items.length > 1 ) {
                    this.items.items[ 1 ].items.items[ 0 ].setValue( 'Search By:' );
                }
            },
            doOperation:function() {
                Ext.getCmp( 'Employee-Bill-Driver-BillCenter-BillList').refreshView();
            },
            addSearchContainer:function() {
                var form = this;
                var label = 'And';
                if ( form.items.items.length == 1 ) {
                    label = 'Search By:' ;
                }
                var fieldContainer = form.up().createFieldContainer( label );
                this.add( fieldContainer );
            }
        }
    ],
    setDocumentNo:function() {
        var billingCircle = this.getBillingCircle();
        var placeDateArray = billingCircle.split( ',' );
        var periodStart = parseInt( placeDateArray[ 0 ] );
        var periodEnd = parseInt( placeDateArray[ 1 ] );
        var time_string = '';
        var start_date = new Date( periodStart / 1000 );
        var end_date = new Date( periodEnd / 1000 );
        var year = start_date.getFullYear(); time_string += year;

        var start_month = start_date.getMonth() + 1 ;
        if ( start_month < 10 ) time_string += '0' + start_month;
        else time_string += start_month;

        var start_day = start_date.getDate();
        if ( start_day < 10 ) time_string += '0' + start_day;
        else time_string += start_day;

        var end_month = end_date.getMonth() + 1 ;
        if ( end_month < 10 ) time_string += '0' + end_month;
        else time_string += end_month;

        var end_day = end_date.getDate();
        if ( end_day < 10 ) time_string += '0' + end_day;
        else time_string += end_day;

        var time_string = 'D' + time_string;
        this.items.items[ 0 ].items.items[ 3 ].items.items[ 0 ].setDocumentNo( time_string );
    },
    setGenerateInfo:function( driverName , driverId ) {
        this.items.items[ 0 ].items.items[ 2 ].setGenerateInfo( driverName , driverId );
        this.items.items[ 0 ].items.items[ 3 ].items.items[ 0 ].setGenerateInfo( driverName , driverId );
    },
    getCurrentType:function(){
        var me = this;
        // Get Type Radios
        var typeRadios = this.items.items[ 0 ].items.items[ 0 ];
        var chosenField = typeRadios.chosenField;
        return chosenField;
    },
    getCurrentCircleType:function(){
        var me = this;
        // Get Type Radios
        var billingCircleField = this.items.items[ 0 ].items.items[ 0 ].items.items[ 2 ];
        var currentMethod = billingCircleField.currentMethod;
        return currentMethod;
    },
    getBillingCircle:function(){
        var me = this;
        var periodStart = 0;
        var periodEnd = ( new Date() ).getTime() * 1000;
        var billingCircle = periodStart + ',' + periodEnd;
        var form = this.items.items[ 0 ].getForm();
        if ( me.getCurrentCircleType() == 'Custom' ) {
            if ( form.findField( 'start').getValue() && form.findField( 'end' ).getValue() ) {
                periodStart = form.findField( 'start').getValue().getTime() * 1000;
                periodEnd = form.findField( 'end').getValue().getTime() * 1000;
            }
            billingCircle = periodStart + ',' + periodEnd;
        } else if ( me.getCurrentCircleType() == 'Normal' ) {
            // Billing Circle Combo
            var billingCircleCombo = this.items.items[ 0 ].items.items[ 1 ].items.items[ 1 ];
            if ( billingCircleCombo.getValue() ) {
                if ( billingCircleCombo.getValue() == 'default' ) {
                } else {
                    billingCircle = billingCircleCombo.getValue();
                }
            }
        }
        return billingCircle;
    },
    getFieldItems:function( itemName ) {
        var form = this.items.items[ 0 ];
        //console.log( form );
        var itemValue = form.getForm().findField( itemName ).getValue();

        return itemValue;
    },
    updateSearchParams:function( params , jsonData ) {
        var region = Ext.getCmp( 'Employee-Header-Region' );
        var me =this;
        var flag = true;
        var periodStart = 0;
        var periodEnd = ( new Date() ).getTime() * 1000;
        // Get Billing Circle
        var billingCircle = me.getBillingCircle();
        if ( billingCircle != 'default' ) {
            var placeDateArray = billingCircle.split( ',' );
            periodStart = parseInt( placeDateArray[ 0 ] );
            periodEnd = parseInt( placeDateArray[ 1 ] );
        }

        //console.log(  me.getCurrentType() );
        if ( me.getCurrentType() == 'Search' ) {
            params.periodStart = periodStart;
            params.periodEnd = periodEnd;
            jsonData.periodStart = periodStart;
            jsonData.periodEnd = periodEnd;
            // Get Document No
            var documentNo = me.getFieldItems( 'documentNoSearch' );
            var driverId = me.getFieldItems( 'driverIdSearch' );
            console.log( driverId );
            if ( ! documentNo ) {

            } else {
                params.documentNo = documentNo;
                jsonData.documentNo = documentNo;
            }
            params.driverId = driverId;
            jsonData.driverId = driverId;
        } else if ( me.getCurrentType() == 'New Bill' ) {
            params.start = periodStart;
            params.end = periodEnd;
            jsonData.start = periodStart;
            jsonData.end = periodEnd;
            // Get Document No
            var documentNo = me.getFieldItems( 'documentNo' );
            var adjustment = me.getFieldItems( 'adjustment' );
            var adjustmentComment = me.getFieldItems( 'adjustmentComment' );
            var hourly = me.getFieldItems( 'hourly' );
            var driverId = me.getFieldItems( 'driverId' );

            if ( typeof documentNo != 'undefined' && typeof adjustment != 'undefined' && typeof adjustmentComment != 'undefined' &&
                typeof driverId != 'undefined' ) {
                params.documentNo = documentNo; jsonData.documentNo = documentNo;
                params.adjustment = parseInt( adjustment ); jsonData.adjustment = parseInt( adjustment );
                params.adjustmentComment = adjustmentComment; jsonData.adjustmentComment = adjustmentComment;
                params.hourly = parseFloat( hourly ); jsonData.hourly = parseFloat( hourly );
                params.driverId = driverId; jsonData.driverId = driverId;
            }
            else {
                flag = false;
            }
        }

        var regionId = region.regionId;
        params.regionId = regionId;
        jsonData.regionId = regionId;
        return flag;
    },



});