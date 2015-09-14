/**
 * Created by devo on 9/11/2015.
 */
/**
 * Created by Yaxin on 6/8/2015.
 */
Ext.define('517Employee.view.user.information.userInfo.userPermission.permissionDetail.PermissionDetail', {
    extend: 'Ext.form.Panel',
    requires:[
        //'517Employee.view.user.information.userInfo.userPermission.permissionDetail.action.Action',
        //'517Employee.view.user.information.userInfo.userPermission.permissionDetail.restrict.Restrict',
        //'517Employee.view.user.information.userInfo.userPermission.permissionDetail.parameter.Parameter',
    ],
    xtype: 'employee-user-information-userInfo-userPermission-permissionDetail',
    //controller:'employee-user-information-userInfo-userPermission-permissionDetail-controller',

    border: false , frame: false,
    margin: '2 2 2 2',
    bodyPadding: 5,

    defaults: {
        anchor: '100%'
    },
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 100,
        msgTarget: 'side'
    },

    /*  Variables  */

    // Variable detect if there are changes
    changedFlag:false,

    changedString:[],

    // Variable save original record
    originRecord:null,

    // Variable detect if its creating new OptionGroup
    newPermission: false,

    // Variable detect the method
    currentMethod:'saving',

    // Variable save permission id
    permissionId:'',

    // Variable save selected row
    selectedRow:-1,


    /*  View Content  */
    items: [
        {
            xtype: 'fieldcontainer',
            defaultType: 'textfield',
            layout:'hbox',
            labelWidth:0,
            items: [
                {
                    xtype: 'fieldcontainer',
                    defaultType: 'textfield',
                    reference:'employee-restaurant-dish-optionGroup-disabled',
                    layout:'vbox',
                    flex:1,
                    labelWidth:0,
                    items: [
                        {allowBlank: false, fieldLabel: 'Role', name: 'role' , flex:2 , margin:'2 5 2 0'},
                    ]
                },
                {
                    xtype:'employee-restaurant-dish-optionGroup-businessHour',
                    reference:'employee-restaurant-dish-optionGroup-businessHour',
                    flex:1,

                }
            ]
        },

        /*
        {
            xtype:'employee-restaurant-dish-optionSelection',
            reference:'employee-restaurant-dish-optionSelection',
            height:280
        },
        */



    ],
    dockedItems:[
        {
            dock: 'bottom',
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    iconCls: 'icon-save',
                    text: 'Save Changes',
                    handler:'Savechanges'

                },
                {
                    xtype:'tbfill'
                }
            ]

        }
    ],
    setBusinessHourGrid:function( name , businessHour ) {
        var me = this;
        var businessHourGrid = me.lookupReference( 'employee-restaurant-dish-optionGroup-businessHour' );
        if ( businessHour && businessHour.length > 0 ) {
            businessHourGrid.setBusinessHourGrid( 'New' , businessHour );
        }
    },
    resetAll:function(){
        this.getForm.reset();
        this.currentMethod = "saving";
        this.selectedRow = -1;
        this.originRecord = null;
        this.itemId = '';
        this.changedString = [];
        this.changedFlag = false;
    }

});