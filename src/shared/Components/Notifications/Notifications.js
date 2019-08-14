import React, { Component, Fragment, useState } from 'react'
import Notification from './Notification'

function Notifications(props) {
  const { myNotifications, loading } = props
  const renderQuery = () => {
      if(!myNotifications.length & !loading) return <p className="mt-5">You Have Non Yet, follow some events find some new friends and i'll betcha you'll have a bunch when you come back</p>
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