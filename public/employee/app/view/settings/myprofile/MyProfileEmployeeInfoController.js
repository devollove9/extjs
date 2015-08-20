Ext.define('517Employee.view.settings.myprofile.MyProfileEmployeeInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-settings-myProfile-employeeInfo',
    requires: [
        //'517.view.main.AdminMain'
        //'517.517Time'
    ],
   
    /*
     *  Init function
     */
    init : function () {
        var me = this;
       
    },
    addEmployeeInfo:function( record ) {
        var employeeInfo = Ext.getCmp( 'Employee-Settings-MyProfile-EmployeeInfo' );
        var employeeInfoForm = employeeInfo.getForm();
        //console.log(record);
        employeeInfoForm.findField( 'name').setValue( record.name );
        employeeInfoForm.findField( 'nameEn').setValue( record.nameEn );
        employeeInfoForm.findField( 'regionNameFull').setValue( record.regionName );
        employeeInfoForm.findField( 'address').setValue( record.information.address );
        employeeInfoForm.findField( 'description').setValue( record.information.description );
        employeeInfoForm.findField( 'descriptionEn').setValue( record.information.descriptionEn );
        
        var paymentTypeMap = [ 'Cash' , 'Card' ];
        var paymentString = '';
        for( var i = 0 ; i < record.paymentType.length ; i ++ ) {
            if ( i == record.paymentType.length - 1 ) {
                paymentString += paymentTypeMap[ record.paymentType[i] ];
            } else {
                paymentString += paymentTypeMap[ record.paymentType[i] ] + ' , ';
            } 
        }
        employeeInfoForm.findField( 'paymentType').setValue( paymentString );
        
        var deliverTypeMap = [ '517 Deliver' , 'Pick Up' , 'Restaurant Deliver' , 'Restaurant Handle'];
        var deliverString = '';
        for( var i = 0 ; i < record.delivery.type.length ; i ++ ) {
            if ( i == record.delivery.type.length - 1 ) {
                deliverString += deliverTypeMap[ record.delivery.type[i] ];
            } else {
                deliverString += deliverTypeMap[ record.delivery.type[i] ] + ' , ';
            } 
        }
        employeeInfoForm.findField( 'deliveryType').setValue( deliverString );
    }
    
    
});
