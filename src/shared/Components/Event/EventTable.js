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
      <Table hover size="sm" className="text-left">
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
      {!props.events.length && <div className="text-center py-3">None</div>}
    </Fragment>
  )
}

export default connect(undefined, { })(EventTable)
