import React, { Component, Fragment } from 'react'
import { Button, PopoverBody, UncontrolledPopover } from 'reactstrap'
import onClickOutside from 'react-onclickoutside'

class DeleteCommentPopover extends Component {
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

  handleClickOutside = evt => {
    this.setState({ showPopUp: false, counter: 0 })
  }

  render() {
    return (
      <Fragment>
        <UncontrolledPopover
          backdrop="true"
          className="text-capitalized animated fadeIn"
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
          className="mr-2"
        />
      </Fragment>
    )
  }
}

export default onClickOutside(DeleteCommentPopover)
