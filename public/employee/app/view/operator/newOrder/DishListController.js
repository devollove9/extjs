/**
 * Created by devo on 7/6/2015.
 */
Ext.define('517Employee.view.operator.newOrder.DishListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-operator-newOrder-dishList-controller',
    requires: [

    ],

    addDish:function(model,rowindex,columns,buttonObject,event,dishRecord){
        //console.log(model);
        //console.log(rowindex);
        //console.log(columns);
        //console.log(buttonObject);
        //console.log(event);
        //console.log(dishRecord);
        var checkoutList = Ext.getCmp('Employee-Operator-NewOrder-Checkout-CheckoutList');
        if ( checkoutList.checkoutStatus == true ) {
            Ext.Msg.alert('Error', 'You have already checked out,<br>please click Re-Order to change dishes.');
        } else {
            var grid=Ext.getCmp("Employee-Operator-NewOrder-RestaurantList");
            var win;
            if (!win) {
                if ( !grid.getSelectionModel().hasSelection() ) Ext.Msg.alert('No Restaurant found', 'Please choose a restaurant.');
                else if ( checkoutList.checkoutStoreId != '' && grid.getSelectionModel().getSelection()[0].data.storeId != checkoutList.checkoutStoreId ) {
                    Ext.Msg.alert( 'Error' , 'Trying to add dish from different restaurant' );
                } else {
                    if (dishRecord.data.optionGroup) {
                        win = this.dishOptionWindow(dishRecord.data);
                        win.show();
                    } else {
                        this.CheckoutDish(dishRecord);
                        checkoutList.checkoutStoreId = grid.getSelectionModel().getSelection()[0].data.storeId;
                    }

                }
            }
        }
    },
    dishOptionWindow:function(dish){
        /*{
         xtype: 'fieldset',
         title: 'Choose Tip',
         defaultType: 'textfield',
         defaults: {
         anchor: '100%'
         },
         items:[
         {
         xtype: 'radiogroup',
         fieldLabel: 'Tip',
         width:300,
         items: [ {
         checked: true,
         boxLabel: '10%',
         name: 'tip',
         inputValue: '0.1'
         }, {
         boxLabel: '15%',
         name: 'tip',
         inputValue: '0.15'
         },
         {
         boxLabel: '20%',
         name: 'tip',
         inputValue: '0.2'
         }
         ]
         },
         ]
         },*/
        var items=[];
        for ( var i = 0; i < dish.optionGroup.length ; i ++ ) {
            var curOption = dish.optionGroup[i];
            var max = curOption.max;
            var min = curOption.min;
            var optionGroupRid = i;
            if ( max == min ) var fieldLabel = ' 必选' + max + '个';
            else var fieldLabel = ' 任选 ' + min + '-' + max + ' 个';
            var options = [];
            //console.log(curOption);
            for ( var j = 0; j < curOption.option.length ; j ++ ) {
                if ( j == 0 ) {
                    var option = {
                        boxLabel: curOption.option[j].name + ' $' + curOption.option[j].price,
                        name:j,
                        inputValue: curOption.option[j].price,
                        rid:j,
                        optionName:curOption.option[j].name,
                        optionNameEn:curOption.option[j].nameEn,
                        checked:true
                    };
                } else {
                    var option = {
                        boxLabel: curOption.option[j].name + ' $' + curOption.option[j].price,
                        name:j,
                        inputValue: curOption.option[j].price,
                        rid:j,
                        optionName:curOption.option[j].name,
                        optionNameEn:curOption.option[j].nameEn,
                    };
                }
                options.push(option);
            }
            //console.log(dish.option[i]);
            var item= {
                xtype: 'checkboxgroup',
                fieldLabel: curOption.name + fieldLabel,
                cls: 'x-check-group-alt',
                width:600,
                columns: 3,
                max:max,
                min:min,
                rid: optionGroupRid,
                vertical: true,
                items: options
            };
            items.push(item);
        }
        var win = Ext.create('Ext.window.Window', {
            extend:'Ext.form.Panel',
            reference: 'optionSelectWindow',
            xtype: 'employee-operator-newOrder-dishList-optionSelectWindow',
            controller: 'employee-operator-newOrder-dishList-controller',
            title: ' 选择辅料- ' +dish.name,
            model: true,
            width:600,
            dishRecord:dish,
            minWidth:600,
            maxHeight:800,
            autoScroll:true,
            resizable:false,
            shadow:true,
            shadowOffset:10,

            items: [

                {
                    xtype: 'fieldset',
                    title: 'Options Groups',
                    itemId:'optiongroup',
                    defaultType: 'textfield',
                    defaults: {
                        anchor: '100%'
                    },
                    items:items
                },
                {
                    xtype: 'tbspacer',
                    width: 90
                },
                {
                    xtype:'toolbar',
                    border:false,
                    margin:0,padding:0,
                    items:[
                        {
                          xtype:'tbfill'
                        },
                        {
                            xtype: 'button',
                            text: 'Add Dish',
                            buttonAlign :'center',
                            handler: this.addOptionsForDish
                        }
                    ]
                }
            ],

            //layout:'fit'
        });
        return win;

    },
    CheckoutDish:function(dish){
        var checkoutList = Ext.getCmp('Employee-Operator-NewOrder-Checkout-CheckoutList');
        checkoutList.setLoading(true);
        var checkoutListStore = checkoutList.getStore();

        var recordIndex = checkoutListStore.findBy(
            function(record, id){
                if(record.get('itemId') === dish.data.itemId ){
                    return true;  // a record with this data exists
                }
                return false;  // there is no record in the store with this data
            }
        );

        if(recordIndex != -1){
            var recordToAdd = checkoutListStore.getAt(recordIndex);
            var price = parseFloat(recordToAdd.data.price);
            var priceTotal = parseFloat(recordToAdd.data.priceTotal);
            var newTotal = priceTotal+price;
            recordToAdd.data.priceTotal = parseFloat(newTotal.toFixed(2));
            recordToAdd.data.quantity += 1;

            checkoutList.getView().refresh();checkoutList.getView().getFeature('summaryRow').onStoreUpdate();
            //console.log(checkoutList.getView().getFeature('summaryRow'));
        } else {
            checkoutListStore.add({
                restaurantId:'',
                itemId: dish.data.itemId,
                typeId: dish.data.typeId,
                name: dish.data.name,
                nameEn:dish.data.nameEn,
                price:dish.data.price,
                priceTotal:dish.data.price,
                quantity:1,
                options:''
            });

            checkoutList.getView().refresh();checkoutList.getView().getFeature('summaryRow').onStoreUpdate();
        }
        //console.log(checkoutList.getView().getFeature());
        checkoutList.setLoading(false);


    },

    addOptionsForDish:function( model ,event ){
        var restaurantList = Ext.getCmp("Employee-Operator-NewOrder-RestaurantList");
        var optionGroup = this.up().up().getComponent('optiongroup').items.items;
        var dishRecord = this.up().up().dishRecord;
        //console.log(dishRecord);
        var groupRids = [];
        var totalPrice = 0;
        var rightAmount = true;
        var firstOption = true;
        var allOptionName = '';
        var allOptionNameEn = '';
        for ( var i = 0 ; i < optionGroup.length ; i ++ ) {
            var options = optionGroup[i].items.items ;
            var max = optionGroup[i].max;
            var min = optionGroup[i].min;
            var totalOptionPrice = 0;

            var rids = [];
            var total_checked = 0;
            var optionName = '';
            var optionNameEn = '';
            for ( var j =0 ; j < options.length ; j ++ ) {
                if ( options[j].checked == true ) {
                    //console.log(options[j]);
                    total_checked ++ ;
                    if ( firstOption == true) {
                        optionName = optionName + options[j].optionName;
                        optionNameEn = optionNameEn + options[j].optionNameEn;
                        firstOption = false
                    }
                    else {
                        optionName = optionName + ',' + options[j].optionName;
                        optionNameEn = optionNameEn + ',' + options[j].optionNameEn;
                    }
                    rids.push( j );
                    totalOptionPrice = totalOptionPrice +  options[j].inputValue;
                }
            }
            allOptionName +=  optionName;
            allOptionNameEn +=  optionNameEn;
            totalPrice = totalPrice + totalOptionPrice;
            if ( total_checked < min || total_checked > max ) {
                rightAmount = false;
            }
            var groupRid = {
                groupRid : optionGroup[i].rid,
                rids : rids
            };
            groupRids.push(groupRid);
            //console.log(groupRids);
            //console.log(totalPrice);
            //console.log(optionName);
        }
        totalPrice += dishRecord.price;
        allOptionName = dishRecord.name + '(' + allOptionName +')';
        allOptionNameEn = dishRecord.nameEn + '(' + allOptionNameEn +')';
        if ( rightAmount ) {
            var checkoutList = Ext.getCmp('Employee-Operator-NewOrder-Checkout-CheckoutList');
            checkoutList.setLoading(true);
            var checkoutListStore = checkoutList.getStore();
            var recordIndex = checkoutListStore.findBy(
                function(record, id){
                    //console.log(record);
                    //console.log(dishRecord);
                    if(record.get('itemId') === dishRecord.itemId ){
                        if (record.data.options) {
                            var options = record.data.options;
                            var flag_forOption = true;
                            if (options.length == groupRids.length) {

                                for ( var i = 0 ;  i < options.length ; i ++ ){
                                    if ( options[i].groupRid != groupRids[i].groupRid ) {
                                        flag_forOption = false;
                                        break;
                                    } else {
                                        var optionRids = options[i].rids;
                                        var curOptionRids = groupRids[i].rids;

                                        if (optionRids.length == curOptionRids.length) {
                                            for ( var j = 0 ;  j < optionRids.length ; j ++ ){
                                                if ( optionRids[j] != curOptionRids[j]) {

                                                    flag_forOption = false;
                                                    break;
                                                }
                                            }
                                        } else {
                                            flag_forOption = false;
                                            break;
                                        }
                                    }
                                    //console.log(options[i]);
                                }
                            } else {
                                flag_forOption = false;
                            }
                            if ( flag_forOption == true ) return true;
                            else return false;
                        }
                        else return true;
                        // a record with this data exists
                    }
                    return false;  // there is no record in the store with this data
                }
            );

            if(recordIndex != -1){
                var recordToAdd = checkoutListStore.getAt(recordIndex);
                var price = parseFloat(recordToAdd.data.price);
                var priceTotal = parseFloat(recordToAdd.data.priceTotal);
                var newTotal = priceTotal+price;
                recordToAdd.data.priceTotal = parseFloat(newTotal.toFixed(2));
                recordToAdd.data.quantity += 1;
                checkoutList.getView().refresh();checkoutList.getView().getFeature('summaryRow').onStoreUpdate();
            } else {
                checkoutListStore.add({
                    restaurantId:'',
                    itemId: dishRecord.itemId,
                    typeId: dishRecord.typeId,
                    name: allOptionName,
                    nameEn:allOptionNameEn,
                    price:totalPrice,
                    priceTotal:totalPrice,
                    quantity:1,
                    options:groupRids,
                });
                checkoutList = Ext.getCmp('Employee-Operator-NewOrder-Checkout-CheckoutList');
                checkoutList.getView().refresh();checkoutList.getView().getFeature('summaryRow').onStoreUpdate();

            }
            //console.log(checkoutListStore);
            checkoutList.checkoutStoreId = restaurantList.getSelectionModel().getSelection()[0].data.storeId;
            checkoutList.setLoading(false);
        } else {
            Ext.Msg.alert('Wrong Options', 'Please choose right amount of Options.')
        }
        //console.log(Ext.getCmp(this.up().id));
    },


    CheckoutDishWithOption:function(dish, optionName, optionNameEn,totalPrice, groupRids){



    },

})