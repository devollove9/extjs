/**
 * Created by devo on 8/9/2015.
 */
Ext.define('517Employee.view.restaurant.information.restaurant.businessHour.BusinessHourView', {
    extend: 'Ext.grid.Panel',
    requires: [
        '517Employee.view.restaurant.information.restaurant.businessHour.BusinessHourController'
    ],
    xtype: 'employee-restaurant-information-restaurant-businessHour',
    controller: 'employee-restaurant-information-restaurant-businessHour-controller',
    store: Ext.create( '517Employee.store.restaurant.information.restaurant.businessHour.BusinessHour' ),
    title: 'Business Hour',

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
                    handler:'NewBusinessHour'
                }
            ]
        }
    ],
    columns:[
        {
            text     : 'Day',
            flex     : 1,
            sortable : false,
            dataIndex: 'day'
        },
        {
            text     : 'Start',
            flex     : 2,
            sortable : false,
            dataIndex: 'start',
            renderer: function(val) {
                var Hour= Math.floor(val / 3600);
                if (Hour < 10) Hour = '0' + Hour;
                var Minutes = Math.floor(( val % 3600 ) / 60) ;
                if (Minutes < 10) Minutes = '0' + Minutes;
                var time = Hour + ":" + Minutes
                return time;
            }
        },
        {
            text     : 'End',
            flex     : 2,
            sortable : false,
            dataIndex: 'end',
            renderer: function(val) {
                var Hour= Math.floor(val / 3600);
                if (Hour < 10) Hour = '0' + Hour;
                var Minutes = Math.floor(( val % 3600 ) / 60) ;
                if (Minutes < 10) Minutes = '0' + Minutes;
                var time = Hour + ":" + Minutes
                return time;
            }
        },
        {
            menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            width: 45,
            items: [
                {
                    iconCls: 'edit-col',
                    tooltip: 'Check/Edit BusinessHour',
                    handler: 'EditBusinessHour'
                },
                {
                    iconCls:'delete-col',
                    tooltip:'Delete BusinessHour',
                    handler:'DeleteBusinessHour'
                }
            ]
        }
    ],
    getViewData:function() {
        var me = this;
        var store = this.getStore();
        var businessHour = [];
        store.each( function( record , idx ) {
            var newBusinessHour = new Object();
            //console.log(record);
            newBusinessHour.day = record.data.day;
            newBusinessHour.start = record.data.start;
            newBusinessHour.end = record.data.end;
            businessHour.push( newBusinessHour );
        });
        return businessHour;
    },
    loadBusinessHour:function( data ) {
        var me = this;
        var defaultBusinessHour = [
            {start:0,end:86400,day:1},
            {start:0,end:86400,day:2},
            {start:0,end:86400,day:3},
            {start:0,end:86400,day:4},
            {start:0,end:86400,day:5},
            {start:0,end:86400,day:6},
            {start:0,end:86400,day:7}
        ];
        var businessHour = [];
        if ( data ) {
            businessHour = data;
        } else {
            businessHour = defaultBusinessHour;
        }
        me.getStore().add( businessHour )
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
        this.setTitle( 'Business Hour' );
        this.closeWindowPopUp();
    }

});