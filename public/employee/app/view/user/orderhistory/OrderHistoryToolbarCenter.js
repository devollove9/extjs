

Ext.define('517Employee.view.order.orderhistory.OrderHistoryToolbarCenter', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.order.orderhistory.OrderHistoryToolbarController'
    ],   
    xtype: 'employee-order-orderHistory-toolbar-center',
    controller: 'employee-order-orderHistory-toolbar',
    bodyStyle:{ "background-color":"white",'border-color' : 'white','border-right':'1px solid #c1c1c1' , padding:0 },

    frame:false ,// border:false,
    layout: 'absolute',
    autosSroll:true,
    items:[
        {
            x:0,y:17,height:94,minWidth:720 , maxWidth:720 , frame:false,bodyStyle:{'border-width':'0px',},
            xtype: 'form',
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
                            labelAlign: 'right'
                        },
                        items: [
                            {
                                xtype : 'displayfield',
                                value : 'Custom Search: ',  
                            }, 
          
                        ]
                        
                    },
                    {
                        margin: '0 0 3 5',
                        xtype: 'fieldcontainer',
                        combineErrors: true,
                        layout:'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            anchor: '100%',
                            margin:'0 5 0 5' ,
                            labelAlign: 'right'
                        },
                        items: [
                            {
                                xtype : 'displayfield',
                                value : 'Search By: ',
                                width : 70
                            }, 
                            {
                                xtype:'combobox',
                                store:Ext.create( '517Employee.store.combobox.OrderFilterType' ),
                                name:'orderFilterType',
                                displayField: 'name',
                                editable:false,
                                valueField: 'filterBy',
                                width:140,
                                //margin: '0 0 0 6',                        
                                listeners: {
                                    afterrender: function(combo) {                   
                                        combo.setValue(combo.getStore().getAt(0).get('name'));
                                    }
                                }
                            },
                            {
                                xtype:'combobox',
                                store:Ext.create( '517Employee.store.combobox.OrderFilterComparator' ),
                                name:'orderFilterComparator',
                                displayField: 'name',
                                editable:false,
                                valueField: 'comparator',
                                width:140,
                                
                                //margin: '0 0 0 6',                        
                                listeners: {
                                    afterrender: function(combo) {                   
                                        //combo.setValue(combo.getStore().getAt(0).get('name'));
                                    },
                                    change:function( field , newVal , oldVal , func ){
                                        var and_field = field.up().items.items[ field.up().items.items.length -2 ] ;
                                        var end_field = field.up().items.items[ field.up().items.items.length -1 ] ;
                                        var start_field = field.up().items.items[ field.up().items.items.length -3 ] ;
                                        if ( oldVal != '>,<' && newVal == '>,<' ) {
                                            end_field.show();
                                            and_field.show();
                                        } else if ( oldVal == '>,<' && newVal != '>,<' ) {
                                            start_field.setMaxValue(new Date());
                                            end_field.setMinValue(0);
                                            end_field.hide();
                                            and_field.hide();
                                        }
                                    }
                                }
                            },
                            {                                                     
                                xtype: 'datefield',
                                width:140,
                                name: 'start',
                                //labelWidth:35,
                               
                                maxValue: new Date(),
                                listeners: {
                                    change: function(field , newVal ,oldVal ,func ) {      
                                        var end_field = field.up().items.items[ field.up().items.items.length - 1 ];
                                        if ( typeof newVal == 'object'){
                                            end_field.setMinValue(field.getValue());
                                        }
                                    },
                                }
                            },
                            {
                                xtype : 'displayfield',
                                value : 'And',
                                width : 30,
                                listeners:{
                                    afterrender:function( field ){
                                        field.hide();
                                    }
                                }
                            }, 
                            {                                                     
                                xtype: 'datefield',
                                //fieldLabel: 'And ',
                                //labelWidth:35,
                                width:140,
                                name: 'end',
                                minValue: 0,
                                maxValue: new Date(),
                                listeners: {
                                    afterrender:function( field ){
                                        field.hide();
                                    },
                                    change: function( field , newVal ,oldVal ,func ) {                 
                                        var start_field = field.up().items.items[ field.up().items.items.length - 3 ];
                                        if ( typeof newVal == 'object'){
                                            start_field.setMaxValue(field.getValue());
                                        }
                                    },
                                }
                            }
                         ]
                    },
                    {
                        margin: '0 0 0 5',
                        xtype: 'fieldcontainer',
                        combineErrors: true,
                        layout:'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            anchor: '100%',
                            margin:'0 5 0 5' ,
                            labelAlign: 'right'
                        },
                        items: [ 
                            { 
                                xtype : 'tbfill'  
                            },
                            {                                                     
                                xtype: 'button',
                                //fieldLabel: 'And ',
                                //labelWidth:35,
                                width:84,
                                //height:84,
                                text:'Search',
                                handler:'getOrderByTime'
                            },
                            
                        ]
                        
                    },
   
            ],
        },
       
        /*
        {
            region: 'center',
            xtype:'button',
            text:'All',
            handler:'getOrderAll',
            height:84,width:84,
            x:124,y:15,
        }
        */
    ],
 
    doNavigation:function(panel){
        //console.log( panel );
    }
    
});