/**
 * Created by Yaxin on 6/8/2015.
 */
Ext.define('517Employee.view.restaurant.dish.DishOptionList', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.RowNumberer',
        '517Employee.view.restaurant.dish.DishOptionListController'
    ],

    xtype: 'employee-restaurant-dish-optionList',
    controller: 'employee-restaurant-dish-optionList-controller',
    columnLines: true,
    border:false,
    title:'Option List',
    frame: true,
    referenceHolder:true,
    selectedRow:-1,
    margin: '2 2 2 2',
    changedFlag:false,
    columns: [
        {
            xtype: 'rownumberer'
        }, {
            text: 'Name',
            //width:150,
            flex: 2,
            sortable: true,
            dataIndex: 'name'
        },
        {
            text: 'NameEn',
            //width:150,
            flex: 2,
            sortable: true,
            dataIndex: 'nameEn'
        },
        {
            text: 'Price',
            //width:60,
            flex: 1,
            sortable: true,
            dataIndex: 'price'
        },{
            text: 'Quantity',
            //width:60,
            flex: 1,
            sortable: true,
            dataIndex: 'quantity'
        }],
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            items: [

                {
                    xtype: 'tbfill'
                }, {
                    xtype: 'button',
                    iconCls: 'fa fa-plus',
                    text: 'New Option',
                    reference:'newOption',
                    handler: 'NewOption'
                }]

        }],
    listeners:{
        select:function( a , b , rowIdx , scope , e , f ) {
            //console.log(rowIdx);
            this.selectedRow = rowIdx;
        },
        selectionchange:function( model , records ){
            //console.log(this.up().items.items[1]);

            //console.log(this.up());


            //var row = this.store.indexOf(this.getSelectionModel());
            //console.log(this.selectedRow);
            //console.log(this.up().up());
            var optionDetail = this.up().items.items[1];

            optionDetail.resetAll();

            optionDetail.setTitle( 'Option Details' );
            if ( records[0] ) {

                optionDetail.getForm().findField('selectedRow').setValue( this.selectedRow );
                optionDetail.getForm().findField('name').setValue(records[0].data.name);
                optionDetail.getForm().findField('nameEn').setValue(records[0].data.nameEn);
                optionDetail.getForm().findField('quantity').setValue(records[0].data.quantity);
                optionDetail.getForm().findField('price').setValue(records[0].data.price);
                if ( records[0].data.information ){
                    if ( typeof records[0].data.information.disabled != 'undefined'){
                        //console.log( OptionPanel.getForm().findField('disabledGroup').items.items[0].checked = );
                        if ( records[0].data.information.disabled == true ) {
                            optionDetail.items.items[0].items.items[0].setValue(false);
                            optionDetail.items.items[0].items.items[1].setValue(true);
                        }
                    }
                }
                optionDetail.setTitle('Option Detail - ' + records[0].data.name + '(' + records[0].data.nameEn + ')');
            }

        }
    }
});

