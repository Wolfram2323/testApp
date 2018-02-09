Ext.define('Equipment.view.AddNewEquipmentView', {
    extend: 'Ext.window.Window',
    alias: 'widget.addNewEqView',
    autoShow: true,
    layout: 'fit',
    modal: true,
    items: [
        {
            bodyPadding: 5,
            xtype: 'form',
            items: [
                {
                    xtype: 'fieldset',
                    fieldDefaults: {
                        margin: 10
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'type',
                            required: true,
                            fieldLabel: 'Тип',
                            allowBlank: false,
                            blankText: 'Это поле должно быть заполнено'
                        },
                        {
                            xtype: 'textfield',
                            name: 'serialNumber',
                            fieldLabel: 'Серийный номер',
                            required:true,
                            allowBlank: false,
                            blankText: 'Это поле должно быть заполнено'
                        },
                        {
                            xtype: 'numberfield',
                            name: 'price',
                            fieldLabel: 'Стоимость',
                            required:true,
                            allowBlank: false,
                            blankText: 'Это поле должно быть заполнено'
                        },
                        {
                            xtype: 'datefield',
                            name: 'purchDate',
                            fieldLabel: 'Дата покупки',
                            required:true,
                            format: "d/m/Y",
                            submitFormat: "d/m/Y",
                            allowBlank: false,
                            blankText: 'Это поле должно быть заполнено'
                        }
                    ]

                }

            ]
        }
    ],

    buttons: [
        {
            text: 'Сохранить',
            action: 'save'
        },
        {
            text: 'Отменить',
            handler: function () {
                this.up('window').close();
            }

        }
    ]
});