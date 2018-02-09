
Ext.define('Equipment.view.BasicView', {
    extend: 'Ext.panel.Panel',
    width: 700,
    height: 460,
    padding: 10,
    alias: 'widget.basicView',
    layout: 'border',
    items: [
        {
            xtype: 'eqGridView',
            region: 'center'
        }

    ],
    renderTo: Ext.getBody()
});
