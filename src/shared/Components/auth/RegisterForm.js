import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'reactstrap'

import { registerUser } from '../../Store/actions'
import { FbLogin, FadeIn } from '../../Elements'
import { handleChangeInput } from '../../Utils'
import InputComponent from './InputComponent'
import PasswordStrength from './PasswordStrength'

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
    passwordError,
    submitError,
    weak,
    better,
    great
  } = state

  const usernameErrorText = () => (
    <div>
      username must be <strong>one word </strong>& at least 4 letters.
    </div>
  )

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

  const handleChange = e => handleChangeInput(e, handleFormState)

  return (
    <Container className="animated fadeIn mb-5 pb-5">
      <Row className="d-flex justify-content-center py-3">
        <Col xs={10}>
          <FbLogin register />
          <Form onSubmit={handleReg} method="post" className="mt-4">
            <h6 className="mt-4 mb-3 sigmar-one">- OR -</h6>
            <h1 className="sigmar-one mt-md-3 my-3 mb-md-4">Register</h1>
            <InputComponent
              label="first name"
              name="fname"
              id="fname-reg"
              type="text"
              placeholder="first name here"
              value={fname}
              error={fnameError}
              errorText="first name must be at least 2 letters long"
              handleChangeInput={handleChange}
              errors={errors}
            />
            <InputComponent
              label="last name"
              name="lname"
              id="lname-reg"
              type="text"
              placeholder="last name here"
              value={lname}
              error={lnameError}
              errorText="last name must be at least 2 letters long"
              handleChangeInput={handleChange}
              errors={errors}
            />
            <InputComponent
              label="username"
              name="username"
              id="username-reg"
              type="text"
              placeholder="username here"
              value={username}
              error={usernameError}
              errorText={usernameErrorText()}
              handleChangeInput={handleChange}
              errors={errors}
            />
            <InputComponent
              label="email"
              name="email"
              id="email-reg"
              type="email"
              placeholder="email here"
              value={email}
              error={emailError}
              errorText="must be a valid email address"
              handleChangeInput={handleChange}
              errors={errors}
            />
            <InputComponent
              label="password"
              name="password"
              id="password-reg"
              type="password"
              placeholder="password here"
              value={password}
              error={passwordError}
              errorText="Password must have at least 6 letter including uppercase and lowercase letters"
              handleChangeInput={handleChange}
              errors={errors}
            />
            <PasswordStrength weak={weak} better={better} great={great} />
            <Button className="btn-mainclr">Join</Button>
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
export default RegisterForm
