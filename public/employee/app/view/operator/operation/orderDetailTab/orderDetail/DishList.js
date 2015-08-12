/**
 * Created by devo on 7/14/2015.
 */
Ext.define('517Employee.view.operator.operation.orderDetailTab.orderDetail.DishList', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.RowNumberer'
    ],
    xtype: 'employee-operator-operation-orderDetailTab-orderDetail-dishList',
    store: null,
    columnLines: true,
    layout: 'hbox',
    frame: true,
    margin: '2 5 0 0',
    referenceHolder:true,
    features:[{
        ftype:'summary'
    }],
    columns: [
        {
            xtype: 'rownumberer',
            width: 30
        }, {
            text: 'Name',
            flex: 3,
            sortable: true,
            dataIndex: 'name',
            renderer:function( a , name , record , column , row , records , grid ) {

                if ( record.data.optionName ) return record.data.name + '(' + record.data.optionName +  ')';
                else return record.data.name;
            }
        },  {
            text: 'English Name',
            flex: 3,
            sortable: true,
            dataIndex: 'nameEn',
            renderer:function( a , nameEn , record , column , row , records , grid ) {
                if ( record.data.optionNameEn ) return record.data.nameEn + '(' + record.data.optionNameEn +  ')';
                else return record.data.nameEn;
            }
        },
        {
            text: 'Price',
            //width:60,
            flex: 2,
            sortable: true,
            dataIndex: 'price'
        }, {
            text: 'Qty',
            flex: 1,
            sortable: true,
            dataIndex: 'quantity',
            summaryType:'sum',

        }, {
            text: 'Sub-Total',
            flex: 2,
            sortable: true,
            dataIndex: 'subtotal',
            summaryType:'sum',
            renderer:function(val){
                var value = parseFloat(val);
                return value.toFixed(2);
            },
            summaryRenderer:function(value, summaryData, dataIndex){
                //console.log(value);
                //console.log(summaryData);
                return Ext.String.format('{0}', value.toFixed(2));
            }
        }
    ],
    dockedItems: [
        {
            dock: 'bottom',
            xtype: 'toolbar',

            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Discount',
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Subtotal',
                    reference:'discount.subtotal',
                    value: '0',
                    labelWidth:50,
                    renderer:function(val){
                        var value = parseFloat(val);
                        return value.toFixed(2);
                    }
                },'-',
                {
                    xtype: 'displayfield',
                    fieldLabel: '运费',
                    reference:'discount.delivery',
                    value: '0',
                    labelWidth:40,
                    renderer:function(val){
                        var value = parseFloat(val);
                        return value.toFixed(2);
                    }
                },'-',
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Tip',
                    reference:'discount.tip',
                    value: '0',
                    labelWidth:40,
                    renderer:function(val){
                        var value = parseFloat(val);
                        return value.toFixed(2);
                    }
                },'-',
                {
                    xtype: 'displayfield',
                    reference:'discount.tax',
                    fieldLabel: 'Tax',
                    value: '0',
                    labelWidth:50,
                    renderer:function(val){
                        var value = parseFloat(val);
                        return value.toFixed(2);
                    }
                },'-',
                {
                    xtype: 'displayfield',
                    reference:'discount.total',
                    fieldLabel: 'Total',
                    value: '0',
                    renderer:function(val){
                        var value = parseFloat(val);
                        return value.toFixed(2);
                    }

                }]
        },
        {
            dock: 'bottom',
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Subtotal',
                    reference:'subtotal',
                    value: '0',
                    labelWidth:50,
                    renderer:function(val){
                        var value = parseFloat(val);
                        return value.toFixed(2);
                    }
                },'-',
                {
                    xtype: 'displayfield',
                    fieldLabel: '运费',
                    reference:'delivery',
                    value: '0',
                    labelWidth:40,
                    renderer:function(val){
                        var value = parseFloat(val);
                        return value.toFixed(2);
                    }
                },'-',
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Tip',
                    reference:'tip',
                    value: '0',
                    labelWidth:40,
                    renderer:function(val){
                        var value = parseFloat(val);
                        return value.toFixed(2);
                    }
                },'-',
                {
                    xtype: 'displayfield',
                    reference:'tax',
                    fieldLabel: 'Tax',
                    value: '0',
                    labelWidth:50,
                    renderer:function(val){
                        var value = parseFloat(val);
                        return value.toFixed(2);
                    }
                },'-',
                {
                    xtype: 'displayfield',
                    reference:'total',
                    fieldLabel: 'Total',
                    value: '100',
                    renderer:function(val){
                        var value = parseFloat(val);
                        return value.toFixed(2);
                    }
                }]
        }

    ],
    changeRenderer: function(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '</span>';
        } else if (val < 0) {
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    },
    pctChangeRenderer: function(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '%</span>';
        } else if (val < 0) {
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    },
    renderRating: function(val) {
        switch (val) {
            case 0:
                return 'A';
            case 1:
                return 'B';
            case 2:
                return 'C';
        }
    },
    onSelectionChange: function(model, records) {
        var rec = records[0];
        if (rec) {
            this.getForm().loadRecord(rec);
        }
    },

    recaculate:function(){
        console.log('re jjjj')
    }

});