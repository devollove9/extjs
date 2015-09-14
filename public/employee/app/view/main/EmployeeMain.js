Ext.define('517Employee.view.main.EmployeeMain', {
    extend: 'Ext.panel.Panel',
    xtype: 'employee-main',
    controller:'employee-main',
    requires: [
        //'Ext.layout.container.Border',
        '517Employee.view.main.Sidebar',
        //'517Employee.view.main.ContentViewEmployee',
        '517Employee.view.main.EmployeeMainController'
    ],
    border:false,
    bodyStyle:{"background-color":"white" , 'border-width' : '0px'}, 
    frame:false,
    refrenceHolder:true,
    itemId: 'employee-main',
    layout:'border',
    minWidth: 1350,

    items: [   
        {
            xtype: 'panel',
            region: 'center',
            border:false,frame:false,
            layout:'fit',
            padding:0,
            minWidth: 1350,
            reference:'contentHolder',
            bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'}
           /* items: [

                {

                    //
                    layout:'fit',
                    xtype:'panel',
                    margin: '10 0 10 0',
                    padding:0,
                    border: false,frame:false,
                    minWidth: 1350,
                    autoScroll:true,
                    style:{ "background-color":"#157fcc"},
                    id:'Employee-Main-ContentView',
                    region: 'center',
                    items:[
                        {
                            xtype:'content-view-employee'
                        },
                    ]
                }
            ]*/

        }
    ]

});