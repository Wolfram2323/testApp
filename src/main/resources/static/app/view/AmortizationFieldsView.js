Ext.define('Equipment.view.AmortizationFieldsView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.amrFieldView',
    title: "Расчет амортизации",
    items: [
        {
            xtype: 'fieldset',
            layout: 'column',
            items: [
                {
                    xtype: 'container',
                    margin: 10,
                    flex: 1,
                    items: [
                        {
                            xtype: 'numberfield',
                            name: 'price',
                            fieldLabel: 'Стоимость',
                            paramField: true,
                            readOnly: true,
                            padding: '0 0 10 0'
                        },
                        {
                            xtype: 'textfield',
                            name: 'serialNumber',
                            fieldLabel: 'Серийный номер',
                            readOnly: true
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 2,
                    margin: 10,
                    items: [
                        {
                            xtype: 'numberfield',
                            name: 'month',
                            paramField: true,
                            allowDecimals: false,
                            minValue: 1,
                            value: 10,
                            maxValue: 100,
                            fieldLabel: 'Количество месяцев',
                            listeners: {
                                change: function (field, newValue, oldValue) {
                                    if (Ext.isEmpty(newValue)) {
                                        field.setValue(oldValue);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'numberfield',
                            allowDecimals: false,
                            paramField: true,
                            name: 'numbersAfterComma',
                            value: 2,
                            maxValue: 10,
                            minValue: 0,
                            fieldLabel: 'Количество знаков после запятой',
                            listeners: {
                                change: function (field, newValue, oldValue) {
                                    if (Ext.isEmpty(newValue)) {
                                        field.setValue(oldValue);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: "Рассчитать",
                            handler: function () {
                                var fieldView = this.findParentByType('panel'), param = {};
                                Ext.each(fieldView.query('field[paramField="true"]'), function(field){
                                    param[field.name] = field.getValue();
                                });

                                Ext.Ajax.request({
                                    url: 'amortization',
                                    method: 'GET',
                                    params: param,
                                    success: function (response) {
                                        var data = Ext.decode(response.responseText);
                                        var grid = fieldView.findParentByType().query('amrGridView')[0];
                                        fieldView.query('numberfield[name="linePersent"]')[0].setValue(data.linePersent);
                                        fieldView.query('numberfield[name="nonLianerPersent"]')[0].setValue(data.nonLianerPersent);
                                        grid.getStore().loadData(data.rows);
                                    },
                                    failure: function (response) {
                                        Ext.MessageBox.show({
                                            title: 'Ошибка',
                                            msg: "Невозможно расчитать амортизацию",
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.Msg.ERROR
                                        });
                                    }
                                });

                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'numberfield',
                    name: 'linePersent',
                    decimalPrecision: 10,
                    fieldLabel: 'Норма амортизации в процентах, линейный метод',
                    readOnly: true
                },
                {
                    xtype: 'numberfield',
                    name: 'nonLianerPersent',
                    decimalPrecision: 10,
                    fieldLabel: 'Норма амортизации в процентах, нелинейный метод',
                    readOnly: true
                }

            ]
        }


    ]

});
