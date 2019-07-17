import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Form, FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap'
import forceLoggedIn from '../../HOC/forceLoggedIn'
import { Link } from 'react-router-dom'

function LoginForm(props) {
  const {
    email,
    emailValid,
    emailInvalid,
    password,
    passwordValid,
    passwordInvalid,
    formError
  } = props.state
  return (
    <Container className="animated fadeIn">
      <Row className="d-flex justify-content-center py-5">
        <Col xs={10}>
          <Form
            onSubmit={props.handleLogin}
            
          >
            <h1 className="display-4 sigmar-one mb-5 mt-2">Login</h1>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                value={email}
                valid={emailValid}
                invalid={emailInvalid}
                type="email"
                name="email"
                id="email"
                placeholder="your email please"
                onChange={props.handleChangeInput}
                onPaste={props.handleChangeInput}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                value={password}
                valid={passwordValid}
                invalid={passwordInvalid || formError}
                onChange={props.handleChangeInput}
                onPaste={props.handleChangeInput}
                autoComplete="off"
                type="password"
                name="password"
                id="password"
                placeholder="shh.. secret.."
              />
              {formError && <FormFeedback className="mt-3"><strong>Wrong Details</strong></FormFeedback>}
            </FormGroup>
            <Button>Sign In</Button>
            <p className="pt-3 mt-3">Don't Have an Acount?<br/> <Link className="sigmar-one orange-color-hover no-underline-hover" to="/register"> Register</Link></p>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

function mapStateToProps({ auth }) {
  return { auth }
}
export default connect(mapStateToProps)(forceLoggedIn(LoginForm))