import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Alert
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { orange } from '../../Utils'

export default function ChangePassword(props) {
  // console.log(props)
  const handleSubmit = e => {

    e.preventDefault()
    if (props.state.newPasswordGood && props.state.newPasswordConfirmGood) {
      props.resetPassword()
    }
  }

  const handleChangeInput = e => {
    const name = e.target.name
    const value = e.target.value
    const newData = {
      [name]: value
    }
    switch (name) {
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
      {props.state.passwordUpdated && <Alert>password updated! go to <Link to="/login">Login</Link>
        <FontAwesomeIcon
          color="primary"
          className="ml-2"
          icon={faThumbsUp}
          size="sm"
        /></Alert>}
      {(!props.state.passwordUpdated && props.state.passwordUpdated !== null) && 
      <Alert>something went wrong... try again from 
      <Link to="/login"> Login</Link>
        <FontAwesomeIcon
          color="primary"
          className="ml-2"
          icon={faThumbsDown}
          size="sm"
        />
        </Alert>}
      <Row form className="mt-4">

        <Col md={6} className="mt-4">
          <FormGroup className='mx-3'>
            <Label for="newPassword">New password</Label>
            <Input
              autoComplete="off"
              invalid={props.state.newPasswordError && props.state.newPasswordError !== null}
              valid={props.state.newPasswordGood}
              value={props.state.newPassword}
              onChange={handleChangeInput}
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
          <FormGroup className='mx-3'>
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

      <Button
        style={{ background: orange }}
        size="lg"
        className="my-4"
        disabled={!props.state.newPasswordGood || !props.state.newPasswordConfirmGood}
      >
        Save Changes
      </Button>

    </Form>
  )
}
