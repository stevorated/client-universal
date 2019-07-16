import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { HelmetComponent } from '../Components'
import { fetchMyPosts } from '../Store/actions'
import requireAuth from '../HOC/requireAuth'
import checkLoggedIn from '../HOC/checkLoggedIn'
import { ProfileContainer, ScrollContainer, InfoContainer } from '../Components'
import { mediaQueries } from '../Utils'

class ProfilePage extends Component {

  constructor (props) {
    super(props)
    this.title = 'Profile Page'
  }

  componentDidMount() {
    // if first load load only 5 posts (total 10)
    const postCount = this.props.posts.length || 5
    this.props.fetchMyPosts(postCount)
  }
  
  render() {
    return(
      <ProfilePageRow className="animated fadeIn">
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
  component: connect(mapStateToProps, {fetchMyPosts})(checkLoggedIn(requireAuth(ProfilePage))),
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


