Ext.define('517Employee.view.support.contactcenter.ContactCenterView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.support.contactcenter.ContactCenterContactInfo'
    ],   
    xtype: 'employee-support-contactCenter',
    frame:false , border:false,
    layout: 'border',
    autoScroll:true,
    items:[
        //{
            //region: 'north',
            //xtype: 'employee-order-orderHistory-xxxx',
            //id: 'employee-Order-OrderHistory-Xxxx',
       // },
        {
            region: 'center',
            xtype: 'employee-support-contactCenter-contactInfo',
            id: 'Employee-Support-ContactCenter-ContactInfo',
        }
        
    ],
 
    doNavigation:function(panel){
        //console.log( panel );
    }
    
});