import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Card } from 'reactstrap'
import Comment from './Comment'
import AddCommentContainer from './AddCommentContainer'
import { StyledLink } from '../../Elements'
import Avatar from '../../../assets/logos/new_logo.png'
const defaultImg = Avatar.replace('build', '').replace('/public', '')
const { API_BASE } = process.env

function Comments(props) {
  // console.log(props)
  const { comments, id, myId, myAvatar, setShowComments} = props
  const [showForm, setShowForm] = useState(false)
  const openForm = () => {
    setShowForm(!showForm)
  }

  const renderQuery = () => {
    return comments.map(comment => {
      const { id, body, createdBy, createdAt } = comment
      const myComment = myId === createdBy.id
      const commentID = id
      const name = `${createdBy.fname} ${createdBy.lname}`
      // set avatar url if my post render my avatar else post avatar (for refresh when updated)
      // if no avatar set give default image instead
      const { avatar } = createdBy
      const myAvatarUrl = myAvatar ? `${API_BASE}${myAvatar}` : null
      const postAvatarUrl = avatar ? `${API_BASE}${avatar.url}` : null
      const myPost = myId === createdBy.id
      const avatarUrl = myPost ? myAvatarUrl : postAvatarUrl
      
      return (
        <Comment
          data-test="comment"
          handleAction={props.handleAction}
          key={commentID}
          myId={myId}
          id={commentID}
          post={props.post}
          body={body}
          createdAt={createdAt}
          name={name}
          createdBy={createdBy}
          myComment={myComment}
          profileImgUrl={avatarUrl}
        />
      )
    })
  }
  return (
    <div className="mt-2" style={{ opacity: '0.8', marginTop: '0' }}>
      {renderQuery()}
      <StyledLink to="#" onClick={openForm} className="m-2 small-text">
        {showForm ? 'Hide' : 'Comment'}
      </StyledLink>
      {showForm && (
        <Card className="pt-3 mt-2">
          <AddCommentContainer
            id={id}
            handleAction={props.handleAction}
            openForm={openForm}
            setShowComments={setShowComments}
            setShowForm={setShowForm}
            commentCount={comments.length}
          />
        </Card>
      )}
    </div>
  )
}

export default Comments
