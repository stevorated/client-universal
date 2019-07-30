import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'

import { HelmetComponent, EventExtra } from '../Components'
import { fetchFeed, clearFeed } from '../Store/actions'
import requireAuth from '../HOC/requireAuth'
import checkLoggedIn from '../HOC/checkLoggedIn'
import { EventFeed, EventMainCard } from '../Components'
import Menu from '../Routes/Menu'
import { mediaQueries } from '../Utils'
import NextUpFeedContainerSide from '../Components/Event/NextUpFeedContainerSide'

class EventFeedPage extends Component {

  constructor(props) {
    super(props)
    this.menuItems= ['new', 'popular']
    this.title = 'Event Feed'
    this.state = {
      events: this.props.myEvents,
      byCreatedAt: true,
    }
  }

  handleChangeState = (value) => {
    // console.log(value)
    if(value !== 'new' && this.state.byCreatedAt) {
      this.setState({byCreatedAt: !this.state.byCreatedAt})
    }
    if(value === 'new' && !this.state.byCreatedAt) {
      this.setState({byCreatedAt: !this.state.byCreatedAt})
    }

  }

  render() {
    return (
      <Row className="text-center" >
        <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
        <FloatLeft lg="3" className="">
          <Menu />
        </FloatLeft>
        <MainCol lg="6" className="offset-lg-3 order-3 order-lg-2 animated fadeIn mt-lg-2" >
          <EventMainCard header="Event Feed" title="Next Up" feedMode />
          <EventFeed />
        </MainCol>
        <Col lg="3" className="order-2 order-lg-3 mt-lg-2 mt-0 animated fadeIn">
          <EventExtra feedMode={true} byCreatedAt={this.state.byCreatedAt} handleChangeState={this.handleChangeState} items={this.menuItems}>
            <NextUpFeedContainerSide byCreatedAt={this.state.byCreatedAt} events={this.props.events} />
          </EventExtra>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps({ events }) {
  return { events }
}

export default {
  component: connect(mapStateToProps, { fetchFeed, clearFeed })(checkLoggedIn(requireAuth(EventFeedPage))),
  loadData: ({ dispatch }) => dispatch(fetchFeed())
}
const FloatLeft = styled(Col)`
  position: static!important;
  top: 3.5rem;
  left: 0rem;
  ${mediaQueries.lg`
  position: fixed!important;
  `}
  `
const MainCol = styled(Col)`
  ${mediaQueries.lg`
  padding-right: 2rem;
  `}
`


