import React from 'react'
import { Row } from 'reactstrap'
import CalanderDay from './CalanderDay'

export default function CalanderRow(props) {
  // console.log(props)
  const renderQuery = () => {
    return props.days.map(day => {
      const eventsWithDay = props.events.filter((event) => {
        return event.day === day
      })
      const key = day ? `${day}-calander` : `blank-${Math.random()}`
      return <CalanderDay key={key} {...props} day={day} events={eventsWithDay} />
    })
  }
  return (
    <Row style={{minHeight: '60px', maxWidth: '100vw'}} className="mx-0 my-0">
      {renderQuery()}
    </Row>
  )
}


