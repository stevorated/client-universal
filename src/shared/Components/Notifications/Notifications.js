import React, { Component, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Event } from '../../Components'
import { Container, Row, Col, CardColumns } from 'reactstrap'
import Notification from './Notification'

function Notifications(props) {
  const { myNotifications } = props
  
  const renderQuery = () => {
      return myNotifications.map((notification) => {
        if(notification.post || notification.event) {
          return (<Notification key={`myNotifications-${notification.id}`} {...notification} />)
        }
      })
  }
    return (
      <div>
        { renderQuery() }
      </div>
    )
  }

function mapStateToProps({ myNotifications }) {

  return { myNotifications }
}

export default connect(mapStateToProps)(Notifications)