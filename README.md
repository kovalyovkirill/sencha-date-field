# Date-field

## Warning! Don't use it for production.

[Sencha Touch](https://www.sencha.com/legal/gpl/) DateField (`xtype: datefield`) plugin witch adds two properties maxDate and minDate. These properties allow us to control maximum and minimum limits of date. 

## How to use?
1. Create folder `ux` in your root folder
2. Copy `DatePickerCustom.js` and `DatePickerFieldCustom.js` to this folder
3. Replace app name
3. Add these two files in requires at `app.js:`
```javascript
//app.js

Ext.application({
    name: 'YourAppName',

    requires: [
        //other requires
        
        'Ext.YourAppName.ux.DatePickerCustom',
        'Ext.YourAppName.ux.DatePickerFieldCustom'
    ],

    views: [
        'Main'
    ]

    /*some other stuff*/
});
```

Properties `maxDate` and `minDate` have to be a type of Date object. Also you can use `setMinDate` or `setMaxDate` methods to change these properties.

##Work to do

- Add getter methods to `maxDate` and `minDate`;
- Fix some bugs=)
- Refactor whole code
