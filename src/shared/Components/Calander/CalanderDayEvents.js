import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Event } from '../../Components'
import { Container, Row, Col, CardColumns } from 'reactstrap'
import { mediaQueries } from '../../Utils'

function CalanderDayEvents(props) {
  const renderQuery = () => {
      return props.events.map((event) => {
        const { id } = event
        return (<Event key={`day-events-${id}`} {...event} />)
      })
    }
    return (
      <div id="cander-day-events" className="mx-md-2">
        <CustomCardColumns md={6} xl={4}>
          {renderQuery()}
        </CustomCardColumns>
      </div> 
    )
  }

function mapStateToProps({ }) {

  return { }
}

export default connect(mapStateToProps)(CalanderDayEvents)


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