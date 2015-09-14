Ext.define('517Employee.model.user.User', {
    extend: 'Ext.data.Model', 
    
    fields: [
        {name: 'username'},
        {name: 'name'},
        {name: 'password'},
        {name: 'openid'},
        {name: 'email'},
        {name: 'phone'},
        {name: 'payment'},
        {name: 'address'},
        {name: 'order'},
        {name: 'permissions', type: 'float'},
        {name: 'disabled'},
        {name: 'reasonDisabled'},
        {name: 'codeDisabled'},
        {name: 'account'},
        {name: 'balance', mapping:"account.balance"},
        {name: 'credit', mapping: 'account.credit'},
        {name: 'registerDate'},
        {name: 'lastLoginDate'}
    ]
    
    
   
});