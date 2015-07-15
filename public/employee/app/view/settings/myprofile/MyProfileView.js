Ext.define('517Employee.view.settings.myprofile.MyProfileView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.settings.myprofile.MyProfileStoreInfo'
    ],   
    xtype: 'employee-settings-myProfile',
    frame:false , border:false,
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
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
            xtype: 'employee-settings-myProfile-storeInfo',
            id: 'employee-Settings-MyProfile-StoreInfo',
        }
        
    ],
 
    doNavigation:function(panel){
        console.log( panel );
    }
    
});