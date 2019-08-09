import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo, faBell } from '@fortawesome/free-solid-svg-icons'

import {
  fetchPost,
  deletePostAction,
  deleteCommentAction,
  likePostAction,
  pushComment
} from '../../Store/actions'
import requireAuth from '../../HOC/requireAuth'
import checkLoggedIn from '../../HOC/checkLoggedIn'
import { HelmetComponent, SinglePostContainer } from '../../Components'
import Menu from '../../Routes/Menu'
import { mediaQueries, elevation } from '../../Utils'

export class SinglePostPage extends Component {
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

  handleAction = (type, payload) => {
    switch (type) {
      case 'fetchPost':
        // console.log('handleFetchPost')
        this.props.fetchPost(payload.data)
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
    return this.state.redirect ? (
      <Redirect data-test="redirect" to="/notifications" />
    ) : (
      <Row data-test="mainDiv">
        <HelmetComponent data-test="helmet" pageTitle={this.title} ogTitle={this.title} />
        <FloatButton data-test="floatBtn" className="text-center animated flipInX">
          <Button
            data-test="backBtn"
            style={{ borderRadius: '100%', padding: '.7rem' }}
            className="btn-mainclr ml-auto"
            onClick={this.redirectBack}
          >
            <FontAwesomeIcon icon={faBell} size="2x" />
          </Button>
        </FloatButton>
        <FloatLeft data-test="leftCol" lg="3">
          <Menu />
        </FloatLeft>
        <MainCol
          data-test="mainCol"
          lg="9"
          className="offset-lg-3 order-3 order-lg-2 animated fadeIn mt-lg-5 mt-2"
        >
          <SinglePostContainer
            data-test="singlePostContainer"
            id={this.id}
            myId={this.props.auth.id}
            myAvatar={this.props.auth.avatar && this.props.auth.avatar.url}
            singlePost={this.props.singlePost}
            handleAction={this.handleAction}
          />
        </MainCol>
      </Row>
    )
  }
}

function mapStateToProps({ singlePost, auth }) {
  return { singlePost, auth }
}

export default {
  component: connect(
    mapStateToProps,
    {
      fetchPost,
      deletePostAction,
      likePostAction,
      deleteCommentAction,
      pushComment
    }
  )(checkLoggedIn(requireAuth(SinglePostPage)))
}
const FloatLeft = styled(Col)`
  position: static !important;
  top: 3.5rem;
  left: 0rem;
  ${mediaQueries.lg`
  position: fixed!important;
  `}
`
const MainCol = styled(Col)`
  padding-bottom: 100px;
  ${mediaQueries.lg`
  padding-right: 2rem;
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
