Ext.define('517Employee.view.main.StoreMain', {
    extend: 'Ext.panel.Panel',
    xtype: 'employee-main',
    controller:'employee-main',
    requires: [
        //'Ext.layout.container.Border',
        '517Employee.view.main.Sidebar',
        '517Employee.view.main.ContentViewStore',
        '517Employee.view.main.StoreMainController'
    ],
    border:false,
    bodyStyle:{"background-color":"white" , 'border-width' : '0px'}, 
    frame:false,
    itemId: 'employee-main',
    layout:'card',
     
    items: [   
        {
            xtype: 'panel',
            region: 'center',
            border:false,frame:false,
            layout: { type: 'border' , padding: 0 },
            
            bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'}, 
            items: [/*
                {
                    xtype: "sidebar-store",
                    id:'employee-sidebar',
                    region: 'west',
                    // Border Color
                    style:{ "background-color":"#157fcc"},
                    margin: '5 5 5 0',
                    //width:180,
                },*/
                {
                    xtype:'content-view-employee',
                    margin: '10 0 10 0',
                    padding:0,
                    border: false,frame:false,
                    style:{ "background-color":"#157fcc"},
                    id:'employee-content-view',
                    region: 'center',
                }
            ]

        },
        {
            xtype: 'panel',
            region: 'center',
            layout: {
                type: 'border',
                padding: 0
            },
            items: [
                {
                    region:'west',
                    //xtype:'operator-region-list',
                    width:125,
                    //xtype:'admin-region-list',
                    id:'admin-regionlist'
                },
                {
                    //xtype: "sidebar",
                    id:'admin-sidebar',
                    region: 'west',
                    collapsible: true,
                    frame: true,
                    split: false,
                    margin: '0 3 0 1'
                },
                {
                    //xtype:'content-view',
                    id:'admin-content-view',
                    region: 'center',
                }
            ]

        },
        
        /*
        {
            xtype: 'op-main'            
        }*/

    ]

});