import React from 'react';
import { useField } from 'formik';
import { FieldFeedbackLabel } from './fieldFeedbackLabel';

const getFieldCSSClasses = (touched, errors) => {
  // const classes = ["form-control", "form-control-solid"];
  const classes = ['form-control'];
  if (touched && errors) {
    classes.push('is-invalid');
  }

  if (touched && !errors) {
    classes.push('is-valid');
  }

  return classes.join(' ');
};

export function Select({ label, withFeedbackLabel = true, type = 'text', customFeedbackLabel, children, ...props }) {
  const [field, meta] = useField(props);
  const { touched, error } = meta;
  return (
    <>
      {label && (
        <label>
          {label} <span className="text-danger">{props.required && '*'}</span>
        </label>
      )}
      <select className={getFieldCSSClasses(touched, error)} {...field} {...props} style={{ backgroundImage: 'none' }}>
        {children}
      </select>
      {withFeedbackLabel && (
        <FieldFeedbackLabel error={error} touched={touched} label={label} customFeedbackLabel={customFeedbackLabel} type={undefined} />
      )}
    </>
  );
}
