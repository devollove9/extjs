Ext.define('517Employee.view.main.Footer', {
    extend: 'Ext.panel.Panel',
    xtype: 'footer',
    border: false,frame:false,
    bodyStyle: { 'background-color': "white" , 'border-width' : '0px' },
    referenceHolder:true,
    initComponent: function() {
        //this.height = 40;
        this.frame = false; this.border = false;
        this.style = {
            'margin':'0 25 0 25',
            'border-top':'1px solid #c1c1c1'
        };
        this.tbar = new Ext.Toolbar({ 
            border:false,frame:false,
            margin:'0 50 0 50',
            items:[
                {
                    xtype:'tbfill'
                },
                {
                    xtype:'label',
                    html:'&copy; 2014 - 2015 517 Dine At Home Delivery, LLC',       
                },
                {
                    xtype:'tbfill'
                }
            ]
        });
        this.callParent();
    },
   

});