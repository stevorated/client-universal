import React from 'react'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'

export default function CalanderHeaders() {
  return (
    <Row className="d-flex justify-content-around text-center mx-0">
      <BorderColHeader className="text-align-center text-center">Sun</BorderColHeader>
      <BorderColHeader className="text-align-center text-center">Mon</BorderColHeader>
      <BorderColHeader className="text-align-center text-center">Tue</BorderColHeader>
      <BorderColHeader className="text-align-center text-center">Wed</BorderColHeader>
      <BorderColHeader className="text-align-center text-center">Thu</BorderColHeader>
      <BorderColHeader className="text-align-center text-center">Fri</BorderColHeader>
      <BorderColHeader className="text-align-center text-center">Sat</BorderColHeader>
    </Row>
  )
}

const BorderColHeader = styled(Col)`
vertical-align: middle!important;
border: .4px solid lightgray;
grid-gap: 0;
grid-row-gap: 0;
font-weight: 700;
height: 2rem;
background: lightgray;
`
