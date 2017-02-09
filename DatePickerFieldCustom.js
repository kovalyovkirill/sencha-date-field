Ext.define('YourAppName.ux.DatePickerFieldCustom', {
    override: 'Ext.field.DatePicker',

    constructor: function (config) {
        this.callParent(arguments);
    },

    getPicker: function () {
        var picker = this._picker,
            value = this.getValue();

        if (picker && !picker.isPicker) {
            picker = Ext.factory({maxDate: this.maxDate, minDate: this.minDate}, Ext.picker.Date);
            if (value != null) {
                picker.setValue(value);
            }
        }

        picker.on({
            scope: this,
            change: 'onPickerChange',
            hide: 'onPickerHide'
        });

        this._picker = picker;

        return picker;
    },

    setMinDate: function (minDate) {
        if (Ext.isDate(minDate)) {
            this.minDate = minDate;

            var me = this,
                picker = me._picker;

            if (picker && picker.isPicker) {
                picker.minDate = minDate;
            }
        }
    },
    setMaxDate: function (maxDate) {
        if (Ext.isDate(maxDate)) {
            this.maxDate = maxDate;

            var me = this,
                picker = me._picker;

            if (picker && picker.isPicker) {
                picker.maxDate = maxDate;
            }
        }
    }
});