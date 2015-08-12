/**
 * Created by devo on 6/22/2015.
 */
Ext.define('517Employee.view.operator.operation.orderTab.orderList.OrderListView', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.RowNumberer',
        '517Employee.view.operator.operation.orderTab.orderList.OrderListController'
    ],
    xtype: 'employee-operator-operation-orderTab-orderList',
    controller: 'employee-operator-operation-orderTab-orderList-controller',
    //itemId: 'employee-operator-operation-orderTab-orderList',
    autoScroll:true ,
    minWidth:1000,
    columnLines: true,
    viewConfig: { enableTextSelection: true },
    features: [
        {
            ftype: 'grouping',
            groupHeaderTpl: '{name}'
        }
    ],

    //border: false, //forceFit: true,

    columns: [
        {
            xtype: 'rownumberer',
            width : 28 ,
            align : 'center'
        },
        {
            text: 'OrderNo',
            sortable: true,
            width: 130,
            dataIndex: 'invoiceNo'
        },
        {
            xtype: 'actioncolumn',
            header: ' ',
            width: 30,
            maxWidth:30,
            align: 'center',
            items: [
                {
                    iconCls: 'x-tool-img x-tool-search',
                    tooltip: 'Detail',
                    handler: 'orderDetail'
                }
            ]
        },
        {
            xtype: 'actioncolumn',
            header: ' ',
            width: 30,
            align: 'center',
            items: [
                {
                    iconCls: 'x-tool-img x-tool-pin',
                    tooltip: 'Locate',
                    handler: 'orderPin'

                }
            ]
        },
        {
            text: 'Platform',
            flex: 1,
            minWidth: 80,
            sortable: false,
            dataIndex: 'platform',
        },
        {
            text: 'Placed Time',
            flex: 1,
            minWidth: 80,
            sortable: true,
            dataIndex: 'placeDate',
            renderer: function(val) {
                return Ext.Date.format(new Date( val/1000 ), 'h:i A');
            }
        },
        {
            text: '用时',
            flex: 1,
            minWidth: 70,
            dataIndex: 'placeDate',
            renderer: function(val, metaData, record) {
                var elapsed ,activeStatus = record.get('activeStatus'), out;
                var status = record.get('status');

                if( activeStatus >= 0 && activeStatus < 8 && val ) {

                    elapsed = Ext.Date.getElapsed(new Date(val/1000), new Date() );
                    elapsed += Ext.getCmp('Employee-Operator').getServerTimeDifference();
                    out = Ext.util.Format.number(elapsed /60000, '0');


                } else if( activeStatus == 8 && status && activeStatus ){
                    elapsed = Ext.Date.getElapsed(new Date(val/1000), new Date(status[activeStatus]/1000));
                    out = Ext.util.Format.number(elapsed /60000, '0');
                } else if( activeStatus == 9){
                    return '<span style="color:#cf4c35">取消</span>'
                } else {
                    return '<span style="color:#cf4c35">Unknown Time</span>'
                }

                if (out <= 30) {
                    return '<span style="color:' + "#73b51e" + ';">' + out + '分钟</span>';
                } else if(out > 30 && out <= 55){
                    return '<span style="color:' + "#f5c500" + ';">' + out + '分钟</span>';
                } else if(out > 55 && out <=80){
                    return '<span style="color:' + "#e75f5f" + ';">' + out + '分钟</span>';
                } else {
                    return '<span style="color:' + "#cf4c35" + ';">' + out + '分钟</span>';
                }
            }
        },
        {
            text: 'Driver',
            flex: 1,
            dataIndex: 'driverName',
            minWidth: 100
        },
        {
            text: 'Status',
            flex: 2,
            dataIndex: 'activeStatus',
            minWidth: 160,
            align: 'center',
            renderer: function(val, metaData, record) {
                var timestamp = record.data.status[val]/1000;
                var date = new Date(timestamp);
                var span = "<span class='label",

                    time = Ext.Date.format(new Date(date), 'h:i:s A');
                switch (val) {
                    case 1:
                        span += " label-danger arrowed-right'>新入订单";
                        break;
                    case 2:
                        span += " label-blue arrowed-in arrowed-right'>已送餐厅";
                        break;
                    case 3:
                        span += " label-primary arrowed-in arrowed-right'>餐厅回应";
                        break;
                    case 4:
                        span += " label label-yellow arrowed-in arrowed-right'>已送司机";
                        break;
                    case 5:
                        span += " label label-pink arrowed-in arrowed-right'>司机确认"
                        break;
                    case 6:
                        span += " label-warning arrowed-in arrowed-right'>正在取餐";
                        break;
                    case 7:
                        span += " label-purple arrowed-in arrowed-right'>正在送餐";
                        break;
                    case 8:
                        span += " label-success arrowed-in'>送达成功";
                        break;
                    case 0:
                        span += " label-danger'>餐厅拒绝";
                        break;
                    case 9:
                        span += " label-grey'>订单取消";
                        break;
                }
                return span += "  " + time + "</span>";
            }
        },
        {
            text: 'Restaurant',
            flex: 2,
            sortable: true,
            minWidth: 80,
            maxWidth: 100,
            dataIndex: 'storeName'
        },
        {
            text: 'Total',
            flex: 1,
            sortable: true,
            minWidth: 80,
            //formatter: 'date("m/d/Y")',
            dataIndex: 'payment',
            renderer: function(val) {
                return val.total.toFixed(2);
            }
        },
        {
            text: 'Type',
            flex: 1,
            minWidth: 70,
            dataIndex: 'payment',
            renderer: function(val) {
                //console.log(val.payment);
                if (val.method == 0) {
                    return 'Cash';
                } else
                    return 'Card';
            }
        }
    ],
    afterRender: function() {
        this.callParent(arguments);

    }



});
