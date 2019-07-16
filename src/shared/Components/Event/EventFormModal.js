import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { black, orange, elevation, white } from '../../Utils'
import EventForm from './EventForm'
import moment from 'moment'
import { RoundButton, SquareButton } from '../../Elements'

class EventFormModal extends Component {
  constructor(props) {
    super(props)
    this.today = moment().format('YYYY-MM-DD')
    this.state = {
      sent: 0,
      modal: false,
      name: '',
      nameValid: null,
      startDate: moment().format('YYYY-MM-DD'),
      startTime: moment().format('HH:mm'),
      venue: '',
      venueValid: null,
      address: '',
      addressValid: null,
      description: '',
      descriptionValid: '',
      band1: '',
      band2: '',
      band3: '',
      status1: false,
      status2: false,
      imageValid: false,
      imageData: {}
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  handleFormState = (data) => {
    this.setState(data)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { 
      fbId,
      name,
      nameValid,
      description,
      imageData,
      venue,
      venueValid,
      address,
      addressValid,
      band1,
      band2,
      band3,
      startDate,
      startTime,
      endDate,
      endTime
     } = this.state

    if(!nameValid) return this.setState({nameValid: false})
    if(!venueValid) return this.setState({venueValid: false})
    if(!addressValid) return this.setState({addressValid: false})

    this.props.createEvent({variables: {
      fbId,
      name,
      description,
      image: imageData,
      venue,
      address,
      artists: [band1, band2, band3],
      startDate,
      startTime,
      endDate,
      endTime
    }})
    this.setState({modal:false})
  }

  modalBtn = this.props.round ? (
    <RoundButton 
    className="animated flipInX btn-mainclr"  
    size={this.props.buttonSize} 
    onClick={this.toggle}>
      <StyledIconRound size={this.props.iconSize} icon={faPlus} />
    </RoundButton>
  ) : (
    <SquareButton 
    className={`animated flipInX btn-mainclr ${this.props.className}`}  
    size={this.props.buttonSize}
    onClick={this.toggle} 
    text={this.props.buttonLabel}>
      {this.props.buttonLabel}<StyledIcon size={this.props.iconSize} icon={faPlus} />
    </SquareButton>
    )

  render() {
    const { buttonLabel, buttonSize, iconSize , icon, className, round } = this.props
    return (
      <div className="">
        { 
          this.modalBtn
        }
        <Modal returnFocusAfterClose={false} isOpen={this.state.modal} toggle={this.toggle} className={className}>
          <ModalHeader className="sigmar-one" toggle={this.toggle}>
            {buttonLabel}          
          </ModalHeader>
          <Form className="small-text" onSubmit={this.handleSubmit}>
          <ModalBody style={{'maxHeight': 'calc(100vh - 180px)', 'overflowY': 'auto'}}>
            <EventForm
            Type="create" 
            toggle={this.toggle} 
            state={this.state}
            handleFormState={this.handleFormState} 
            setState={this.setState}
            today={this.today}
            />
            </ModalBody>
            <div className="d-flex">
              <Button className="m-2 ml-auto">Create</Button>
            </div>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default EventFormModal


const StyledIcon = styled(FontAwesomeIcon)`
margin: 0 0 0 .6rem;

color: ${white};
`
const StyledIconRound = styled(FontAwesomeIcon)`
color: ${white};
`