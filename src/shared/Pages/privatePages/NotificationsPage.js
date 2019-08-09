import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'

import {
  HelmetComponent,
  NotificationsContainer,
  LiveNotification
} from '../../Components'
import {
  fetchMyNotifications,
  fetchFirstNotifications
} from '../../Store/actions'
import requireAuth from '../../HOC/requireAuth'
import checkLoggedIn from '../../HOC/checkLoggedIn'
import Menu from '../../Routes/Menu'
import { mediaQueries } from '../../Utils'

export class NotificationsPage extends Component {
  constructor(props) {
    super(props)
    this.title = 'notifications'
    this.state = {
      loadMore: true
    }
  }

  handleAction = (type, payload) => {
    switch (type) {
      case 'fetchMyNotifications':
        // console.log('fetchMyNotifications')
        this.props.fetchMyNotifications(payload.data, payload.count)
        break
      case 'fetchFirstNotifications':
        // console.log('fetchFirstNotifications')
        this.props.fetchFirstNotifications(payload.data)
        break
      default:
        console.log('unKnownAction', type, payload)
        break
    }
  }
  setLoadMore = (data) => {
    setTimeout(() => {
      this.setState({ loadMore: data })
    }, 500);
    
  }
  render() {
    return (
      <Row data-test="mainDiv" className="text-center">
        <HelmetComponent
          data-test="helmet"
          pageTitle={this.title}
          ogTitle={this.title}
        />
        <FloatLeft data-test="leftCol" lg="3">
          <Menu />
        </FloatLeft>
        <Col
          data-test="mainCol"
          lg="9"
          className="offset-lg-3 order-3 order-lg-2 animated fadeIn"
        >
          <LiveNotification
            data-test="liveNotificationContainer"
            handleAction={this.handleAction}
            myNotifications={this.props.myNotifications}
            seen={this.props.auth.seen}
            myId={this.props.auth.id}
          />
          <NotificationsContainer
            data-test="notificationContainer"
            myNotifications={this.props.myNotifications}
            handleAction={this.handleAction}
            seen={this.props.auth.seen}
            myId={this.props.auth.id}
            setLoadMore={this.setLoadMore}
            loadMore={this.state.loadMore}
          />
        </Col>
      </Row>
    )
  }
}

function mapStateToProps({ auth, myNotifications }) {
  return { auth, myNotifications }
}

export default {
  component: connect(
    mapStateToProps,
    { fetchMyNotifications, fetchFirstNotifications }
  )(checkLoggedIn(requireAuth(NotificationsPage))),
  loadData: ({ dispatch }) => dispatch(fetchMyNotifications())
}
const FloatLeft = styled(Col)`
  display: none;
  position: static !important;
  top: 3.5rem;
  left: 0rem;
  ${mediaQueries.lg`
  display: block;
  position: fixed!important;
  `}import LiveNotification from './../../Components/Notifications/LiveNotification';
`
