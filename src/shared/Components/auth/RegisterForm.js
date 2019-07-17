import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Form, FormGroup, Label, Input, FormFeedback, Button, FormText } from 'reactstrap'
import { isEmail, isLength } from 'validator'
import { registerUser } from '../../Store/actions'


function RegisterForm ({state, handleFormState, register, errors}) {
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
    submitErrorMsg
  } = state
  const handleReg = async (e) => {
    e.preventDefault()
    try {
      if(lnameGood && fnameGood && usernameGood && emailGood && passwordGood) {
        const res = await register({variables:{
          fname, 
          lname, 
          email, 
          username, 
          password
        }})
      } else {
        handleFormState({ submitError: true })
      }
    } catch (error) {
        handleFormState({ submitError: true })
    }
  } 
  const handleChangeInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    const newData = {
      [name]: value
    }
    switch (name) {
      case 'fname':
        
        if(value && !isLength(value, {min:2, max: 30})) {
          handleFormState({fnameError:true})
          handleFormState({fnameGood: false})
        } else if (value && isLength(value, {min:2, max: 30})) {
          handleFormState({fnameError: false})
          handleFormState({fnameGood: true})
        }

        return handleFormState(newData)

      case 'lname':
        if(value && !isLength(value, {min:2, max: 30})) {
          handleFormState({lnameError: true})
          handleFormState({lnameGood: false})
        } else if (value && isLength(value, {min:2, max: 30})) {
          handleFormState({lnameError: false})
          handleFormState({lnameGood: true})
        }
        return handleFormState(newData)
      case 'username':
          if(value && !isLength(value, {min:4, max: 30})) {
            handleFormState({usernameError: true})
            handleFormState({usernameGood: false})
          } else if (value && isLength(value, {min:2, max: 30})) {
            handleFormState({usernameError: false})
            handleFormState({usernameGood: true})
          }
        return handleFormState(newData)
      case 'email':
        if(value && !isEmail(value)){
          handleFormState({emailError: true})
          handleFormState({emailGood: false})
        } else if(value && isEmail(value) ) {
          handleFormState({emailError: false})
          handleFormState({emailGood: true})
        }
        return handleFormState(newData)
      case 'password':
          if(value && !value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*^?&#])[A-Za-z\d@$!%#*^?&]{8,30}$/)) {
            handleFormState({passwordError: true})
            handleFormState({passwordGood: false})
          } else if (value && value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*^?&#])[A-Za-z\d@$!%#*^?&]{8,30}$/)) {
            handleFormState({passwordError: false})
            handleFormState({passwordGood: true})
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
        <Form 
        onSubmit={handleReg}
        
        method="post">
          <h1 className="sigmar-one mt-md-3 mb-1 mb-md-4">Register</h1>
          {submitError && <FormText className="my-3 text-danger">You Have Errors In your form Or Stuff missing..</FormText>}
          <FormGroup>
            <Label for="fname-reg">first name</Label>
            <Input
            autoComplete="off"
            valid={fnameGood}
            invalid={fnameError || (!!errors && !!errors.fname)}
            type="text"
            name="fname"
            id="fname-reg"
            placeholder="first name please"
            onChange={handleChangeInput}
            value={fname}
            />
            {fnameError && <FormFeedback>first name must be at least 2 letters long</FormFeedback>}
            {errors && (errors.fname && <FormFeedback>{errors.fname.message}</FormFeedback>)}
          </FormGroup>
          <FormGroup>
            <Label for="lname-reg">last name</Label>
            <Input
            autoComplete="off"
            valid={lnameGood}
            invalid={lnameError|| (!!errors && !!errors.lname)}
            type="text"
            name="lname"
            id="lname-reg"
            placeholder="last name please"
            onChange={handleChangeInput}
            value={lname}
            />
            {lnameError && <FormFeedback>last name must be at least 2 letters long</FormFeedback>}
            {errors && (errors.lname && <FormFeedback>{errors.lname.message}</FormFeedback>)}
          </FormGroup>
          <FormGroup>
            <Label for="username">username</Label>
            <Input
            autoComplete="off"
            valid={usernameGood}
            invalid={usernameError || (!!errors && !!errors.username)}
            type="text"
            name="username"
            id="username-reg"
            placeholder="username please"
            onChange={handleChangeInput}
            value={username}
            />
            {usernameError && <FormFeedback>username must be <strong>one word</strong> & at least 4 letters long</FormFeedback>}
            {errors && (errors.username && <FormFeedback>{errors.username.message}</FormFeedback>)}
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
            autoComplete="off"
            valid={emailGood}
            invalid={emailError || (!!errors && !!errors.email)}
            type="email"
            name="email"
            id="email-reg"
            placeholder="your email please"
            onChange={handleChangeInput}
            value={email}
            />
            {emailError && <FormFeedback>email must be a valid email address</FormFeedback>}
            {errors && (errors.email && <FormFeedback>{errors.email.message}</FormFeedback>)}
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
            value={password}
            onChange={handleChangeInput}
            autoComplete="off"
            valid={passwordGood}
            invalid={passwordError|| (!!errors && !!errors.password)} 
            type="password" 
            name="password" 
            id="password-reg" 
            placeholder="shh.. secret.." 
            />
            {passwordError && <FormFeedback>password must be between 8 and 30 characters long<br/>& must contain at least one uppercase letter, one lowercase letter, one number and one special character</FormFeedback>}
            {errors && (errors.password && <FormFeedback>{errors.password.message}</FormFeedback>)}
          </FormGroup>
          {submitError && <FormText className="my-3 text-danger">You Have Errors In your form Or Stuff missing..</FormText>}
          <Button>Sign In</Button>
          <p className="pt-3">Already Have an Acount? <Link className="sigmar-one orange-color-hover no-underline-hover" to="/login">Login</Link></p>
          
        </Form>
      </Col>
    </Row>
  </Container>
  )
}

function mapStateToProps({auth}){
 return { auth }
}
export default connect(mapStateToProps, { registerUser })(RegisterForm)