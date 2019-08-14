import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Form, FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap'
import styled from 'styled-components'


import { mediaQueries } from '../../Utils'
import { FbLogin } from '../../Elements'
import { Loading } from '../'
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
    formError,
    formInvalid
  } = props.state
  return (
    <Container className="animated fadeIn">
      <Row className="d-flex justify-content-center py-3">
        <Col xs={10}>
          <FbLogin />
          <Form
            onSubmit={props.handleLogin}
          >
            <h6 className="mt-4 sigmar-one">- OR -</h6>
            <h1 className="sigmar-one mt-md-3 my-3 mb-md-4">Better get Typing..</h1>
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
              {
                formError &&
                <p style={{fontWeight: '900', fontSize: '1rem'}} className="text-danger mt-1">Wrong Details!</p>
              }
              {
                formInvalid && 
                <p  className='mt-1'>This can't really be it, check what you typed again plz</p>
              }
            </FormGroup>
            <Button className="btn-mainclr mt-lg-2">Sign In</Button>
            <p className="pt-3 mt-3 text-capitalize">Don't Have an Acount yet?<br />no worries.. it's easy just click here to<Link className="sigmar-one orange-color-hover no-underline-hover" to="/register"> Register</Link></p>
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