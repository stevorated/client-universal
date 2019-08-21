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
  value
  } = props
  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
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
        <Alert
          color="warning"
          style={{
            fontWeight: '500',
            fontSize: '1rem',
            padding: '0.1rem',
            marginBottom: '0',
            marginTop: '.1rem'
          }}
          className="text-danger"
        >
          {errorText}
        </Alert>
      </FadeIn>
      <FadeIn show={errors !== undefined}>
        {errors && errors[name] && (
          <Alert
            style={{
              fontWeight: '500',
              fontSize: '1rem',
              padding: '0.1rem',
              marginBottom: '0',
              marginTop: '.1rem'
            }}
            className="text-danger"
          >
            {errors[name].message}
          </Alert>
        )}
      </FadeIn>
    </FormGroup>
  )
}
