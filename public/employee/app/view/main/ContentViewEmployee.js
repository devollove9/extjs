function compare_Local( array , value ) {
    if ( typeof array != 'undefined' && typeof value != 'undefined' ) {
        if ( array.length ) {
            if ( array.length > 0 ) {
                for ( var i = 0 ; i < array.length ; i ++ ) {
                    if ( array[ i ] === value ) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
};
function checkUserPermissions_Local( type ) {
    var userCookie = Ext.decode( Ext.util.Cookies.get( '517Employee' ) );
    var permissions = userCookie.role;
    var valid = compare_Local( permissions , type );
    return valid;
};
var Employee_Main_ContentView_Requires = [
        '517Employee.view.navigation.NavigationView',
        '517Employee.view.settings.SettingsView',
        '517Employee.view.support.SupportView'

    ];

if ( checkUserPermissions_Local( 'operator' ) == true ) {
    Employee_Main_ContentView_Requires.push( '517Employee.view.operator.OperatorView' );
    Employee_Main_ContentView_Requires.push( '517Employee.view.restaurant.RestaurantView' );
    //Employee_Main_ContentView_Requires.push( '517Employee.view.driver.DriverView' );
}
if ( checkUserPermissions_Local( 'admin' ) == true ) {
    Employee_Main_ContentView_Requires.push( '517Employee.view.bill.BillView' );
   // Employee_Main_ContentView_Requires.push( '517Employee.view.region.RegionView' );
}
Ext.define( '517Employee.view.main.ContentViewEmployee' , {
    extend: 'Ext.panel.Panel',
    xtype: 'content-view-employee',
    requires: Employee_Main_ContentView_Requires ,
    //controller: 'content-view-employee-controller',
    id:'Employee-Main-ContentView',
    margin: '10 0 10 0',
    border: false,frame:false,
    minWidth: 1350,
    autoScroll:true,
    style:{ "background-color":"#157fcc"},
    layout: { type:'card' , padding:0 },
    initComponent:function( ){
        var items = this.createItems();
        this.items = items;
        this.callParent(arguments);
    },


    checkUserPermissions:function( type ) {
        var me = this;
        var userCookie = Ext.decode( Ext.util.Cookies.get( '517Employee' ) );
        var permissions = userCookie.role;
        var valid = me.compare( permissions , type );
        return valid;
    },
    compare:function( array , value ) {

        if ( typeof array != 'undefined' && typeof value != 'undefined' ) {
            if ( array.length ) {
                if ( array.length > 0 ) {
                    for ( var i = 0 ; i < array.length ; i ++ ) {
                        if ( array[ i ] === value ) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    },
    createItems:function(){
        var items =  [
            {
                border:false,frame:false,
                xtype: 'employee-navigation',
                id: 'Employee-Navigation',
            },
            {
                border:false,frame:false,
                //xtype: 'employee-operator',
                //id: 'Employee-Operator',
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
                //xtype: 'employee-bill',
                //id: 'Employee-Bill',
            },
            {
                border:false,frame:false,
                xtype: 'employee-settings',
                id: 'Employee-Settings',
            },
            {
                border:false,frame:false,
                //xtype: 'employee-region',
                //id: 'Employee-REgion',
            },
            {
                border:false,frame:false,
                xtype: 'employee-support',
                id: 'Employee-Support',
            }
        ];
        //console.log( items[2]);
        var userCookie = Ext.decode( Ext.util.Cookies.get( '517Employee' ) );
        var permissions = Ext.decode( Ext.util.Cookies.get( '517Employee' ) ).role;
        if ( this.checkUserPermissions( 'driver' ) == true && this.checkUserPermissions( 'admin' ) == false && this.checkUserPermissions( 'operator' ) == false) {
            // Driver Only
        }
        if ( this.checkUserPermissions( 'operator' ) == true ) {
            items[ 1 ] = { border:false ,frame:false , xtype: 'employee-operator' , id: 'Employee-Operator' };
            items[ 2 ] = { border:false ,frame:false , xtype: 'employee-restaurant' , id: 'Employee-Restaurant' };
            //items[ 3 ] = { border:false ,frame:false , xtype: 'employee-driver' , id: 'Employee-Driver' };
        }
        if ( this.checkUserPermissions( 'admin' ) == true ) {
            items[ 4 ] = { border:false ,frame:false , xtype: 'employee-bill' , id: 'Employee-Bill' };
            //items[ 6 ] = { border:false ,frame:false , xtype: 'employee-region' , id: 'Employee-Region' };
        }
        return items;
    }
});