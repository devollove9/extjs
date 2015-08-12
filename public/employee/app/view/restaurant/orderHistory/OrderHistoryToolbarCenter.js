

Ext.define('517Employee.view.restaurant.orderHistory.OrderHistoryToolbarCenter', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.restaurant.orderHistory.OrderHistoryToolbarController'
    ],   
    xtype: 'employee-restaurant-orderHistory-toolbar-center',
    controller: 'employee-restaurant-orderHistory-toolbar-controller',
    bodyStyle:{ "background-color":"white",'border-color' : 'white','border-right':'1px solid #c1c1c1' , padding:0 },

    frame:false ,// border:false,
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
            defaults: { labelWidth: 0 },
            items:[ 
                    {
                        margin: '0 0 0 0',
                        xtype: 'fieldcontainer',
                        combineErrors: true,
                        layout:'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            anchor: '100%',
                            margin:'0 5 0 5' ,
                            labelAlign: 'right',
                            labelWidth:0
                        },
                        items: [
                            {
                                xtype : 'displayfield',
                                value : 'Custom Search: '
                            },
                            {
                                xtype: 'button',
                                //fieldLabel: 'And ',
                                //labelWidth:35,
                                width:84,
                                //height:84,
                                text:'Add Filter',
                                handler:function(){
                                    this.up().up().addSearchContainer();
                                }
                            },
                            {
                                xtype: 'button',
                                width:84,
                                //height:84,
                                text:'Search',
                                handler:'searchOrder'
                            },
                            {
                                xtype : 'tbfill'
                            }
          
                        ]
                        
                    }
            ],
            listeners:{
                afterRender:function() {
                    //console.log( this );
                    var fieldContainer = this.up().createFieldContainer( 'Search By:' );
                    this.add( fieldContainer );
                }
            },

            removeSearch:function( fieldContainer ) {
                this.remove( fieldContainer );
                if ( this.items.items.length > 1 ) {
                    this.items.items[ 1 ].items.items[ 0 ].setValue( 'Search By:' );
                }
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
 
    doNavigation:function(panel){
        console.log( panel );
    },

    updateSearchParams:function( params ) {
        var me =this;
        var searchArray = this.items.items[ 0 ].items.items;
        var filterBy = '';
        var filterOperator = '';
        var filterValue = '';
        if ( searchArray.length > 1 ) {
            for ( var i = 1 ; i < searchArray.length ; i ++ ) {
                var fieldContainer = searchArray[ i ];

                var fieldFilterBy = fieldContainer.items.items[ 1 ].getValue();
                var fieldFilterOperator = fieldContainer.items.items[ 2 ].getValue();
                var fieldFilterValueStart = fieldContainer.items.items[ 3 ].getValue();

                var validate = false;
                if ( fieldFilterOperator ) {
                    me.updateFilters( filterBy , fieldFilterBy , 'falseNull' , '' , 'falseNull' , '' , 'falseNull' );
                    if ( fieldFilterBy == 'placeDate' ) {
                        var fieldFilterValueStartBegin = me.getTimeOfDay( fieldFilterValueStart , 'start' ) * 1000;
                        var fieldFilterValueStartEnd = me.getTimeOfDay( fieldFilterValueStart , 'end' ) * 1000;

                        if ( fieldFilterOperator == 'between' ) {
                            var fieldFilterValueEnd = fieldContainer.items.items[ 5 ].getValue();
                            var fieldFilterValueEndEnd = me.getTimeOfDay( fieldFilterValueEnd , 'end' ) * 1000;
                            me.updateFilters( filterBy , fieldFilterBy , filterOperator , 'gt,lt' , filterValue , fieldFilterValueStartBegin , fieldFilterValueEndEnd );
                        } else if ( fieldFilterOperator == 'equals' ) {
                            me.updateFilters( filterBy , fieldFilterBy , filterOperator , 'gt,lt' , filterValue , fieldFilterValueStartBegin , fieldFilterValueStartEnd );
                        } else if ( fieldFilterOperator == 'ne' ) {
                            me.updateFilters( filterBy , fieldFilterBy , filterOperator , 'lt,gt' , filterValue , fieldFilterValueStartBegin , fieldFilterValueStartEnd );
                        } else if ( fieldFilterOperator == 'gt' || fieldFilterOperator == 'lte' ) {
                            me.updateFilters( 'falseNull' , fieldFilterBy , filterOperator , fieldFilterOperator , filterValue , fieldFilterValueStartEnd , 'falseNull' );
                        } else if ( fieldFilterOperator == 'lt' || fieldFilterOperator == 'gte' ) {
                            me.updateFilters( 'falseNull' , fieldFilterBy , filterOperator , fieldFilterOperator , filterValue , fieldFilterValueStartBegin , 'falseNull' );
                        }
                    } else {
                        if ( fieldFilterOperator == 'between' ) {
                            var fieldFilterValueEnd = fieldContainer.items.items[ 5 ].getValue();
                            me.updateFilters( filterBy , fieldFilterBy , filterOperator , 'gte,lte' , filterValue , fieldFilterValueStart , fieldFilterValueEnd );
                        } else {
                            me.updateFilters( 'falseNull' , '' , filterOperator , fieldFilterOperator , filterValue , fieldFilterValueStart , 'falseNull' );
                        }
                    }

                }
            }
        }
        console.log( this.filterByString );
        params.filterBy = this.filterByString;
        params.filterOperator = this.filterOperator;
        params.filterValue = this.filterValue;
        this.filterByString = '';
        this.filterOperator = '';
        this.filterValue = '';
    },

    updateFilters:function( filterByVal , fieldFilterByVal , filterOperatorVal , fieldFilterOperatorVal , filterValueVal , filterValueAVal , filterValueBVal ) {
        if ( filterByVal != 'falseNull' ) {
            if ( this.filterByString == '' ) {
                this.filterByString = fieldFilterByVal;
            } else {
                this.filterByString = this.filterByString + ',' + fieldFilterByVal;
            }
            this.filterByString += filterByVal;
        }
        if ( filterOperatorVal != 'falseNull' ) {
            if ( this.filterOperator == '' ) {
                this.filterOperator = fieldFilterOperatorVal;
            } else {
                this.filterOperator = this.filterOperator + ',' + fieldFilterOperatorVal;
            }
        }

        if ( filterValueVal != 'falseNull' ) {
            if ( this.filterValue == '' ) {
                if ( filterValueBVal != 'falseNull' ) {
                    this.filterValue =  filterValueAVal + ',' + filterValueBVal;
                } else {
                    this.filterValue = filterValueAVal;
                }
            } else {
                if ( filterValueBVal != 'falseNull' ) {
                    this.filterValue = this.filterValue + ',' + filterValueAVal + ',' + filterValueBVal;
                } else {
                    this.filterValue = this.filterValue + ',' + filterValueAVal;
                }
            }
        }


    },

    createFieldContainer:function( label ){
        var fieldContainer = {
            margin: '0 0 3 5',
            xtype: 'fieldcontainer',
            combineErrors: true,
            layout:'hbox',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%',
                margin:'0 5 0 5' ,
                labelAlign: 'right',
                labelWidth:0,
            },
            items: [
                {
                    xtype : 'displayfield',
                    value : label,
                    width : 70
                },
                {
                    xtype:'combobox',
                    store:Ext.create( '517Employee.store.restaurant.orderHistory.SearchFilters' ),
                    name:'orderFilterType',
                    displayField: 'name',
                    editable:false,
                    valueField: 'filterBy',
                    width:140,
                    //margin: '0 0 0 6',
                    listeners: {
                        afterrender: function(combo) {
                            combo.setValue( combo.getStore().getAt(0).get('filterBy') );

                        },
                        change:function ( combo ) {
                            combo.up().addInputField();
                        }
                    }
                },
                {
                    xtype:'combobox',
                    store:Ext.create( '517Employee.store.restaurant.orderHistory.SearchOperators' ),
                    name:'orderFilterComparator',
                    displayField: 'name',
                    editable:false,
                    valueField: 'filterOperator',
                    width:140,
                    listeners: {
                        change:function( field , newVal , oldVal , func ){
                            var and_field = field.up().items.items[ field.up().items.items.length -3 ] ;
                            var end_field = field.up().items.items[ field.up().items.items.length -2 ] ;
                            var start_field = field.up().items.items[ field.up().items.items.length -4 ] ;

                            if ( oldVal != 'between' && newVal == 'between' ) {
                                end_field.show();
                                and_field.show();
                            } else if ( oldVal == 'between' && newVal != 'between' ) {
                                if ( field.up().items.items[ 1].getValue == 'placeDate' ) {
                                    start_field.setMaxValue(new Date());
                                    end_field.setMinValue(0);
                                }
                                end_field.hide();
                                and_field.hide();
                            }

                        }
                    }
                }
            ],
            addInputField:function(){
                var ToolbarCenter = this.up().up();
                var fieldContainer = this;
                var filterBy = fieldContainer.items.items[ 1 ].getValue();
                var filterOperator = fieldContainer.items.items[ 2 ].getValue();
                ToolbarCenter.addFields( fieldContainer );

            },
            removeInpufField:function( ){

            }
        };
        return fieldContainer;
    },

    removeFields:function( fieldContainer ) {
        if ( fieldContainer.items.items[ 6 ] ) {
            fieldContainer.remove( fieldContainer.items.items[ 6 ] );
        }
        if ( fieldContainer.items.items[ 5 ] ) {
            fieldContainer.remove( fieldContainer.items.items[ 5 ] );
        }
        if ( fieldContainer.items.items[ 4 ] ) {
            fieldContainer.remove( fieldContainer.items.items[ 4 ] );
        }
        if ( fieldContainer.items.items[ 3 ] ) {
            fieldContainer.remove( fieldContainer.items.items[ 3 ] );
        }
    },

    addFields:function( fieldContainer ) {
        this.removeFields( fieldContainer );
        var me = this;
        var filterByField = fieldContainer.items.items[ 1 ];
        var filterBy = '';

        filterByField.getStore().each(function(record, idx) {
            if ( record.data.filterBy == filterByField.getValue() ) {
                //console.log( record );
                filterBy = record.data.filterBy;
            }
        });
        switch ( filterBy ) {
            case 'placeDate':
                me.addComboFields( fieldContainer , 'date' );
                break;
            case 'activeStatus':
                me.addComboFields( fieldContainer , 'status' );
                break;
            case 'invoiceNo':
                me.addComboFields( fieldContainer , 'number' );
                break;
            case 'orderId':
                me.addComboFields( fieldContainer , 'value' );
                break;
            case 'userId':
                me.addComboFields( fieldContainer , 'value' );
                break;
        }
    },

    addComboFields:function ( fieldContainer ,fieldName ) {
        var me = this;
        var filterOperatorField = fieldContainer.items.items[ 2 ];
        var filterOperator = filterOperatorField.getValue();

        var fieldsToAdd = [];
        var start = '';
        var end = '';
        if ( fieldName == 'date' ) {
            start = 'dateStart';
            end = 'dateEnd';
        } else {
            start = fieldName + 'FieldShow';
            end = fieldName + 'Field';
        }
        fieldsToAdd.push( me.getComboFields( start ) );
        if ( filterOperator == 'between' ) {
            fieldsToAdd.push( me.getComboFields( 'andShow' ) );
            fieldsToAdd.push( me.getComboFields( end + 'Show' ) );
        } else {
            fieldsToAdd.push( me.getComboFields( 'and' ) );
            fieldsToAdd.push( me.getComboFields( end ) );
        }
        fieldsToAdd.push( me.getComboFields( 'close' ) );
        fieldContainer.add( fieldsToAdd );
    },

    getComboFields:function( type ) {

        var field = {};
        switch ( type ) {
            case 'dateStart':
                field = {
                    xtype: 'datefield',
                    width:140,
                    name: 'start',
                    maxValue: new Date(),
                    listeners: {
                        change: function(field , newVal ,oldVal ,func ) {
                            var end_field = field.up().items.items[ field.up().items.items.length - 2 ];
                            if ( typeof newVal == 'object' ) {
                                end_field.setMinValue( field.getValue() );
                            }
                        }
                    }
                };
                break;
            case 'dateEnd':
                field = {
                    xtype: 'datefield',
                    width:140,
                    name: 'end',
                    minValue: 0,
                    maxValue: new Date(),
                    listeners: {
                        afterrender:function( field ){
                            field.hide();
                        },
                        change: function( field , newVal ,oldVal ,func ) {
                            var start_field = field.up().items.items[ field.up().items.items.length - 4 ];
                            if ( typeof newVal == 'object'){
                                start_field.setMaxValue(field.getValue());
                            }
                        }
                    }
                };
                break;
            case 'dateEndShow':
                field = {
                    xtype: 'datefield',
                    width:140,
                    name: 'end',
                    minValue: 0,
                    maxValue: new Date(),
                    listeners: {
                        change: function( field , newVal ,oldVal ,func ) {
                            var start_field = field.up().items.items[ field.up().items.items.length - 4 ];
                            if ( typeof newVal == 'object'){
                                start_field.setMaxValue(field.getValue());
                            }
                        }
                    }
                };
                break;
            case 'and':
                field = {
                    xtype : 'displayfield',
                    value : 'And',
                    width : 30,
                    listeners:{
                        afterrender:function( field ){
                            field.hide();
                        }
                    }
                };
                break;
            case 'andShow':
                field = {
                    xtype : 'displayfield',
                    value : 'And',
                    width : 30
                };
                break;
            case 'statusField':
                field = {
                    xtype: 'textfield',
                    width:140,
                    enforceMaxLength: true,
                    maxLength: '1',
                    maskRe: /[0-9]/,
                    maxValue: 9,
                    minValue: 0,
                    listeners:{
                        afterrender:function( field ){
                            field.hide();
                        }
                    }
                };
                break;
            case 'statusFieldShow':
                field = {
                    xtype: 'textfield',
                    width:140,
                    enforceMaxLength: true,
                    maxLength: '1',
                    maskRe: /[0-9]/,
                    maxValue: 9,
                    minValue: 0
                };
                break;
            case 'numberField':
                field = {
                    xtype: 'textfield',
                    width:140,
                    maskRe: /[0-9]/,
                    listeners:{
                        afterrender:function( field ){
                            field.hide();
                        }
                    }
                };
                break;
            case 'valueField':
                field = {
                    xtype: 'textfield',
                    width:140,
                    maskRe: /[0-9a-zA-Z]/,
                    listeners:{
                        afterrender:function( field ){
                            field.hide();
                        }
                    }
                };
                break;
            case 'numberFieldShow':
                field = {
                    xtype: 'textfield',
                    width:140,
                    maskRe: /[0-9]/
                };
                break;
            case 'valueFieldShow':
                field = {
                    xtype: 'textfield',
                    width:140,
                    maskRe: /[0-9a-zA-Z]/
                };
                break;
            case 'close':
                field = {
                    xtype: 'displayfield',
                    value: 'X',
                    style: {
                        'border-width':'0px',
                        cursor:'pointer'
                    },
                    listeners:{
                        render: function( field , b , c , d , e , f , g ) {
                            this.getEl().on('click', function() {
                                field.up().up().removeSearch( field.up() );
                            });
                        }
                    }
                };
                break;
        }
        return field;
    },

    getTimeOfDay:function ( timestamp , moment ) {
        var ts = 0;
        var newTime = new Date( ( timestamp +  Ext.getCmp( 'Employee-Header' ).getServerTimeDifference() ) );
        var startOfDay = new Date( newTime.getFullYear() , newTime.getMonth() , newTime.getDate() );
        var timestamp = startOfDay.getTime();
        if ( moment == 'start' ) {
            ts = timestamp;
        } else if ( moment == 'end' ) {
            ts = timestamp + 86399*1000;
        }
        return ts;
    }
    
});