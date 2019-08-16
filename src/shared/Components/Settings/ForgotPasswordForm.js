import React, { Fragment } from 'react'
import { ModalBody, ModalFooter, Button, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap'
import { isEmail, isLength } from 'validator'

import { orange } from '../../Utils'

export default function ResetPasswordRequestForm(props) {
  // console.log(props)
  const handleSubmit = e => {
    e.preventDefault()
    props.handleState({ showErrors: true })
    if (props.state.myEmailGood) {
      props.startResetPassword()
    }
  }
  const handleChangeInput = e => {
    const name = e.target.name
    const value = e.target.value
    const newData = {
      [name]: value
    }
    switch (name) {
      case 'myEmail':
        if (value && !isEmail(value)) {
          props.handleState({ myEmailError: true })
          props.handleState({ myEmailGood: false })
        } else {
          props.handleState({ myEmailError: false })
          props.handleState({ myEmailGood: true })
        }
        return props.handleState(newData)
      default:
        break
    }
    // props.handleChange(newData)
  }

  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <div>
            Hey, are you sure? this operation can not be reversed!. if you choose to reset your password you will be sent a mail, to confirm your identity containing further details.
        </div>

          <FormGroup>
            <Label className="mt-3" for="myEmail">Insert your email</Label>
            <Input
              autoComplete="off"
              invalid={(props.state.emailError && props.state.emailError !== null)}
              value={props.state.myEmail}
              onChange={handleChangeInput}
              // disabled={!props.state.usernameActive}
              type="email"
              name="myEmail"
              id="myEmail"
              placeholder=""
            />
            {props.state.showErrors && <FormFeedback tooltip>this is an invalid email</FormFeedback>}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button style={{ background: orange }}>
            Yeah Cool
        </Button>{' '}
          <Button type="button" color="secondary" onClick={props.toggle}>
            Cancel
        </Button>
        </ModalFooter>
      </Form>
    </Fragment>
  )
}
