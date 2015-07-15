Ext.define('517Employee.model.user.User', {
    extend: 'Ext.data.Model', 
    
    fields: [
       {name: 'username'},
       {name: 'name'},
       {name: 'password'},
       {name: 'openid'},
       {name: 'email'},
       {name: 'payment'},
       {name: 'address'},
       {name: 'order'},           
       {name: 'permissions', type: 'float'},
       {name: 'status'},
       {name: 'balance', type: 'float'},
       {name: 'credit', type: 'int'},
       {name: 'register_time'},
       {name: 'last_login_time'}
    ]
    
    
   
});