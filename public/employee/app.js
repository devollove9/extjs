Ext.Loader.setConfig({enabled: true});
Ext.setGlyphFontFamily('FontAwesome');

Ext.onReady( function() {
    var loadingMask = Ext.get('loading-mask');
    var loading = Ext.get('loading');
    
    //Ext.Msg.alert('123','123123123');
    //  Hide loading message
    loading.fadeOut({duration: 0.2, remove: true});

    //  Hide loading mask
    loadingMask.setOpacity(0.9);
    loadingMask.fadeOut({duration: 1600, easing: 'linear', remove: true});
    
});
Ext.define('517Employee.Time', {
    //singleton: true,
    statics: {
        currentTime: function(date) {
            var now;
            if(date){
                now = date;
            }else {
                now = new Date();
            }            
            var offset = Number(Ext.Date.getGMTOffset(now)) / 100;
            if(offset == 8){
                now = now.getTime() - (offset + 4) * 3600000;
                now = Ext.Date.parse(Math.round(now / 1000), 'U'); 
            }
           
            return now;
        }       
    },
    constructor:function(){}

});

Ext.require([
             'Ext.data.*',
             'Ext.grid.*',
             'Ext.ux.data.PagingMemoryProxy'
         ]);
Ext.application({
    name: '517Employee',
    autoCreateViewport: true,
    controllers: [
        'AdminController'
    ],
    stores:[
        'EmployeeInfo',
        'Orders',
         'operator.operation.OrderList',
        //'Employee-Operator-Operation-OrderList'

    ],
    models:[
        //'EmployeeInfo',

    ],
    launch:function(){

    }
 
 
    

});



