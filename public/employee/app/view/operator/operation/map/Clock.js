/**
 * Created by devo on 7/16/2015.
 */
Ext.define( '517Employee.view.operator.operation.map.Clock' , {
    extend: 'Ext.container.Container',
    xtype: 'employee-operator-operation-map-clock',
    requires: [

    ],

    layout:{
        type:'hbox'
    },
    border:1,
    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px'},
    defaults: {
        labelWidth: 80,
        xtype: 'label',
        flex: 1,
    },
    items: [
        {xtype:'label', text:'Server:',margin:2 },
        {
            id:'clock2',
            xtype:'label',
            margin:2,
            text:'clock',
            width:120
            //fieldLabel:'纽约时间',
            //reference:'clock',
            //glyph: 'xf017@FontAwesome',
            //width:150,
        },

        {xtype:'label', text:'Local:',margin:2,},
        {
            id:'clock1',
            xtype:'label',
            margin:2,
            text:'clock',
            width:120
            //fieldLabel:'纽约时间',
            //reference:'clock',
            //glyph: 'xf017@FontAwesome',
            //width:150,
        }

    ]
});