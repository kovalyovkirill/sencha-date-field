Ext.define('YourAppName.ux.DatePickerCustom', {

    override: 'Ext.picker.Date',

    constructor: function (config) {
        this.callParent([config]);
        
        this.maxDate = this.maxDate || null;
        this.maxDate = this.maxDate || null;
    },

    getSlot: function (slotName) {
        var innerItems = this.getInnerItems(),
            ln = innerItems.length,
            i, slot, currentSlot = this[slotName + 'Slot'] || null;

        if (currentSlot) {
            return currentSlot;
        }

        for (i = 0; i < ln; i++) {
            slot = innerItems[i];
            if (slot.isSlot && slot.getName() == slotName) {
                this[slotName + 'Slot'] = slot;

                return slot;
            }
        }

        return null;
    },

    createSlots: function () {
        var me = this,
            slotOrder = ['day', 'month', 'year'],
            maxDate = me.config.maxDate,
            minDate = me.config.minDate,
            yearsFrom = minDate ? minDate.getFullYear() : me.getYearFrom(),
            yearsTo = maxDate ? maxDate.getFullYear() : me.getYearTo(),
            monthTo = maxDate ? maxDate.getMonth() : 11,
            daysTo = maxDate ? maxDate.getDate() : me.getDaysInMonth(monthTo + 1, yearsTo),
            years = [],
            days = [],
            months = [],
            reverse = yearsFrom > yearsTo, i;

        while (yearsFrom) {
            years.push({
                text: yearsFrom,
                value: yearsFrom
            });

            if (yearsFrom === yearsTo) {
                break;
            }

            if (reverse) {
                yearsFrom--;
            } else {
                yearsFrom++;
            }
        }

        for (i = 0; i <= monthTo; i++) {
            months.push({
                text: Ext.Date.monthNames[i],
                value: i + 1
            });
        }

        for (i = 0; i < daysTo; i++) {
            days.push({
                text: i + 1,
                value: i + 1
            });
        }

        var slots = [];

        slotOrder.forEach(function (item) {
            slots.push(me.createSlot(item, days, months, years));
        });

        me.setSlots(slots);
    },

    onSlotPick: function () {
        var value = this.getValue(true),
            maxDate = this.config.maxDate,
            minDate = this.config.minDate,
            yearsTo = maxDate ? maxDate.getFullYear() : this.getYearTo(),
            yearsFrom = minDate ? minDate.getFullYear() : this.getYearFrom(),
            monthFrom = minDate ? minDate.getMonth() : 0,
            monthTo = maxDate ? maxDate.getMonth() : 11,
            daysFrom = minDate ? minDate.getDate() : 1,
            daysTo = maxDate ? maxDate.getDate() : this.getDaysInMonth(monthTo + 1, yearsTo),
            months = [],
            days = [],
            years = [],
            yearCurrent =  value.getFullYear(), monthCurrent = value.getMonth(),
            i, ln;

        console.log("maxDate", maxDate);
        console.log("minDate", minDate);

        if (!value || !Ext.isDate(value)) {
            return;
        }

        this.callParent(arguments);

        if(minDate && value < minDate) {
            monthCurrent = monthFrom;
            value.setMonth(monthCurrent);
        }

        if (yearsFrom == yearCurrent && yearsTo == yearCurrent) {
            i = monthFrom;
            ln = monthTo + 1;
        } else if (yearCurrent == yearsFrom) {
            i = monthFrom;
            ln = 12;
        } else if (yearCurrent == yearsTo) {
            i = 0;
            ln = monthTo + 1;
        } else {
            i = 0;
            ln = Ext.Date.monthNames.length;
        }



        for (i; i < ln; i++) {
            months.push({
                text: Ext.Date.monthNames[i],
                value: i + 1
            });
        }
        
        if (yearsFrom == yearCurrent && yearsTo == yearCurrent
            && monthCurrent == monthTo && monthCurrent == monthFrom) {
            i = daysFrom;
            ln = daysTo;
        } else if (yearsFrom == yearCurrent && monthCurrent == monthFrom) {
            i = daysFrom;
            ln = this.getDaysInMonth(monthCurrent + 1, yearsFrom);
        } else if (yearCurrent == yearsTo && monthCurrent == monthTo) {
            i = 1;
            ln = daysTo;
        } else {
            i = 1;
            ln = this.getDaysInMonth(monthCurrent + 1, yearCurrent);
        }
        
        for (i; i <= ln; i++) {
            days.push({
                text: i,
                value: i
            });
        }
        
        while (yearsFrom) {
            years.push({
                text: yearsFrom,
                value: yearsFrom
            });

            if (yearsFrom === yearsTo) {
                break;
            }

            if (yearsFrom > yearsTo) {
                yearsFrom--;
            } else {
                yearsFrom++;
            }
        }


        var daySlot = this.getSlot('day'),
            monthSlot = this.getSlot('month'),
            yearSlot = this.getSlot('year'),
            isDayNotEqual = daySlot.getStore().getCount() != days.length,
            setNewValueToSlot = function (slot, newValue) {
            slot.getStore().setData(newValue);

            var store = slot.getStore(),
                viewItems = slot.getViewItems(),
                valueField = slot.getValueField(),
                index, item;

            var searchItem = slot._name == 'day'
                ? value.getDate()
                : slot._name == 'year'? value.getFullYear() : value.getMonth() + 1;
                
            index = store.find(valueField, searchItem);

            if (index == -1) {
                return;
            }

            item = Ext.get(viewItems[index]);

            slot.selectedIndex = index;
            slot.scrollToItem(item);
            slot.setValue(slot.getValue(true));
        };

        setNewValueToSlot(yearSlot, years);
        setNewValueToSlot(monthSlot, months);

        if(isDayNotEqual) {
            setNewValueToSlot(daySlot, days);
        }
    },

    onCancelButtonTap: function() {
        var oldValue = this._value,
            newValue = this.getValue(true),
            testValue = newValue,
            oldTest;

        if (Ext.isDate(newValue)) {
            testValue = newValue.toDateString();
        }
        if (Ext.isDate(oldValue)) {
            oldValue.toDateString();
        } else {
            oldTest = new Date(oldValue.year, oldValue.month - 1, oldValue.day);
            oldTest.toDateString();
        }

        if (testValue != oldTest) {
            this.setValue(oldTest);
        }

        this.fireEvent('cancel', this);
        this.hide();
        Ext.util.InputBlocker.unblockInputs();
    }
});