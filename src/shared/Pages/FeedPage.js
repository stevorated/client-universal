import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { HelmetComponent } from '../Components'
import { fetchFeed, fetchCurrentUser } from '../Store/actions'
import requireAuth from '../HOC/requireAuth'
import checkLoggedIn from '../HOC/checkLoggedIn'
import Menu from '../Routes/Menu'
// import FeedRigntBar from '../Components/Feed/FeedRigntBar'
import FeedScrollQuery from '../Components/Feed/FeedScrollQuery'
import FeedActivity from '../Components/Feed/FeedActivity'
import FeedExtraRight from '../Components/Feed/FeedExtraRight'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { mediaQueries } from '../Utils'

class FeedPage extends Component {

  constructor(props) {
    super(props)
    this.title = 'Feed'
  }

  render() {
    return (
      <Row className="">
        <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
        <FloatLeft lg="3">
          <Menu />
        </FloatLeft>
        <Col lg="6" className="offset-lg-3 order-3 order-lg-2 animated fadeIn" >
          <FeedScrollQuery />
        </Col>
        <Col lg="3" className="order-2 order-lg-3 mt-2 animated fadeIn">
          <FeedExtraRight />
          <FeedExtraRight />
          <FeedActivity />
          <FeedActivity />
          <FeedActivity />
        </Col>
      </Row>
    )
  }
}

function mapStateToProps({ users, posts, feed, auth }) {
  return { users, posts, feed, auth }
}

export default {
  component: connect(mapStateToProps, { fetchCurrentUser })(checkLoggedIn(requireAuth(FeedPage))),
  loadData: ({ dispatch }) => {
    dispatch(fetchCurrentUser())
    dispatch(fetchFeed())
  }
}
const FloatLeft = styled(Col)`
  position: static!important;
  top: 3.5rem;
  left: 0rem;
  ${mediaQueries.lg`
  position: fixed!important;
  `}
  `


