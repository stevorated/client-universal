import React, { useState } from 'react'
import {
  Container, Col, Row, Input, Card, CardSubtitle, Button, CardBody, Form, FormFeedback
} from 'reactstrap'
import { isLength } from 'validator'
import {
  elevation,
  transition,
  orange
} from '../../Utils'

import styled from 'styled-components'

export default function PostForm({id, errors, state, setFormState, createPost}) {
  const [ showError, setShowError ] = useState(null)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(isLength(state.body,{min:2, max: 500})) {
      createPost({variables:{
        body: state.body,
      }})
      setFormState({body: ''})
      setShowError(false)
      
    } else {
      setShowError(true)
    }
    // openForm()
  }

  const handleOnChange = (e) => {
    // setShowError(false)
    setFormState({retry :false})
    const value = e.target.value
    const name = e.target.name
    const newData = {
      [name]: value
    }
    setFormState(newData)
  }
  return (
    <Container fluid>
      <StyledCard>
        <CardBody>
        <CardSubtitle className="mb-1">Share Your Wisdom</CardSubtitle>
          <Form onSubmit={handleSubmit}>
            
            <StyledInput 
            id="post_form_input"
            value={state.body}
            invalid={showError}
            onChange={handleOnChange}
            className="mb-2" 
            type="textarea" 
            name="body" 
            id="Post_add_body" 
            rows="2"
            />
            <FormFeedback tooltip placement="left" targe="post_form_input">Wisdom must be between 2 and 500 lettes long</FormFeedback>
            <div className="d-flex">
              <Button size="sm" className="btn-mainclr px-4 m-auto px-2">Post</Button>
            </div>
          </Form>
        </CardBody>
      </StyledCard>
    </Container>
  )
}


const StyledCard = styled(Card)`
${elevation[3]};
background: whitesmoke;
opacity: .9;
margin-top: .6rem;
margin-bottom: 1rem;
${transition({
            property: 'box-shadow'
      })};
&:hover {
      ${elevation[4]};
}
&:active, &:focus {
  border-color: ${orange};
  outline-color: ${orange};
}
` 

const StyledInput = styled(Input)`
background: whitesmoke;
opacity: .8;
`