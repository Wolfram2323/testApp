Ext.application({
    name: 'Equipment',

    views: [
        'BasicView',
        'EquipmentGridView',
        'AddNewEquipmentView',
        'AmortizationFieldsView',
        'AmortizationBasicView',
        'AmortizationGridView'
    ],

    stores:[
        'EquipmentStore',
        'AmortizationStore'
    ],
    controllers: [
        'EquipmentController'


    ],

    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: {
                xtype  : 'basicView'
            }
        });
    }
});