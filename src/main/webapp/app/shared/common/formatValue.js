import moment from 'moment';

export const formatValue = async (values, fields, c, f) => {
  let valueToSend = [];
  await Promise.all(
    Object.keys(values).map(async key => {
      const fieldType = fields.filter(f => f.label === key)[0].fieldType;
      const label = key;
      const value = values[key];
      const fieldValue = await fieldFill(value, fieldType.name, fieldType, label);
      valueToSend.push(fieldValue);
    })
  );
  return valueToSend;
};

const fieldFill = async (val, field, fieldType, label) => {
  switch (field) {
    case 'textarea':
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
        file: null,
        encodingFileType: null,
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
        file: null,
        encodingFileType: null,
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
        file: null,
        encodingFileType: null,
      };
    case 'checkbox':
      return {
        fieldType: fieldType,
        label: label,
        text: null,
        dropDown: null,
        date: null,
        dateAndTime: null,
        checkBoxId: Number(val),
        file: null,
        encodingFileType: null,
      };
    case 'datetime-local':
      return {
        fieldType: fieldType,
        label: label,
        text: null,
        dropDown: null,
        date: null,
        dateAndTime: moment(val).format(),
        checkBoxId: null,
        file: null,
        encodingFileType: null,
      };
    case 'file':
      const base64 = await convertFileToBase64(val[0]);

      return {
        fieldType: fieldType,
        label: label,
        text: null,
        dropDown: null,
        date: null,
        dateAndTime: null,
        checkBoxId: null,
        file: base64,
        encodingFileType: val[0].name + '~' + base64.split(',')[0],
      };
  }
};

export async function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
}
