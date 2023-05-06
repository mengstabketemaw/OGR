import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';

const getFieldCSSClasses = (touched, errors) => {
  const classes = ['form-control'];
  if (touched && errors) {
    classes.push('is-invalid');
  }

  if (touched && !errors) {
    classes.push('is-valid');
  }

  return classes.join(' ');
};

export function DatePickerField({ ...props }) {
  let { setFieldValue, errors, touched } = useFormikContext();

  const childName = props.childName;
  if (childName) {
    errors = props?.errors;
    touched = props?.touched;
  }

  const [field] = useField(props);

  return (
    <>
      {props.label && (
        <label>
          {props.label} <span className="text-danger">{props.required && '*'}</span>
        </label>
      )}
      <DatePicker
        className={
          childName
            ? getFieldCSSClasses(touched[childName], errors[childName])
            : getFieldCSSClasses(touched[field.name], errors[field.name])
        }
        style={{ width: '100%' }}
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={val => {
          setFieldValue(field.name, val);
        }}
      />
      {errors[field.name] && touched[field.name] ? (
        <div className="invalid-datepicker-feedback invalid-feedback d-block">{errors[field.name].toString()}</div>
      ) : (
        <div className="feedback text-muted">
          {props.customFeedbackLabel && <>{props.customFeedbackLabel}</>}
          {!props.customFeedbackLabel && props.label && (
            <>
              <b>{props.label}</b>
            </>
          )}
        </div>
        // <div className="feedback text-muted">
        //   <b>{props.label}</b>
        // </div>
      )}
    </>
  );
}
