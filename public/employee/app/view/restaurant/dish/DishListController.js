/**
 * Created by Yaxin on 6/1/2015.
 */
Ext.define( '517Employee.view.restaurant.dish.DishListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-restaurant-dish-list-controller',
    requires: [

    ],
    ShowAllDish:function( grid , rowIdx , columnIdx , button_icon , click_event , record_line , tr ) {
        var restaurantList = Ext.getCmp( 'Employee-Restaurant-Dish-RestaurantList' );
        if ( ! restaurantList.getSelectionModel().hasSelection() ) {
            Ext.Msg.alert( 'Error' , 'Please choose a restaurant first' );
        } else {
            var dishList = Ext.getCmp( 'Employee-Restaurant-Dish-List' );
            var dishDetail = Ext.getCmp( 'Employee-Restaurant-Dish-Detail' );
            dishDetail.resetAll();
            if ( dishList.showingall == true ) {
                this.lockCategoryAndType( false );dishList.showingall = false;
                this.loadDish( 'old' );
            } else {
                this.lockCategoryAndType( true );dishList.showingall = true;
                this.loadDish( 'all' );
            }
        }

    },

    Refreshlist:function( grid , rowIdx , columnIdx , button_icon , click_event , record_line , tr ) {
        var restaurantList = Ext.getCmp( 'Employee-Restaurant-Dish-RestaurantList' );
        if ( ! restaurantList.getSelectionModel().hasSelection() ) {
            //Ext.Msg.alert( 'Error' , 'Please choose a restaurant first' );
        } else {
            var dishList = Ext.getCmp( 'Employee-Restaurant-Dish-List' );
            var dishDetail = Ext.getCmp( 'Employee-Restaurant-Dish-Detail' );
            dishDetail.resetAll();
            if ( dishList.showingall == true ) {
                dishList.setTitle( 'Dish List All' );
                this.loadDish( 'all' );
            } else {
                dishList.setTitle( 'Dish List' );
                this.loadDish( 'old' );
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
    loadDish:function( method ) {

        var dishList = Ext.getCmp( 'Employee-Restaurant-Dish-List' );
        var dishListStore = dishList.getStore();
        dishListStore.loadData( [] ,false );
        var loadFlag = false;
        var filterBy , filterValue;
        if ( method == 'all' ) {
            loadFlag = true;
            filterBy = 'storeId';
            filterValue = Ext.getCmp( 'Employee-Restaurant-Dish-RestaurantList' ).getSelectionModel().getSelection()[ 0 ].data.storeId;
        } else if ( method == 'old' ) {
            if ( ! Ext.getCmp( 'Employee-Restaurant-Dish-Type' ).getSelectionModel().hasSelection() ) {

            } else {
                loadFlag = true;
                filterBy = 'typeId';
                filterValue = Ext.getCmp( 'Employee-Restaurant-Dish-Type' ).getSelectionModel().getSelection()[ 0 ].data.typeId
            }
        }
        if ( loadFlag == true ) {
            dishList.setLoading( true );
            if ( Ext.getStore( 'Employee-Temp-Restaurant-Dish-DishListTemp' ) )  {
                var dishTempStore = Ext.getStore( 'Employee-Temp-Restaurant-Dish-DishListTemp' );
                dishTempStore.loadData( [] , false );
            } else{
                var dishTempStore = Ext.create( '517Employee.store.temp.restaurant.dish.DishListTemp' );
            }
            dishTempStore.load( {
                params:{
                    method: 'get_by_specific' ,
                    filterBy: filterBy ,
                    filterValue:filterValue
                },
                callback:function( records , operation , success ) {
                    if ( records[ 0 ] ) {
                        var firstRecord = records[ 0 ].data;
                        if ( firstRecord.errorCode ) {
                            dishList.getStore().loadData( [] , false );
                            var errorMessage = 'Unknown error, please contact technique staff.'
                            if ( firstRecord.errorMessage ) {
                                errorMessage = firstRecord.errorMessage.toString();
                            }
                            Ext.Msg.alert( firstRecord.errorCode.toString() , errorMessage );
                        } else {
                            var dishRecords = [];
                            dishTempStore.each( function( r ) {
                                dishRecords.push( r.copy() );
                            } );
                            if ( records.length > 0 ) {
                                if ( dishTempStore.first().get( 'name' ) ) {
                                    dishListStore.add( dishRecords );
                                }
                            }
                        }
                        dishList.setLoading( false );
                    }
                }
            });
        } else {

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


