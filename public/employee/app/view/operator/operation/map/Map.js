/**
 * Created by devo on 6/22/2015.
 */
Ext.define('Ext517Employee.view.operator.operation.map.MapView', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.ux.GMapPanel',
        'Ext517Employee.view.operator.operation.map.MapViewController'
    ],
    xtype: 'employee-operator-operation-map-mapView',
    controller: 'employee-operator-operation-map-mapView-controller',
    layout: 'fit',
    referenceHolder: 'true',
    header:{ titleAlign: 'left' , height:30 , padding:'0 10 0 10', margin:'0 0 0 0' },
    frame: true,
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            defaultButtonUI: 'default',
            items: [
                {
                    xtype: 'label',
                    text: '隐藏：'
                },
                {
                    xtype: 'checkboxgroup',
                    hideLabel: true,
                    reference: 'checkgroup',
                    items: [
                        {boxLabel: '司机', name: 'hideDriver', handler: 'hideChecked'},
                        {boxLabel: '餐厅', name: 'hideRes', handler: 'hideChecked'},
                        {boxLabel: '客户', name: 'hideUser', handler: 'hideChecked'}
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
                center: new google.maps.LatLng(42.733439, -84.483313),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
        }
    ]
});