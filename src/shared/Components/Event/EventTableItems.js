import React, { Fragment } from 'react'
import EventTableItem from './EventTableItem'
import { Loading } from '..'
export default function EventTableItems(props) {

  return (
    <Fragment>
      {props.events.map((event) => {
        return <EventTableItem key={`${event.id}-event-row`} {...event} />
      })}
    </Fragment>
  )
}
