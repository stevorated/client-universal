import React from 'react'
import { Container, Row, CardColumns } from 'reactstrap'
import styled from 'styled-components'
import { Event } from '../../Components'
import { mediaQueries } from '../../Utils'

function Events(props) {
  // console.log(props)
  const { events } = props
  const renderQuery = () => {
    return events.map((event) => {
      const { id } = event
      return (<Event key={`events-${id}`} {...event} handleAction={props.handleAction} />)
    })
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

export default Events


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