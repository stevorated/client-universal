import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { elevation } from '../../Utils'

import { HelmetComponent } from '../../Components'
import {
  fetchMyPosts,
  fetchMoreMyPosts,
  createPost,
  deletePostAction,
  likePostAction,
  deleteCommentAction,
  pushComment
} from '../../Store/actions'
import requireAuth from '../../HOC/requireAuth'
import checkLoggedIn from '../../HOC/checkLoggedIn'
import { ProfileContainer, ScrollContainer, InfoContainer } from '../../Components'
import { mediaQueries } from '../../Utils'
import Avatar from '../../../assets/logos/new_logo.png'
const deafultImage = Avatar.replace('build', '').replace('/public', '')

export class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.title = 'Profile Page'
    this.state = {
      redirect: false
    }
    
    // console.log(this.props)
  }

  componentDidMount() {
    if(!this.props.posts.length) {
      this.props.fetchMyPosts(this.props.posts.length)
    }
  }

  redirectBack = () => {
    this.setState({ redirect: true })
  }

  handleAction = (type, payload) => {
    switch (type) {
      case 'fetchMyPosts':
        // console.log('fetchMyPosts')
        this.props.fetchMyPosts(payload.data, payload.count)
        break
      case 'fetchMoreMyPosts':
        // console.log('fetchMoreMyPosts')
        this.props.fetchMoreMyPosts(payload.data)
        break
      case 'createPost':
        // console.log('handleCreatePost')
        this.props.createPost(payload.data)
        break
      case 'deletePostAction':
        
        // console.log('handleDeletePostAction')
        this.props.deletePostAction(payload.data)
        break
      case 'likePostAction':
        // console.log('handleLikePostAction')
        this.props.likePostAction(payload.data, payload.post)
        break
      case 'pushComment':
        // console.log('handlePushComment')
        this.props.pushComment(payload.data)
        break
      case 'deleteCommentAction':
        // console.log('handleDeleteCommentAction')
        this.props.deleteCommentAction(payload.comment, payload.post)
        break
      default:
        console.log('unKnownAction', type, payload)
        break
    }
  }



  render() {
    const { auth, profilePosts, profileDetails, posts } = this.props
    return this.state.redirect ? (
      <Redirect to="/event-board" />
    ) : (
      <Row data-test="mainDiv" className="animated fadeIn">
        <FloatButton className="text-center animated flipInX">
          <Button
            style={{ borderRadius: '100%', padding: '.7rem' }}
            className="btn-mainclr ml-auto"
            onClick={this.redirectBack}
          >
            <FontAwesomeIcon icon={faHome} size="2x" />
          </Button>
        </FloatButton>
        <HelmetComponent data-test="helmet" pageTitle={this.title} ogTitle={this.title} />
        <FloatLeft data-test="leftCol" lg="3">
          <ProfileContainer
          
          details={auth}
          auth={auth}
          profileDetails={profileDetails}
          profilePosts={profilePosts}
          />
        </FloatLeft>
        <Col lg="6" data-test="mainCol" className="offset-lg-3 order-3 order-lg-2">
          <ScrollContainer
            data-test="scroll"
            myId={auth.id}
            myAvatar={auth.avatar && auth.avatar.url}
            posts={posts}
            handleAction={this.handleAction}
          />
        </Col>
        <Col lg="3" data-test="rightCol" className="order-2 order-lg-3 mt-lg-3 mt-1">
          <InfoContainer />
          <InfoContainer />
          <InfoContainer />
        </Col>
      </Row>
    )
  }
}

function mapStateToProps({ auth, posts, profilePosts, profileDetails }) {
  return { auth, posts, profilePosts, profileDetails }
}

export default {
  component: connect(
    mapStateToProps,
    {
      fetchMyPosts,
      fetchMoreMyPosts,
      createPost,
      deletePostAction,
      likePostAction,
      deleteCommentAction,
      pushComment
    }
  )(checkLoggedIn(requireAuth(ProfilePage))),
  loadData: ({ dispatch }) => dispatch(fetchMyPosts())
}

const x = '4rem'
const FloatLeft = styled(Col)`
  position: static !important;
  top: 4rem;
  left: 0rem;
  ${mediaQueries.lg`
  position: fixed!important;
  `}
`
const FloatButton = styled.div`
  position: fixed !important;
  bottom: 1vh;
  right: 5vw;
  border-radius: 100%;
  z-index: 1;
  ${elevation[5]}
  ${mediaQueries.lg`
  bottom: 6vh;
  `}
`
