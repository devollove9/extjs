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
    title:'Option Details',
    columnLines: true , autoScroll: true ,
    header:{ titleAlign: 'left' , height:30 , padding:'0 10 0 10', margin:'0 0 0 0' },
    viewConfig: { enableTextSelection: true },
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
        {allowBlank: false, fieldLabel: 'Name(中文)', name: 'name'},
        {allowBlank: false, fieldLabel: 'Name(English)', name: 'nameEn'},
        {
            allowBlank: false, fieldLabel: 'Price', name: 'price',
            enforceMaxLength: true,
            maxLength: '10',
            maskRe: /[0-9.]/},
        {
            allowBlank: false, fieldLabel: 'Quantity', name: 'quantity',
            enforceMaxLength: true,
            maxLength: '10',
            maskRe: /[\-0-9]/
        },
        {xtype:'hidden', name: 'selectedRow',value:-1},
    ],
    dockedItems:[
        {
            dock: 'top',
            xtype: 'toolbar',
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
        ////console.log('Reset Option Detail');
        this.getForm().reset();
        this.setTitle('Option Detail');
        this.currentMethod = 'saving';
        this.dockedItems.items[1].items.items[1].setText( 'Save Changes' );
    }
});