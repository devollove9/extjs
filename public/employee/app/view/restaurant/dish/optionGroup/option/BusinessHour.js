/**
 * Created by devo on 9/3/2015.
 */

Ext.define('517Employee.view.restaurant.dish.optionGroup.option.BusinessHour', {
    extend: 'Ext.grid.Panel',

    xtype: 'employee-restaurant-dish-optionGroup-option-businessHour',

    store: Ext.create( '517Employee.store.restaurant.dish.optionGroup.option.BusinessHour' ),
    title: 'Option Business Hour',
    margin:'2 2 2 2',
    header:{ titleAlign: 'left' , height:30 , padding:'0 10 0 10' },
    collapsible: true, columnLines:true ,
    autoScroll:true ,

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
                    //handler:'NewBusinessHour'
                    handler:function(){
                        this.up().up().newBusinessHour();
                    }
                }
            ]
        }
    ],
    columns:[
        {
            text     : 'Day',
            width: 30,
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
                    //handler: 'EditBusinessHour'
                    handler:function( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine ) {
                        this.up().up().editBusinessHour( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine );
                    }
                },
                {
                    iconCls:'delete-col',
                    tooltip:'Delete BusinessHour',
                    //handler:'DeleteBusinessHour'
                    handler:function( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine ){
                        this.up().up().deleteBusinessHour( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine );
                    }
                }
            ]
        }
    ],
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
        this.setTitle( 'Option Business Hour' );
        this.closeWindowPopUp();
        this.getView().refresh();
    },
    newBusinessHour:function( ){
        var me = this;
        Ext.getCmp( 'Employee-Header' ).newBusinessHour( me );
    },
    editBusinessHour:function( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine ) {
        var me = this;
        Ext.getCmp( 'Employee-Header' ).editBusinessHour( me , rowIdx , colIdx , edit_col , clickEvent , recordLine )
    },
    deleteBusinessHour:function( grid , rowIdx , colIdx , edit_col , clickEvent , recordLine ) {
        var me = this;
        Ext.getCmp( 'Employee-Header' ).deleteBusinessHour( me , rowIdx , colIdx , edit_col , clickEvent , recordLine )
    },
    addBusinessHour:function( businessHour ) {
        var me = this;
        if ( businessHour && businessHour.length > 0 ) {
            me.getStore().add( businessHour );
        }
        me.getView().refresh();
    },
    getBusinessHour:function() {
        var me = this;
        var businessHour = Ext.getCmp( 'Employee-Header').copyStoreToArray( me.getStore() );
        return businessHour;
    },
    setBusinessHourGrid:function( name , businessHour ) {
        var me = this;
        me.resetAll();
        me.setTitle( me.getTitle() + ' - ' + name );
        me.addBusinessHour( businessHour );
    }
});










