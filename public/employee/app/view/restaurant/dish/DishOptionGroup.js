/**
 * Created by Yaxin on 6/8/2015.
 */
Ext.define('517Employee.view.restaurant.dish.DishOptionGroup', {
    extend: 'Ext.form.Panel',
    requires:[
        '517Employee.view.restaurant.dish.DishOptionSelection',
        '517Employee.view.restaurant.dish.optionGroup.BusinessHour',
        '517Employee.view.restaurant.dish.DishOptionGroupController',
    ],
    xtype: 'employee-restaurant-dish-optionGroup',
    controller:'employee-restaurant-dish-optionGroup-controller',
    
    border: false , frame: false,
    margin: '2 2 2 2',
    bodyPadding: 5,

    defaults: {
        anchor: '100%'
    },
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 100,
        msgTarget: 'side'
    },

    /*  Variables  */
    
    // Variable detect if there are changes
    changedFlag:false,

    changedString:[],

    // Variable save original record
    originRecord:null,

    // Variable detect if its creating new OptionGroup
    newOptionGourp: false,

    // Variable detect the method
    currentMethod:'saving',
    
    // Variable save item id
    itemId:'',
    
    // Variable save selected row
    selectedRow:-1,


    /*  View Content  */
    items: [
        {
            xtype: 'fieldcontainer',
            defaultType: 'textfield',
            layout:'hbox',
            labelWidth:0,
            items: [
                {
                    xtype: 'fieldcontainer',
                    defaultType: 'textfield',
                    reference:'employee-restaurant-dish-optionGroup-disabled',
                    layout:'vbox',
                    flex:1,
                    labelWidth:0,
                    items: [
                        {
                            xtype: 'radiogroup',
                            fieldLabel: 'Disabled',
                            name: 'disabledGroup',
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
                                    inputValue: true,
                                    margin:'0 0 0 10'
                                }
                            ]
                        },
                        {allowBlank: false, fieldLabel: 'Name(中文)', name: 'name' , flex:2 , margin:'2 5 2 0'},
                        {allowBlank: false, fieldLabel: 'Name(English)', name: 'nameEn', flex:2 , margin:'2 5 2 0'},
                        {
                            allowBlank: false, fieldLabel: 'Max', name: 'max' , flex:2 , margin:'2 5 2 0',
                            enforceMaxLength: true,
                            maxLength: '3',
                            maskRe: /[0-9]/
                        },
                        {
                            allowBlank: false, fieldLabel: 'Min', name: 'min' , flex:2 , margin:'2 5 2 0',
                            enforceMaxLength: true,
                            maxLength: '3',
                            maskRe: /[0-9]/
                        },
                        {
                            allowBlank: false, fieldLabel: 'Quantity', name: 'quantity', flex:2 , margin:'2 5 2 0',
                            enforceMaxLength: true,
                            maxLength: '10',
                            maskRe: /[\-0-9]/

                        }
                    ]
                },
                {
                    xtype:'employee-restaurant-dish-optionGroup-businessHour',
                    reference:'employee-restaurant-dish-optionGroup-businessHour',
                    flex:1,

                }
            ]
        },


        {
            xtype:'employee-restaurant-dish-optionSelection',
            reference:'employee-restaurant-dish-optionSelection',
            height:280
        },



    ],
    dockedItems:[
        {
            dock: 'bottom',
            xtype: 'toolbar',
            items: [{
                xtype: 'tbfill'
            },
                {
                    xtype: 'button',
                    iconCls: 'icon-save',
                    text: 'Save Changes',
                    handler:'Savechanges'

                },
                {
                    xtype:'tbfill'
                }
            ]

        }
    ],
    setBusinessHourGrid:function( name , businessHour ) {
        var me = this;
        var businessHourGrid = me.lookupReference( 'employee-restaurant-dish-optionGroup-businessHour' );
        if ( businessHour && businessHour.length > 0 ) {
            businessHourGrid.setBusinessHourGrid( 'New' , businessHour );
        }
    },
    resetAll:function(){
        this.getForm.reset();
        this.currentMethod = "saving";
        this.selectedRow = -1;
        this.originRecord = null;
        this.itemId = '';
        this.changedString = [];
        this.changedFlag = false;
    }

});