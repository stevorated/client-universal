import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { HelmetComponent, LittleMenu, EventExtra } from '../../Components'
import { fetchMyEvents, fetchMyNextEvents, createEventAction, followEventAction } from '../../Store/actions'
import requireAuth from '../../HOC/requireAuth'
import checkLoggedIn from '../../HOC/checkLoggedIn'
import { EventBoard, EventsFeed, EventMainCard } from '../../Components'
import Menu from '../../Routes/Menu'
import { mediaQueries, orange } from '../../Utils'
import { FlatCardStatic } from '../../Elements'
import NextUpBoardContainerSide from '../../Components/Event/NextUpBoardContainerSide'

class EventBoardPage extends Component {
  constructor(props) {
    super(props)
    this.menuItems = ['suggested', 'past']
    this.title = 'Event Board'
    this.state = {
      suggested: true,
      loadMore: true
    }
    // console.log(this.props)
  }

  setLoadMore = (loadMore) => {
    this.setState({ loadMore })  
  }

  handleChangeState = value => {
    if (value !== 'suggested' && this.state.suggested) {
      this.setState({ suggested: !this.state.suggested })
    }
    if (value === 'suggested' && !this.state.suggested) {
      this.setState({ suggested: !this.state.suggested })
    }
  }

  handleAction = (type, payload) => {
    switch (type) {
      case 'fetchMyNextEvents':
        // console.log('fetchMyNextEvents')
        this.props.fetchMyNextEvents(payload.data)
        break
      case 'fetchMyEvents':
        // console.log('fetchMyEvents')
        this.props.fetchMyEvents(payload.data, payload.count)
        break
      case 'createEventAction':
        // console.log('createEventAction')
        this.props.createEventAction(payload.data)
        break
      case 'followEventAction':
        // console.log('followEventAction')
        this.props.followEventAction(payload.data, payload.event)
        break
      case 'redirect':
        // console.log('followEventAction')
        this.props.history.push(`/event/${payload.id}`)
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
          className="offset-lg-3 order-3 order-lg-2 animated fadeIn"
        >
          <EventMainCard
            myId={this.props.auth.id}
            className="capitalize"
            header="Event Board"
            title="Followed Events Coming up soon "
            boardMode={true}
            events={this.props.nextBoardEvents}
            handleAction={this.handleAction}
          />
          <EventBoard
            myId={this.props.auth.id}
            events={this.props.myEvents}
            handleAction={this.handleAction}
            loadMore={this.state.loadMore}
            setLoadMore={this.setLoadMore}
          />
        </MainCol>
        <Col lg="3" className="order-2 order-lg-3 animated fadeIn">
          <EventExtra
            myId={this.props.auth.id}
            boardMode={true}
            suggested={this.state.suggested}
            handleChangeState={this.handleChangeState}
            items={['suggested', 'past']}
          >
            <NextUpBoardContainerSide
              myId={this.props.auth.id}
              handleAction={this.handleAction}
              suggested={this.state.suggested}
              // events={this.props.myEvents}
            />
          </EventExtra>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps({ auth, myEvents, nextBoardEvents }) {
  return { auth, myEvents, nextBoardEvents }
}

export default {
  component: connect(
    mapStateToProps,    
    { fetchMyEvents, fetchMyNextEvents, createEventAction, followEventAction }
  )(checkLoggedIn(requireAuth(EventBoardPage))),
  loadData: ({ dispatch }) => dispatch(fetchMyEvents())
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
  /* margin: 0; */
  /* ${mediaQueries.lg`
  padding-right: 2rem;
  `} */
`
