import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo, faBell } from '@fortawesome/free-solid-svg-icons'

import { fetchFeed, clearFeed } from '../Store/actions'
import requireAuth from '../HOC/requireAuth'
import checkLoggedIn from '../HOC/checkLoggedIn'
import { HelmetComponent, SinglePostContainer } from '../Components'
import Menu from '../Routes/Menu'
import NavComponent from '../Routes/NavComponent'
import { mediaQueries, backClr, elevation } from '../Utils'
import { FlatCard } from '../Elements'
class SinglePostPage extends Component {

  constructor(props) {
    super(props)
    this.id = props.match.params.id
    this.title = `Post ${this.id}`
    this.state = {
      redirect: false
    }
  }

  redirectBack = () => {
    this.setState({ redirect: true })
  }

  render() {
    return this.state.redirect ? <Redirect to="/notifications" /> : (
      <Row>
        <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
        <FloatButton className="text-center animated flipInX">
          <Button style={{ borderRadius: '100%', padding: '.7rem' }} className="btn-mainclr ml-auto" onClick={this.redirectBack}>
            <FontAwesomeIcon icon={faBell} size="2x" />
          </Button>
        </FloatButton>
        <FloatLeft lg="3">
          <Menu />
        </FloatLeft>
        <MainCol lg="9" className="offset-lg-3 order-3 order-lg-2 animated fadeIn mt-lg-4" >
          <SinglePostContainer id={this.id} />
        </MainCol>
      </Row>
    )
  }
}

function mapStateToProps({ feed }) {
  return { feed }
}

export default {
  component: connect(mapStateToProps, { fetchFeed })(checkLoggedIn(requireAuth(SinglePostPage)))
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

