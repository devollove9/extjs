var partanA = "<a class='employee517-service'> <div class='employee517-service-icon'><i class='";
var partanB = "'></i></div><div class='employee517-serviceName'>";
var partanC = "</div><div class='employee517-serviceCaption'>";
var partanD = "</div></a>";
 
var EmployeeSettingCategory = "<h2>Settings &nbsp&nbsp</h2>";
    var EmployeeMyprofileIcon = partanA +"fa fa-user fa-3x"+partanB+"My Profile"+partanC+"Check/Edit Your Profile"+partanD;

var BillCategory = "<h2>Bill &nbsp&nbsp</h2>";
    var RestaurantBillIcon = partanA +"fa fa-cutlery fa-3x"+partanB+"Restaurant"+partanC+"Check/Edit Restaurants' Bill"+partanD;
    var DrivertBillIcon = partanA +"fa fa-bus fa-3x"+partanB+"Driver"+partanC+"Check/Edit Drivers' Bill"+partanD;


var mainpanel_center_panel_minWidth = 400;var mainpanel_center_icon_Height = 50;var mainpanel_center_icon_Width = 350;

Ext.define( '517Employee.view.navigation.mainpanel.CenterSection' , {
    extend: 'Ext.panel.Panel',

    requires: [
        
    ],
    xtype: 'employee-navigation-mainpanel-center',
    frame:false,border:false,
    minWidth:mainpanel_center_panel_minWidth,
    layout: 'absolute',
    initComponent: function() {
        var Cx = 25;
        var Cy = 0;
        var items=[];


        // If Admin
        if ( Ext.getCmp( 'Employee-Header').checkUserPermissions( 'admin' ) == true ) {
            var BillTitle = this.createIconTitle( BillCategory , Cx , Cy ); Cy += 50;
            var BillBlockRestaurant = this.createIcon( RestaurantBillIcon , 'employee-bill restaurant' , Cx , Cy ); Cy += 50;
            var BillBlockDriver = this.createIcon( DrivertBillIcon , 'employee-bill driver' , Cx , Cy ); Cy += 70;
            items.push( BillTitle ); items.push( BillBlockRestaurant ); items.push( BillBlockDriver );
        }


        var SettingsTitle = this.createIconTitle( EmployeeSettingCategory , Cx , Cy ); Cy += 50;
        var SettingsBlockMyProfile = this.createIcon( EmployeeMyprofileIcon , 'employee-settings myProfile' , Cx , Cy );
        items.push( SettingsTitle ); items.push( SettingsBlockMyProfile );

        this.items = items;
        this.callParent(arguments);
    },
    createIcon:function( html , action , x , y ) {
        var newIcon = new Object();
        newIcon.html = html;
        newIcon.navigateAction = action;
        newIcon.x = x;
        newIcon.y = y;
        newIcon.listeners = {
            render: function( panel , b , c , d , e , f , g ) {
                panel.el.on('click', function() {
                    Ext.getCmp( 'Employee-Navigation' ).doNavigation( panel );
                });
            }, scope: this
        };

        newIcon.height = mainpanel_center_icon_Height;
        newIcon.width = mainpanel_center_icon_Width;
        newIcon.border = false;
        newIcon.frame = false;
        newIcon.bodyStyle = {'border-width':'0px',cursor:'pointer'};
        return newIcon;
    },
    createIconTitle:function( html , x , y ) {
        var newIcon = new Object();
        newIcon.html = html;
        newIcon.x = x;
        newIcon.y = y;
        newIcon.height = 50;
        newIcon.width = mainpanel_center_icon_Width;
        newIcon.frame = false;
        newIcon.bodyStyle = {'border-width':'0px',cursor:'pointer'};
        return newIcon;
    }
})