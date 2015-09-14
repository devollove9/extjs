Ext.define('517Employee.view.settings.myprofile.MyProfileEmployeeInfo', {
    extend: 'Ext.form.Panel',
    controller: 'employee-settings-myProfile-employeeInfo',
    requires: [
        '517Employee.view.settings.myprofile.MyProfileEmployeeInfoController'
    ],   
    xtype: 'employee-settings-myProfile-employeeInfo',
    bodyStyle:{ "background-color":"white",'border-color' : '#c1c1c1',},
    title: '517 Employee Service : My Profile',
    header:{ height:30 ,padding:'0 0 0 10',margin:'0 0 0 0'},
    layout: 'hbox',
    autoScroll:true,
    items:[
        {
            xtype:'fieldset',
            width : '100%', frame:false , border: false , 
            items:[
                // Name
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
                            value : 'Employee Name: '
                        },
                        { 
                            xtype : 'displayfield',
                            name : 'name'
                        },
                    ]
                },
                // English Name
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
                            value : 'Employee English Name: '
                        },
                        { 
                            xtype : 'displayfield',
                            name : 'nameEn'
                        },
                    ]
                },
                // Region Name
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
                            value : 'Region: '
                        },
                        { 
                            xtype : 'displayfield',
                            name : 'regionNameFull'
                        },
                    ]
                },
                // Address
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
                            value : 'Address: '
                        },
                        { 
                            xtype : 'displayfield',
                            name : 'address'
                        },
                    ]
                },
                // Description
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
                            value : 'Description: '
                        },
                        { 
                            xtype : 'displayfield',
                            name : 'description'
                        },
                    ]
                },
                // English Description 
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
                            value : 'English Description: '
                        },
                        { 
                            xtype : 'displayfield',
                            name : 'descriptionEn'
                        },
                    ]
                },
                // Supported Payment
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
                            value : 'Payment Accept: '
                        },
                        { 
                            xtype : 'displayfield',
                            name : 'paymentType'
                        },
                    ]
                },
                // Supported Delivery
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
                            value : 'Supported Type: '
                        },
                        { 
                            xtype : 'displayfield',
                            name : 'deliveryType'
                        },
                    ]
                },
            ],
        }
        
    ],
    
});