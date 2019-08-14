import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { orange } from '../Utils'
import { Link } from 'react-router-dom'

class ModalComponent extends React.Component {
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

  renderChild = () => {
      return React.cloneElement(this.props.children, { ...this.props, toggle: this.toggle })
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.props.linkBtn && 
        <span className="like-link" onClick={this.toggle}>
          {this.props.buttonLabel}
        </span>}
        {!this.props.linkBtn && <Button style={{background: orange}} onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{this.props.modalTitle}</ModalHeader>
            {this.renderChild()}
        </Modal>
      </div>
    )
  }
}

export default ModalComponent
