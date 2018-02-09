Ext.define('Equipment.model.EquipmentModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 'type', 'serialNumber', 'price', 'purchDate'],
    proxy: {
        type: 'rest',
        api: {
            create: 'equipment',
            read: 'equipment',
            destroy: 'equipment',
            update: 'equipment'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }

    }
});
