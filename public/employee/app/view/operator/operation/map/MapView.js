/**
 * Created by devo on 6/22/2015.
 */
Ext.define('517Employee.view.operator.operation.map.MapView', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.ux.GMapPanel',
        '517Employee.view.operator.operation.map.MapViewController',
    ],
    xtype: 'employee-operator-operation-map',
    controller: 'employee-operator-operation-map-controller',
    layout: 'fit',
    referenceHolder: 'true',
    title: 'Map View',
    columnLines: true , collapsible: true,
    header:{ titleAlign: 'left' , height:30 , padding:'0 10 0 10', margin:'0 0 0 0' },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            defaultButtonUI: 'default',
            labelWidth:0,
            height:31,
            items: [
                {
                    xtype: 'label',
                    text: 'Hide：',
                    width:50
                },
                {
                    xtype: 'checkboxgroup',
                    hideLabel: true,
                    labelWidth:0,
                    reference: 'checkgroup',
                    defaults:{
                        labelWidth:0
                    },
                    items: [
                        {boxLabel: 'Driver', name: 'hideDriver', handler: 'hideMarker'},
                        {boxLabel: 'Restaurant', name: 'hideRes', handler: 'hideMarker'},
                        {boxLabel: 'Customer', name: 'hideUser', handler: 'hideMarker'}
                    ],
                    listeners: {
                        afterRender: 'initCheckbox'
                    }
                }
            ]
        }

    ],
    items: [
        {
            xtype: 'gmappanel',
            reference: 'map',
            mapOptions: {
                zoom: 13,
                center: new google.maps.LatLng( 42.7289 , -84.484773 ),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            },
            listeners:{
                afterrender:function(){
                    console.log( 'map rendered' );
                }
            }
        }
    ]
});