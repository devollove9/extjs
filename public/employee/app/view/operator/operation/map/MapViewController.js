/**
 * Created by devo on 6/22/2015.
 */
Ext.define('517Employee.view.operator.operation.map.MapViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee-operator-operation-map-controller',
    setBtns:function(){
        if(Number(localStorage.getItem('hideUser'))){
            console.log(this.lookupReference('userBtn'));
            this.lookupReference('userBtn').toggle(true);
        }
    },
    hideMarker: function(btn,state) {
        //console.log(state);
        state = state?1:0; //localstorage not support true/false type
        switch(btn.getText()){
            case '司机':
                localStorage.hideDriver = state;
                break;
            case '餐厅':
                localStorage.hideRes = state;
                break;
            case '客户':
                localStorage.hideUser = state;
                break;
            default: return 0;
        }

    },
    initCheckbox:function( field ) {
        console.log( field );
        var checkgroup = this.lookupReference('checkgroup');
        checkgroup.setValue({
            hideDriver: Number(localStorage.getItem('hideDriver')),
            hideRes:Number(localStorage.getItem('hideRes')),
            hideUser:Number(localStorage.getItem('hideUser'))
        });
    },
    hideChecked:function(box, checked){
        checked = checked?1:0;
        localStorage.setItem(box.name, checked);

    }
})