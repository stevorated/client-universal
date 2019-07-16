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
        // const cover = event.coverPhoto ?  `${config.api}${event.coverPhoto.url}` : null
        // const thumb = event.thumbnil ?  `${config.api}${event.thumbnil.url}` : null
        return (<Event key={`myEvents-${id}`} {...event} />)
      })
    }
    else if (eventFeedMode) {
      return events.map((event) => {
        const { id } = event
        console.log(event)
        return (<Event key={`events-${id}`} {...event} />)
      })
    }
    // } 
    // else if(profileEventsMode) {
    //   return profileEvents.map(({ id, body, comments, createdAt, createdBy }) => {
    //     const myEvent = auth.id === createdBy.id
    //     const name = `${createdBy.fname} ${createdBy.lname}`
    //     const cover = coverPhoto ?  `${config.api}${coverPhoto.url}` : null
    //     const thumb = thumbnil ?  `${config.api}${thumbnil.url}` : null
    //     return <Event key={`${id}-profile`} profileMode={true} cover={cover} thumbnil={thumbnil} name={name} createdAt={createdAt} id={id} createdBy={createdBy} />
    //   })
    // }
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