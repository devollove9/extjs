/**
 * Created by devo on 7/6/2015.
 */
Ext.define( '517Employee.view.operator.newOrder.checkout.CheckoutListController' , {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-operator-newOrder-checkout-checkoutList-controller',
    requires: [

    ],

    addQuantity:function(model,rowindex,columns,button_object,event,dishRecord) {
        ////console.log(model);
        ////console.log(rowindex);
        ////console.log(columns);
        ////console.log(button_object);
        ////console.log(event);
        ////console.log(dishRecord);
        if ( Ext.getCmp('Employee-Operator-NewOrder-Checkout-CheckoutList').checkoutStatus == true ) {
            Ext.Msg.alert('Error', 'You have already checked out,<br>please click Re-Order to change dishes.');
        } else {
            var price = parseFloat(dishRecord.data.price);
            var priceTotal = parseFloat(dishRecord.data.priceTotal);
            var newTotal = priceTotal+price;
            dishRecord.data.priceTotal = parseFloat(newTotal.toFixed(2));
            dishRecord.data.quantity += 1;
            model.getFeature('summaryRow').onStoreUpdate();
            model.refresh();
        }
    },
    decreaseQuantity:function(model,rowindex,columns,button_object,event,dishRecord) {
        ////console.log(model);
        ////console.log(rowindex);
        ////console.log(columns);
        ////console.log(button_object);
        ////console.log(event);
        ////console.log(dishRecord);
        if ( Ext.getCmp('Employee-Operator-NewOrder-Checkout-CheckoutList').checkoutStatus == true ) {
            Ext.Msg.alert('Error', 'You have already checked out,<br>please click Re-Order to change dishes.');
        } else {
            if ( dishRecord.data.quantity == 1) {
                Ext.Msg.show({
                    title:'Warning',
                    msg: 'Decrease this will remove the dish <br> Are you sure you want to remove?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn,text){
                        if ( btn == 'yes' ) {
                            model.getStore().removeAt(rowindex);
                            model.getFeature('summaryRow').onStoreUpdate();
                        } else if ( btn == 'no' ) {

                        }
                    },
                    animEl: 'elId'
                });
            } else {
                var price = parseFloat(dishRecord.data.price);
                var priceTotal = parseFloat(dishRecord.data.priceTotal);
                var newTotal = priceTotal - price;
                dishRecord.data.priceTotal = parseFloat(newTotal.toFixed(2));
                dishRecord.data.quantity -= 1;
                model.getFeature('summaryRow').onStoreUpdate();
                model.refresh();
            }
        }


    },
    deleteDish:function(model,rowindex,columns,button_object,event,dishRecord) {
        if ( Ext.getCmp('Employee-Operator-NewOrder-Checkout-CheckoutList').checkoutStatus == true ) {
            Ext.Msg.alert('Error', 'You have already checked out,<br>please click Re-Order to change dishes.');
        } else {
            Ext.Msg.show({
                title:'Warning',
                msg: ' Are you sure you want to remove the Dish?',
                buttons: Ext.Msg.YESNO,
                fn: function(btn,text){
                    if ( btn == 'yes' ) {
                        model.getStore().removeAt(rowindex);
                        model.getFeature('summaryRow').onStoreUpdate();
                    } else if ( btn == 'no' ) {

                    }
                },
                animEl: 'elId'
            });
            model.refresh();model.getFeature('summaryRow').onStoreUpdate();
        }
    },
    checkoutDish:function(button,click_event) {
        ////console.log(model);
        ////console.log(rowindex);

        var checkoutList = Ext.getCmp('Employee-Operator-NewOrder-Checkout-CheckoutList');
        var summary = checkoutList.getView().getFeature('summaryRow').summaryRecord.data;
        if ( checkoutList.checkoutStatus == false ) {

            if ( summary.priceTotal < 20 )  Ext.Msg.alert('Error', 'Minimun is $20.');
            else {
                // Check out process
                var dish = [];
                checkoutList.getStore().each(function(record, idx) {
                    ////console.log(record);
                    ////console.log(idx);
                    dish.push(record);
                });
                checkoutList.checkoutStatus = true;
                button.setText('Re-Order');
                var userInfo = Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo');
                var tipRate = userInfo.getForm().findField("tipGroup").getValue().tips;
                var subTotal = summary.priceTotal;
                var tax = summary.priceTotal * 0.06;
                var tip = ( subTotal + tax ) * tipRate;

                userInfo.getForm().findField("subtotal").setValue(subTotal);
                if (  Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo-TypeRadio').choosedType == 1 ) {
                    userInfo.getForm().findField("tip").setValue(0);
                    var total = subTotal + tax;
                } else {
                    userInfo.getForm().findField("tip").setValue(tip);
                    var total = subTotal + tip + tax;
                }

                userInfo.getForm().findField("tax").setValue(tax);
                userInfo.getForm().findField("total").setValue(total);
                ////console.log( dish );
                userInfo.checkoutStoreId = checkoutList.checkoutStoreId;
                userInfo.dishInfo = dish;
            }
        } else {
            Ext.Msg.show({
                title:'Warning',
                msg: ' Are you sure you want to modify the Dishes?<br> You will have to confirm address again.',
                buttons: Ext.Msg.YESNO,
                fn: function(btn,text){
                    if ( btn == 'yes' ) {
                        checkoutList.checkoutStatus = false;

                        button.setText('Check Out');
                        var userInfo = Ext.getCmp('Employee-Operator-NewOrder-Checkout-UserInfo');
                        userInfo.resetOrderInfo();
                        userInfo.resetAddress();
                    } else if ( btn == 'no' ) {

                    }
                },
                animEl: 'elId'
            });
        }
    }

})