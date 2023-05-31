import moment from 'moment';

export const formatValue = async (values, fields, currentFields, licence_id) => {
  let dataId = null;
  let valueToSend = [];
  await Promise.all(
    Object.keys(values).map(async key => {
      const field = fields.filter(f => f.label === key)[0];
      if (currentFields != null && currentFields.length > 0) {
        dataId = currentFields.filter(d => d.label === key)[0]?.id || null;
      }
      const fieldType = field.fieldType;
      const custom_field_id = field.id;
      const label = key;
      const value = values[key];
      const fieldValue = await fieldFill(value, fieldType.name, custom_field_id, label, dataId, licence_id);
      valueToSend.push(fieldValue);
    })
  );
  return valueToSend;
};

export const formatDisplayOn = (values, fields, stateKey) => {
  let valueToSend = {};
  let count = 0;
  Object.keys(values).map(key => {
    const field = fields.find(f => f.label === key);
    const displayOn = field.displayOn;
    const label = key;
    let value = values[key];
    if (field.fieldType.name === 'file') {
      value = value.split('~')[0];
    } else if (field.fieldType.name === 'checkbox') {
      value = value === 1 ? 'True' : 'False';
    }
    if (displayOn != null && displayOn.id === stateKey) {
      valueToSend[key] = value;
    }
  });

  return valueToSend;
};

const fieldFill = async (val, field, custom_field_id, label, dataId, licence_id) => {
  switch (field) {
    case 'textarea':
    case 'location':
    case 'text':
      return {
        id: dataId,
        customFieldId: custom_field_id,
        licenceId: licence_id,
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
        id: dataId,
        customFieldId: custom_field_id,
        licenceId: licence_id,
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
        id: dataId,
        customFieldId: custom_field_id,
        licenceId: licence_id,
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
        id: dataId,
        customFieldId: custom_field_id,
        licenceId: licence_id,
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
        id: dataId,
        customFieldId: custom_field_id,
        licenceId: licence_id,
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
        id: dataId,
        customFieldId: custom_field_id,
        licenceId: licence_id,
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

export const getFieldValue = list => {
  var val = {};
  if (list && list.length > 0) {
    for (var item of list) {
      val[item.label] = getValue(item);
    }
  }
  return val;
};

const getValue = value => {
  return value.text
    ? value.text
    : value.dropDown
    ? value.dropDown
    : value.date
    ? value.date
    : value.dateAndTime
    ? value.dateAndTime
    : value.checkBoxId
    ? value.checkBoxId
    : value.file
    ? value.encodingFileType
    : value.file;
};

export async function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
}
