Ext.define('517Employee.view.user.Sidebar', {
    extend: 'Ext.panel.Panel',
    xtype: 'employee-user-sidebar',
    requires: [
        '517Employee.view.user.SidebarController'
    ],
    title: 'ORDER',
    width:150,
    split: false,
    collapsible: true,
    controller:'employee-user-sidebar',
    layout: { type: 'buser' },
    glyph: 'xf0c9@FontAwesome',
    header: { titleAlign: 'center' ,height:30,padding:'0 10 0 10',margin:'0 0 0 0'},
    bodyStyle:{ 'buser-left':'0', 'buser-right':'1px solid #cececce' , margin:'0' , padding:'0' , 'background-color': 'white' },
    dockedItems: [   
        {
            xtype: 'toolbar',
            dock:'left',
            width: 150,
            //buser:false,
            frame: false,
            style:{ 'text-align':'center'},
            layout: { type: 'vbox', pack: 'stretch',},
            defaults:{ width:125,  'text-align':'center' },
            items: [
                {
                    text: 'History',
                    glyph: 'xf03a@FontAwesome',
                    textAlign: 'left',
                    navigateAction: 'userHistory',
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