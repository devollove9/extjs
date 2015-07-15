Ext.define('517Employee.store.combobox.OrderFilterComparator', {
    extend: 'Ext.data.Store',    
    fields:[
        'name',
        'comparator'
    ],
    data:[
        { name:'Between' , comparator:'>,<' },
        { name:'After' , comparator:'>' },
        { name:'Before' , comparator:'<' },
        
    ]
    
})