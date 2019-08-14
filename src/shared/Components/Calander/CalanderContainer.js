import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { connect } from 'react-redux'
import { FETCH_CALANDER_EVENTS } from '../../Store/Apollo/Queries'
import { Loading } from '..'
import Calander from './Calander'
import { fetchCalanderEvents } from '../../Store/actions'
import moment from 'moment'

function CalanderContainer(props) {
  // console.log(props)
  return (
    <Query
      // fetchPolicy='network-only' // IMPORTANT
      query={FETCH_CALANDER_EVENTS}
      variables={{ month: props.targetMonth }}
      fetchPolicy="cache-and-network"
      onCompleted={({ getMonthsEvents }) => {
        const data = getMonthsEvents.map(event => {
          event.day = parseInt(moment(event.startDate).format('D'))
          return event
        })
        props.handleAction('fetchCalanderEvents', { data })
      }}
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading)
          return (
            <Loading
              style={{ position: 'absolute', top: '50vh' }}
              customLoader="true"
              size="8"
              margin="8"
              noloadingtext="true"
            />
          )
        if (error) return <Loading size="1" margin="1" />
        return (
          <Calander
            myId={props.myId}
            handleAction={props.handleAction}
            handleChangeMonth={props.handleChangeMonth}
            handleChangeDayFocus={props.handleChangeDayFocus}
            eventsInFocus={props.eventsInFocus}
            loading={props.loading}
            events={props.calander}
            targetMonth={props.targetMonth}
            oneMonthBack={props.oneMonthBack}
          />
        )
      }}
    </Query>
  )
}

export default CalanderContainer
