import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { HelmetComponent } from '../../Components'
import {
  fetchFeed,
  createPost,
  deletePostAction,
  likePostAction,
  deleteCommentAction,
  pushComment
} from '../../Store/actions'
import requireAuth from '../../HOC/requireAuth'
import checkLoggedIn from '../../HOC/checkLoggedIn'
import Menu from '../../Routes/Menu'
import FeedScrollQuery from '../../Components/Feed/FeedScrollQuery'
import FeedActivity from '../../Components/Feed/FeedActivity'
import FeedExtraRight from '../../Components/Feed/FeedExtraRight'
import { mediaQueries } from '../../Utils'

export class FeedPage extends Component {
  constructor(props) {
    super(props)
    this.title = 'Feed'
  }
  
  handleAction = (type, payload) => {
    switch (type) {
      case 'fetchFeed':
        // console.log('handleFetchFeed')
        this.props.fetchFeed(payload.data, payload.count)
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
    return (
      <Row data-test="main-div">
        <HelmetComponent
          data-test="helmet"
          pageTitle={this.title}
          ogTitle={this.title}
        />
        <FloatLeft data-test="leftCol" lg="3">
          <Menu />
        </FloatLeft>
        <Col
          lg="6"
          data-test="mainCol"
          className="offset-lg-3 order-3 order-lg-2 animated fadeIn"
        >
          <FeedScrollQuery
            data-test="feedScrollQuery"
            myId={this.props.auth.id}
            myAvatar={this.props.auth.avatar && this.props.auth.avatar.url}
            posts={this.props.feed}
            handleAction={this.handleAction}
          />
        </Col>
        <Col
          lg="3"
          data-test="rightCol"
          className="order-2 order-lg-3 mt-2 animated fadeIn"
        >
          <FeedExtraRight />
          <FeedExtraRight />
          <FeedActivity />
          <FeedActivity />
          <FeedActivity />
        </Col>
      </Row>
    )
  }
}

function mapStateToProps({ feed, auth }) {
  return { feed, auth }
}

export default {
  component: connect(
    mapStateToProps,
    {
      fetchFeed,
      createPost,
      deletePostAction,
      deleteCommentAction,
      likePostAction,
      pushComment
    }
  )(checkLoggedIn(requireAuth(FeedPage))),
  loadData: ({ dispatch }) => dispatch(fetchFeed())
}
const FloatLeft = styled(Col)`
  position: static !important;
  top: 3.5rem;
  left: 0rem;
  ${mediaQueries.lg`
  position: fixed!important;
`}
`
