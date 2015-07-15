var partanA = "<a class='employee517-service'> <div class='employee517-service-icon'><i class='";
var partanB = "'></i></div><div class='employee517-serviceName'>";
var partanC = "</div><div class='employee517-serviceCaption'>";
var partanD = "</div></a>";

var OrderCategory = "<h2>Order &nbsp&nbsp</h2>";
    var OrderHistoryIcon = partanA +"fa fa-file-text-o fa-4x"+partanB+"Order History"+partanC+"View & Search Orders"+partanD;


var L0x = 50  , L0y = 0   ,
    L1x = 50  , L1y = 50  , 
    k;


Ext.define('517Employee.view.navigation.mainpanel.MainpanelView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.navigation.mainpanel.LeftSection',
        '517Employee.view.navigation.mainpanel.CenterSection',
        '517Employee.view.navigation.mainpanel.RightSection'
    ],
    xtype: 'employee-navigation-mainpanel',
    minWidth: 1350,
    autoScroll:true,
    frame:false,border:false,
    layout: 'border',
    items:[
        {
            region: 'west',
            xtype:'employee-navigation-mainpanel-left',
            flex:1,
            minWidth: 450,
        },
        {
            region: 'center',
            xtype:'employee-navigation-mainpanel-center',
            flex:1,
            minWidth: 450,
        },
        {
            region: 'east',
            xtype:'employee-navigation-mainpanel-right',

            flex:1,
            minWidth: 450,

        }
    ]
})