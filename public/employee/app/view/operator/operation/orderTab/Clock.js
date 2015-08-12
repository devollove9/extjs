/**
 * Created by devo on 7/16/2015.
 */
Ext.define('517Employee.view.operator.operation.orderTab.Clock', {
    extend: 'Ext.container.Container',
    xtype: 'employee-operator-operation-orderTab-clock',

    layout:{
        type:'hbox'
    },
    border:1,
    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'0px'},
    defaults: {
        labelWidth: 80,
        xtype: 'label',
        flex: 1,
    },
    items: [
        {xtype:'label', text:'Server:',margin:2,},
        {
            id:'Employee-Operator-Operation-OrderTab-ServerClock',
            xtype:'label',
            margin:2,
            text:'cloc11k',
            width:120
        },

        {xtype:'label', text:'Local:',margin:2,},
        {
            id:'Employee-Operator-Operation-OrderTab-LocalClock',
            xtype:'label',
            margin:2,
            text:'clock',
            width:120
        }

    ]
});