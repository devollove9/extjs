/**
 * Created by devo on 8/9/2015.
 */
/**
 * Created by devo on 8/9/2015.
 */
Ext.define('517Employee.view.restaurant.information.restaurant.announcementEn.AnnouncementEnView', {
    extend: 'Ext.grid.Panel',
    requires: [
        '517Employee.view.restaurant.information.restaurant.announcementEn.AnnouncementEnController'
    ],
    xtype: 'employee-restaurant-information-restaurant-announcementEn',
    controller: 'employee-restaurant-information-restaurant-announcementEn-controller',
    store: Ext.create( '517Employee.store.restaurant.information.restaurant.announcementEn.AnnouncementEn' ),
    title: 'English Announcement',

    header:{ titleAlign: 'left' , height:30 , padding:'0 10 0 10' },
    collapsible: true, columnLines:true ,
    maxHeight: 270 , autoScroll:true ,

    /* Variables */
    changed:false,changedString:[],
    // Variable detect if editing
    gridEditing: false ,
    // Window Opend in this View
    windowPopUp:[],

    /* Content */
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            height: 30,
            defaults:{
                height:19
            },
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    iconCls: 'fa fa-plus',
                    text: 'New',
                    handler:'NewAnnouncement'
                }
            ]
        }
    ],
    columns:[
        {
            text     : 'English Announcement',
            flex     : 1,
            sortable : false,
            dataIndex: 'announcementEn'
        },
        {
            menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            width: 45,
            items: [
                {
                    iconCls: 'edit-col',
                    tooltip: 'Check/Edit Announcement',
                    handler: 'EditAnnouncement'
                },
                {
                    iconCls:'delete-col',
                    tooltip:'Delete Announcement',
                    handler:'DeleteAnnouncement'
                }
            ]
        }
    ],
    loadAnnouncement:function( data ) {
        var me = this;
        var announcement = [];
        if ( data ) {
            announcement = data;
        }
        me.getStore().add( defaultAnnouncement )
    },
    addOpenedWindow:function( window ) {
        this.windowPopUp.push( window );
        this.gridEditing = true;
    },
    closeWindowPopUp:function() {
        var windows = this.windowPopUp;
        for ( var i = 0 ; i < windows.length ; i ++ ) {
            var window = windows[ i ];
            window.close();
        }
        this.gridEditing = false;
        this.windowPopUp = [];
    },
    resetAll:function() {
        this.getStore().loadData( [] , false );
        this.setTitle( 'Announcement' );
        this.closeWindowPopUp();
    }

});