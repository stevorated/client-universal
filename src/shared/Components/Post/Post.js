import React, { Fragment, useState, useEffect  } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Col, Row, Card, CardTitle, CardSubtitle, CardText, Button, CardBody
} from 'reactstrap'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeer } from '@fortawesome/free-solid-svg-icons'
import LikePostMut from './LikePostMut'
import { Comments, AddCommentForm, AddCommentContainer, DeletePostMutation } from './'
import { SmallProfileImg, StyledLink } from '../../Elements'
import { black, elevation, transition, timeAgo } from '../../Utils'

import Avatar from '../../../assets/logos/new_logo.png'
const imgAvatar = Avatar.replace('build', '').replace('/public', '')

function Post(props) {
  const [ animation, setAnimation ] = useState('')
  const [ showForm, setShowForm ] = useState(false)
  const [ showComments, setShowComments ] = useState(false)
  const [ hideDeletedPost, setHideDeletedPost ] = useState(false)
  const MyPost = props.createdBy.id === props.auth.id
  const profileUrl = `/profile/${props.createdBy.id}`

  const openForm = () => {
    setShowForm(!showForm)
  }
  const toggleComments = () => {
    setShowComments(!showComments)
  }
  
  const animatedClass = 'animated fadeIn slow'
  const PostedTime = timeAgo(Date.now(),props.createdAt)
  return !hideDeletedPost ? (
    <div className={` text-center`}>
      <StyledCard  >
        <CardBody>
          {MyPost && <DeletePostMutation 
          hideDeletedPost={hideDeletedPost}
          setHideDeletedPost={setHideDeletedPost}
          post={props.id}
          close />}
          <div className="d-flex">
            <ProfileLink to={profileUrl} >
              <SmallProfileImg
                className="mr-3"
                src={props.linkUrl ? props.linkUrl : imgAvatar}
                alt=".." />
            </ProfileLink>
            <div>
              <CardTitle className="mb-0 text-capitalize">
                <ProfileLink to={profileUrl}>{props.name}</ProfileLink>
                <span className="lo-text"> posted</span>
              </CardTitle>
              <CreatedAt className="ml-0 pl-0">{PostedTime}</CreatedAt>
            </div>
          </div>
          {props.body.length > 20 
          ?
          <CardText style={{whiteSpace: 'pre-wrap'}} className="mb-4 mt-2 text-left ml-2">
            {props.body}
          </CardText>
          :
          <CardText className="mb-4 mt-2 text-left ml-2">
           {props.body}
          </CardText> 
          }
          <div className="d-flex">
            <Button 
            size="sm" 
            className={`px-2 btn-mainclr ${animation}`}
            onClick={ props.comments.length >0 ? toggleComments : (()=>{
              setAnimation(animation + ' animated shake ')
              setTimeout(()=> {
                setAnimation('')
              }, 1000)
            })}>
            {props.comments ? props.comments.length : '0'} Comments
            </Button>
            <div className="ml-auto" >
              <LikePostMut post={props.id} likes={props.likes} myId={props.auth.id}  />
            </div>
          </div>
        </CardBody>
        {showForm && 
          <AddCommentContainer
          commentCount={props.comments.length}
          setShowComments={setShowComments}
          setShowForm={setShowForm}
          feedMode={props.feedMode}
          myPostsMode={props.myPostsMode}
          profileMode={props.profileMode}
          createdBy={props.createdBy}
          id={props.id} 
          openForm={openForm} />}
      </StyledCard>
      {!showComments && 
        <StyledLink 
        to="#" 
        onClick={openForm} 
        className="small-text">
        {showForm ? 'Hide' : 'Add a Comment'}
        </StyledLink>}
      {showComments &&  
        <Comments 
        feedMode={props.feedMode} 
        myPostsMode={props.myPostsMode}  
        profileMode={props.profileMode}
        comments={props.comments} 
        id={props.id} 
        post={props.id}
        />}
    </div>
  ) : (
    <span className="animated fadeOut turtle">Done, Hope Your're Happy ..</span>
  )
}

function mapStateToProps({auth}){
  return { auth }
}
 
export default connect(mapStateToProps)(Post)

const ProfileLink = styled(Link)`
color: ${black};
&:hover {
  text-decoration: none;
}
`

const CreatedAt = styled.p`
font-size: .6rem;
text-align: left;
`
const StyledCard = styled(Card)`
      color: ${black};
      background: whitesmoke;
      opacity: .9;
      border-radius: .3rem;
      /* margin: .4rem; */
      ${elevation[3]};
      transition: all 3s ease;
      ${transition({
  property: 'box-shadow'
})};
      &:hover {
            ${elevation[4]};
      }
`

