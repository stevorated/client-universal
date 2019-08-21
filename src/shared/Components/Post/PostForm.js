import React, { useState } from 'react'
import { CSSTransition, Transition } from 'react-transition-group'
import {
  Container,
  Col,
  Row,
  Input,
  Card,
  CardSubtitle,
  Button,
  CardBody,
  Form,
  FormFeedback,
  FormGroup
} from 'reactstrap'
import { isLength } from 'validator'
import { elevation, transition, orange } from '../../Utils'
import { FadeIn } from '../../Elements'

import styled from 'styled-components'

export default function PostForm(props) {
  const { state, setFormState, createPost } = props
  const [showError, setShowError] = useState(null)
  const duration = 300

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0
  }
  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
  }
  const handleSubmit = e => {
    e.preventDefault()

    if (isLength(state.body, { min: 2, max: 500 })) {
      createPost({
        variables: {
          body: state.body
        }
      })
      setFormState({ body: '' })
      setShowError(false)
    } else {
      setShowError(true)
    }
    // openForm()
  }

  const handleOnChange = e => {
    setShowError(false)
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
            <FormGroup style={{ position: 'relative' }}>
              <StyledInput
                data-test="postFormInput"
                id="post_form_input"
                value={state.body}
                // invalid={showError}
                onChange={handleOnChange}
                className="mb-2"
                type="textarea"
                name="body"
                id="Post_add_body"
                rows="2"
              />
              <FadeIn show={showError}>
                <p
                  data-test="postFormError"
                  style={{
                    // display: !showError ? 'none' : 'block',

                    position: 'absolute',
                    top: '30%',
                    left: '0',
                    background: 'red',
                    color: 'white',
                    fontWeight: '600',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    boxShadow:
                      '3px 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)'
                  }}
                >
                  Wisdom must be between 2 and 500 lettes long
                </p>
              </FadeIn>
              <div className="d-flex">
                <Button
                  data-test="postBtn"
                  size="sm"
                  className="btn-mainclr px-4 m-auto px-2"
                >
                  Post
                </Button>
              </div>
            </FormGroup>
          </Form>
        </CardBody>
      </StyledCard>
    </Container>
  )
}

const StyledCard = styled(Card)`
  ${elevation[3]};
  background: whitesmoke;
  opacity: 0.9;
  margin-top: 0.6rem;
  margin-bottom: 1rem;
  ${transition({
    property: 'box-shadow'
  })};
  &:hover {
    ${elevation[4]};
  }
  &:active,
  &:focus {
    border-color: ${orange};
    outline-color: ${orange};
  }
`

const StyledInput = styled(Input)`
  background: whitesmoke;
  opacity: 0.8;
`
