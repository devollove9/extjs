Ext.define('517Employee.view.settings.myprofile.MyProfileStoreInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-settings-myProfile-storeInfo',
    requires: [
        //'517.view.main.AdminMain'
        //'517.517Time'
    ],
   
    /*
     *  Init function
     */
    init : function () {
        var me = this;
        Ext.Ajax.request({
            url: '../admin/operator/restaurant/restaurant.json', // you can fix a parameter like this : url?action=anAction1
            method: 'GET',
            params:{               
                method: 'get_by_specificid',
                region_id: 0,
                filterBy: 'storeId',
                filterValue: '000000932513521c4093fd'
            },
            reader: {
                type:'json',   
                rootProperty: 'restaurants'
            }, 
            success: function(result, request) {
                var obj = Ext.decode(result.responseText);
              
                if ( obj.success == 1) {
                    var restaurant_info = JSON.parse(JSON.stringify(obj.restaurants));
                    Ext.getCmp( 'Index' ).restaurant_info = restaurant_info[0];
                    me.addStoreInfo( restaurant_info[ 0 ] );
                }else if (obj.success == -1) {
                    
                } //Error
            }
        });
       
    },
    addStoreInfo:function( record ) {
        var storeInfo = Ext.getCmp( 'employee-Settings-MyProfile-StoreInfo' );
        var storeInfoForm = storeInfo.getForm();
        //console.log(record);
        storeInfoForm.findField( 'name').setValue( record.name );
        storeInfoForm.findField( 'nameEn').setValue( record.nameEn );
        storeInfoForm.findField( 'regionNameFull').setValue( record.regionName );
        storeInfoForm.findField( 'address').setValue( record.information.address );
        storeInfoForm.findField( 'description').setValue( record.information.description );
        storeInfoForm.findField( 'descriptionEn').setValue( record.information.descriptionEn );
        
        var paymentTypeMap = [ 'Cash' , 'Card' ];
        var paymentString = '';
        for( var i = 0 ; i < record.paymentType.length ; i ++ ) {
            if ( i == record.paymentType.length - 1 ) {
                paymentString += paymentTypeMap[ record.paymentType[i] ];
            } else {
                paymentString += paymentTypeMap[ record.paymentType[i] ] + ' , ';
            } 
        }
        storeInfoForm.findField( 'paymentType').setValue( paymentString );
        
        var deliverTypeMap = [ '517 Deliver' , 'Pick Up' , 'Restaurant Deliver' , 'Restaurant Handle'];
        var deliverString = '';
        for( var i = 0 ; i < record.delivery.type.length ; i ++ ) {
            if ( i == record.delivery.type.length - 1 ) {
                deliverString += deliverTypeMap[ record.delivery.type[i] ];
            } else {
                deliverString += deliverTypeMap[ record.delivery.type[i] ] + ' , ';
            } 
        }
        storeInfoForm.findField( 'deliveryType').setValue( deliverString );
    }
    
    
});
