import React from 'react';
import { FieldFeedbackLabel } from './fieldFeedbackLabel';

const getFieldCSSClasses = (touched, errors, css) => {
  const classes = ['form-control'];
  if (touched && errors && css) {
    classes.push('is-invalid');
  }

  if (touched && !errors && css) {
    classes.push('is-valid');
  }

  return classes.join(' ');
};

export function Input({
  field, // { name, value, onChange, onBlur }
  //form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = true,
  customFeedbackLabel,
  type = 'text',
  css = true,
  ...props
}) {
  return (
    <>
      {label && (
        <label>
          {label} <span className="text-danger">{props.required && '*'}</span>
        </label>
      )}
      <input
        type={type}
        className="form-control" //{getFieldCSSClasses(touched[field.name], errors[field.name],css)}
        {...field}
        {...props}
      />
      {/*{withFeedbackLabel && (*/}
      {/*  <FieldFeedbackLabel*/}
      {/*    error={errors[field.name]}*/}
      {/*    touched={touched[field.name]}*/}
      {/*    label={label}*/}
      {/*    type={type}*/}
      {/*    customFeedbackLabel={customFeedbackLabel}*/}
      {/*  />*/}
      {/*)}*/}
    </>
  );
}
