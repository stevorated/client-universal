import React from 'react'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'
import CalanderDay from './CalanderDay'


export default function CalanderRow(props) {
  const renderQuery = () => {
    return props.days.map(day => {
      const key = day ? `${day}-calander` : `blank-${Math.random()}`
      return <CalanderDay key={key} day={day} />
    })
  }
  return (
    <Row style={{minHeight: '200px', maxWidth: '100vw'}} className="mx-0">
      {renderQuery()}
    </Row>
  )
}


