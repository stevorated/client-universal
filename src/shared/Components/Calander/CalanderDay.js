import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Col, Tooltip } from 'reactstrap'
import styled from 'styled-components'
import { orange, elevation } from '../../Utils'
import moment from 'moment'
export default function CalanderDay(props) {
  const { month, day, events, date, handleChangeDayFocus } = props
  // console.log(props)
  
  const loadDay = () => {
    handleChangeDayFocus(events, date)
  }
  const active = props.dayInFocus === day ? 'active-border' : ''

  const renderEvents = () => {
  
    return events.map((event) => {
      const [redirect, setRedirect] = useState(false)
      const [tooltipOpen, setTooltipOpen] = useState(false)
      const toggle = () => {
        setTooltipOpen(!tooltipOpen)
      }

      

      const toggleRedirect = () => {
        setRedirect(!setTooltipOpen)
        setTimeout(()=> {
          setRedirect(true)
        }, 50)
      }

      
      

      const thumbnil = `${process.env.API_BASE}${event.thumbnil.url}`
      return redirect ? <Redirect key={`${event.id}-redirect`} to={`/event/${event.id}`} /> : (
        <DayEvent key={event.id} className={`text-left lo-text`}>
          <div
            id={`event-day-div-${event.id}`}
            className="py-2 mx-2"
            // onClick={toggleRedirect}
          >
            {event.name}
          </div>

          <Tooltip
            placement="right"
            target={`event-day-div-${event.id}`}
            toggle={toggle}
            isOpen={tooltipOpen}
          autohide={true} 
          >
            <img src={thumbnil} width="100px" alt="" />
            <div style={{fontWeight: '600'}}>{event.name}</div>
            <div>{event.venue}({event.address})</div>
            <div>{event.startTime}, {moment(event.startDate).format('DD MMMM YYYY')}</div>
            <div></div>
          </Tooltip>
        </DayEvent>
        )
    })
  }
  const currentMonth = moment().format('M')
  const styledDay = date > day && day !== null && month === currentMonth ? 'dayGray' : ''
  return (
    <BorderCol key={`${day}-calander`} className={`${styledDay} ${active}`} onClick={loadDay}>
      <DayNumber className={`ml-1`}>{day}</DayNumber>
      {day && <div style={{ marginTop: '2rem' }}>
        {renderEvents()}
      </div>}
    </BorderCol>
  )
}

const BorderCol = styled(Col)`
cursor: pointer;
outline: none;
border: .4px solid lightgray;
align-content: center;
grid-gap: 0;
grid-row-gap: 0;
margin: 0;
padding: 0;
transition: all .3s ease-in;
`

const DayNumber = styled.div`
  position: absolute;
  font-size: 1.2rem;
  font-weight: 700;
  left: 1px;
  top: 1px;
`

const DayEvent = styled.div`
  ${elevation[3]};
  /* cursor: pointer; */
  word-break: break-all;
  background: ${orange};
  font-weight: 600;
  margin: .4rem .1rem;
  min-height: 1rem;
  border-radius: .2rem;
  opacity: .8;
  transition: all .4s ease-in;
  /* &:hover {
    ${elevation[5]}
    transform: translateY(-.2rem)
  } */
`