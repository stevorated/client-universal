import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { HelmetComponent } from '../Components'
import { fetchFeed, clearFeed } from '../Store/actions'
import requireAuth from '../HOC/requireAuth'
import checkLoggedIn from '../HOC/checkLoggedIn'
import { Menu, EventFormContainer, EventDetailsQuery } from '../Components'
import NavComponent from '../Routes/NavComponent'
import { mediaQueries, backClr } from '../Utils'
import { FlatCard } from '../Elements'

class EventPage extends Component {

  constructor(props) {
    super(props)
    this.id = props.match.params.id
    this.title = `Event ${this.id}`
    this.state = {
      leaveClass: 'animated fadeOutUp'
    }
  }
  componentWillUnmount = () => {

  }

  render() {
    return (
      <Row  >
        <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
        <FloatLeft lg="3">
          <Menu />
        </FloatLeft>
        <MainCol lg="6" className="offset-lg-3 order-3 order-lg-2 animated fadeIn" >
          <EventDetailsQuery id={this.id}  />
        </MainCol>
      </Row>
    )
  }
}

function mapStateToProps({ users, posts, feed }) {
  return { users, posts, feed }
}

export default {
  component: connect(mapStateToProps, { fetchFeed, clearFeed })(checkLoggedIn(requireAuth(EventPage))),
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


