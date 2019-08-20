import React from 'react'
import { isLength } from 'validator'
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from 'reactstrap'
import { orange } from '../../Utils'
import { AlertComponent } from '..'

const UserSettingsForm = props => {
  // console.log(props)
  // console.log(props.state)
  const { handleState, handleChange, errors } = props
  const {
    fnameGood,
    lnameGood,
    usernameGood,
    bioGood,
    fname,
    lname,
    username,
    bio,
    changed
  } = props.state

  const setHideMessage = val => {
    handleState({ changed: !val })
  }

  const handleSubmit = e => {
    e.preventDefault()
    // console.log(fnameGood, lnameGood, usernameGood)
    let variables = {}
    if (fnameGood) {
      variables.fname = fname
    }
    if (lnameGood) {
      variables.lname = lname
    }
    if (usernameGood) {
      variables.username = username
    }

    if (bioGood) {
      variables.bio = bio
    }

    if (fnameGood || lnameGood || usernameGood || bioGood) {
      // console.log({ variables })
      props.updateMyProfile({ variables })
      props.handleState({
        fnameGood: false,
        lnameGood: false,
        usernameGood: false,
        fnameActive: false,
        lnameActive: false,
        usernameActive: false,
        bioGood: false,
        bioActive: false,
        changed: true
      })
    }
  }
  const handleChangeInput = e => {
    props.handleState({ changed: false })
    const name = e.target.name
    const value = e.target.value
    const newData = {
      [name]: value
    }
    switch (name) {
      case 'fname':
        if (value && !isLength(value, { min: 2, max: 30 })) {
          handleState({ fnameError: true })
          handleState({ fnameGood: false })
        } else if (value && isLength(value, { min: 2, max: 30 })) {
          handleState({ fnameError: false })
          handleState({ fnameGood: true })
        }
        return handleChange(newData)
      case 'lname':
        if (value && !isLength(value, { min: 2, max: 30 })) {
          handleState({ lnameError: true })
          handleState({ lnameGood: false })
        } else if (value && isLength(value, { min: 2, max: 30 })) {
          handleState({ lnameError: false })
          handleState({ lnameGood: true })
        }
        return handleChange(newData)
      case 'username':
        if (value && !isLength(value, { min: 4, max: 30 })) {
          handleState({ usernameError: true })
          handleState({ usernameGood: false })
        } else if (
          errors &&
          errors.username &&
          value &&
          isLength(value, { min: 2, max: 30 })
        ) {
          // setShowUsernameError(false)
          handleState({ usernameError: false })
          handleState({ usernameGood: true })
        } else if (value && isLength(value, { min: 2, max: 30 })) {
          handleState({ usernameError: false })
          handleState({ usernameGood: true })
        }
        return handleChange(newData)

      case 'bio':
        if (value !== undefined && !isLength(value, { min: 1, max: 100 })) {
          handleState({ bioError: true })
          handleState({ bioGood: false })
        } else if (value && isLength(value, { min: 1, max: 100 })) {
          handleState({ bioError: false })
          handleState({ bioGood: true })
        }
        return handleChange(newData)
      default:
        break
    }
    // props.handleChange(newData)
  }
  return (
    <Form onSubmit={handleSubmit}>
      {changed && (
        <AlertComponent
          alertText="details changed"
          setHideMessage={setHideMessage}
        />
      )}
      <Row form>
        <Col md={6}>
          <FormGroup onClick={() => handleState({ fnameActive: true })}>
            <Label for="fname">First Name</Label>
            <Input
              autoComplete="off"
              invalid={
                props.state.fnameError !== null && props.state.fnameError
              }
              value={props.state.fname}
              onChange={handleChangeInput}
              disabled={!props.state.fnameActive}
              type="text"
              name="fname"
              id="fname"
            />
            <FormFeedback>first name must have at least 2 letters</FormFeedback>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup onClick={() => handleState({ lnameActive: true })}>
            <Label for="lname">Last Name</Label>
            <Input
              autoComplete="off"
              invalid={
                props.state.lnameError !== null && props.state.lnameError
              }
              value={props.state.lname}
              onChange={handleChangeInput}
              disabled={!props.state.lnameActive}
              type="text"
              name="lname"
              id="lname"
            />
            <FormFeedback>last name must have at least 2 letters</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup onClick={() => handleState({ usernameActive: true })}>
        <Label for="username">Username</Label>
        <Input
          autoComplete="off"
          invalid={
            props.state.usernameError !== null && props.state.usernameError
          }
          value={props.state.username}
          onChange={handleChangeInput}
          disabled={!props.state.usernameActive}
          type="text"
          name="username"
          id="username"
        />
        <FormFeedback>
          username must have at least 4 letters and unique
        </FormFeedback>
      </FormGroup>
      <FormGroup onClick={() => handleState({ bioActive: true })}>
        <Label for="bio">Something about yourself</Label>
        <Input
          autoComplete="off"
          invalid={props.state.bioError !== null && props.state.bioError}
          value={props.state.bio}
          onChange={handleChangeInput}
          disabled={!props.state.bioActive}
          type="textarea"
          name="bio"
          id="bio"
        />
        <FormFeedback>
          You have to write somthing, you know.. ahh and also don't over do it,
          100 letters max
        </FormFeedback>
      </FormGroup>
      <Button
        style={{ background: orange }}
        size="lg"
        className="my-4"
        disabled={!fnameGood && !lnameGood && !usernameGood && !bioGood}
      >
        Save Changes
      </Button>
    </Form>
  )
}

export default UserSettingsForm
