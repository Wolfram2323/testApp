Ext.define('Equipment.view.EquipmentGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.eqGridView',
    frame: true,
    store: 'EquipmentStore',
    iconCls: 'icon-user',
    viewConfig: {
        markDirty: false
    },
    columns: [
        {
            text: 'Тип',
            flex: 1,
            sortable: true,
            dataIndex: 'type',
            editor: {
                xtype: 'textfield',
                allowBlank: false,
                blankText: 'Это поле должно быть заполнено'
            }
        },
        {
            text: 'Серийный номер',
            flex: 2,
            sortable: true,
            dataIndex: 'serialNumber',
            editor: {
                xtype: 'textfield',
                allowBlank: false,
                blankText: 'Это поле должно быть заполнено'
            }


        },
        {
            flex: 1,
            text: 'Стоимость',
            sortable: true,
            dataIndex: 'price',
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                blankText: 'Это поле должно быть заполнено'
            }
        },
        {
            flex: 1,
            text: 'Дата покупки',
            sotable: true,
            dataIndex: 'purchDate',
            editor: {
                xtype: 'datefield',
                allowBlank: false,
                format: "d/m/Y",
                submitFormat: "d/m/Y",
                blankText: 'Это поле должно быть заполнено'
            }
        }
    ],
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            id:'rowEditor',
            clicksToEdit: 2,
            saveBtnText: 'Сохранить',
            cancelBtnText: 'Отменить',
            listeners:{
                edit: function(plugin, context){
                    var date = context.record.get('purchDate');
                    context.record.set('purchDate', Ext.Date.format(date, "d/m/Y"));
                    var store = this.grid.getStore();
                    store.sync({failure: function(batch){
                        var response = batch.getExceptions()[0].getError().response;
                        var ex = Ext.decode(response.responseText);
                        this.rejectChanges();
                        Ext.MessageBox.show({
                            title: 'Ошибка',
                            msg: ex.errorCode + ". " + ex.errorMessage,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        });
                    }, scope: store})
                }

            }
        })
    ],
    selType: 'rowmodel',
    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                {
                    text: 'Добавить',
                    action: 'add'

                },
                '-',
                {
                    action: 'delete',
                    text: 'Удалить',
                    disabled: true
                },
                '-',
                {
                    text:'Рассчитать амортизацию',
                    action: 'calc',
                    disabled: true
                }
            ]
        }
    ]
});