var Employee_Restaurant_ContentView_Requires = [
        '517Employee.view.restaurant.orderHistory.OrderHistoryView',
    ];

if ( checkUserPermissions_Local( 'admin' ) == true ) {
    Employee_Restaurant_ContentView_Requires.push( '517Employee.view.restaurant.information.InformationView' );
    Employee_Restaurant_ContentView_Requires.push( '517Employee.view.restaurant.dish.DishView' );
}

Ext.define( '517Employee.view.restaurant.ContentView' , {
    extend: 'Ext.panel.Panel',
    xtype: 'employee-restaurant-content',
    requires: Employee_Restaurant_ContentView_Requires,
    id: 'Employee-Restaurant-Content',
    margin: '0 0 0 10' ,
    border: false,frame:false,
    layout: { type:'card' , padding:0 },
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    initComponent:function(){
        var items = this.createItems();
        this.items = items;
        this.callParent();
    },
    createItems:function(){
       var items = [
           {
               border:false,frame:false,
               xtype: 'employee-restaurant-orderHistory',
               id: 'Employee-Restaurant-OrderHistory'
           },
           {
               border:false,frame:false,
               //xtype: 'employee-restaurant-information',
               //id: 'Employee-Restaurant-Information'
           },
           {
               border:false,frame:false,
               //xtype: 'employee-restaurant-dish',
               //id: 'Employee-Restaurant-Dish'
           },
           {
               border:false,frame:false,
               //xtype: 'employee-restaurant-xxxx',
               //id: 'Employee-Restaurant-Xxxx',
           }

       ];
        if ( checkUserPermissions_Local( 'admin' ) == true ) {
            items[ 1 ] = { border:false,frame:false , xtype: 'employee-restaurant-information' , id: 'Employee-Restaurant-Information' };
            items[ 2 ] = { border:false,frame:false , xtype: 'employee-restaurant-dish' , id: 'Employee-Restaurant-Dish' };
        }
        return items;
    }

});