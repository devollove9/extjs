/**
 * Created by Yaxin on 6/8/2015.
 */
Ext.define('517Employee.view.restaurant.dish.DishOptionGroup', {
    extend: 'Ext.form.Panel',
    requires:[
        '517Employee.view.restaurant.dish.DishOptionSelection',
        '517Employee.view.restaurant.dish.DishOptionGroupController',
    ],
    xtype: 'employee-restaurant-dish-optionGroup',
    controller:'employee-restaurant-dish-optionGroup-controller',
    
    border: false , frame: false,
    margin: '2 2 2 2',
    bodyPadding: 5,
    layout:'fit',
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
            xtype: 'radiogroup',
            fieldLabel: 'Disabled',
            name: 'disabledGroup',
            defaults:{
                labelWidth:0
            },
            items: [ {
                checked: true,
                boxLabel: 'False',
                name: 'disabled',
                inputValue: false
            }, {
                boxLabel: 'True',
                name: 'disabled',
                inputValue: true
            }]
        },

        {
            xtype: 'fieldcontainer',
            defaultType: 'textfield',
            layout:'hbox',
            labelWidth:0,
            items: [
                {allowBlank: false, fieldLabel: 'Name(中文)', name: 'name' , flex:2 , margin:'2 5 2 0'},
                {allowBlank: false, fieldLabel: 'Name(English)', name: 'nameEn', flex:2 , margin:'2 5 2 0'},
            ]
        },
        {
            xtype: 'fieldcontainer',
            defaultType: 'textfield',
            layout:'hbox',
            labelWidth:0,
            items: [
                {allowBlank: false, fieldLabel: 'Max', name: 'max' , flex:2 , margin:'2 5 2 0'},
                {allowBlank: false, fieldLabel: 'Min', name: 'min' , flex:2 , margin:'2 5 2 0'},
                {allowBlank: false, fieldLabel: 'Quantity', name: 'quantity', flex:2 , margin:'2 5 2 0'},
            ]
        },
        {
            xtype:'employee-restaurant-dish-optionSelection',
            height:350
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
    resetAll:function(){
        this.getForm.reset();
        this.currentMethod = "saving";
        this.selectedRow = -1;
        this.originRecord = null;
        this.itemId = '';
    }

});