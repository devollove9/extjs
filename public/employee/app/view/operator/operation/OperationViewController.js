/**
 * Created by devo on 6/29/2015.
 */
Ext.define('Ext517Employee.view.operator.operation.OperationViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-operator-operation-controller',
    init: function() {
        var me = this;



        //var runner = new Ext.util.TaskRunner(),
            //task = runner.start({
            //    run: this.reLoadOrders, //function(){console.log('task');},
            //    scope: this,
            //    interval: 30000
            //});
        var clock = Ext.TaskManager.start({
            run: this.updateClock,
            scope:this,
            interval: 1000
        });
    },
    addTask: function() {

    },
    ordersLoaded: function(store) {
        //console.log('store loaded ' + store.getCount())
        //console.log(Ext.getStore('Orders').getFilters());
        //Ext.getStore('Orders').filter('orderno', 140906212740015);
        //Ext.getStore('Orders').clearFilter();
        //Ext.getStore('Orders').filterBy(function(record){
        //    if(record.get('orderno') == 140906212740015) return record;
        //});
        this.addMarkers(store);
    },
    addMarkers: function(records) {
        var mapView = Ext.ComponentQuery.query('#map-view')[0],
            map = mapView.lookupReference('map'),
            hideBtns = mapView.lookupReference('hideBtns');

        map.clearMarkers('user');
        //console.log('hide user ' + !Number(localStorage.getItem('hideUser')));
        if (!Number(localStorage.getItem('hideUser'))) { //
            records.each(function(r, index) {
                //console.log(r.get('driver'));
                if (r.get('activeStatus') > -1 && r.get('activeStatus') < 8) {
                    map.addMarker({
                        lat: r.get('delivery').latitude,
                        lng: r.get('delivery').longitude,
                    }, r.get('activeStatus'), Ext.util.Format.substr(r.get('invoiceNo'), 12), 'user');
                }

            });
        }
        if (!Number(localStorage.getItem('hideRes'))) { //
            records.each(function(r, index) {
                if (r.get('activeStatus') > -1 && r.get('activeStatus') < 8) {
                    //map.addMarker({
                    ///lat: r.get('restaurant').lat,
                    //lng: r.get('restaurant').lng,
                    // }, "https://s3-us-west-2.amazonaws.com/static.djwong.net/public_html" + r.get('restaurant').logo, Ext.util.Format.substr(r.get('invoiceNo'), 12), 'res');
                }

            });
        }
        //console.log(map.markers);
    },
    addDriverMakers: function(records) {
        var mapView = Ext.ComponentQuery.query('#map-view')[0],
            map = mapView.lookupReference('map'),
            hideBtns = mapView.lookupReference('hideBtns');

        map.clearMarkers('driver');
        if (!Number(localStorage.getItem('hideDriver'))) { //
            records.each(function(r, index) {
                map.addMarker({
                    lat: r.get('latitude'),
                    lng: r.get('longitude'),
                }, null, index + 1, 'driver');
            });
        }

    },
    reLoadOrders: function() {/*
        var Region = Ext.getCmp('operator-regionlist');
        if ( Region.getSelectionModel().hasSelection() ) {
            var now = new Date();
            var startOfDay = new Date( now.getFullYear() , now.getMonth() , now.getDate() );
            var timestamp = startOfDay.getTime()/1000;
            Ext.getStore('Orders').load({
                params:{
                    method:'filter_by_region',
                    region_id:Region.regionId,
                    filterBy:'placeDate',
                    filterValue:timestamp,
                    comparator:'>'
                },
                callback:function(records, operation, success){

                }
            });
            var now1 = new Date();
            var timestamp = now1.getTime()/1000 - 600;
            Ext.getStore('Drivers').load({
                params:{
                    method:'filter_by_region',
                    region_id:Region.regionId,
                    filterBy:'lastUpdate',
                    filterValue:timestamp,
                    comparator:'>'
                },
                callback:function(records, operation, success){

                }
            });
            //var record = Region.getSelectionModel().getSelection()[0].data.;

        } else {
            console.log( 'No Region Selected' );
        }*/
        console.log('asdasdasdasdasd');
    },

    addClock: function() {

    },
    updateClock: function() {
        //console.log('clock');
        //console.log(Ext.fly('clock1'));
        Ext.fly('clock1').setText(Ext.Date.format(Ext517.Time.currentTime(), 'l, h:i:s A'));
        //console.log(Ext517.Time.currentTime());
        Ext.fly('clock2').setText(Ext.Date.format( new Date( Ext517.Time.currentTime().getTime() + Ext.getCmp('op-content-view').getServerTimeDifference() ), 'l, h:i:s A'));
    }





})

