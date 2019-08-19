import React from 'react'
import { Container, Row, CardColumns } from 'reactstrap'
import styled from 'styled-components'
import { Event } from '../../Components'
import { mediaQueries } from '../../Utils'

function Events(props) {
  // console.log(props)
  const { events } = props
  const renderQuery = () => {
    if(!events.length) return null
    return events.map((event) => {
      
      const { id } = event
      return (<Event key={`events-${id}`} {...event} handleAction={props.handleAction} myId={props.myId} />)
    })
  }
    return (
      <Container className="mt-3">
        <Row className="p-md-4 m-auto">
          <CustomCardColumns md={6} xl={4} >
            {renderQuery()}
          </CustomCardColumns>
          {!renderQuery() && <p style={{minHeight: '100px'}} className="m-auto">- No Events -</p>}
        </Row>
      </Container> 
    )
  }

export default Events


const CustomCardColumns = styled(CardColumns)`
width: 100%;

-moz-column-count:    1;
-webkit-column-count: 1;
column-count:         1;

${mediaQueries.md`
width: 100%;

  -moz-column-count:    2;
  -webkit-column-count: 2;
  column-count:         2;
  `}
${mediaQueries.xl`
width: 100%;

  -moz-column-count:    3;
  -webkit-column-count: 3;
  column-count:         3;
  `}
`