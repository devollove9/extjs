/**
 * Created by Yaxin on 6/8/2015.
 */
Ext.define('517Employee.view.restaurant.dish.DishOptionDetail', {
    extend: 'Ext.form.Panel',
    requires:[
        '517Employee.view.restaurant.dish.DishOptionDetailController'
    ],
    xtype: 'employee-restaurant-dish-optionDetail',
    controller: 'employee-restaurant-dish-optionDetail-controller' ,
    autoScroll:true,
    title:'Option Details',
    border: true,
    frame: true,
    margin: '2 0 0 5',
    defaultType: 'textfield',
    bodyPadding: 5,
    currentMethod:'saving',
    defaults: {
        anchor: '100%',
    },

    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 100,
        msgTarget: 'side'
    },
    items: [
        {
            xtype: 'radiogroup',
            fieldLabel: 'Disabled',
            name:'disabledGroup',
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
        {allowBlank: false, fieldLabel: 'Option(中文)', name: 'name'},
        {allowBlank: false, fieldLabel: 'Option(English)', name: 'nameEn'},
        {allowBlank: false, fieldLabel: 'Price', name: 'price'},
        {allowBlank: false, fieldLabel: 'Quantity', name: 'quantity'},
        {xtype:'hidden', name: 'selectedRow',value:-1},
    ],
    dockedItems:[
        {
            dock: 'top',
            xtype: 'toolbar',
            frame:false,
            border:false,
            items: [{
                xtype: 'tbfill'
            },
                {
                    xtype: 'button',
                    iconCls: 'icon-save',
                    text: 'Save Changes',
                    handler:'SaveChanges'
                },
                {
                    xtype:'tbfill'
                }
            ]

        }
    ],
    resetAll:function(){
        //console.log('Reset Option Detail');
        this.getForm().reset();
        this.setTitle('Option Detail');
        this.currentMethod = 'saving';
        this.dockedItems.items[1].items.items[1].setText( 'Save Changes' );
    }
});