import React, { Component, Fragment, useState } from 'react'
import Notification from './Notification'

function Notifications(props) {
  const { myNotifications } = props
  const renderQuery = () => {
      return myNotifications.map((notification) => {
        return <Notification seen={props.seen} key={`myNotifications-${notification.id}`} {...notification} />
      })
  }
    return (
      <div data-test="notifications" className="pt-2">
        { renderQuery() }
      </div>
    )
  }

export default Notifications