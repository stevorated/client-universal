import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { black } from '../../Utils'
import FileInputContainer from '../Fragment/FileInputContainer'

class AddImageModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
    return (
      <div>
        <LittlePlusBtn onClick={this.toggle}>
        { this.props.buttonLabel || (<SmallIcon size="sm" icon={faPlus} />) }
        </LittlePlusBtn>
        <Modal returnFocusAfterClose={false} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Upload Profile Pic</ModalHeader>
          <ModalBody>
            <FileInputContainer limit="2000000" uploadType="avatar" toggle={this.toggle} round={true} />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default AddImageModal

const LittlePlusBtn = styled(Button)`
  position: absolute;
  background: ${black};
  top: -0.5rem;
  right: -1.2rem;
  padding: .1rem .1rem;
  z-index: 100;
  margin: 3rem;
  border-radius: 100%;
`


const SmallIcon = styled(FontAwesomeIcon)`
/* font-size: .7rem; */
display: block;
padding: .1rem;
padding: 0;
color: yellow;
`