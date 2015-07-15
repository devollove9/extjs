/**
 * Created by devo on 6/22/2015.
 */
Ext.define('517Employee.view.operator.operation.DriverListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-operator-operation-driverList-controller',
    requires: [

    ],

    driverPin:function(grid, rowIndex, colIndex, item, e, record){
        var mapView = Ext.getCmp( 'employee-operator-operation-map-mapView');
        var map = mapView.lookupReference('map');
        map.reCenter({lat:record.get('latitude'), lng:record.get('longitude')});
    }
})