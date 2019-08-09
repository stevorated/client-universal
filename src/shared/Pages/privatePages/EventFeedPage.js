import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'

import { HelmetComponent, EventExtra } from '../../Components'
import {
  fetchEvents,
  fetchNextEvents,
  createEventAction,
  followEventAction
} from '../../Store/actions'
import requireAuth from '../../HOC/requireAuth'
import checkLoggedIn from '../../HOC/checkLoggedIn'
import { EventFeed, EventMainCard } from '../../Components'
import Menu from '../../Routes/Menu'
import { mediaQueries } from '../../Utils'
import NextUpFeedContainerSide from '../../Components/Event/NextUpFeedContainerSide'

class EventFeedPage extends Component {
  constructor(props) {
    super(props)
    this.menuItems = ['new', 'popular']
    this.title = 'Event Feed'
    this.state = {
      byCreatedAt: true,
      loadMore: true
    }
  }

  setLoadMore = (res) => {
    this.setState({ loadMore: res })  
  }

  handleChangeState = value => {
    if (value !== 'new' && this.state.byCreatedAt) {
      this.setState({ byCreatedAt: !this.state.byCreatedAt })
    }
    if (value === 'new' && !this.state.byCreatedAt) {
      this.setState({ byCreatedAt: !this.state.byCreatedAt })
    }
  }

  handleAction = (type, payload) => {
    switch (type) {
      case 'fetchNextEvents':
        // console.log('fetchNextEvents')
        this.props.fetchNextEvents(payload.data)
        break
      case 'fetchEvents':
        // console.log('fetchEvents')
        this.props.fetchEvents(payload.data, payload.count)
        break
      case 'createEventAction':
        // console.log('createEventAction')
        this.props.createEventAction(payload.data)
        break
      case 'followEventAction':
        // console.log('followEventAction')
        this.props.followEventAction(payload.data, payload.event)
        break
      default:
        console.log('unKnownAction', type, payload)
        break
    }
  }

  render() {
    return (
      <Row className="text-center">
        <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
        <FloatLeft lg="3" className="">
          <Menu />
        </FloatLeft>
        <MainCol
          lg="6"
          className="offset-lg-3 order-3 order-lg-2 animated fadeIn mt-lg-2"
        >
          <EventMainCard
            myId={this.props.auth.id}
            header="Event Feed"
            title="Next Up"
            feedMode={true}
            className="capitalize"
            events={this.props.nextFeedEvents}
            handleAction={this.handleAction}
          />
          <EventFeed
            myId={this.props.auth.id}
            events={this.props.events}
            handleAction={this.handleAction}
            loadMore={this.state.loadMore}
            setLoadMore={this.setLoadMore}
          />
        </MainCol>
        <Col lg="3" className="order-2 order-lg-3 mt-lg-2 mt-0 animated fadeIn">
          <EventExtra
            feedMode={true}
            byCreatedAt={this.state.byCreatedAt}
            handleChangeState={this.handleChangeState}
            items={this.menuItems}
          >
            <NextUpFeedContainerSide
              myId={this.props.auth.id}
              byCreatedAt={this.state.byCreatedAt}
              events={this.props.events}
              handleAction={this.handleAction}
            />
          </EventExtra>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps({ auth, events, nextFeedEvents }) {
  return { auth, events, nextFeedEvents }
}

export default {
  component: connect(
    mapStateToProps,
    { fetchEvents, fetchNextEvents, createEventAction, followEventAction }
  )(checkLoggedIn(requireAuth(EventFeedPage))),
  loadData: ({ dispatch }) => dispatch(fetchEvents())
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
  /* ${mediaQueries.lg`
  padding-right: 2rem;
  `} */
`