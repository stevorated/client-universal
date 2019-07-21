import React from 'react'
import { FlatCard, SmallProfileImg } from '../../Elements'
import { CardTitle } from 'reactstrap'
import DeleteCommentMutation from './DeleteCommentMutation'
import styled from 'styled-components'

import { timeAgo } from '../../Utils'

import Avatar from '../../../assets/logos/new_logo.png'
const imgAvatar = Avatar.replace('build', '').replace('/public', '')

export default function Comment({ id, body, createdAt, name, profileImgUrl, createdBy, myComment, post }) {
  const PostedTime = timeAgo(Date.now(), createdAt)
  return (
    <FlatCard className="bg-white animated fadeIn mt-1" >
      {myComment && <DeleteCommentMutation
        post={post}
        comment={id}
        close />}
      <div className="d-flex">
        <SmallProfileImg
          className="mr-3"
          src={profileImgUrl ? profileImgUrl : imgAvatar}
          alt="my profile img" />
        <div>
          <CardTitle className="mb-0 text-capitalize">{name}<span className="lo-text" > commented</span></CardTitle>
          <CreatedAt className="ml-0 pl-0">{PostedTime}</CreatedAt>
        </div>
      </div>
      <div style={{whiteSpace: 'pre-wrap'}} className="text-left ml-2">{body}</div>
    </FlatCard>
  )
}

const CreatedAt = styled.p`
font-size: .6rem;
text-align: left;
`
