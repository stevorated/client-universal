import React, { Component } from 'react'
import {
  Button,
  UncontrolledPopover,
  PopoverBody
} from 'reactstrap'
import OutsideClickHandler from 'react-outside-click-handler'

export default class DeletePostPopover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPopUp: false,
      counter: 0,
      deleteMsg: ''
    }
  }

  handleClick = () => {
    if (this.state.counter === 0) {
      this.setState({ counter: 1, deleteMsg: 'You Sure?', showPopUp: true })
    } else if (this.state.counter === 1) {
      this.setState({ counter: 2, deleteMsg: 'Really?!' })
    } else {
      this.props.deletePost()
    }
  }

  render() {
    return (
      <OutsideClickHandler
        onOutsideClick={() => {
          this.setState({ showPopUp: false, counter: 0 })
        }}>

        <UncontrolledPopover
          backdrop="true"
          className=" text-right"
          placement="top-end"
          trigger="focus"
          isOpen={this.state.counter >= 1 && this.state.showPopUp}
          // triger="focus"
          target={`PopoverDeletePost_${this.props.post}`}
        >
          <PopoverBody>{this.state.deleteMsg}</PopoverBody>
        </UncontrolledPopover>
        <Button
          type="button"
          id={`PopoverDeletePost_${this.props.post}`}
          onClick={this.handleClick}
          close
        />
      </OutsideClickHandler>
    )
  }
}
