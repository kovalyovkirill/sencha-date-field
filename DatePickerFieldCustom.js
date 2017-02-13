Ext.define('YourAppName.ux.DatePickerFieldCustom', {
    override: 'Ext.field.DatePicker',

    constructor: function (config) {
        this.callParent([config]);

        this.maxDate = this.config.maxDate || null;
        this.maxDate = this.config.maxDate || null;
    },

    getPicker: function () {
        var picker = this._picker,
            value = this.getValue();

        if (picker && !picker.isPicker) {
            picker = Ext.factory({maxDate: this.config.maxDate || null, minDate: this.config.minDate || null}, Ext.picker.Date);
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
            this.config.minDate = minDate;

            var me = this,
                picker = me._picker;

            if (picker && picker.isPicker) {
                picker.config.minDate = minDate;
            }
        }
    },
    setMaxDate: function (maxDate) {
        if (Ext.isDate(maxDate)) {
            this.config.maxDate = maxDate;

            var me = this,
                picker = me._picker;

            if (picker && picker.isPicker) {
                picker.config.maxDate = maxDate;
            }
        }
    }
});