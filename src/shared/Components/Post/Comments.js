import React, { Fragment, useState } from 'react'
import { Card } from 'reactstrap'
import { CSSTransition } from 'react-transition-group'
import Comment from './Comment'
import AddCommentContainer from './AddCommentContainer'
import { StyledLink } from '../../Elements'
import Avatar from '../../../assets/logos/new_logo.png'
import styled from 'styled-components'
import { elevation } from '../../Utils'
const defaultImg = Avatar.replace('build', '').replace('/public', '')
const { API_BASE } = process.env

function Comments(props) {
  // console.log(props)
  const { comments, id, myId, myAvatar, setShowComments } = props
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
    <CSSTransition timeout={1000}>
      <div className="mt-2" style={{ opacity: '0.8', marginTop: '0' }}>
        {renderQuery()}
        <StyledLink to="#" onClick={openForm} className="m-2 small-text">
          {showForm ? 'Hide' : 'Comment'}
        </StyledLink>
        <div
          style={{
            height: showForm ? '100%' : '0',
            display: showForm ? 'block' : 'none'
          }}
        >
          <ShaddowCard className="pt-1 mt-2 mx-2" style={{ background: 'whitesmoke', borderRadius: '12px' }}>
            <AddCommentContainer
              id={id}
              handleAction={props.handleAction}
              openForm={openForm}
              setShowComments={setShowComments}
              setShowForm={setShowForm}
              commentCount={comments.length}
            />
          </ShaddowCard>
        </div>
      </div>
    </CSSTransition>
  )
}

export default Comments

const ShaddowCard = styled(Card)`
${elevation[6]};
margin-bottom: 1rem;
`
