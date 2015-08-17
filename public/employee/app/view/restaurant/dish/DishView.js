Ext.define('517Employee.view.restaurant.dish.DishView', {
    extend: 'Ext.panel.Panel',

    requires: [
        '517Employee.view.restaurant.dish.DishCenterView',
        '517Employee.view.restaurant.dish.DishRestaurantList',
    ],   
    xtype: 'employee-restaurant-dish',
    frame:false , border:false, split:true,
    bodyStyle:{ "background-color":"white",'border-color' : 'black','border-width':'0px'},
    layout: 'border',
    /*  Variables  */
    // Variable store copied groups
    copiedOptionGroup:null,
    copiedOptionGroupFlag:false,


    /*  View Content  */
    items:[
        {
            region: 'west',
            xtype: 'employee-restaurant-dish-restaurantList',
            id: 'Employee-Restaurant-Dish-RestaurantList',
            width:150,
            margin:'0 5 0 0'
        },
        {
            region: 'center',
            xtype: 'employee-restaurant-dish-centerView',
            id: 'Employee-Restaurant-Dish-CenterView',
            flex:1,
        },
        
    ],

    resetAll:function() {
        this.copiedOptionGroup = null;
        this.copiedOptionGroupFlag = false;
        Ext.getCmp( 'Employee-Restaurant-Dish-RestaurantList' ).resetAll();
        Ext.getCmp( 'Employee-Restaurant-Dish-CenterView' ).resetAll();
    },

    refreshView:function() {
        // Refresh Restaurant List
        this.items.items[ 0].refreshView();
    },

    getOptionGroupFlag:function(){
        return this.copiedOptionGroupFlag;
    },
    getOptionGroup:function(){
        var oldOptionGroup = this.copiedOptionGroup;
        var newOptionGroup = new Object();
        var information = new Object();
        information.disabled = false;
        if ( oldOptionGroup.information ) {
            if ( typeof oldOptionGroup.information.disabled != 'undefined' ) {
                information.disabled = oldOptionGroup.information.disabled
            }
        }
        //newOptionGroup.information = information;
        newOptionGroup.name = oldOptionGroup.name; newOptionGroup.nameEn = oldOptionGroup.nameEn; newOptionGroup.max = oldOptionGroup.max; newOptionGroup.min = oldOptionGroup.min; newOptionGroup.quantity = oldOptionGroup.quantity;
        var new_options = [];
        for ( var i = 0 ; i < oldOptionGroup.option.length ; i ++ ) {
            var cur_option = new Object();
            cur_option.name = oldOptionGroup.option[i].name;
            cur_option.price = oldOptionGroup.option[i].price;
            cur_option.nameEn = oldOptionGroup.option[i].nameEn;
            cur_option.quantity = oldOptionGroup.option[i].quantity;
            //cur_option.information = oldOptionGroup.data.items[i].data.information;
            new_options.push(cur_option);
        }
        newOptionGroup.option = new_options;
        return this.copiedOptionGroup;
    },
    setOptionGroup:function( optionGroup ) {
        this.copiedOptionGroup = optionGroup;
        this.copiedOptionGroupFlag = true;
        Ext.Msg.alert( 'Success' , 'Option Group Copied.');
    },

    doNavigation:function(panel){
        //console.log( panel );
    },


    
});