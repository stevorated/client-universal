import React from "react"
import { Row, Col } from 'reactstrap'
import EventGoingItem from './EventGoingItem'

export default function EventGoingRow(props) {
  const { followers } = props
  const renderGoingItems = () => followers.map((follower)=> {
    return <EventGoingItem key={`${follower.id}-follower-event`} follower={follower} />
  })
  return (
    <Row>
      {renderGoingItems()}
    </Row>
  )
}
