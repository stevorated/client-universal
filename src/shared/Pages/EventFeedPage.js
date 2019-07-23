import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { HelmetComponent, LittleMenu } from '../Components'
import { fetchFeed, clearFeed } from '../Store/actions'
import requireAuth from '../HOC/requireAuth'
import checkLoggedIn from '../HOC/checkLoggedIn'
import { Menu, EventFormContainer, EventFeed, EventMainCard } from '../Components'
import NavComponent from '../Routes/NavComponent'
import { mediaQueries, backClr, black, absolute, orange } from '../Utils'
import { FlatCard, FlatCardStatic, SquareButton } from '../Elements'
import { relative } from 'path';
import NextUpFeedContainer from '../Components/Event/NextUpFeedContainer'

class EventFeedPage extends Component {

  constructor(props) {
    super(props)
    this.title = 'My Events'
    this.state = {
      leaveClass: 'animated fadeOutUp'
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
          <EventMainCard header="Event Feed" feedMode />
          <EventFeed />
        </MainCol>
        <Col lg="3" className="order-2 order-lg-3 mt-lg-2 animated fadeIn">
          <FlatCardStatic style={{ minHeight: '200px' }} className="px-0 mt-3">
          <div className="mx-3 text-center">     
            <hr className="mx-2 noPadding" style={{ color: orange, borderWidth: '2px', borderColor: orange, opacity: '0.1' }} />
            <LittleMenu items={['likes', 'posts', 'views']} />
            <hr className="noPadding" style={{ color: orange, borderWidth: '2px', borderColor: orange, opacity: '0.5' }} />
            <NextUpFeedContainer events={this.props.events}/>
          </div>
          </FlatCardStatic>
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


