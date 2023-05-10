export const formatValue = (values, fields) => {
  let valueToSend = [];
  Object.keys(values).map(key => {
    const fieldType = fields.filter(f => f.label === key)[0].fieldType;
    const label = key;
    const value = values[key];

    valueToSend.push(fieldFill(value, fieldType.name, fieldType, label));
  });
  return valueToSend;
};

const fieldFill = (val, field, fieldType, label) => {
  switch (field) {
    case 'location':
    case 'text':
      return {
        fieldType: fieldType,
        label: label,
        text: val,
        dropDown: null,
        date: null,
        dateAndTime: null,
        checkBoxId: null,
      };
    case 'select':
      return {
        fieldType: fieldType,
        label: label,
        text: null,
        dropDown: val,
        date: null,
        dateAndTime: null,
        checkBoxId: null,
      };
    case 'date':
      return {
        fieldType: fieldType,
        label: label,
        text: null,
        dropDown: null,
        date: val,
        dateAndTime: null,
        checkBoxId: null,
      };
    case 'checkbox':
      return {
        fieldType: fieldType,
        label: label,
        text: null,
        dropDown: null,
        date: null,
        dateAndTime: null,
        checkBoxId: val,
      };
    case 'datetime-local':
      return {
        fieldType: fieldType,
        label: label,
        text: null,
        dropDown: null,
        date: null,
        dateAndTime: val,
        checkBoxId: null,
      };
  }
};
