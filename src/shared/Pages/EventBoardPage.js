import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { HelmetComponent, LittleMenu } from '../Components'
import { fetchMyEvents, fetchFeed, clearFeed } from '../Store/actions'
import requireAuth from '../HOC/requireAuth'
import checkLoggedIn from '../HOC/checkLoggedIn'
import { Menu, EventBoard, EventMainCard } from '../Components'
import { mediaQueries, orange } from '../Utils'
import { FlatCardStatic } from '../Elements'
import NextUpBoardContainer from '../Components/Event/NextUpBoardContainer'

class EventBoardPage extends Component {

  constructor(props) {
    super(props)
    this.title = 'My Events'
    this.state = {
      leaveClass: 'animated fadeOutUp',
      events: this.props.myEvents
    }
  }

  render() {
    return (
      <Row className="text-center"  >
        <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
        <FloatLeft lg="3" className="">
          <Menu />
        </FloatLeft>
        <MainCol lg="6" className="offset-lg-3 order-3 order-lg-2 animated fadeIn mt-2" >
          <EventMainCard header="Event Board" boardMode />
          <EventBoard />
        </MainCol>
        <Col lg="3" className="order-2 order-lg-3 mt-lg-2 animated fadeIn">
          <FlatCardStatic style={{ minHeight: '200px' }} className="px-0 mt-3  mr-lg-2">
              <div className="mx-2 text-center">
              <hr className="mx-2 noPadding" style={{ color: orange, borderWidth: '2px', borderColor: orange, opacity: '0.1' }} />
              <LittleMenu items={['Up next', 'Saved']} />
              <hr className="noPadding" style={{ color: orange, borderWidth: '2px', borderColor: orange, opacity: '0.5' }} />
              <NextUpBoardContainer events={this.props.myEvents} />            
            </div>
          </FlatCardStatic>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps({ myEvents }) {
  return { myEvents }
}

export default {
  component: connect(mapStateToProps, { fetchMyEvents, clearFeed })(checkLoggedIn(requireAuth(EventBoardPage))),
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


