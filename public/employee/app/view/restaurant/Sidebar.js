﻿Ext.define('517Employee.view.restaurant.Sidebar', {
    extend: 'Ext.panel.Panel',
    xtype: 'employee-restaurant-sidebar',
    requires: [
        '517Employee.view.restaurant.SidebarController'
    ],
    title: 'RESTAURANT',
    width:150,
    split: false,
    collapsible: true,
    controller:'employee-restaurant-sidebar',
    layout: { type: 'border' },
    glyph: 'xf0c9@FontAwesome',
    header: { titleAlign: 'center' ,height:30,padding:'0 10 0 10',margin:'0 0 0 0'},
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
                    text: 'History',
                    glyph: 'xf03a@FontAwesome',
                    textAlign: 'left',
                    navigateAction: 'orderHistory',
                    handler: 'doNavigation',
                    scale: 'medium'
                },
                {
                    text: 'Information',
                    glyph: 'xf05a@FontAwesome',
                    textAlign: 'left',
                    navigateAction: 'information',
                    handler: 'doNavigation',
                    scale: 'medium'
                },
                {
                    text: 'Dish',
                    glyph: 'xf1b2@FontAwesome',
                    textAlign: 'left',
                    navigateAction: 'dish',
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