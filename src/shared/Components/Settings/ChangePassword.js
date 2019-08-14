import React, { useState } from 'react'
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { orange } from '../../Utils'

export default function ChangePassword(props) {
  // console.log(props)
  const [showError, setShowError] = useState(true)
  const handleSubmit = e => {

    e.preventDefault()
    setShowError(true)
    if (props.state.passwordGood && props.state.newPasswordGood && props.state.newPasswordConfirmGood) {
      // console.log('passed')
      props.changePassword({
        variables: {
          password: props.state.password,
          newPassword: props.state.newPassword
        }
      })
    }
  }

  const handleChangeInput = e => {
    setShowError(false)
    const name = e.target.name
    const value = e.target.value
    const newData = {
      [name]: value
    }
    switch (name) {
      case 'password':
        if (value && !value.match(/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%#*^?&]{6,30}$/)) {
          props.handleState({
            passwordError: true,
            passwordGood: false,
            passwordWeak: null,
            passwordBetter: null,
            passwordGreat: null,
            newPasswordActive: false
          })
        }
        else if (value && value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*^?&#])[A-Za-z\d@$!%#*^?&]{8,30}$/)) {
          props.handleState({
            passwordError: false,
            passwordGood: true,
            passwordGreat: true,
            passwordBetter: null,
            passwordWeak: null,
            newPasswordActive: true
          })
        }
        else if (value && value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%#*^?&]{8,30}$/)) {
          props.handleState({
            passwordError: false,
            passwordGood: true,
            passwordGreat: null,
            passwordBetter: true,
            passwordWeak: null,
            newPasswordActive: true
          })
        } else if (value && value.match(/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%#*^?&]{6,30}$/)) {
          props.handleState({
            passwordError: false,
            passwordGood: true,
            passwordGreat: null,
            passwordBetter: null,
            passwordWeak: true,
            newPasswordActive: true
          })
        }
        return props.handleState(newData)
      case 'newPassword':
        if (value && !value.match(/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%#*^?&]{6,30}$/)) {
          props.handleState({
            newPasswordError: true,
            newPasswordGood: false,
            newPasswordWeak: null,
            newPasswordBetter: null,
            newPasswordGreat: null,
            newPasswordConfirmActive: false
          })
        }
        else if (value && value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*^?&#])[A-Za-z\d@$!%#*^?&]{8,30}$/)) {
          props.handleState({
            newPasswordError: false,
            newPasswordGood: true,
            newPasswordGreat: true,
            newPasswordBetter: null,
            newPasswordWeak: null,
            newPasswordConfirmActive: true
          })
        }
        else if (value && value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%#*^?&]{8,30}$/)) {
          props.handleState({
            newPasswordError: false,
            newPasswordGood: true,
            newPasswordGreat: null,
            newPasswordBetter: true,
            newPasswordWeak: null,
            newPasswordConfirmActive: true
          })
        } else if (value && value.match(/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%#*^?&]{6,30}$/)) {
          props.handleState({
            newPasswordError: false,
            newPasswordGood: true,
            newPasswordGreat: null,
            newPasswordBetter: null,
            newPasswordWeak: true,
            newPasswordConfirmActive: true
          })
        }
        return props.handleState(newData)
      case 'newPasswordConfirm':
        if (value && value === props.state.newPassword) {
          props.handleState({ newPasswordConfirmGood: true })
          props.handleState({ newPasswordConfirmError: false })
        } else {
          props.handleState({ newPasswordConfirmGood: false })
          props.handleState({ newPasswordConfirmError: true })
        }
        return props.handleState(newData)
      default:
        break
    }
    // props.handleChange(newData)
  }
  return (
    <Form onSubmit={handleSubmit}>
      {props.state.passwordUpdated && <p className={`${props.state.fade}`}>password updated!
      <FontAwesomeIcon
          color="primary"
          className="ml-2"
          icon={faThumbsUp}
          size="sm"
        /></p>}
      <FormGroup>
        <Label for="password">Current password</Label>
        <Input
          autoComplete="off"
          invalid={(props.state.passwordError && props.state.passwordError !== null) || props.error}
          valid={props.state.passwordGood}
          value={props.state.password}
          onChange={handleChangeInput}
          // disabled={!props.state.usernameActive}
          type="password"
          name="password"
          id="password"
          placeholder="shhh... secret!"
        />
        {props.state.passwordError && <FormFeedback>that can't be your password</FormFeedback>}
        {(props.error && showError) && <FormFeedback>wrong details</FormFeedback>}
      </FormGroup>
      <Row form className="mt-4">

        <Col md={6} className="mt-4">
          <FormGroup>
            <Label for="newPassword">New password</Label>
            <Input
              autoComplete="off"
              invalid={props.state.newPasswordError && props.state.newPasswordError !== null}
              valid={props.state.newPasswordGood}
              value={props.state.newPassword}
              onChange={handleChangeInput}
              disabled={!props.state.newPasswordActive}
              type="password"
              name="newPassword"
              id="newPassword"
            />
            <FormFeedback>password must be at least 6 letters long and have both uppercase and lowercase letters</FormFeedback>
            {props.state.newPasswordWeak &&
              <FormFeedback style={{ top: '90%' }} valid tooltip>Yeahh that's fine but you can do better</FormFeedback>}
            {props.state.newPasswordBetter &&
              <FormFeedback style={{ top: '90%' }} valid tooltip>better, you can a sign like #,@,! etc.. to make it great!</FormFeedback>}
            {props.state.newPasswordGreat &&
              <FormFeedback style={{ top: '90%' }} valid tooltip>great man password, go ahead!</FormFeedback>}
          </FormGroup>
        </Col>
        <Col md={6} className="mt-4">
          <FormGroup>
            <Label for="newPasswordConfirm">Confirm new password</Label>
            <Input
              autoComplete="off"
              valid={props.state.newPasswordConfirmGood}
              invalid={props.state.newPasswordConfirmError && props.state.newPasswordConfirmError !== null}
              value={props.state.newPasswordConfirm}
              onChange={handleChangeInput}
              disabled={!props.state.newPasswordConfirmActive}
              type="password"
              name="newPasswordConfirm"
              id="newPasswordConfirm"
            />
            <FormFeedback style={{ top: '90%' }} tooltip>passwords don't match</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      {props.error && <p>somthing went wrong</p> }
      <Button
        style={{ background: orange }}
        size="lg"
        className="my-4"
        disabled={!props.state.passwordGood || !props.state.newPasswordGood || !props.state.newPasswordConfirmGood}
      >
        Save Changes
      </Button>

    </Form>
  )
}
