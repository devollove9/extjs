Ext.define('517Employee.view.driverUnique.orderHistory.OrderHistoryToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-driverUnique-orderHistory-toolbar-controller',
    requires: [
        //'517.view.main.AdminMain'
        //'517.517Time'
    ],
   
    /*
     *  Init function
     */
    init : function () {
        
    },
    
    /*
     *  Get orderHistory of past N days
     */
    getOrderByDay : function ( field , event ) {

        // Get Start Of Today
        var startOfDay = Ext.getCmp( 'Employee-Header' ).getStartOfDay();

        var actualDay;
        if ( field.dayFactor == -1 ) {
            actualDay = 0;
        } else {
            actualDay = ( startOfDay - 86400*1000 * field.dayFactor ) * 1000;
        }

        //console.log( actualDay );
        // Request Params
        var params = {
            filterBy : 'placeDate' ,
            filterOperator : 'gt' ,
            filterValue: ''+ actualDay
        };

        // Call Request Function
        Ext.getCmp( 'Employee-DriverUnique-OrderHistory-OrderList' ).refreshViewByParams( params );
    },
    /*
     *  Get orderHistory of past N days
     */
    getOrderAll : function () {

        // Request Params
        var params = {
            filterBy : 'placeDate' ,
            filterOperator : 'gt' ,
            filterValue: 0
        };

        // Call Request Function
        Ext.getCmp( 'Employee-DriverUnique-OrderHistory-OrderList' ).refreshViewByParams( params );
    },


    searchOrder : function ( field , event ) {
        var orderList = Ext.getCmp( 'Employee-DriverUnique-OrderHistory-OrderList' );
        orderList.refreshView();
    }
    /*
     *  Get orderHistory by Time

    getOrderByTime : function ( field , event ) {
        
        // Controller
        var controller = this;
        
        // DriverUnique Information
        var driverUniqueInfo = Ext.getCmp( 'Index' ).getDriverUniqueInfo();
        
        // Fields 
        var form = field.up().up().getForm();
        var filterTypeField = form.findField( 'orderFilterType' );
        var filterType;
        filterTypeField.getStore().each(function(record, idx) {
            if ( record.data.name.indexOf( filterTypeField.getValue() ) > -1 ) {
                filterType = record.data.filterBy;
            }
        });
        
        var comparatorField = form.findField( 'orderFilterComparator' );
        var comparator = comparatorField.getValue();
        //comparatorField.getStore().each(function(record, idx) {
        //    if ( record.data.name.indexOf( comparatorField.getValue() ) > -1 ) {
        //        //console.log( record.data.name );
        //        //console.log( comparatorField.getValue() );
        //        comparator = record.data.comparator;
        //    }
        //});
        var start = form.findField( 'start' ).getValue();
        var end = form.findField( 'end' ).getValue();
        if ( ! comparator ) {
            Ext.Msg.alert( 'Error' , 'Please Choose Comparator' );
        } else if ( ! start ){
            Ext.Msg.alert( 'Error' , 'Please Select Date' );
        } else if ( comparator == '>,<' && ! end ) {
            Ext.Msg.alert( 'Error' , 'Please Select Date' );
        } else if ( comparator == '>,<' ) {
            Ext.Msg.alert( 'Error' , 'Api Not Supported!' );
        } else {
            
            //console.log(new Date(start).getTime());
           
            // Request Params
            var params = {
                method : 'filterById' ,
                regionId : driverUniqueInfo.regionId ,
                idType : 'storeId' ,
                id : driverUniqueInfo.storeId ,
                filterBy : filterType ,
                filterValue : start ,
                comparator : comparator ,
            };
            // Call Request Function
            controller.requestOrder( 0 , params )
        }  
    },
    /*
     *  Get orderHistory of all time

    getOrderAll : function () {
        
        // Controller
        var controller = this;
        
        // DriverUnique Information
        var driverUniqueInfo = Ext.getCmp( 'Index' ).getDriverUniqueInfo();
        
        // Request Params
        var params = {
            method : 'filterById' ,
            regionId : driverUniqueInfo.regionId ,
            idType : 'storeId' ,
            id : driverUniqueInfo.storeId ,
            filterBy : 'placeDate' ,
            filterValue : '4/1/2013, 11:59:59 PM GMT-4:00 DST' ,
            comparator : '>' ,
        };
        
        // Call Request Function
        controller.requestOrder( 0 , params )
    },
    
    requestOrder : function ( type , params ) {
                
        // Order List Panel
        var orderList = Ext.getCmp( 'employee-Order-OrderHistory-OrderList' );
        
        // Order List Store
        var orderListStore = orderList.getStore();
        
        // Check if type and params exist
        if ( typeof ( type ) != 'undefined' && typeof ( params ) != 'undefined' ) {
            switch ( type ) {
                // Get Order information
                case 0 :
                    var url = 'order/get_order';
                    var method = 'GET' ;
                    break;
                case 1 :
                    break;
            }
            orderList.setLoading( true );
            orderListStore.getProxy().data = [];
            // Send Request
            Ext.Ajax.request({
                url : url ,
                method : method ,
                params : params ,
                reader : { 
                    type : 'json' ,
                    rootProperty: 'orders'
                },
                success : function ( result , request ) {
                    var response = JSON.parse( result.responseText );
                    
                    if ( response.success == 2 ) {
                        Ext.Msg.alert ( 'Message' , 'No Orders Found.' );
                        orderListStore.load();
                        orderList.setLoading( false );
                    } else if ( response.success == 1 ) {
                        orderListStore.getProxy().data = response.orders;
                        orderListStore.load();
                        orderListStore.loadPage(1);
                        orderList.setLoading( false );
                    } else {
                        var errorCode = 'Error ';
                        var errorMessage = '';
                        if ( response.errorMessage ) {
                            if ( response.errorMessage.errorCode ) {
                                errorCode += response.errorMessage.errorCode;
                            }
                            if ( response.errorMessage.errorCode ) {
                                errorMessage += response.errorMessage.errorMessage;
                            } else {
                                errorMessage += 'Unable To Get Order';
                            }
                        } else {
                            errorMessage += 'Unknown Error';
                        }
                        orderListStore.load();
                        orderList.setLoading( false );
                        Ext.Msg.alert( errorCode , errorMessage );
                    }
                },
                failure : function ( result , request ) {
                    orderListStore.load();
                    orderList.setLoading( false );
                    Ext.Msg.alert( 'Failure' , 'Unknown Error , Please Contact Technique Support.' );
                }
            });
        }   
    }*/
})