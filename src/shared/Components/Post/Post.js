import React, { Fragment, useState, useEffect  } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Col, Row, Card, CardTitle, CardSubtitle, CardText, Button, CardBody
} from 'reactstrap'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeer } from '@fortawesome/free-solid-svg-icons'
import { Comments, AddCommentForm, AddCommentContainer, DeletePostMutation } from './'
import { SmallProfileImg } from '../../Elements'
import { black, elevation, transition, timeAgo } from '../../Utils'

import Avatar from '../../../assets/logos/new_logo.png'
const imgAvatar = Avatar.replace('build', '').replace('/public', '')

function Post(props) {

  const [ showForm, setShowForm ] = useState(false)
  const [ showComments, setShowComments ] = useState(false)
  const [ hideDeletedComment, setHideDeletedComment ] = useState(false)
  const [ clickDeleteCounter, setClickDeleteCounter ] = useState(0)
  const [ deleteMessage, setDeleteMessage ] = useState('')

  const MyPost = props.createdBy.id === props.auth.id
  const profileUrl = `/profile/${props.createdBy.id}`

  const openForm = () => {
    setShowForm(!showForm)
  }
  const toggleComments = () => {
    setShowComments(!showComments)
  }
  const handleDelete = () => {
    if(clickDeleteCounter === 0) {
      setDeleteMessage('You Sure? click twice')
    }
    if(clickDeleteCounter === 1) {
      setDeleteMessage('final warning ... u sure?')
    }
    if(clickDeleteCounter === 2) {
      setHideDeletedComment(true)
    }
  }
  
  const animatedClass = 'animated fadeIn slow'
  const PostedTime = timeAgo(Date.now(),props.createdAt)
  return !hideDeletedComment ? (
    <div className={`mb-4 text-center ${animatedClass}`}>
      <StyledCard  >
        <CardBody>
          {MyPost && <DeletePostMutation 
          handleDelete={handleDelete}
          hideDeletedComment={hideDeletedComment}
          post={props.id} 
          deleteMessage={deleteMessage} 
          clickDeleteCounter={clickDeleteCounter} 
          setClickDeleteCounter={setClickDeleteCounter}
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
          <CardText className="mb-4 mt-2 text-left ml-2">
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
            className="px-2 btn-mainclr"
            // style={{padding: '0.3rem'}} 
            onClick={ props.comments.length >0 ? toggleComments : (()=>{})}>
            {props.comments ? props.comments.length : '0'} Comments
            </Button>
            <div className="ml-auto" >
              <Button size="sm" className="btn-mainclr ml-2 px-2">
              0 Likes 
              <FontAwesomeIcon icon={faBeer} className="ml-2 text-warning" />
              </Button>
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
      margin: .4rem;
      ${elevation[3]};
      transition: all 3s ease;
      ${transition({
  property: 'box-shadow'
})};
      &:hover {
            ${elevation[4]};
      }
`

const StyledLink = styled(Link)`
  color: ${black};
  &:hover {
    color: ${black};
    text-decoration: none;
  }
`