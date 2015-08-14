var partanA = "<a class='employee517-service'> <div class='employee517-service-icon'><i class='";
var partanB = "'></i></div><div class='employee517-serviceName'>";
var partanC = "</div><div class='employee517-serviceCaption'>";
var partanD = "</div></a>";
 
var SupportCategory = "<h2>Support &nbsp&nbsp</h2>";
    var ContactCenterIcon = partanA +"fa fa-phone fa-3x"+partanB+"Contact Center"+partanC+"Contact Us"+partanD;

var RegionCategory = "<h2>Region &nbsp&nbsp</h2>";
    var RegionInformationIcon = partanA +"fa fa-sitemap fa-3x"+partanB+"Information"+partanC+"Check/Edit Regions"+partanD;
    
var mainpanel_right_panel_minWidth = 400;var mainpanel_right_icon_Height = 50;var mainpanel_right_icon_Width = 350;


Ext.define('517Employee.view.navigation.mainpanel.RightSection', {
    extend: 'Ext.panel.Panel',

    requires: [
        
    ],
    xtype: 'employee-navigation-mainpanel-right',
    frame:false,border:false,
    minWidth:mainpanel_right_panel_minWidth,
    layout: 'absolute',
    initComponent: function() {
        var Rx = 25;
        var Ry = 0;
        var items=[];

        //if ( Ext.getCmp( 'Employee-Header').getUserInfo().email == 'test@test.test' ) {

        //} else {
            // If Admin
            if (Ext.getCmp('Employee-Header').checkUserPermissions('admin') == true) {
                var regionTitle = this.createIconTitle(RegionCategory, Rx, Ry);
                Ry += 50;
                var regionInformation = this.createIcon(RegionInformationIcon, 'employee-region information', Rx, Ry);
                Ry += 70;
                items.push(regionTitle);
                items.push(regionInformation);
            }
        //}

        var suppportTitle = this.createIconTitle( SupportCategory , Rx , Ry ); Ry += 50;
        var supportContactCenter = this.createIcon( ContactCenterIcon , 'employee-support contactCenter' , Rx , Ry );
        items.push( suppportTitle );   items.push( supportContactCenter );
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

        newIcon.height = mainpanel_right_icon_Height;
        newIcon.width = mainpanel_right_icon_Width;
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
        newIcon.width = mainpanel_right_icon_Width;
        newIcon.frame = false;
        newIcon.bodyStyle = {'border-width':'0px',cursor:'pointer'};
        return newIcon;
    }

})