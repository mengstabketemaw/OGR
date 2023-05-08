import React from 'react';
import { FieldFeedbackLabel } from './fieldFeedbackLabel';

const getFieldCSSClasses = (touched, errors, col) => {
  const classes = ['form-control'];
  if (touched && errors) {
    classes.push('is-invalid');
  }

  if (touched && !errors) {
    classes.push('is-valid');
  }
  if (col) {
    classes.push(col);
  }

  return classes.join(' ');
};

export function Textarea({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = true,
  customFeedbackLabel,
  type = 'text',
  height = '50px',
  col = 'col-md-12',
  ...props
}) {
  return (
    <>
      {label && (
        <label>
          {label} <span className="text-danger">{props.required && '*'}</span>
        </label>
      )}
      <textarea
        type={type}
        //className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        style={{ height }}
        {...field}
        {...props}
      />
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[field.name]}
          touched={touched[field.name]}
          label={label}
          type={type}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
