import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { elevation } from '../Utils'

import { HelmetComponent } from '../Components'
import { fetchMyPosts } from '../Store/actions'
import requireAuth from '../HOC/requireAuth'
import checkLoggedIn from '../HOC/checkLoggedIn'
import { ProfileContainer, ScrollContainer, InfoContainer } from '../Components'
import { mediaQueries } from '../Utils'

class ProfilePage extends Component {

  constructor(props) {
    super(props)
    this.title = 'Profile Page'
    this.state = {
      redirect: false
    }
  }

  componentDidMount() {
    // if first load load only 5 posts (total 10)
    const postCount = this.props.posts.length || 5
    this.props.fetchMyPosts(postCount)
  }

  redirectBack = () => {
    this.setState({ redirect: true })
  }
  render() {
    return this.state.redirect ? <Redirect to="/feed" /> : (
      <ProfilePageRow className="animated fadeIn">
        <FloatButton className="text-center animated flipInX">
          <Button style={{ borderRadius: '100%', padding: '.7rem' }} className="btn-mainclr ml-auto" onClick={this.redirectBack}>
            <FontAwesomeIcon icon={faHome} size="2x" />
          </Button>
        </FloatButton>
        <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
        <FloatLeft lg="3">
          <ProfileContainer />
        </FloatLeft>
        <Col lg="6" className="offset-lg-3 order-3 order-lg-2" >
          <ScrollContainer />
        </Col>
        <Col lg="3" className="order-2 order-lg-3 mt-lg-3 mt-1">
          <InfoContainer />
          <InfoContainer />
          <InfoContainer />
        </Col>
      </ProfilePageRow>
    )
  }
}

function mapStateToProps({ users, posts }) {
  return { users, posts }
}

export default {
  component: connect(mapStateToProps, { fetchMyPosts })(checkLoggedIn(requireAuth(ProfilePage))),
  loadData: ({ dispatch }) => dispatch(fetchMyPosts())
}

const ProfilePageRow = styled(Row)`
  /* display: block; */
`
// const StyledInfo = styled(InfoContainer)`
// /* ${mediaQs.mamabear `
//     margin-top:0;
// `} */
//   margin-top: 0!important;
// `

const x = '4rem'
const FloatLeft = styled(Col)`
  position: static!important;
  top: 4rem;
  left: 0rem;
  ${mediaQueries.lg`
  position: fixed!important;
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

