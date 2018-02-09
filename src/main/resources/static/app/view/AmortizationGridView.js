Ext.define('Equipment.view.AmortizationGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.amrGridView',
    frame: true,
    store: 'AmortizationStore',
    iconCls: 'icon-user',
    viewConfig: {
        markDirty: false
    },
    columns: [
        {
            text: 'Mecяц',
            flex: 1,
            sortable: true,
            dataIndex: 'monthNumber',
        },
        {
            text: 'Остаточная стоимость, линеный метод',
            flex: 2,
            sortable: true,
            dataIndex: 'linePrice',


        },
        {
            flex: 2,
            text: 'Норма амортизации, линейный метод',
            sortable: true,
            dataIndex: 'lineAmortization',

        },
        {
            flex: 2,
            text: 'Остаточная стоимость, нелиненый метод',
            sotable: true,
            dataIndex: 'nonLianerPrice',

        },
        {
            flex: 2,
            text: 'Норма амортизации, нелиненый метод',
            sotable: true,
            dataIndex: 'nonLianerAmortization',

        }
    ],

    selType: 'rowmodel'

});