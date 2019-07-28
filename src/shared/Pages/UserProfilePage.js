import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import { ProfileScrollContainer } from '../Components'
import Menu from '../Routes/Menu'
import { HelmetComponent, ProfileContainer } from '../Components'
import styled from 'styled-components'
import { mediaQs } from '../Utils'
import checkLoggedIn from '../HOC/checkLoggedIn'
import requireAuth from '../HOC/requireAuth'
import { clearUsersPosts } from '../Store/actions'
import { FeedActivity, FeedExtraRight } from '../Components/Feed'
class UserProfilePage extends Component {
  constructor(props) {
    super(props)
    this.title = 'profile page'
    this.id = props.match.params.id
    this.state = {
      id: props.match.params.id
    }
  }
  componentWillUnmount = () => {
    this.props.clearUsersPosts()
  }
  render() {
    return (
      <Row className="animated fadeIn">
      <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
      <FloatLeft lg="3">
        <Menu />
      </FloatLeft>
      <Col lg="6" className="offset-xl-3 order-3 order-lg-2" >
        <ProfileContainer id={this.id} profileMode={true} />
        <ProfileScrollContainer id={this.id} fatherProps={this.props} />
      </Col>
      <Col lg="3" className="order-2 order-lg-3 mt-lg-3">
        <FeedActivity />
        <FeedExtraRight />
        <FeedExtraRight />
      </Col>
    </Row>
    )
  }
}

export default  {
  component: connect(undefined, {clearUsersPosts})(checkLoggedIn(requireAuth(UserProfilePage)))
} 

const FloatLeft = styled(Col)`
  position: fixed!important;
  top: 4.8rem;
  left: 0rem;
  ${mediaQs.papabear `
    position: static!important;
  `}
  ${mediaQs.brotherbear `
    position: static!important;
  `}
  ${mediaQs.mamabear `
    position: static!important;
  `}
`