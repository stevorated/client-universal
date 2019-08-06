import React from 'react'
import { FormGroup, Input, Button } from 'reactstrap'
import { isLength } from 'validator'

export default function AddCommentForm(props) {
  const { state, setFormState, createComment, id } = props

  const handleSubmit = e => {
    e.preventDefault()
    if (isLength(state.body, { min: 2, max: 500 })) {
      setFormState({ formGood: true })
      setFormState({ retry: true })
      createComment({
        variables: {
          body: state.body,
          post: id
        }
      })
      setFormState({ body: '' })
    }
  }

  const handleOnChange = e => {
    setFormState({ retry: false })
    const value = e.target.value
    const name = e.target.name
    const newData = {
      [name]: value
    }
    setFormState(newData)
  }
  return (
    <form onSubmit={handleSubmit}>
      <FormGroup className="px-4">
        <Input
          className="px-4 m-auto"
          type="textarea"
          name="body"
          id="body_comment_add"
          rows="1"
          value={state.body}
          onChange={handleOnChange}
        />
      </FormGroup>

      <div className="d-flex mb-1">
        <Button size="sm" className="btn-mainclr ml-auto mr-4">
          share
        </Button>
      </div>
    </form>
  )
}
