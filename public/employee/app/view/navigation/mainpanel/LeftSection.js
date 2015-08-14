var partanA = "<a class='employee517-service'> <div class='employee517-service-icon'><i class='";
var partanB = "'></i></div><div class='employee517-serviceName'>";
var partanC = "</div><div class='employee517-serviceCaption'>";
var partanD = "</div></a>";

var OperatorCategory = "<h2>Operator &nbsp&nbsp</h2>";
    var OperationIcon = partanA +"fa fa-street-view fa-3x"+partanB+"Operation"+partanC+"Operating Orders"+partanD;
    var NewOrderIcon = partanA +"fa fa-pencil fa-3x"+partanB+"New Order"+partanC+"Place New Orders"+partanD;

var RestaurantCategory = "<h2>Restaurant &nbsp&nbsp</h2>";
    var InformationIcon = partanA +"fa fa-home fa-3x"+partanB+"Information"+partanC+"Check/Edit Restaurants"+partanD;
    var DishIcon = partanA +"fa fa-cube fa-3x"+partanB+"Dish"+partanC+"Check/Edit Dish"+partanD;
    var OrderHistoryIcon = partanA +"fa fa-file-text-o fa-3x"+partanB+"Order History"+partanC+"View & Search Order"+partanD;

var DriverCategory = "<h2>Driver &nbsp&nbsp</h2>";
    var DriverOrderHistoryIcon = partanA +"fa fa-file-text-o fa-3x"+partanB+"Order History"+partanC+"View & Search Orders"+partanD;

var mainpanel_left_panel_minWidth = 400;var mainpanel_left_icon_Height = 50;var mainpanel_left_icon_Width = 350;

Ext.define('517Employee.view.navigation.mainpanel.LeftSection', {
    extend: 'Ext.panel.Panel',

    requires: [
        
    ],
    xtype: 'employee-navigation-mainpanel-left',
    frame:false,border:false,
    minWidth:mainpanel_left_panel_minWidth,
    layout: 'absolute',
    initComponent: function() {
        var Lx = 25;
        var Ly = 0;
        var items=[];
        //console.log( Ext.getCmp( 'Employee-Header').getUserInfo() );
        //if ( Ext.getCmp( 'Employee-Header').getUserInfo().email == 'test@test.test' ) {
        //    var driverTitle = this.createIconTitle( DriverCategory , Lx , Ly ); Ly += 50;
        //    var driverBlockOrderHistory = this.createIcon( DriverOrderHistoryIcon , 'employee-driverUnique orderHistory' , Lx , Ly );
        //    items.push( driverTitle );   items.push( driverBlockOrderHistory );
        //} else {
            // If Operator
            if ( Ext.getCmp( 'Employee-Header').checkUserPermissions( 'operator' ) == true ) {
                var operatorTitle = this.createIconTitle( OperatorCategory , Lx , Ly ); Ly += 50;
                var operatorBlockOperation = this.createIcon( OperationIcon , 'employee-operator operation' , Lx , Ly ); Ly += 50;
                var operatorBlockNewOrder = this.createIcon( NewOrderIcon , 'employee-operator newOrder' , Lx , Ly ); Ly += 70;
                items.push( operatorTitle ); items.push( operatorBlockOperation ); items.push( operatorBlockNewOrder );
                var restaurantTitle = this.createIconTitle( RestaurantCategory , Lx , Ly ); Ly += 50;
                var restaurantBlockOrderHistory = this.createIcon( OrderHistoryIcon , 'employee-restaurant orderHistory' , Lx , Ly ); Ly += 50;
                items.push( restaurantTitle ); items.push( restaurantBlockOrderHistory );
            }

            // If Admin
            if ( Ext.getCmp( 'Employee-Header').checkUserPermissions( 'admin' ) == true ) {
                var restaurantBlockInformation = this.createIcon( InformationIcon , 'employee-restaurant information' , Lx , Ly ); Ly += 50;
                var restaurantBlockDish = this.createIcon( DishIcon , 'employee-restaurant dish' , Lx , Ly ); Ly += 70;
                items.push( restaurantBlockInformation ); items.push( restaurantBlockDish );
            }

            // If Driver
            var driverTitle = this.createIconTitle( DriverCategory , Lx , Ly ); Ly += 50;
            if ( Ext.getCmp( 'Employee-Header').checkUserPermissions( 'operator' ) == true || Ext.getCmp( 'Employee-Header').checkUserPermissions( 'admin' ) == true ) {
                var driverBlockOrderHistory = this.createIcon( DriverOrderHistoryIcon , 'employee-driver orderHistory' , Lx , Ly );
            } else if ( Ext.getCmp( 'Employee-Header').checkUserPermissions( 'driver' ) == true ) {
                // If Only Driver Permission
                var driverBlockOrderHistory = this.createIcon( DriverOrderHistoryIcon , 'employee-driverUnique orderHistory' , Lx , Ly );
            }
            items.push( driverTitle );   items.push( driverBlockOrderHistory );

       // }


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

        newIcon.height = mainpanel_left_icon_Height;
        newIcon.width = mainpanel_left_icon_Width;
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
        newIcon.width = mainpanel_left_icon_Width;
        newIcon.frame = false;
        newIcon.bodyStyle = {'border-width':'0px',cursor:'pointer'};
        return newIcon;
    }

});

/*
 * Order
 *
 */
var orderBlockTitle = {
    x:L0x,y:L0y,height:50,width:mainpanel_left_panel_minWidth , frame:false,bodyStyle:{'border-width':'0px',},
    html: OrderCategory,
    listeners: {
        render: function( panel , b , c , d , e , f , g ) {
            panel.el.on('click', function() {
            });
        }, scope: this
    }
};
var OperatorBlockTitle = {
    x:L0x,y:L0y,height:50,width:mainpanel_left_panel_minWidth , frame:false,bodyStyle:{'border-width':'0px',},
    html: OrderCategory,
    listeners: {
        render: function( panel , b , c , d , e , f , g ) {
            panel.el.on('click', function() {
                //console.log( panel );
            });
        }, scope: this
    }
};