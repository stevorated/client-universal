import React, { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'

export default function CalanderDay({ day }) {
  return (
      <BorderCol key={`${day}-calander`}>
        <DayNumber className="ml-1">{day}</DayNumber>
        {day && <Fragment>
          <div className="text-center mt-4 lo-text">event 1</div>
          <div className="text-center mt-4 lo-text">event 2</div>
          <div className="text-center mt-4 lo-text">event 3</div>
        </Fragment>}
      </BorderCol>
  )
}

const BorderCol = styled(Col)`
border: 1px solid black;
align-content: center;
grid-gap: 0;
grid-row-gap: 0;
margin: 0;
`

const DayNumber = styled.div`
  position: absolute;
  left: 1px;
  top: 1px;
`