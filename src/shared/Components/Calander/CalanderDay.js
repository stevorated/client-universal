import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Col, Tooltip } from 'reactstrap'
import styled from 'styled-components'
import { orange, elevation, mediaQueries } from '../../Utils'
import moment from 'moment'
import EventBracket from './EventBracket'
export default function CalanderDay(props) {
  const { month, day, events, date, handleChangeDayFocus } = props
  // console.log(props.myId)
  const loadDay = () => {
    handleChangeDayFocus(events, date)
  }
  const active = props.dayInFocus === day ? 'active-border' : ''

  const renderEvents = () => {
  
    return events.map((event) => {
      // console.log(event.followers)
      const followedEvent = event.followers.find((follow)=> follow.id === props.myId) ? true : false
      const thumbnil = `${process.env.API_BASE}${event.thumbnil.url}`
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

      
      
      return redirect ? <Redirect key={`${event.id}-redirect`} to={`/event/${event.id}`} /> : (
        <EventBracket data-test="calanderDay" key={event.id} {...event} followedEvent={followedEvent}>
          <Tooltip
            placement="right"
            target={`event-day-div-${event.id}`}
            toggle={toggle}
            isOpen={tooltipOpen}
            autohide={true} 
          >
            <img src={thumbnil} width="100%" alt="" />
            <div style={{fontWeight: '600'}}>{event.name}</div>
            <div>{event.venue}({event.address})</div>
            <div>{event.startTime}, {moment(event.startDate).format('DD MMMM YYYY')}</div>
            <div></div>
          </Tooltip>

        </EventBracket>

          

        )
    })
  }
  const currentMonth = moment().format('M')
  const styledDay = date > day && day !== null && month === currentMonth ? 'dayGray' : ''
  return (
    <BorderCol key={`${day}-calander`} className={`${styledDay} ${active}`} onClick={loadDay}>
      <DayNumber data-test="dayNumber" className={`ml-1`}>{day}</DayNumber>
      {day && <div style={{ marginTop: '2rem' }}>
        {renderEvents()}
      </div>}
    </BorderCol>
  )
}

const BorderCol = styled(Col)`
cursor: pointer;
outline: none;
border: .4px solid rgb(228, 228, 228);
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