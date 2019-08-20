import React from 'react'
import { FlatCard, SmallProfileImg, FlatCardStatic } from '../../Elements'
import { CardTitle } from 'reactstrap'
import DeleteCommentMutation from './DeleteCommentMutation'
import styled from 'styled-components'
import { timeAgo } from '../../Utils'

import Avatar from '../../../assets/logos/new_logo.png'
const imgAvatar = Avatar.replace('build', '').replace('/public', '')

export default function Comment(props) {
  const { id, body, createdAt, name, profileImgUrl, myComment, post } = props
  const PostedTime = timeAgo(Date.now(), createdAt)
  return (
    <FlatCardStatic
      className="mx-2 animated fadeIn mt-1"
      style={{ background: 'antiquewhite', borderRadius: '20px' }}
    >
      {myComment && (
        <DeleteCommentMutation
          handleAction={props.handleAction}
          post={post}
          comment={id}
          close
        />
      )}
      <div className="d-flex">
        <SmallProfileImg
          className="mr-3"
          src={profileImgUrl ? profileImgUrl : imgAvatar}
          alt="my profile img"
        />
        <div>
          <HoverCardTitle
            className="mb-0 text-capitalize"
            onClick={() =>
              props.handleAction('redirect', { data: props.profileUrl })
            }
          >
            {name}
            <span className="lo-text"> commented</span>
          </HoverCardTitle>
          <CreatedAt className="ml-0 pl-0">{PostedTime}</CreatedAt>
        </div>
      </div>
      <div style={{ whiteSpace: 'pre-wrap' }} className="text-left ml-4 mb-1">
        {body}
      </div>
    </FlatCardStatic>
  )
}

const CreatedAt = styled.p`
  font-size: 0.6rem;
  text-align: left;
`

const HoverCardTitle = styled(CardTitle)`
  &:hover {
    font-weight: 700;
    cursor: pointer;
  }
`
