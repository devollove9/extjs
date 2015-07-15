/**
 * Created by Yaxin on 6/2/2015.
 */
Ext.define('517Employee.view.region.RegionList', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.RowNumberer',
        'Ext.toolbar.Paging',
        'Ext.ux.form.SearchField',
    ],
    xtype: 'admin-region-list',
    store: 'Regions',
    title: '地区列表',
    //iconCls:'fa-title fa-list-ul fa-title',
    border: false,
    admin_view: false,
    frame: true,
    collapsible: true,
    autoScroll: true,
    //multiSelect: true,
    copiedOptionGroupFlag: false,
    copiedOptionGroup: null,
    columnLines: true,
    width: 150,
    hideHeaders: true,
    padding: 0,
    scroll: 'vertical',
    viewConfig: {
        enableTextSelection: true
    },
    columns: [{
        xtype: 'rownumberer'
    }, {
        text: 'Name',
        //reference: 'reslistGrid',
        sortable: false,
        dataIndex: 'name',
        width: 150
    }
    ],
    listeners: {

        selectionchange: function (model, records, eOpts) {
            Ext.getCmp('admin-regionlist').resetCopiedOptionGroup();
            Ext.getStore('Restaurants').loadData([], false);
            Ext.getStore('Driver.Drivers_temp').loadData([], false);
            if (this.admin_view == true) {
                Ext.getStore('Restaurants').loadData([], false);

                Ext.getStore('Restaurants').load({
                    params: {
                        method: 'get_by_region',
                        region_id: records[0].data.regionId
                    },
                    callback: function (records, operation, success) {

                    }
                });
                Ext.getStore('Driver.Drivers_temp').load({
                    params: {
                        method: 'filter_by_region',
                        region_id: records[0].data.regionId,
                        filterBy: 'lastUpdate',
                        filterValue: '0',
                        comparator: '>'
                    },
                    callback: function (records, operation, success) {

                    }
                });
            }

        }
    },
});