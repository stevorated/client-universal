import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardTitle,
  CardText,
  Button,
  CardBody
} from 'reactstrap'
import styled from 'styled-components'
import LikePostMut from './LikePostMut'
import {
  Comments,
  AddCommentContainer,
  DeletePostMutation
} from './'
import { SmallProfileImg, StyledLink } from '../../Elements'
import { black, elevation, transition, timeAgo } from '../../Utils'

function Post(props) {
  // console.log(props)
  const { avatarUrl, myPost, myId, post, name, show } = props
  const { createdBy, createdAt, id, body, comments, likes } = post

  const [animation, setAnimation] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [showComments, setShowComments] = useState(show || false)
  const [hideDeletedPost, setHideDeletedPost] = useState(false)
  const profileUrl = `/profile/${createdBy.id}`

  const openForm = () => {
    setShowForm(!showForm)
  }
  const toggleComments = () => {
    setShowComments(!showComments)
  }

  const PostedTime = timeAgo(Date.now(), createdAt)
  return !hideDeletedPost ? (
    <div className={` text-center mb-3`}>
      <StyledCard>
        <CardBody>
          {myPost && (
            <DeletePostMutation
              data-test="deletePostBtn"
              handleAction={props.handleAction}
              hideDeletedPost={hideDeletedPost}
              setHideDeletedPost={setHideDeletedPost}
              post={id}
              close
            />
          )}
          <div className="d-flex">
            <ProfileLink to={profileUrl}>
              <SmallProfileImg
                className="mr-3"
                src={avatarUrl}
                alt=".."
              />
            </ProfileLink>
            <div>
              <CardTitle className="mb-0 text-capitalize">
                <ProfileLink to={profileUrl}>{name}</ProfileLink>
                <span className="lo-text"> posted</span>
              </CardTitle>
              <CreatedAt className="ml-0 pl-0">{PostedTime}</CreatedAt>
            </div>
          </div>
          {body.length > 20 ? (
            <CardText
              style={{ whiteSpace: 'pre-wrap' }}
              className="mb-4 mt-2 text-left ml-2"
            >
              {body}
            </CardText>
          ) : (
            <CardText className="mb-4 mt-2 text-left ml-2">{body}</CardText>
          )}
          <div className="d-flex">
            <Button
              size="sm"
              className={`px-2 btn-mainclr ${animation}`}
              onClick={
                comments.length > 0
                  ? toggleComments
                  : () => {
                      setAnimation(animation + ' animated shake ')
                      setTimeout(() => {
                        setAnimation('')
                      }, 1000)
                    }
              }
            >
              {comments ? comments.length : '0'} Comments
            </Button>
            <div className="ml-auto">
              <LikePostMut
                myId={myId}
                post={id}
                likes={likes}
                handleAction={props.handleAction}
              />
            </div>
          </div>
        </CardBody>
        {showForm && (
          <AddCommentContainer
            handleAction={props.handleAction}
            commentCount={comments.length}
            setShowComments={setShowComments}
            setShowForm={setShowForm}
            createdBy={createdBy}
            id={id}
            openForm={openForm}
          />
        )}
      </StyledCard>
      {!showComments && (
        <StyledLink to="#" onClick={openForm} className="small-text">
          {showForm ? 'Hide' : 'Add a Comment'}
        </StyledLink>
      )}
      {showComments && (
        <Comments
          data-test="comments"
          myId={props.myId}
          myAvatar={props.myAvatar}
          handleAction={props.handleAction}
          setShowComments={setShowComments}
          comments={comments}
          id={id}
          post={id}
        />
      )}
    </div>
  ) : null
}

export default Post

const ProfileLink = styled(Link)`
  color: ${black};
  &:hover {
    text-decoration: none;
  }
`

const CreatedAt = styled.p`
  font-size: 0.6rem;
  text-align: left;
`
const StyledCard = styled(Card)`
  color: ${black};
  background: whitesmoke;
  opacity: 0.9;
  border-radius: 0.3rem;
  /* margin: .4rem; */
  ${elevation[3]}
  transition: all 3s ease;
  ${transition({
    property: 'box-shadow'
  })};
  &:hover {
    ${elevation[4]};
  }
`
