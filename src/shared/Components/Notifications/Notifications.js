import React, { Component, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Event } from '../../Components'
import { Container, Row, Col, CardColumns } from 'reactstrap'
import Notification from './Notification'

function Notifications(props) {
  const { myNotifications } = props
  console.log(props)
  const renderQuery = () => {
      return myNotifications.map((notification) => {
        return <Notification auth={props.auth} key={`myNotifications-${notification.id}`} {...notification} />
      })
  }
    return (
      <div className="pt-2">
        { renderQuery() }
      </div>
    )
  }

function mapStateToProps({ myNotifications, auth }) {

  return { myNotifications, auth }
}

export default connect(mapStateToProps)(Notifications)