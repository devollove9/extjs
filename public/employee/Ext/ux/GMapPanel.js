/**
 * @author Shea Frederick
 */
Ext.define('Ext.ux.GMapPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.gmappanel',
    requires: ['Ext.window.MessageBox'],
    userMarkers: [],
    driverMarkers: [],
    restaurantMarkers:[],
    initComponent: function() {
        Ext.applyIf(this, {
            plain: true,
            gmapType: 'map',
            border: false
        });
        this.callParent();
    },
    onBoxReady: function() {
        var center = this.center;
        this.callParent(arguments);
        if (center) {
            if (center.geoCodeAddr) {
                this.lookupCode(center.geoCodeAddr, center.marker);
            } else {
                this.createMap(center);
            }
        } else {
            Ext.Error.raise('center is required');
        }

    },
    createMap: function(center, marker) {
        var options = Ext.apply({}, this.mapOptions);
        //console.log(options)

        options = Ext.applyIf(options, {
            zoom: 14,
            center: center,
            mapTypeId: google.maps.MapTypeId.HYBRID
        });
        this.gmap = new google.maps.Map(this.body.dom, options);
        if (marker) {
            this.addMarker(Ext.applyIf(marker, {
                position: center
            }));
        }

        //Ext.each(this.markers, this.addMarker, this);
        this.fireEvent('mapready', this, this.gmap);
    },
    addMarker: function(marker, status, index, type) {
        marker = Ext.apply({
            map: this.gmap
        }, marker);
        if (!marker.position) {
            marker.position = new google.maps.LatLng(marker.lat, marker.lng);
        }
        if (type == 'user') {
            marker.icon = this.getClientMarker(status, index);
            var o = new google.maps.Marker(marker);
        } else if(type == 'driver') {
            //console.log('add driver marker' + this.getCarMarker(index));
            marker.icon = ' ';
            marker.labelContent = this.getCarMarker( index ,status );
            marker.labelAnchor = new google.maps.Point(22, 50);

            marker.labelClass = "carIconlabels"; // the CSS class for the label
            var o = new MarkerWithLabel(marker);
        } else {
            //console.log(status);
            marker.icon = new google.maps.MarkerImage(status ,new google.maps.Size(50,20),new google.maps.Point(0,0),new google.maps.Point(0,0),new google.maps.Size(50,20));
            var o = new google.maps.Marker(marker);
        }


        Ext.Object.each(marker.listeners, function(name, fn) {
            google.maps.event.addListener(o, name, fn);
        });
        if (type == 'user') {
            this.userMarkers.push(o);
        } else if(type=='driver'){
            this.driverMarkers.push(o);
        } else this.restaurantMarkers.push(o);
        return o;
    },
    getClientMarker: function(status, index) {
        var label_color = '000000';
        var bg_color = '00ffff';
        switch (status) {
            case 1:
                bg_color = 'D15B47';
                break;
            case 2:
                bg_color = '53DCE6';
                break;
            case 3:
                bg_color = '438BCA';
                break;
            case 4:
                bg_color = 'fee188';
                break;
            case 5:
                bg_color = 'd6487e';
                break;
            case 6:
                bg_color = 'f89406';
                break;
            case 7:
                bg_color = '9585bf';
                break;
            case 8:
                bg_color = 'abbac3';
                break;
            case 0:
                bg_color = 'D15B47';
                break;
            default:
                return false;
        }
        //return '/map/label/home/' + bg_color + '/' + index + '/' + label_color;
        //return 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=' + index + '|' + bg_color + '|' + label_color;
        return 'https://chart.googleapis.com/chart?chst=d_bubble_text_small&chld=bb|' + index + '|' + bg_color + '|' + label_color;
    },
    getCarMarker: function( index,name ) {
        //var stackedIcon = '<div class="carIcon-stack fa-3x"><i class="fa fa-car"></i><span class="carIcon-text">' + index + '</span></div>';
        var stackedIcon = '<span class="fa-stack fa-2x"><i class="fa fa-car" style="color:#D6497F;margin-top:13px"></i><span class="fa fa-stack-1x" ><span style="color:#D6497F;font-size:13px; margin-top:-13px;margin-right:35px; display:block;">' + name + '</span></span></span>';
        // var stackedIcon = '<span class="carIcon-stack"><i class="fa fa-car fa-2x"></i><span class="car-text">' + index + '</span>';
        return stackedIcon;

    },
    clearMarkers: function(type) {
        if (type == 'user') {
            for (var i = 0; i < this.userMarkers.length; i++) {
                this.userMarkers[i].setMap(null);
            }
            this.userMarkers = [];
        }else if(type == 'driver') {
            for (var i = 0; i < this.driverMarkers.length; i++) {
                this.driverMarkers[i].setMap(null);
            }
            this.driverMarkers = [];
        }else {
            for (var i = 0; i < this.restaurantMarkers.length; i++) {
                this.restaurantMarkers[i].setMap(null);
            }
            this.restaurantMarkers = [];
        }

    },
    reCenter: function(center) {
        var map = this.gmap;
        if ( map ) {
            map.panTo(center);
            map.setZoom(13);
        }

    },
    lookupCode: function(addr, marker) {
        this.geocoder = new google.maps.Geocoder();
        this.geocoder.geocode({
            address: addr
        }, Ext.Function.bind(this.onLookupComplete, this, [marker], true));
    },
    onLookupComplete: function(data, response, marker) {
        if (response != 'OK') {
            Ext.MessageBox.alert('Error', 'An error occured: "' + response + '"');
            return;
        }
        this.createMap(data[0].geometry.location, marker);
    },
    afterComponentLayout: function(w, h) {
        this.callParent(arguments);
        this.redraw();
    },
    redraw: function() {
        var map = this.gmap;
        if (map) {
            google.maps.event.trigger(map, 'resize');
        }
    }

});
