var partanA = "<a class='employee517-service'> <div class='employee517-service-icon'><i class='";
var partanB = "'></i></div><div class='employee517-serviceName'>";
var partanC = "</div><div class='employee517-serviceCaption'>";
var partanD = "</div></a>";

var OrderCategory = "<h2>Order &nbsp&nbsp</h2>";
    var OrderHistoryIcon = partanA +"fa fa-file-text-o fa-4x"+partanB+"Order History"+partanC+"View & Search Orders"+partanD;
    
var SettingCategory = "<h2>Settings &nbsp&nbsp</h2>";
    var MyprofileIcon = partanA +"fa fa-user fa-4x"+partanB+"My Profile"+partanC+"Check your Information"+partanD;
    
var SupportCategory = "<h2>Support &nbsp&nbsp</h2>";
    var ContactCenterIcon = partanA +"fa fa-phone fa-4x"+partanB+"Contact Center"+partanC+"Contact us"+partanD;
    
var L0x = 50 , L0y = 0  , C0x = 500, C0y = 0  , R0x = 950, R0y = 0  ,
    L1x = 50 , L1y = 50 , C1x = 500, C1y = 50 , R1x = 950, R1y = 50  ,
    k;

Ext.define('517Employee.view.navigation.NavigationView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.navigation.mainpanel.MainpanelView',
        '517Employee.view.navigation.supportpanel.SupportpanelView'
    ],   
    xtype: 'employee-navigation',
    frame:false , border:false,
    layout: 'fit',
    minWidth: 1350,
    autoScroll:true,
    items:[
        {
            xtype: 'employee-navigation-mainpanel',
            minWidth: 1350,
            autoScroll:true,
        }
        
    ],
    listeners: {
        render: function(c) {
            c.el.on('click', function() { 
                //alert('onclick');
            });
        },
        scope: this
    },
    doNavigation:function(panel){
        ////console.log( panel.navigateAction );
        var employeeContent = Ext.getCmp( 'Employee-Main-ContentView' );
        //var employeeContent = Ext.ComponentQuery.query('#Employee-Main-ContentView')[0];
        if ( panel ) {
            if ( panel.navigateAction ) {
                var navigation = panel.navigateAction.split(" ");

                /* 0: Navigation Panel
                 * 1: Operator Panel
                 * 2: Restaurant Panel
                 * 3: Driver Panel
                 * 4: Bill Panel
                 * 5: Settings Panel
                 * 6: Region Panel
                 * 7: Support Panel
                 *
                 */
                switch ( navigation[0] ) {

                    case 'employee-navigation' :
                        employeeContent.setActiveItem(0);
                        break;

                    case 'employee-operator' :
                        employeeContent.setActiveItem(1);
                        var tab = new Object(); tab.navigateAction = navigation[1];
                        Ext.getCmp( 'Employee-Operator' ).doNavigation( tab );
                        break;

                    case 'employee-restaurant' :
                        employeeContent.setActiveItem(2);
                        var tab = new Object(); tab.navigateAction = navigation[1];
                        Ext.getCmp( 'Employee-Restaurant' ).doNavigation( tab );
                        break;

                    case 'employee-driver' :
                        employeeContent.setActiveItem(3);
                        var tab = new Object(); tab.navigateAction = navigation[1];
                        Ext.getCmp( 'Employee-Driver' ).doNavigation( tab );
                        break;

                    case 'employee-bill' :
                        employeeContent.setActiveItem(4);
                        var tab = new Object(); tab.navigateAction = navigation[1];
                        Ext.getCmp( 'Employee-Bill' ).doNavigation( tab );
                        break;

                    case 'employee-settings' :
                        employeeContent.setActiveItem(5);
                        var tab = new Object(); tab.navigateAction = navigation[1];
                        Ext.getCmp( 'Employee-Settings' ).doNavigation( tab );
                        //console.log( employeeContent );
                        break;

                    case 'employee-region' :
                        employeeContent.setActiveItem(6);
                        var tab = new Object(); tab.navigateAction = navigation[1];
                        Ext.getCmp( 'Employee-Region' ).doNavigation( tab );
                        break;

                    case 'employee-support' :
                        employeeContent.setActiveItem(7);
                        var tab = new Object(); tab.navigateAction = navigation[1];
                        Ext.getCmp( 'Employee-Support' ).doNavigation( tab );
                        break;

                    case 'employee-driverUnique' :
                        employeeContent.setActiveItem(8);
                        var tab = new Object(); tab.navigateAction = navigation[1];
                        Ext.getCmp( 'Employee-DriverUnique' ).doNavigation( tab );
                        break;

                    case 'employee-user' :
                        employeeContent.setActiveItem(9);
                        var tab = new Object(); tab.navigateAction = navigation[1];
                        Ext.getCmp( 'Employee-User' ).doNavigation( tab );
                        break;
                }
            } else {
                employeeContent.setActiveItem(0);
            }
        }
    }
    
});