import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { HelmetComponent } from '../Components'
import { fetchFeed, clearFeed } from '../Store/actions'
import requireAuth from '../HOC/requireAuth'
import checkLoggedIn from '../HOC/checkLoggedIn'
import { Menu, EventFormContainer, MyEvents } from '../Components'
import NavComponent from '../Routes/NavComponent'
import { mediaQueries, backClr } from '../Utils'
import { FlatCard, SquareButton, Card } from '../Elements'
class EventBoardPage extends Component {

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
      <Row className="text-center" >
        <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
        <FloatLeft lg="3">
          <Menu />
        </FloatLeft>
        <MainCol lg="6" className="offset-lg-3 order-3 order-lg-2 animated fadeIn" >
          <FlatCard className=" py-5">

          <h1 className="sigmar-one text-center">Your Events</h1>
          <h3 className="mt-4 sigmar-one text-center">- filter -</h3>
          <div className="text-center my-5">
            
          </div>
          <h3 className="sigmar-one text-center">- add new events -</h3>
          <div className="d-flex justify-content-center my-5">
          <EventFormContainer className="mx-2" round={false} buttonLabel="Add Event" buttonSize="sm" />
          <SquareButton size="sm" style={{ background: '#3b5998' }} className="mx-2">From Facebook</SquareButton>
          </div>
          
            <MyEvents />
          </FlatCard>
        </MainCol>
        <Col lg="3" className="order-2 order-lg-3 mt-2 animated fadeIn">

        </Col>
      </Row>
    )
  }
}

function mapStateToProps({ users, posts, feed }) {
  return { users, posts, feed }
}

export default {
  component: connect(mapStateToProps, { fetchFeed, clearFeed })(checkLoggedIn(requireAuth(EventBoardPage))),
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


