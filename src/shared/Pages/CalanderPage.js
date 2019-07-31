import React, { Component, Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { HelmetComponent, CalanderContainer, Events } from '../Components'
import { fetchCurrentUser } from '../Store/actions'
import requireAuth from '../HOC/requireAuth'
import checkLoggedIn from '../HOC/checkLoggedIn'
import Menu from '../Routes/Menu'
import moment from 'moment'
import { mediaQueries } from '../Utils'

class CalanderPage extends Component {
  constructor(props) {
    super(props)
    this.title = 'Calander'
    this.fname = this.props.auth.fname
    this.state = {
      targetMonth: moment().startOf('M').format('YYYY-MM-DD'),
      dayInfocus: null,
      eventsInFocus: [],
      loading: false
    }
  }

  dayOfWeek = (date) => {
    const rawDay = moment(date).day()
    if (rawDay === 7) return 1
    else return rawDay + 1
  }

  handleChangeMonth = (e) => {
    const target = e.target.value
    this.setState({ targetMonth: target, dayInFocus: null, eventsInFocus: [] })
  }

  handleChangeDayFocus = (events, date) => {
    this.setState({ loading: true, eventsInFocus: events, dayInFocus: date })
    setTimeout(() => {
      this.setState({loading: false})
    }, 2000)
  }

  render() {
    return (
      <Fragment>
        <Row className="mb-0 pb-5">
          <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
          <FloatLeft lg="3">
            <Menu />
          </FloatLeft>
          <Col lg="9" className="offset-lg-3 order-3 order-lg-2 animated fadeIn mt-lg-3" >
            <CalanderContainer
              className=""
              name={this.fname}
              targetMonth={this.state.targetMonth}
              // dayInfocus={this.state.dayInfocus}
              handleChangeMonth={this.handleChangeMonth}
              handleChangeDayFocus={this.handleChangeDayFocus}
              dayInFocus={this.state.eventsInFocus.length
                ? parseInt(moment(this.state.eventsInFocus[0].startDate).format('DD'))
                : ''}
              eventsInFocus={this.state.eventsInFocus}
              loading={this.state.loading}
            />
          </Col>
        </Row>
      </Fragment>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default {
  component: connect(mapStateToProps, {})(requireAuth(checkLoggedIn(CalanderPage))),
  loadData: ({ dispatch }) => {
    dispatch(fetchCurrentUser())
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

