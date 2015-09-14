/**
 * Created by devo on 9/5/2015.
 */
Ext.define( '517Employee.store.user.information.userRegister.RegisterType' , {
    extend: 'Ext.data.Store',
    storeId: 'Employee-User-Information-UserRegister-RegisterType',
    fields: ['name', 'registerType'],
    data : [
        { name:'Email' , registerType:'email' },
        { name:'Phone' , registerType:'phone' }
    ]
});