/**
 * Created by Yaxin on 6/8/2015.
 */
Ext.define( '517Employee.view.restaurant.dish.DishOptionListController' , {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-restaurant-dish-optionList-controller',
    requires: [],
    NewOption:function( button ) {
        button.up().up().getSelectionModel().deselectAll();
        var optionDetail = button.up().up().up().items.items[1];
        button.up().up().up().items.items[1].dockedItems.items[1].items.items[1].setText( 'Add Option' );
        optionDetail.currentMethod = 'adding';
        optionDetail.getForm().findField('quantity').setValue('-1');
    }

});