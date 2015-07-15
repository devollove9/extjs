Ext.define('517Employee.view.support.Sidebar', {
    extend: 'Ext.panel.Panel',
    xtype: 'employee-support-sidebar',
    requires: [
        '517Employee.view.support.SidebarController'
    ],
    title: 'SUPPORT',
    width:150,
    split: false,
    collapsible: true,
    controller:'employee-support-sidebar',
    layout: { type: 'border' },
    glyph: 'xf0ad@FontAwesome',
    header: { titleAlign: 'center' ,height:30,padding:'0 10 0 10',margin:'0 0 1 0'},
    bodyStyle:{ 'border-left':'0', 'border-right':'1px solid #cececce' , margin:'0' , padding:'0' , 'background-color': 'white' },
    dockedItems: [   
        {
            xtype: 'toolbar',
            dock:'left',
            width: 150,
            //border:false,
            frame: false,
            style:{ 'text-align':'center'},
            layout: { type: 'vbox', pack: 'stretch',},
            defaults:{ width:125,  'text-align':'center' },
            items: [
                {
                    text: 'Contact Center',
                    glyph: 'xf095@FontAwesome',
                    textAlign: 'left',
                    navigateAction: 'contactCenter',
                    handler: 'doNavigation',
                    scale: 'medium'
                },
                {
                    text: 'Go Back',
                    //iconCls: 'fa fa-user fa-2x fa-fw',
                    glyph: 'xf112@FontAwesome',
                    textAlign: 'left',
                    navigateAction: 'employee-navigation',
                    handler: 'doNavigation',
                    scale: 'medium'
                },/*
                {
                    text: 'Contact Center',
                    textAlign: 'left',
                    glyph: 'xf095@FontAwesome',
                    id:'admin-sidebar-restaurant-management',
                    scale: 'medium',
                    action: 'contactCenter'
                }*/
            ]
        }
    ]
});