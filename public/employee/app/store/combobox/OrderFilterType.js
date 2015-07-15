Ext.define('517Employee.store.combobox.OrderFilterType', {
    extend: 'Ext.data.Store',    
    fields:[
        'name',
        'filterBy'
    ],
    data:[
        { name:'Date(日期)' , filterBy:'placeDate' }
    ]
    
})