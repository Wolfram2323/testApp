Ext.define('Equipment.store.AmortizationStore', {
    extend: 'Ext.data.Store',
    requires : [
        'Equipment.model.AmortizationModel'
    ],
    model: 'Equipment.model.AmortizationModel',
    proxy:{
        type:'localstorage'
    }

});
