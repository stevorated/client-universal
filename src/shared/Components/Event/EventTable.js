import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { connect } from 'react-redux'
import { Table } from 'reactstrap'
import EventTableItems from './EventTableItems'
import { FETCH_EVENTS } from '../../Store/Apollo/Queries'
import { Loading } from '..'
import { fetchEvents } from '../../Store/actions'

function EventTable(props) {
  return (
    <Fragment>    
      <Table responsive hover size="sm" className="text-left mt-2">
        <thead>
          <tr>
            <th scope="row">Event</th>
            <th>Where</th>
            <th>When</th>
          </tr>
        </thead>
        <tbody>
          <EventTableItems events={props.events} />
        </tbody>
      </Table>
      {!props.events.length && <div className="py-3">None</div>}
    </Fragment>
  )
}

export default EventTable
