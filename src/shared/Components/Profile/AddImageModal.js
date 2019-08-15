import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { black, mediaQueries } from '../../Utils'
import FileInputContainer from '../Fragment/FileInputContainer'

class AddImageModal extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   modal: false
    // }
  }

  // toggle = () => {
  //   this.setState(prevState => ({
  //     modal: !prevState.modal
  //   }))
  // }

  render() {
    return (
      <div>
        <LittlePlusBtnContainer>
          <LittlePlusBtn onClick={this.props.toggle}>
            {this.props.buttonLabel || <SmallIcon size="sm" icon={faPlus} />}
          </LittlePlusBtn>
        </LittlePlusBtnContainer>
        <Modal
          style={{
            marginTop: '60px',
            paddingBottom: '60px',
            maxHeight: '70vh'
          }}
          returnFocusAfterClose={false}
          isOpen={this.props.modal}
          toggle={this.props.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Upload Profile Pic</ModalHeader>
          <StyledModalBody
          // style={{ maxHeight: 'calc(95vh - 150px)', overflowY: 'auto' }}
          >
            <FileInputContainer
              limit="4000000"
              uploadType="avatar"
              toggle={this.props.toggle}
              round={true}
            />
          </StyledModalBody>
        </Modal>
      </div>
    )
  }
}

export default AddImageModal

const LittlePlusBtn = styled(Button)`
font-size: 1rem;
  background: ${black};
  padding: 0rem 0.3rem;
  z-index: 100;
  /* margin: .5rem; */
  border-radius: 100%;
  &:hover {
    cursor: pointer;
  }
`

const SmallIcon = styled(FontAwesomeIcon)`
  color: yellow;
  padding: 0rem;
`
const LittlePlusBtnContainer = styled.div`
  position: absolute;
  z-index: 100;
  right: .3rem;
  bottom: -.9rem;
  /* margin: 3rem; */
  border-radius: 100%;
  &:hover {
    cursor: pointer;
  }
`

const StyledModalBody = styled(ModalBody)`
max-height: 'calc(95vh - 180px)'; 
/* overflow-y: 'auto'; */
${mediaQueries.md`
  max-height: 'calc(95vh - 150px)'; 
  `} 
`