import React from 'react'
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'

export function FormInput({value, notValid, errors, onChange, type, name, longName, errorFeedback, relevantError }) {
  return (
    <FormGroup>
    <Label className="text-capitalize" for={name}>{longName}</Label>
    <Input
      value={value}
      valid={!notValid && value.length > 0}
      invalid={notValid || (!!errors && !!errors.fname)}
      onChange={onChange}
      type={type}
      name={name}
      id={name}
      placeholder={`${longName} please..`}
    />
    <FormFeedback>{errorFeedback}</FormFeedback>
    <FormFeedback className="mr-auto" valid>Sweet that's lookin' good ...</FormFeedback>
    {errors && (relevantError && <FormFeedback>{ErrorMessage}</FormFeedback>)}
  </FormGroup>
  )
}
