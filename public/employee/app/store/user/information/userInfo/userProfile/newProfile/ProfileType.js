/**
 * Created by devo on 9/11/2015.
 */
Ext.define( '517Employee.store.user.information.userInfo.userProfile.newProfile.ProfileType' , {
    extend: 'Ext.data.Store',
    storeId: 'Employee-User-Information-UserInfo-UserProfile-NewProfile-ProfileType',
    fields: ['name', 'profileType'],
    data : [
        { name:'Driver' , profileType:'driver' },
        { name:'Store' , profileType:'store' }
    ]
});