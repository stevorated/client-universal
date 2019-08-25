import React from 'react'
import { FormGroup, Label, Input, Alert } from 'reactstrap'
import { FadeIn } from '../../Elements'

export default function InputComponent(props) {
  const {
  label,
  name,
  type = 'text',
  placeholder,
  id,
  error,
  errorText,
  errors,
  handleChangeInput,
  value,
  weak,
  better,
  strong 
  } = props
  return (
    <FormGroup className="text-capitalize">
      <Label  for={id}>{label}</Label>
      <Input
        autoComplete="off"
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={handleChangeInput}
        value={value}
      />
      <FadeIn show={error}>
        <div
          className="mt-2 text-danger"
        >
          {errorText}
        </div>
      </FadeIn>
      <FadeIn show={errors !== undefined}>
        {errors && errors[name] && (
          <div
            className="mt-2 text-danger"
          >
            {errors[name].message}
          </div>
        )}
      </FadeIn>
    </FormGroup>
  )
}
