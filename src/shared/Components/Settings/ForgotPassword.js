import React from 'react'
import { Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { ModalComponent } from '../../Elements'
import ForgotPasswordForm from './ForgotPasswordForm'
export default function ConfirmChangePassword(props) {
  return (
    <Fragment>
      <ModalComponent
        modalTitle="Reset Password"
        linkBtn="true"
        // confirmBtn="yeah, cool"
        // cancelBtn="cancel"
        className={props.className}
        buttonLabel="forgot your password?"
      >
        <ForgotPasswordForm confirmChangePassword={props.confirmChangePassword} {...props} />
      </ModalComponent>
    </Fragment>
  )
}
