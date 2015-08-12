/**
 * Created by devo on 8/9/2015.
 */
/**
 * Created by devo on 8/9/2015.
 */
Ext.define('517Employee.view.restaurant.information.restaurant.announcement.Announcement', {
    extend: 'Ext.grid.Panel',
    requires: [
        '517Employee.view.restaurant.information.restaurant.announcement.AnnouncementController'
    ],
    xtype: 'employee-restaurant-information-restaurant-announcement',
    controller: 'employee-restaurant-information-restaurant-announcement-controller',
    store: Ext.create( '517Employee.store.restaurant.information.restaurant.announcement.Announcement' ),
    title: 'Announcement',

    header:{ titleAlign: 'left' , height:30 , padding:'0 10 0 10' },
    collapsible: true, columnLines:true ,
    height: 270 , autoScroll:true ,

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
            text     : 'Announcement',
            flex     : 1,
            sortable : false,
            dataIndex: 'announcement'
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
    getViewData:function() {
        var me = this;
        var store = this.getStore();
        var announcement = [];
        store.each( function( record , idx ) {
            var newAnnouncement = record.data.announcement;
            announcement.push( newAnnouncement );
        });
        return announcement;
    },
    loadAnnouncement:function( data ) {
        var me = this;
        var announcementArray = [];
        if ( data ) {
            if ( data.length > 0 ) {
                for ( var i = 0 ; i < data.length ; i ++ ) {
                    var announcement = {};
                    announcement.announcement = data[ i ];
                    announcementArray.push( announcement );
                }
            }
        }
        me.getStore().add( announcementArray );
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