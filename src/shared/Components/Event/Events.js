import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Event } from '../../Components'
import { Container, Row, Col, CardColumns } from 'reactstrap'
import { mediaQueries } from '../../Utils'
function Events(props) {
  const { auth, myEventsMode, myEvents, eventFeedMode, events } = props
  const renderQuery = () => {
    if(myEventsMode) {
      return myEvents.map((event) => {
        const { id, name, venue, address, coverPhoto, thumbnil, createdAt, createdBy } = event
        return (<Event key={`myEvents-${id}`} {...event} />)
      })
    }
    else if (eventFeedMode) {
      return events.map((event) => {
        const { id } = event
        return (<Event key={`events-${id}`} {...event} />)
      })
    }
  }
    return (
      <Container className="">
        <Row className="p-4">
          <CustomCardColumns md={6} xl={4}>
            {renderQuery()}
          </CustomCardColumns>
        </Row>
      </Container> 
    )
  }

function mapStateToProps({ events, myEvents, auth }) {

  return { events, myEvents, auth }
}

export default connect(mapStateToProps)(Events)


const CustomCardColumns = styled(CardColumns)`

-moz-column-count:    1;
-webkit-column-count: 1;
column-count:         1;

${mediaQueries.md`

  -moz-column-count:    2;
  -webkit-column-count: 2;
  column-count:         2;
  `}
${mediaQueries.xl`
  -moz-column-count:    3;
  -webkit-column-count: 3;
  column-count:         3;
  `}
`