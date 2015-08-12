/**
 * Created by devo on 7/9/2015.
 */
Ext.define( '517Employee.view.operator.operation.orderTab.orderList.OrderListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-operator-operation-orderTab-orderList-controller',
    requires: [

        //'Ext517.store.Order',
        //'Ext517.model.dish.Dish'
    ],
    orderLoaded:function(){
        console.log('store laodefjdskfj');
    },
    orderDetail: function(grid, rowIndex, colIndex, item, e, record) {

        var win;// = this.lookupReference('orderWindow');

        if (!win) {
            win = this.newOrderWindow(record);
            //this.getView().up().up().add(win);
        }

        win.show();
        this.addDetail(record, win);
        win.setY(100);
    },

    newOrderWindow: function(record) {

        var win = Ext.create('Ext.window.Window', {
            reference: 'orderWindow',
            xtype: 'employee-operator-operation-orderTab-orderList-orderDetailWindow',
            title: 'Order Detail' + ': ' + record.get('invoiceNo') + ' (' + record.get('storeName') + ')',
            model: true,
            width:700,
            minWidth:700,
            maxHeight:800,
            autoScroll:true,
            resizable:false,
            shadow:true,
            shadowOffset:10,
            tools: [
                {
                    type: 'minimize',
                    tooltip: 'Maximize example code content'
                }
            ],
            layout:'fit'
        });
        return win;
    },

    addDetail:function(record, win){

        win.setLoading(true);
        var detail = Ext.create('517Employee.view.operator.operation.orderDetailTab.orderDetail.OrderDetailView');
         var form = detail.getForm();
        var store = Ext.create('517Employee.store.operator.operation.Order');
        store.proxy.headers = Ext.getCmp( 'Employee-Header').getHeaders( 'get' );
        store.load({
            method:'get',
            url:Ext.getCmp( 'Employee-Header').getServerUrl() + '/order' ,
            params:{
                regionId:Ext.getCmp( 'Employee-Header-Region').regionId ,
                orderId: record.get('orderId')
            },
            callback:function(records, operation, success){
                var r = records[ 0 ];
                if ( records[0] ) {
                    if ( r.data.pick.method == 1 ) detail.items.items[0].items.items[0].hideButtons([3,4,6]);
                    form.loadRecord(r);
                    var address = r.get('delivery'), field;
                    Ext.Object.each(address, function(key, value){
                        field = form.findField('address.' + key);
                        if(field){
                            field.setValue(value);
                        }
                    });
                    //var restaurant = r.get('restaurant')[0];
                    //field = form.findField('restaurant.name');
                    // field.setValue(restaurant.name);
                    //field = form.findField('restaurant.name_en');
                    //field.setValue(restaurant.nameEn);
                    //field = form.findField('restaurant.address');
                    //field.setValue(restaurant.information.address);
                    field = form.findField('platform');
                    field.setValue( r.get('platform') );
                    if( r.get('userId') != '0' ){
                        form.findField('user.username').setValue(r.get('userId'));
                    } else {
                        form.findField('guest').setValue(true);
                    }


                    var tab = detail.lookupReference( 'employee-operator-operation-orderDetailTab-orderDetail-orderStatus' );
                    tab.getController().activeStatus(r);

                    //console.log(tab.getController().test());
                    tab.lookupReference('orderno').setValue(record.get('invoiceNo'));
                    tab.lookupReference('orderId').setValue(record.get('orderId'));
                    tab.lookupReference('regionId').setValue(record.get('regionId'));

                    var grid = detail.lookupReference( 'employee-operator-operation-orderDetailTab-orderDetail-dishList' );
                    var store = new Ext.data.Store({
                        model: Ext.create('517Employee.model.order.OrderDish'),
                        data:r.get('item')
                    });
                    var charge = r.get('payment');
                    Ext.Object.each(charge, function(key, value){
                        console.log( key );
                        field = grid.lookupReference(key);
                        if(field){
                            field.setValue(value);
                        }
                    });
                    grid.reconfigure(store);
                } else {
                    Ext.Msg( "Error" , "Token is invalid | Other Error.");
                }

                win.setLoading(false);
            }
        });
        win.insert(detail);
    },

    addMarkers:function(){

    },
    orderPin:function(grid, rowIndex, colIndex, item, e, record){
        //console.log(record.get('delivery_lat'))
        //var mapView = Ext.ComponentQuery.query('#map-view')[0];
        var mapView = Ext.getCmp( 'Employee-Operator-Operation-Map');
        var map = mapView.lookupReference('map');
        map.reCenter({lat:record.get('delivery').latitude, lng:record.get('delivery').longitude});
    }
})
