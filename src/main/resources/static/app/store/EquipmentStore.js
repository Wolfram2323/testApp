Ext.define('Equipment.store.EquipmentStore', {
    extend: 'Ext.data.Store',
    requires : [
        'Equipment.model.EquipmentModel'
    ],
    model: 'Equipment.model.EquipmentModel',
    autoLoad: true,
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
