﻿Ext.define( '517Employee.view.main.ContentViewEmployee' , {
    extend: 'Ext.panel.Panel',
    xtype: 'content-view-employee',
    requires: [
        '517Employee.view.navigation.NavigationView',
        '517Employee.view.operator.OperatorView',
        //'517Employee.view.restaurant.RestaurantView',
        //'517Employee.view.driver.DriverView',
        //'517Employee.view.settings.SettingsView',
        //'517Employee.view.support.SupportView'

    ],
    border: false,frame:false,
    minWidth: 1350,
    autoScroll:true,
    layout: { type:'card' , padding:0 },
    items: [
        {
            border:false,frame:false,
            xtype: 'employee-navigation',
            id: 'Employee-Navigation',
            minWidth: 1350,
            autoScroll:true,
        },
        {
            border:false,frame:false,
            xtype: 'employee-operator',
            id: 'Employee-Operator',
        },
        {
            border:false,frame:false,
            //xtype: 'employee-restaurant',
            //id: 'Employee-Restaurant',
        },
        {
            border:false,frame:false,
            //xtype: 'employee-driver',
            //id: 'Employee-Driver',
        },
        {
            border:false,frame:false,
            //xtype: 'employee-driver',
            //id: 'Employee-Restaurant3',
        },
       {
            border:false,frame:false,
            //xtype: 'employee-settings',
            //id: 'Employee-Settings',
        },

        {
            border:false,frame:false,
            //xtype: 'employee-support',
            //id: 'Employee-Support',
        }
        
    ]
});