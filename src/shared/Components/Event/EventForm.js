import React, { useState, Component } from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import FileInput from '../Fragment/FileInput'
import { isLength } from 'validator'
import styled from 'styled-components'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { orange } from '../../Utils';


// const [ date, setDate ] = useState(false)
function EventForm(props) {

  const [valid, setValid] = useState(false)

  const toggleAddBands = () => {
    props.handleFormState({addBands: !props.state.addBands})
  }

  const handleSetValid = (data) => {
    setValid(data)
    props.handleFormState({ imageValid: data })
  }

  const handleSetFile = (data) => {
    setValid(data)
    props.handleFormState({ imageData: data })
  }

  const handleCheckbox = (e) => {
    const name = e.target.name
    const value = e.target.checked
    const newData = {
      [name]: value
    }
    return props.handleFormState(newData)
  }

  const handleChangeInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    const newData = {
      [name]: value
    }
    const lengthTest = (min, max) => isLength(value, { min, max })
    switch (name) {
      case 'name':
        if (lengthTest(5,60)) {
          props.handleFormState({ nameValid: true })
        } else {
          props.handleFormState({ nameValid: false })
        }
        break
      case 'venue':
        if (lengthTest(4,60)) {
          props.handleFormState({ venueValid: true })
        } else {
          props.handleFormState({ venueValid: false })
        }
        break
      case 'address':
        if (lengthTest(4,60)) {
          
          props.handleFormState({ addressValid: true })
        } else {
          props.handleFormState({ addressValid: false })
        }
        break
      case 'description':
        if (lengthTest(4,1000)) {
          props.handleFormState({ descriptionValid: true })
        } else {
          props.handleFormState({ descriptionValid: false })
        }
        break
      case 'startDate':
        if (lengthTest(1,15)) {
          props.handleFormState({ addressValid: true })
        } else {
          props.handleFormState({ addressValid: false })
        }
        break;
      case 'startTime':
        if (lengthTest(1,15)) {
          props.handleFormState({ addressValid: true })
        } else {
          props.handleFormState({ addressValid: false })
        }
        break

      default:
        break
    }
    return props.handleFormState(newData)
  }

  return (
    <div className="mb-3">
      <FormGroup className="d-flex justify-content-between">
        <Label className="mr-5" for="event_image">Event Image</Label>
        <div className="mr-auto" >
          <FileInput className=""
            {...props}
            uploadType="eventImage"
            round={false}
            height={110}
            width={170}
            valid={valid}
            invalid={props.state.imageValid !== null && !props.state.imageValid}
            setValid={handleSetValid}
            setFileData={handleSetFile}
            showText={false}
          />
          <FormFeedback>Venue must be ...</FormFeedback>
          {props.state.imageValid !== null && !props.state.imageValid && <p>load image please</p>}
        </div>
      </FormGroup>
      <FormGroup>
        <Label for="event_name">Event Name</Label>
        <Input type="text" name="name" id="event_name" placeholder="event name, a in a few words, be wise..."
          value={props.state.name}
          onChange={handleChangeInput}
          invalid={props.state.nameValid !== null && !props.state.nameValid}
          autoComplete="off"
        />
        <FormFeedback>Name must be between 10 and 60 letters</FormFeedback>
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="event_venue">Location</Label>
            <Input type="text" name="venue" id="event_venue" placeholder="where?"
              value={props.state.venue}
              onChange={handleChangeInput}
              invalid={props.state.venueValid !== null && !props.state.venueValid}
              autoComplete="off"
            />
            <FormFeedback>Venue must be between 4 and 60 letters</FormFeedback>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="event_address">Venue Address</Label>
            <Input type="text" name="address" id="event_address" placeholder="Venue Address.."
              value={props.state.address}
              onChange={handleChangeInput}
              invalid={props.state.addressValid !== null && !props.state.addressValid}
              autoComplete="off"
            />
            <FormFeedback>Address must be between 4 and 60 letters</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="event_desc">Description</Label>
        <Input type="textarea" name="description" id="event_desc" placeholder="Say Something 'bout the event"
          value={props.state.desc}
          onChange={handleChangeInput}
          invalid={props.state.descriptionValid !== null && !props.state.descriptionValid}
        />
        <FormFeedback>Description must be between 4 and 1,000(!) letters</FormFeedback>
      </FormGroup>
      <Row>
        <Col md={5}>
          <FormGroup>
            <Label for="event_startDate">date</Label>
            <Input type="date" name="startDate" id="event_startDate"
              min={props.today}
              value={props.state.startDate}
              onChange={handleChangeInput}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="event_startTime">time</Label>
            <Input type="time" name="startTime" id="event_startTime"
              value={props.state.startTime}
              onChange={handleChangeInput}
              step="1800"
              />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <div>+ End Time? (Not available yet, Comming Soon!)</div>
          </FormGroup>
        </Col>
      </Row>
      <FontAwesomeIcon color={orange} icon={faPlusCircle} size="lg" onClick={toggleAddBands} /> 
        { !props.state.addBands ? <span className="ml-2 mt-3">add bands</span> : <span className="ml-2 mt-3">or not?...</span> }
      <Row form>
        {props.state.addBands && (
        <>
        <Col className="animated slideInRight mt-3" md={4}>
          <FormGroup>
            <Label for="band1">Band 1</Label>
            <Input type="text" name="band1" id="band1"
              value={props.state.band1}
              onChange={handleChangeInput} />
          </FormGroup>
        </Col>
        <Col className="animated slideInUp mt-3" md={4}>
          <FormGroup>
            <Label for="band2">Band 2</Label>
            <Input type="text" name="band2" id="band2"
              value={props.state.band2}
              onChange={handleChangeInput} />
          </FormGroup>
        </Col>
        <Col className="animated slideInLeft mt-3" md={4}>
          <FormGroup>
            <Label for="band3">Band 3</Label>
            <Input type="text" name="band3" id="band3"
              value={props.state.band3}
              onChange={handleChangeInput} />
          </FormGroup>
        </Col></>)}
      </Row>
      {/* <Row form >
        <Col md={4}>
          <FormGroup check>
            <Input type="checkbox" name="status1" id="status1"
              value={props.state.status1}
              onChange={handleCheckbox}
            />
            <Label for="status1" check>Public event</Label>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup check>
            <Input type="checkbox" name="status2" id="status2"
              value={props.state.status2}
              onChange={handleCheckbox}
            />
            <Label for="status2" check>Public event</Label>
          </FormGroup>
        </Col>
      </Row> */}
    </div>
  )
}

export default EventForm

// <DateRangePicker
//   startDate={state.startDate} // momentPropTypes.momentObj or null,
//   startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
//   endDate={state.endDate} // momentPropTypes.momentObj or null,
//   endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
//   onDatesChange={({ startDate, endDate }) => setState({ startDate, endDate })} // PropTypes.func.isRequired,
//   focusedInput={state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
//   onFocusChange={focusedInput => setState({ focusedInput })} // PropTypes.func.isRequired,
//   small={true}
// />
