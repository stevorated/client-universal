import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'

import { ProfileScrollContainer } from '../../Components'
import Menu from '../../Routes/Menu'
import { HelmetComponent, ProfileContainer } from '../../Components'
import styled from 'styled-components'
import { mediaQs } from '../../Utils'
import checkLoggedIn from '../../HOC/checkLoggedIn'
import requireAuth from '../../HOC/requireAuth'
import { FeedActivity, FeedExtraRight } from '../../Components/Feed'
import {
  followUserAction,
  fetchUsersPosts,
  clearUsersPosts,
  createPost,
  deletePostAction,
  likePostAction,
  deleteCommentAction,
  pushComment
} from '../../Store/actions'

export class UserProfilePage extends Component {
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

  handleAction = (type, payload) => {
    switch (type) {
      case 'fetchUsersPosts':
        // console.log('handleFetchUsersPosts')
        this.props.fetchUsersPosts(payload.data, payload.id)
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
      case 'followUserAction':
        // console.log('handleFollowUserAction')
        this.props.followUserAction(payload.follow, payload.user)
        break
      default:
        console.log('unKnownAction', type, payload)
        break
    }
  }

  render() {
    const { auth, profileDetails } = this.props
    return (
      <Row data-test="mainDiv" className="animated fadeIn">
        <HelmetComponent data-test="helmet" pageTitle={this.title} ogTitle={this.title} />
        <FloatLeft data-test="leftCol" lg="3">
          <Menu />
        </FloatLeft>
        <Col data-test="mainCol" lg="6" className="offset-xl-3 order-3 order-lg-2">
          <ProfileContainer 
            id={this.id} 
            myId={this.props.auth.id}
            details={profileDetails}
            auth={auth}
            profileMode={true}
            handleAction={this.handleAction}
          />
          <ProfileScrollContainer
            id={this.id}
            myId={this.props.auth.id}
            myAvatar={this.props.auth.avatar && this.props.auth.avatar.url}
            posts={this.props.profilePosts}
            handleAction={this.handleAction}
          />
        </Col>
        <Col data-test="rightCol" lg="3" className="order-2 order-lg-3 mt-lg-3">
          <FeedActivity />
          <FeedExtraRight />
          <FeedExtraRight />
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = ({ auth, profilePosts, profileDetails }) => {
  return { auth, profilePosts, profileDetails }
}

export default {
  component: connect(
    mapStateToProps,
    {
      followUserAction,
      fetchUsersPosts,
      clearUsersPosts,
      createPost,
      deletePostAction,
      likePostAction,
      deleteCommentAction,
      pushComment
    }
  )(checkLoggedIn(requireAuth(UserProfilePage)))
  // loadData: ({ dispatch }) => dispatch(fetchUsersPosts(null))
}

const FloatLeft = styled(Col)`
  position: fixed!important;
  top: 4.8rem;
  left: 0rem;
  ${mediaQs.papabear`
    position: static!important;
  `}
  ${mediaQs.brotherbear`
    position: static!important;
  `}
  ${mediaQs.mamabear`
    position: static!important;
  `}
`
