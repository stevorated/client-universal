import React from 'react'
import styled from 'styled-components'
import { orange, elevation, mediaQueries } from '../../Utils'
const EventBracket = (props) => {
  const classToAdd = props.followedEvent ? '': 'bg-warning'
  return (
    <DayEvent
      className={`text-left lo-text ${classToAdd} `}
    >
      <div
        id={`event-day-div-${props.id}`}
        className="py-2 mx-2"
        // onClick={toggleRedirect}
      >
        <EventTitle>{props.name}</EventTitle>
        <EventTitleSub>{props.startTime}</EventTitleSub>
      </div>

      {props.children}
    </DayEvent>
  )
}

export default EventBracket

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
const EventTitle = styled.span`
  display: none;
  ${mediaQueries.sm`
    display: block;
  `}
`

const EventTitleSub = styled.span`
  display: block;
  font-size: .5rem;
  ${mediaQueries.sm`
  display: none;
    
  `}
`