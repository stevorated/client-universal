import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { CSSTransition } from 'react-transition-group'
import {
  HelmetComponent,
  ProfileContainer,
  LittleMenu,
  ProfileScrollContainer,
  FeedActivity,
  FeedExtraRight,
  ProfileEventContainer
} from '../../Components'
import Menu from '../../Routes/Menu'
import styled from 'styled-components'
import { mediaQueries } from '../../Utils'
import checkLoggedIn from '../../HOC/checkLoggedIn'
import requireAuth from '../../HOC/requireAuth'
import {
  followUserAction,
  fetchUsersPosts,
  clearUsersPosts,
  createPost,
  deletePostAction,
  likePostAction,
  deleteCommentAction,
  pushComment,
  fetchUserEventsAction,
  fetchNextEvents,
  fetchEvents,
  createEventAction,
  followEventAction
} from '../../Store/actions'
import { FlatCardStatic } from './../../Elements'

export class UserProfilePage extends Component {
  constructor(props) {
    super(props)
    this.title = 'profile page'
    this.id = props.match.params.id
    this.state = {
      id: props.match.params.id,
      loadMore: true,
      showPosts: true
    }
  }

  componentDidMount = () => {
    if (!this.props.profileDetails) {
      this.props.fetchUsersPosts(payload.data, payload.id)
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
      case 'fetchUserEventsAction':
        // console.log('fetchUserEventsAction')
        this.props.fetchUserEventsAction(payload.data)
        break

      case 'fetchNextEvents':
        // console.log('fetchNextEvents')
        this.props.fetchNextEvents(payload.data)
        break
      case 'fetchEvents':
        // console.log('fetchEvents')
        this.props.fetchEvents(payload.data, payload.count)
        break
      case 'createEventAction':
        // console.log('createEventAction')
        this.props.createEventAction(payload.data)
        break
      case 'followEventAction':
        // console.log('followEventAction')
        this.props.followEventAction(payload.data, payload.event)
        break
      case 'redirect':
        // console.log('followEventAction')
        setTimeout(() => {
          this.props.history.push(`/event/${payload.id}`)
        }, 100)
        break
      default:
        console.log('unKnownAction', type, payload)
        break
    }
  }

  handleChangeView = data => {
    this.setState({ showPosts: !this.state.showPosts })
  }

  setLoadMore = loadMore => {
    this.setState({ loadMore })
  }

  render() {
    const { auth, profileDetails } = this.props
    return (
      <CSSTransition timeout={1000}>
        <Row data-test="mainDiv" className="animated fadeIn">
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
            lg="8"
            className="offset-lg-3 order-3 order-lg-2 animated fadeIn mt-lg-3"
          >
            <ProfileContainer
              id={this.id}
              myId={this.props.auth.id}
              details={profileDetails}
              auth={auth}
              profileMode={true}
              handleAction={this.handleAction}
            />
            {profileDetails.id && <FlatCardStatic className="mt-2">
              <LittleMenu
                userProfileMode="true"
                items={['posts', 'events']}
                handleChangeState={this.handleChangeView}
                showPosts={this.state.showPosts}
              />
            </FlatCardStatic>}

            {this.state.showPosts && (
              <ProfileScrollContainer
                style={{
                  opacity: !this.state.showPosts && '0',
                  display: !this.state.showPosts && 'none'
                }}
                id={this.id}
                myId={this.props.auth.id}
                myAvatar={this.props.auth.avatar && this.props.auth.avatar.url}
                posts={this.props.profilePosts}
                handleAction={this.handleAction}
                setLoadMore={this.setLoadMore}
                loadMore={this.state.loadMore}
              />
            )}
            {!this.state.showPosts && (
              <ProfileEventContainer
                style={{
                  opacity: !this.state.showPosts && '0',
                  display: !this.state.showPosts && 'none'
                }}
                myId={this.props.auth.id}
                profileName={this.props.profileDetails.fname || this.props.auth.fname}
                id={this.id}
                events={this.props.profileEvents}
                handleAction={this.handleAction}
                events={this.props.profileEvents}
              />
            )}
          </Col>
          <Col
            data-test="rightCol"
            lg="3"
            className="order-2 order-lg-3 mt-lg-2 animated fadeIn mt-lg-2"
          >
          </Col>
        </Row>
      </CSSTransition>
    )
  }
}

const mapStateToProps = ({
  auth,
  profilePosts,
  profileDetails,
  profileEvents
}) => {
  return { auth, profilePosts, profileDetails, profileEvents }
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
      pushComment,
      fetchUserEventsAction,
      fetchNextEvents,
      fetchEvents,
      createEventAction,
      followEventAction
    }
  )(checkLoggedIn(requireAuth(UserProfilePage)))
  // loadData: ({ dispatch }) => dispatch(fetchUsersPosts(null))
}

const FloatLeft = styled(Col)`
  position: static !important;
  top: 3.5rem;
  left: 0rem;
  ${mediaQueries.lg`
  position: fixed!important;
`};
`
