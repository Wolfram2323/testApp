Ext.define('Equipment.view.AmortizationBasicView', {
    extend: 'Ext.window.Window',
    alias: 'widget.amrBasicView',
    width:800,
    autoShow: true,
    maximizable: true,
    layout: 'fit',
    modal: true,
    items: [
        {
            xtype: 'panel',
            width: 700,
            height: 460,
            layout: 'border',
            items:[
                {
                    xtype: 'amrGridView',
                    region: 'center'
                },
                {
                    xtype: 'amrFieldView',
                    region: 'north'
                }
            ]

        }
    ],

    buttons: [
        {
            text: 'Зарыть',
            handler: function () {
                this.findParentByType('panel').query('amrGridView')[0].getStore().removeAll();
                this.up('window').close();
            }

        }
    ],
    listeners:{
        show:function(){
            var data = this.config.data,
                price = this.query('numberfield[name="price"]')[0],
                serialNum = this.query('textfield[name="serialNumber"]')[0];
            price.setValue(data.get('price'));
            serialNum.setValue(data.get('serialNumber'));
            var diff = Math.abs(Ext.Date.diff(new Date(), Ext.Date.parse(data.get('purchDate'), "d/m/Y"), 'mo')) - 1;
            if (diff > 0) {
                this.query('numberfield[name="month"]')[0].setValue(diff);
            }
        }
    }
});
