import React, { Component, Fragment, createRef } from 'react'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { HelmetComponent, CalanderContainer, Events, ScrollTo } from '../../Components'
import { fetchCalanderEvents, followEventAction } from '../../Store/actions'
import requireAuth from '../../HOC/requireAuth'
import checkLoggedIn from '../../HOC/checkLoggedIn'
import Menu from '../../Routes/Menu'
import moment from 'moment'
import { mediaQueries } from '../../Utils'

export class CalanderPage extends Component {
  constructor(props) {
    super(props)
    this.ref = createRef()
    this.title = 'Calander'
    this.fname = this.props.auth.fname
    this.state = {
      targetMonth: moment()
        .startOf('M')
        .format('YYYY-MM-DD'),
      dayInfocus: null,
      eventsInFocus: [],
      loading: false
    }
  }

  handleChangeMonth = e => {
    const target = e.target.value
    this.setState({ targetMonth: target, dayInFocus: null, eventsInFocus: [] })
  }

  scrollToBottom = (ref) => {
    // console.log('scrolll')
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }

  handleChangeDayFocus = (events, date) => {
    this.setState({ loading: true, eventsInFocus: events, dayInFocus: date })
    setTimeout(() => {
      this.setState({ loading: false })
    }, 2000)
    setTimeout(()=> {
      this.scrollToBottom(this.ref)
    }, 500)
  }

  handleAction = (type, payload) => {
    switch (type) {
      case 'fetchCalanderEvents':
        // console.log('fetchCalanderEvents')
        this.props.fetchCalanderEvents(payload.data)
        break
      case 'followEventAction':
        // console.log('followEventAction')
        this.props.followEventAction(payload.data, payload.event)
        break
      default:
        console.log('unKnownAction', type, payload)
        break
    }
  }

  render() {
    return (
      <Fragment>
        <Row data-test="mainDiv" className="mb-0">
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
            className="offset-lg-3 order-3 order-lg-2 animated fadeIn mt-lg-3"
          >
            <CalanderContainer
              data-test="calanderContainer"
              myId={this.props.auth.id}
              calander={this.props.calander}
              handleAction={this.handleAction}
              name={this.fname}
              targetMonth={this.state.targetMonth}
              // dayInfocus={this.state.dayInfocus}
              handleChangeMonth={this.handleChangeMonth}
              handleChangeDayFocus={this.handleChangeDayFocus}
              dayInFocus={
                this.state.eventsInFocus.length
                  ? parseInt(
                      moment(this.state.eventsInFocus[0].startDate).format('DD')
                    )
                  : ''
              }
              eventsInFocus={this.state.eventsInFocus}
              loading={this.state.loading}
            />
            <ScrollTo scroll={this.ref} />
          </Col>
        </Row>
      </Fragment>
    )
  }
}

function mapStateToProps({ auth, calander }) {
  return { auth, calander }
}

export default {
  component: connect(
    mapStateToProps,
    { fetchCalanderEvents, followEventAction }
  )(requireAuth(checkLoggedIn(CalanderPage)))
}

const FloatLeft = styled(Col)`
  position: static !important;
  top: 3.5rem;
  left: 0rem;
  ${mediaQueries.lg`
    position: fixed!important;
  `}
`
