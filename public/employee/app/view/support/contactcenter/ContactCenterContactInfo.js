Ext.define('517Employee.view.support.contactcenter.ContactCenterContactInfo', {
    extend: 'Ext.form.Panel',
    //controller: 'employee-support-contactCenter-contactInfo',
    requires: [
       // '517Employee.view.settings.myprofile.MyProfileEmployeeInfoController'
    ],   
    xtype: 'employee-support-contactCenter-contactInfo',
    bodyStyle:{ "background-color":"white",'border-color' : '#c1c1c1',},
    title: '517 Employee Service : Contact Center',
    header:{ height:30 ,padding:'0 0 0 10',margin:'0 0 0 0'},
    layout: 'hbox',
    autoScroll:true,
    items:[
        {
            xtype:'fieldset',
            width : '100%' , frame:false , border: false , 
            items:[
                // Customer Service
                {
                    margin: '50 0 15 30',height: 30,
                    xtype: 'fieldcontainer' , combineErrors: true,
                    layout:'hbox' , defaultType: 'textfield',
                    defaults: {
                        anchor: '100%',
                        margin:'0 5 0 5' ,
                        labelAlign: 'right',
                        fieldStyle: 'font-size:20px;',
                    },
                    items: [ 
                        { 
                            xtype : 'displayfield',
                            value : 'Customer Survice: '
                        },
                        { 
                            xtype : 'displayfield',
                            name : 'customerService',
                            value : '+1 517-507-5857'
                        },
                    ]
                },
                // Technique Support
                {
                    margin: '15 0 15 30',height: 30,
                    xtype: 'fieldcontainer' , combineErrors: true,
                    layout:'hbox' , defaultType: 'textfield',
                    defaults: {
                        anchor: '100%',
                        margin:'0 5 0 5' ,
                        labelAlign: 'right',
                        fieldStyle: 'font-size:20px;',
                    },
                    items: [ 
                        { 
                            xtype : 'displayfield',
                            value : 'Technique Support: '
                        },
                        { 
                            xtype : 'displayfield',
                            name : 'techniqueSupport',
                            value : '+1 517-803-2917'
                        },
                    ]
                },
                // Email
                {
                    margin: '15 0 15 30',height: 30,
                    xtype: 'fieldcontainer' , combineErrors: true,
                    layout:'hbox' , defaultType: 'textfield',
                    defaults: {
                        anchor: '100%',
                        margin:'0 5 0 5' ,
                        labelAlign: 'right',
                        fieldStyle: 'font-size:20px;',
                    },
                    items: [ 
                        { 
                            xtype : 'displayfield',
                            value : 'Email: '
                        },
                        { 
                            xtype : 'displayfield',
                            name : 'email',
                            value : 'support@us517.com'
                        },
                    ]
                },
                // Wechat
                {
                    margin: '15 0 15 30',height: 400,
                    xtype: 'fieldcontainer' , combineErrors: true,
                    layout:'hbox' , defaultType: 'textfield',
                    defaults: {
                        anchor: '100%',
                        margin:'0 5 0 5' ,
                        labelAlign: 'right',
                        fieldStyle: 'font-size:20px;',
                    },
                    items: [ 
                        { 
                            xtype : 'displayfield',
                            value : 'Wechat: '
                        },
                        { 
                            xtype : 'displayfield',
                            name : 'wechat',
                            value: '<img src="https://s3-us-west-2.amazonaws.com/static.djwong.net/production/images/qr.png">'
                        },
                    ]
                },
           
            ],
        }
    ],
    
});