Ext.define( '517Employee.view.main.HeaderController' , {
    extend: 'Ext.app.ViewController',
    alias: 'controller.header',
    requires: [
        
    ],
    init:function( grid ){
        //var userCookie = Ext.getCmp( 'Index' );
        var userCookie = Ext.decode( Ext.util.Cookies.get( '517Employee' ) );
        if ( userCookie ) {
            if ( userCookie.email ) {
                this.lookupReference('welcome-label').setText( userCookie.email );
            } else {
                this.lookupReference('welcome-label').setText( 'Welcome!' );
            }
        } else {
            this.lookupReference('welcome-label').setText( 'Illegal Login!' );
            // Report Illegal log in
        }
    },
   
    logout:function(){
        //console.log(this.getView());
        Ext.Msg.show({
                    title:'Warning',
                    msg: 'You will be logged out <br> Are you sure you want to Log Out?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn,text){
                        if ( btn == 'yes' ) {
                            var userInfo = Ext.util.Cookies.get('517Employee');
                            userInfo = null;
                            Ext.util.Cookies.clear('517Employee');
                            window.location = "http://employee.yaxingli.com/login";


                        }
                    },
                    animEl: 'elId'
                 });
    },
    myProfile:function(){
        
    },
    switchView:function( panel ) {
 
       Ext.getCmp( 'Employee-Navigation' ).doNavigation( panel );
       

    },

    switchRegion:function( panel ) {
        // Region Menu Panel
        var menuBar = panel.up().up();
        // Main panel
        var mainPanel = menuBar.up().up();
        // Reset Restaurant List
        //

        if ( panel.cancelInfo == true ) {
            menuBar.setText( '地区 / Region ' );
            this.doReset( mainPanel );
            menuBar.regionId = -1;
        } else {
            menuBar.setText( panel.text );
            menuBar.regionId = panel.regionId;
            //Ext.getCmp( 'Employee-Main-ContentView').setLoading( true );
            this.doRefresh( mainPanel );
            Ext.getCmp( 'Employee-Main-ContentView' ).setLoading( false );

        }



    },

    doRefresh:function( mainPanel ) {
        if ( mainPanel.refreshList ) {
            if ( mainPanel.refreshList.length > 0 ) {
                for ( var i = 0 ; i < mainPanel.refreshList.length ; i ++ ) {
                    var component = mainPanel.refreshList[ i ];
                    //console.log( component );
                    Ext.getCmp( component).refreshView();
                }
            }
        }
    },

    doReset:function( mainPanel ) {
        if ( mainPanel.refreshList ) {
            if ( mainPanel.refreshList.length > 0 ) {
                for ( var i = 0 ; i < mainPanel.refreshList.length ; i ++ ) {
                    var component = mainPanel.refreshList[ i ];
                    //console.log( component );
                    Ext.getCmp( component ).resetAll();
                }
            }
        }
    }
    

});