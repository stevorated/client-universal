import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo } from '@fortawesome/free-solid-svg-icons'

import { HelmetComponent } from '../Components'
import { fetchFeed, clearFeed, logoutUser } from '../Store/actions'
import requireAuth from '../HOC/requireAuth'
import checkLoggedIn from '../HOC/checkLoggedIn'
import { EventDetailsQuery } from '../Components'
import Menu from '../Routes/Menu'
import { mediaQueries, backClr, elevation } from '../Utils'


class EventPage extends Component {

  constructor(props) {
    super(props)
    this.id = props.match.params.id
    this.title = `Event ${this.id}`
    this.state = {
      redirect: false 
    }
  }

  redirectBack = () => {
    this.setState({ redirect: true })
  }

  render() {
    return this.state.redirect ? <Redirect to="/calander" /> : (
      <Row >
        <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
        <FloatButton className="text-center animated flipInX">
          <Button style={{ borderRadius: '100%', padding: '1rem' }} className="btn-mainclr" onClick={() => this.props.history.push('/notifications')}>
            <FontAwesomeIcon icon={faUndo} size="lg" />
          </Button>
        </FloatButton>
        <FloatLeft lg="3">
          <Menu  logoutUser={this.props.logoutUser} />
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
  component: connect(mapStateToProps, { fetchFeed, clearFeed, logoutUser })(checkLoggedIn(requireAuth(EventPage))),
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

const FloatButton = styled.div`
position: fixed!important;
bottom: 1vh;
right: 5vw;
border-radius: 100%;
z-index: 1;
${elevation[5]}
${mediaQueries.lg`
  bottom: 6vh;
  `}
`
