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
import { mediaQueries, backClr, black, absolute } from '../Utils'
import { FlatCard, FlatCardStatic, SquareButton } from '../Elements'
import { relative } from 'path';

class EventFeedPage extends Component {

  constructor(props) {
    super(props)
    this.title = 'My Events'
    this.state = {
      leaveClass: 'animated fadeOutUp'
    }
  }
  componentWillUnmount = () => {

  }

  render() {
    return (
      <Row className="text-center"  >
        <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
        <FloatLeft lg="3" className="">
          <Menu />
        </FloatLeft>
        <MainCol lg="6" className="offset-lg-3 order-3 order-lg-2 animated fadeIn mt-3" >
          <EventMainCard />
          <EventFeed />
        </MainCol>
        <Col lg="3" className="order-2 order-lg-3 mt-3 animated fadeIn">
        <FlatCardStatic style={{minHeight: '100px'}} className="px-0 mt-3">
          <LittleMenu items={['likes', 'posts', 'views']} />
        </FlatCardStatic>
      </Col>
      </Row>
    )
  }
}

function mapStateToProps({ users, posts, feed }) {
  return { users, posts, feed }
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


