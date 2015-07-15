Ext.define('517Employee.view.main.Sidebar', {
    extend: 'Ext.panel.Panel',
    xtype: 'sidebar-store',
    requires: [
        '517Employee.view.main.SidebarController'
    ],
    title: 'MENU',
    width:180,
    split: false,
    collapsible: true,
    collapsed:true,
    controller:'sidebar-store',
   
    layout: {
                type: 'border',
               
                
            },
    
    glyph: 'xf03a@FontAwesome',
    header: {
        titleAlign: 'center',
    },
    dockedItems: [   
        {
            xtype: 'toolbar',
            dock:'left',
            width:178,
            border:false, frame: false,
            style:{ margin:'0 1 1 1','text-align':'center'},
            layout: { type: 'vbox', pack: 'stretch',},
            defaults:{ width:155,  'text-align':'center' },
            items: [
                {
                    text: 'Order History',
                    glyph: 'xf03a@FontAwesome',
                    textAlign: 'left',
                    handler: 'doNavigation',
                    scale: 'medium'
                },
                {
                    text: 'My Profile',
                    //iconCls: 'fa fa-user fa-2x fa-fw',
                    glyph: 'xf007@FontAwesome',
                    textAlign: 'left',
                    action: 'userInfo',
                    scale: 'medium'
                },
                {
                    text: 'Contact Center',
                    textAlign: 'left',
                    glyph: 'xf095@FontAwesome',
                    id:'admin-sidebar-restaurant-management',
                    scale: 'medium',
                    action: 'contactCenter'
                }
            ]
        }
    ]
});