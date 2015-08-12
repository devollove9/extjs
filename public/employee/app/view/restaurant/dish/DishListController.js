/**
 * Created by Yaxin on 6/1/2015.
 */
Ext.define( '517Employee.view.restaurant.dish.DishListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-restaurant-dish-list-controller',
    requires: [

    ],
    ShowAllDish:function( grid , rowIdx , columnIdx , buttonIcon , clickEvent , recordLine , tr ) {
        var restaurantList = Ext.getCmp( 'Employee-Restaurant-Dish-RestaurantList' );
        if ( ! restaurantList.getSelectionModel().hasSelection() ) {
            Ext.Msg.alert( 'Error' , 'Please choose a restaurant first' );
        } else {
            var dishList = Ext.getCmp( 'Employee-Restaurant-Dish-List' );
            var dishDetail = Ext.getCmp( 'Employee-Restaurant-Dish-Detail' );
            dishDetail.resetAll();
            if ( dishList.showingall == true ) {
                this.lockCategoryAndType( false );dishList.showingall = false;
                dishList.loadDish( 'old' );
            } else {
                this.lockCategoryAndType( true );dishList.showingall = true;
                dishList.loadDish( 'all' );
            }
        }

    },

    lockCategoryAndType:function( trigger ) {
        if ( trigger == false ) {
            Ext.getCmp( 'Employee-Restaurant-Dish-Category' ).unlockView();
            Ext.getCmp( 'Employee-Restaurant-Dish-Type' ).unlockView();
            Ext.getCmp( 'Employee-Restaurant-Dish-List-ShowAll' ).setText( 'Show All' );
            Ext.getCmp( 'Employee-Restaurant-Dish-List' ).setTitle( 'Dish List' );
        }
        if ( trigger == true ){
            Ext.getCmp( 'Employee-Restaurant-Dish-Category' ).lockView();
            Ext.getCmp( 'Employee-Restaurant-Dish-Type' ).lockView();
            Ext.getCmp( 'Employee-Restaurant-Dish-List-ShowAll' ).setText( 'Cancel' );
            Ext.getCmp( 'Employee-Restaurant-Dish-List' ).setTitle( 'Dish List All' );
        }
    },

    NewDish:function(){
        var regionList = Ext.getCmp( 'Employee-Header-Region' );
        var restaurantList = Ext.getCmp( 'Employee-Restaurant-Dish-RestaurantList' );
        var categoryList = Ext.getCmp( 'Employee-Restaurant-Dish-Category' );
        var typeList = Ext.getCmp( 'Employee-Restaurant-Dish-Type' );
        var dishList = Ext.getCmp( 'Employee-Restaurant-Dish-List' );
        var dishDetail = Ext.getCmp( 'Employee-Restaurant-Dish-Detail' );
        var dishBusinessHour =  Ext.getCmp( 'Employee-Restaurant-Dish-Detail-BusinessHour' );

        if ( typeList.getSelectionModel().hasSelection() == false || dishList.showingall == true ) {
            Ext.Msg.alert( 'Error' , 'You need to choose a dish type' );
        } else {
            dishDetail.resetAll();
            dishList.getSelectionModel().deselectAll();
            dishDetail.regionId = regionList.regionId;
            dishDetail.storeId = restaurantList.getSelectionModel().getSelection()[0].data.storeId;
            dishDetail.categoryId = categoryList.getSelectionModel().getSelection()[0].data.categoryId;
            dishDetail.typeId = typeList.getSelectionModel().getSelection()[0].data.typeId;
            dishDetail.newDish = true;
            var defaultBusinessHour = [
                {start:0,end:86400,day:1},
                {start:0,end:86400,day:2},
                {start:0,end:86400,day:3},
                {start:0,end:86400,day:4},
                {start:0,end:86400,day:5},
                {start:0,end:86400,day:6},
                {start:0,end:86400,day:7}
            ];
            dishBusinessHour.getStore().add( defaultBusinessHour );
            dishDetail.setTitle( 'New Dish -' +  restaurantList.getSelectionModel().getSelection()[ 0 ].data.name + '-' + categoryList.getSelectionModel().getSelection()[ 0 ].data.name + '-'
            + typeList.getSelectionModel().getSelection()[ 0 ].data.name);
            Ext.getCmp( 'Employee-Restaurant-Dish-Detail-SaveChange' ).setText( 'Add' );
            dishDetail.getForm().findField( 'quantity' ).setValue(-1);
        }
    },

    DeSelectAll:function( field ) {
        field.up().up().getSelectionModel().deselectAll();
    }
});


