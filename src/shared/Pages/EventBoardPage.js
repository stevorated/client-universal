import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { HelmetComponent, LittleMenu, EventExtra } from '../Components'
import { fetchMyEvents, fetchFeed, clearFeed, logoutUser } from '../Store/actions'
import requireAuth from '../HOC/requireAuth'
import checkLoggedIn from '../HOC/checkLoggedIn'
import { EventBoard, EventMainCard } from '../Components'
import Menu from '../Routes/Menu'
import { mediaQueries, orange } from '../Utils'
import { FlatCardStatic } from '../Elements'
import NextUpBoardContainerSide from '../Components/Event/NextUpBoardContainerSide'

class EventBoardPage extends Component {

  constructor(props) {
    super(props)
    this.menuItems= ['suggested', 'past']
    this.title = 'EventBoard'
    this.state = {
      events: this.props.myEvents,
      suggested: true,
    }
  }

  handleChangeState = (value) => {
    if(value !== 'suggested' && this.state.suggested) {
      this.setState({suggested: !this.state.suggested})
    }
    if(value === 'suggested' && !this.state.suggested) {
      this.setState({suggested: !this.state.suggested})
    }

  }

  render() {
    return (
      <Row className="text-center"  >
        <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
        <FloatLeft lg="3" className="">
          <Menu  logoutUser={this.props.logoutUser} />
        </FloatLeft>
        <MainCol lg="6" className="offset-lg-3 order-3 order-lg-2 animated fadeIn mt-lg-2" >
          <EventMainCard className="capitalize" header="Event Board" title="Followed Events Coming up soon " boardMode />
          <EventBoard />
        </MainCol>
        <Col lg="3" className="order-2 order-lg-3 mt-lg-2 animated fadeIn">
          <EventExtra boardMode={true} suggested={this.state.suggested} handleChangeState={this.handleChangeState} items={['suggested', 'past']}>
            <NextUpBoardContainerSide suggested={this.state.suggested} events={this.props.myEvents} />
          </EventExtra>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps({ myEvents }) {
  return { myEvents }
}

export default {
  component: connect(mapStateToProps, { fetchMyEvents, clearFeed, logoutUser })(checkLoggedIn(requireAuth(EventBoardPage))),
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
  ${mediaQueries.lg`
  padding-right: 2rem;
  `}
`
