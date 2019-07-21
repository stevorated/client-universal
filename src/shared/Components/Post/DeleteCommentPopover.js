import React, { Component } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { Button, PopoverBody, UncontrolledPopover } from 'reactstrap'

export default class DeleteCommentPopover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPopUp: false,
      counter: 0,
      deleteMsg: ''
    }
  }

  handleClick = async () => {
    if (this.state.counter === 0) {
      await this.setState({ showPopUp: true, counter: 1, deleteMsg: 'sure?' })
    } else if (this.state.counter === 1) {
      await this.setState({ showPopUp: false, counter: 0 })
      return this.props.deleteComment()
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
          className="text-capitalized"
          placement="top-end"
          isOpen={this.state.counter >= 1 && this.state.showPopUp}
          triger="focus"
          target={`PopoverDeleteComment_${this.props.comment}`}
        >
          <PopoverBody>{this.state.deleteMsg}</PopoverBody>
        </UncontrolledPopover>
        <Button
          id={`PopoverDeleteComment_${this.props.comment}`}
          onClick={this.handleClick}
          close
        />
      </OutsideClickHandler>
    )
  }
}
