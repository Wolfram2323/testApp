Ext.define('Equipment.controller.EquipmentController', {
        extend: 'Ext.app.Controller',

        refs: [
            {
                selector: 'eqGridView',
                ref: 'eqGridView'
            },
            {
                selector: 'eqGridView button[action="add"]',
                ref: 'eqAdd'
            },
            {
                selector: 'eqGridView button[action="delete"]',
                ref: 'eqDelete'
            },
            {
                selector: 'addNewEqView',
                ref: 'addNewEqView'
            },
            {
                selector: 'basicView',
                ref: 'basicView'
            },
            {
                selector: 'addNewEqView button[action=save]',
                ref: 'addNewEqViewSave'
            },
            {
                selector: 'eqGridView button[action="calc"]',
                ref: 'armCalc'
            }

        ],

        init: function () {
            this.control({
                'eqGridView  button[action=add]': {
                    click: this.onAddEq
                },
                'eqGridView  button[action=delete]': {
                    click: this.onDeleteEq
                },
                'eqGridView': {
                    cellclick: this.onSelectGrid
                },
                'addNewEqView  button[action=save]': {
                    click: this.onSaveEq
                },
                'eqGridView  button[action=calc]': {
                    click: this.onCalc
                }

            });
        },

        onDeleteEq: function () {
            var selection = this.getEqGridView().getSelectionModel();
            var rs = selection.getSelection();
            this.getEqGridView().store.remove(rs[0]);
            this.getEqGridView().store.commitChanges();
        },

        onSaveEq: function (button) {
            var me = this, model = Ext.create('Equipment.model.EquipmentModel'),
                values = this.getAddNewEqView().down('form').getValues()
            error = false;
            Ext.iterate(values, function (value) {
                if (Ext.isEmpty(this[value])) {
                    error = true;
                    return false;
                }
            });
            if (error) {
                Ext.MessageBox.show({
                    title: 'Ошибка',
                    msg: "Заполните все поля",
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
                return;
            }
            model.set(this.getAddNewEqView().down('form').getValues());
            delete model.data.id;
            model.save({
                success: function (request, response) {
                    var saveResult = Ext.decode(response.getResponse().responseText);
                    Ext.getStore('EquipmentStore').add(saveResult);
                    me.getEqGridView().getView().refresh();
                    me.getAddNewEqView().close();
                },
                failure: function (request, result) {
                    var ex = Ext.decode(result.getError().response.responseText)
                    Ext.MessageBox.show({
                        title: 'Ошибка',
                        msg: ex.errorCode + ". " + ex.errorMessage,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }

            });
        },

        onAddEq: function () {
            Ext.widget('addNewEqView');
        },


        onSelectGrid: function () {
            this.getEqDelete().enable();
            this.getArmCalc().enable();
        },

        onCalc: function () {
            var selection = this.getEqGridView().getSelectionModel(),
                currentRow = selection.getSelection()[0];
            Ext.widget('amrBasicView', {data: currentRow});
        },
    dddd: function(){
        alert(1);
    }
    }
);
