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
import { orange, red, arsenic, lightOrange } from '../../Utils'

function RegisterForm({ state, handleFormState, register, errors }) {
  const [showEmailError, setShowEmailError] = useState(true)
  const [showUsernameError, setShowUsernameError] = useState(true)
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

  const handleReg = async e => {
    e.preventDefault()
    try {
      if (lnameGood && fnameGood && usernameGood && emailGood && passwordGood) {
        const res = await register({
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
          setShowUsernameError(false)
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
          setShowEmailError(false)
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
            <FormGroup>
              <Label for="fname-reg">first name</Label>
              <Input
                autoComplete="off"
                // valid={fnameGood}
                // invalid={fnameError || (!!errors && !!errors.fname)}
                type="text"
                name="fname"
                id="fname-reg"
                placeholder="first name please"
                onChange={handleChangeInput}
                value={fname}
              />
              <FadeIn show={fnameError}>
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
                  first name must be at least 2 letters long
                </Alert>
              </FadeIn>
              <FadeIn show={errors !== undefined}>
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
                  errors
                  {/* {errors.fname.message} */}
                </Alert>
              </FadeIn>
            </FormGroup>
            <FormGroup>
              <Label for="lname-reg">last name</Label>
              <Input
                autoComplete="off"
                // valid={lnameGood}
                // invalid={lnameError || (!!errors && !!errors.lname)}
                type="text"
                name="lname"
                id="lname-reg"
                placeholder="last name please"
                onChange={handleChangeInput}
                value={lname}
              />

              <FadeIn show={lnameError}>
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
                  last name must be at least 2 letters long
                </Alert>
              </FadeIn>
              <FadeIn show={errors !== undefined}>
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
                  errors
                  {/* {errors.fname.message} */}
                </Alert>
              </FadeIn>
            </FormGroup>
            <FormGroup>
              <Label for="username">username</Label>
              <Input
                autoComplete="off"
                // valid={usernameGood}
                // invalid={usernameError || (!!errors && !!errors.username)}
                type="text"
                name="username"
                id="username-reg"
                placeholder="username please"
                onChange={handleChangeInput}
                value={username}
              />
              <FadeIn show={usernameError}>
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
                  username must be <strong>one word</strong>
                  <br /> & at least 4 letters long
                </Alert>
              </FadeIn>
              <FadeIn show={errors !== undefined}>
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
                  errors
                  {/* {errors.fname.message} */}
                </Alert>
              </FadeIn>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                autoComplete="off"
                // valid={emailGood}
                // invalid={emailError || (!!errors && !!errors.email)}
                type="email"
                name="email"
                id="email-reg"
                placeholder="your email please"
                onChange={handleChangeInput}
                value={email}
              />
              <FadeIn show={emailError}>
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
                  email must be a valid email address
                </Alert>
              </FadeIn>
              <FadeIn show={errors !== undefined}>
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
                  errors
                  {/* {errors.fname.message} */}
                </Alert>
              </FadeIn>
              {/* {emailError && (
                <FormFeedback></FormFeedback>
              )}
              {errors &&
                showEmailError &&
                (errors.email && (
                  <FormFeedback>{errors.email.message}</FormFeedback>
                ))} */}
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                value={password}
                onChange={handleChangeInput}
                autoComplete="off"
                // valid={passwordGood}
                // invalid={passwordError || (!!errors && !!errors.password)}
                type="password"
                name="password"
                id="password-reg"
                placeholder="shh.. secret.."
              />
              <FadeIn show={weak}>
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
                  <span style={{ fontWeight: '700' }}>
                    yeah, it's good enough
                  </span>{' '}
                  but you should really choose a better password, add
                  characters, maybe a number?
                </Alert>
              </FadeIn>
              <FadeIn show={better}>
                <Alert
                  color="success"
                  style={{
                    fontWeight: '500',
                    fontSize: '1rem',
                    padding: '0.1rem',
                    marginBottom: '0',
                    marginTop: '.1rem'
                  }}
                  className="text-danger"
                >
                  <span style={{ fontWeight: '700' }}>
                    That's much better!
                  </span>{' '}
                  you can add special characters to make it even better
                </Alert>
              </FadeIn>
              <FadeIn show={great}>
                <p
                  style={{
                    fontWeight: '700',
                    border: '1px solid black',
                    background: lightOrange
                  }}
                  className="text-capitalize mt-2 p-1"
                >
                  <span style={{ fontWeight: '900', fontSize: '1.5rem' }}>
                    Wow!
                  </span>
                  <br /> now that's what i call a great password! <br />{' '}
                  <span style={{ fontSize: '1.3rem' }}>Go ahead tiger</span>
                </p>
              </FadeIn>
              <FadeIn show={passwordError}>
                <p>
                  password must be between 6 and 30 characters long
                  <br />& must contain at least one uppercase letter.
                </p>
              </FadeIn>
              {passwordError && (
                <FormFeedback>
                  password must be between 6 and 30 characters long
                  <br />& must contain at least one uppercase letter.
                </FormFeedback>
              )}
              {errors &&
                (errors.password && (
                  <FormFeedback>{errors.password.message}</FormFeedback>
                ))}
            </FormGroup>
            {submitError && (
              <p className="my-3 text-danger smallText">
                You Have Errors In your form Or Stuff missing..
              </p>
            )}
            <Button className="btn-mainclr">Sign In</Button>
            <p className="pt-3">
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
