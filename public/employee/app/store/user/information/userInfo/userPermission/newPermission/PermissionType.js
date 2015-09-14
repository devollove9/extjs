/**
 * Created by devo on 9/11/2015.
 */
Ext.define( '517Employee.store.user.information.userInfo.userPermission.newPermission.PermissionType' , {
    extend: 'Ext.data.Store',
    storeId: 'Employee-User-Information-UserInfo-UserPermission-NewPermission-PermissionType',
    fields: ['name', 'permissionType'],
    data : [
        { name:'Operator' , permissionType:'operator' },
        { name:'Driver' , permissionType:'driver' },
        { name:'Store' , permissionType:'store' }
    ]
});