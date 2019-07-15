import React, {useState} from 'react'
import { Form, FormGroup, Input, Button } from 'reactstrap'
import { isAlphanumeric, isLength } from 'validator'
import styled from 'styled-components'
import { Card, FlatCard } from '../../Elements'
export default function AddCommentForm({openForm, state, setFormState, createComment, id, errors}) {

  const [localState, setLocalstate] = useState({render: false})

  const handleSubmit = (e) => {
    e.preventDefault()
    if(isLength(state.body,{min:2, max: 500})) {
      setFormState({formGood:true})
      setFormState({retry :true})
      createComment({variables:{
        body: state.body,
        post: id
      }})
      setFormState({body: ''})
    }
    setLocalstate({render:true})
    // openForm()
  }

  const handleOnChange = (e) => {
    setFormState({retry :false})
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
        <Button size="sm" className="btn-mainclr ml-auto mr-4">share</Button>
        </div>
    </form>
  
  )
}