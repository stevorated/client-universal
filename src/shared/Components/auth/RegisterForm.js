import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button,
  FormText,
  Alert
} from 'reactstrap'
import { isEmail, isLength } from 'validator'
import { registerUser } from '../../Store/actions'
import { FbLogin, FadeIn } from '../../Elements'
import InputComponent from './InputComponent'





function RegisterForm({ state, handleFormState, register, errors }) {

  const {
    fname,
    lname,
    email,
    username,
    password,
    fnameGood,
    fnameError,
    lnameGood,
    lnameError,
    usernameGood,
    usernameError,
    emailGood,
    emailError,
    passwordGood,
    passwordError,
    submitError,
    submitErrorMsg,
    weak,
    better,
    great
  } = state

  const usernameErrorText = () => (<div>username must be <strong>one word </strong>
     & at least 4 letters.</div>)

  const handleReg = async e => {
    e.preventDefault()
    try {
      if (
        lnameGood &&
        fnameGood &&
        usernameGood &&
        emailGood &&
        (weak || better || great)
      ) {
        await register({
          variables: {
            fname,
            lname,
            email,
            username,
            password
          }
        })
      } else {
        handleFormState({ submitError: true })
      }
    } catch (error) {
      handleFormState({ submitError: true })
    }
  }

  const handleChangeInput = e => {
    const name = e.target.name
    const value = e.target.value
    const newData = {
      [name]: value
    }
    switch (name) {
      case 'fname':
        if (value && !isLength(value, { min: 2, max: 30 })) {
          handleFormState({ fnameError: true })
          handleFormState({ fnameGood: false })
        } else if (value && isLength(value, { min: 2, max: 30 })) {
          handleFormState({ fnameError: false })
          handleFormState({ fnameGood: true })
        }
        return handleFormState(newData)
      case 'lname':
        if (value && !isLength(value, { min: 2, max: 30 })) {
          handleFormState({ lnameError: true })
          handleFormState({ lnameGood: false })
        } else if (value && isLength(value, { min: 2, max: 30 })) {
          handleFormState({ lnameError: false })
          handleFormState({ lnameGood: true })
        }
        return handleFormState(newData)
      case 'username':
        if (value && !isLength(value, { min: 4, max: 30 })) {
          handleFormState({ usernameError: true })
          handleFormState({ usernameGood: false })
        } else if (
          errors &&
          errors.username &&
          value &&
          isLength(value, { min: 2, max: 30 })
        ) {
          handleFormState({ usernameError: false })
          handleFormState({ usernameGood: true })
        } else if (value && isLength(value, { min: 2, max: 30 })) {
          handleFormState({ usernameError: false })
          handleFormState({ usernameGood: true })
        }
        return handleFormState(newData)
      case 'email':
        if (value && !isEmail(value)) {
          handleFormState({ emailError: true })
          handleFormState({ emailGood: false })
        } else if (errors && errors.email && value && isEmail(value)) {
          handleFormState({ emailError: false })
          handleFormState({ emailGood: true })
        } else if (value && isEmail(value)) {
          handleFormState({ emailError: false })
          handleFormState({ emailGood: true })
        }
        return handleFormState(newData)
      case 'password':
        if (
          value &&
          !value.match(/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%#*^?&]{6,30}$/)
        ) {
          handleFormState({
            passwordError: true,
            passwordGood: false,
            weak: null,
            better: null,
            great: null
          })
        } else if (
          value &&
          value.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*^?&#])[A-Za-z\d@$!%#*^?&]{8,30}$/
          )
        ) {
          handleFormState({
            passwordError: false,
            passwordGood: true,
            great: true,
            better: null,
            weak: null
          })
        } else if (
          value &&
          value.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%#*^?&]{8,30}$/
          )
        ) {
          handleFormState({
            passwordError: false,
            passwordGood: true,
            great: null,
            better: true,
            weak: null
          })
        } else if (
          value &&
          value.match(/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%#*^?&]{6,30}$/)
        ) {
          handleFormState({
            passwordError: false,
            passwordGood: true,
            great: null,
            better: null,
            weak: true
          })
        }
        return handleFormState(newData)
      default:
        break
    }
  }

  return (
    <Container className="animated fadeIn mb-5 pb-5">
      <Row className="d-flex justify-content-center py-3">
        <Col xs={10}>
          <FbLogin register />
          <Form onSubmit={handleReg} method="post">
            <h6 className="mt-4 sigmar-one">- OR -</h6>
            <h1 className="sigmar-one mt-md-3 my-3 mb-md-4">
              Better get Typing..
            </h1>
            <InputComponent 
              label="first name"
              name="fname"
              id="fname-reg"
              type = 'text'
              placeholder="first name here"
              value={fname}
              error={fnameError}
              errorText="first name must be at least 2 letters long"
              handleChangeInput={handleChangeInput}
              errors={errors}
            />
            <InputComponent 
              label="last name"
              name="lname"
              id="lname-reg"
              type = 'text'
              placeholder="last name here"
              value={lname}
              error={lnameError}
              errorText="last name must be at least 2 letters long"
              handleChangeInput={handleChangeInput}
              errors={errors}
            />
            <InputComponent 
              label="username"
              name="username"
              id="username-reg"
              type = 'text'
              placeholder="username here"
              value={username}
              error={usernameError}
              errorText={usernameErrorText()}
              handleChangeInput={handleChangeInput}
              errors={errors}
            />
            <InputComponent 
              label="email"
              name="email"
              id="email-reg"
              type = 'email'
              placeholder="email here"
              value={email}
              error={emailError}
              errorText="must be a valid email address"
              handleChangeInput={handleChangeInput}
              errors={errors}
            />
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                value={password}
                onChange={handleChangeInput}
                autoComplete="off"
                type="password"
                name="password"
                id="password-reg"
                placeholder="shh.. secret.."
              />
              {passwordError && (
                <div className="mt-2 text-danger">
                  Password must have at least 6 letter including uppercase and
                  lowercase letters
                </div>
              )}
              <FadeIn show={weak || better || great}>
                <Alert
                  color={great ? 'success' : 'warning'}
                  style={{
                    fontWeight: '500',
                    fontSize: '1rem',
                    padding: '0.1rem',
                    marginBottom: '0',
                    marginTop: '.1rem'
                  }}
                  className="text-danger"
                >
                  {weak && (
                    <div>
                      <span style={{ fontWeight: '700' }}>
                        yeah, it's good enough
                      </span>{' '}
                      but you should really choose a better password, add
                      characters, maybe a number?
                    </div>
                  )}
                  {better && (
                    <div>
                      <span style={{ fontWeight: '700' }}>
                        That's much better!
                      </span>{' '}
                      you can add special characters to make it even better
                    </div>
                  )}
                  {great && (
                    <div
                      style={{
                        fontWeight: '700'
                      }}
                      className="text-capitalize mt-2 p-1"
                    >
                      great password!
                    </div>
                  )}
                </Alert>
              </FadeIn>
            </FormGroup>

            <Button className="btn-mainclr">Sign In</Button>
            <FadeIn show={submitError}>
              <p className="my-3 text-danger smallText">
                You Have Errors In your form Or Stuff missing..
              </p>
            </FadeIn>
            <p className="p-3 mt-1">
              Already Have an Acount?{' '}
              <Link
                className="sigmar-one orange-color-hover no-underline-hover"
                to="/login"
              >
                Login
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(
  mapStateToProps,
  { registerUser }
)(RegisterForm)
