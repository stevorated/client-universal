import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo } from '@fortawesome/free-solid-svg-icons'

import { HelmetComponent } from '../../Components'
import { followEventAction, fetchEvent } from '../../Store/actions'
import requireAuth from '../../HOC/requireAuth'
import checkLoggedIn from '../../HOC/checkLoggedIn'
import { EventDetailsQuery } from '../../Components'
import Menu from '../../Routes/Menu'
import { mediaQueries, elevation } from '../../Utils'


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

  handleAction = (type, payload) => {
    switch (type) {
      case 'fetchEvent':
        // console.log('fetchEvent')
        this.props.fetchEvent(payload.data)
        break
      case 'followEventAction':
        // console.log('followEventAction')
        this.props.followEventAction(payload.data)
        break
      default:
        console.log('unKnownAction', type, payload)
        break
    }
  }
  render() {
    return this.state.redirect ? <Redirect to="/calander" /> : (
      <Row data-test="mainDiv">
        <HelmetComponent data-test="helmet" pageTitle={this.title} ogTitle={this.title} />
        <FloatButton data-test="floatBtn" className="text-center animated flipInX">
          <Button style={{ borderRadius: '100%', padding: '1rem' }} className="btn-mainclr" onClick={() => this.props.history.push('/notifications')}>
            <FontAwesomeIcon icon={faUndo} size="lg" />
          </Button>
        </FloatButton>
        <FloatLeft data-test="leftCol" lg="3">
          <Menu />
        </FloatLeft>
        <MainCol data-test="mainCol" lg="6" className="offset-lg-3 order-3 order-lg-2 animated fadeIn" >
          <EventDetailsQuery myId={this.props.auth.id} id={this.id} handleAction={this.handleAction}  />
        </MainCol>
      </Row>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default {
  component: connect(mapStateToProps, { fetchEvent, followEventAction })(checkLoggedIn(requireAuth(EventPage)))
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