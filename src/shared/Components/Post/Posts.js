import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import config from '../../../../webConfig.json'
import { Post } from '../../Components'
import Avatar from '../../../assets/logos/new_logo.png'
const imgAvatar = Avatar.replace('build', '').replace('/public', '')

function Posts(props) {
  const { auth, myPostsMode, feedMode, feed, profilePosts, profileMode } = props
  const renderQuery = () => {
    if(myPostsMode) {
      return props.posts.map(({ id, body, comments, createdAt, createdBy })=>{
        const name = `${auth.fname} ${auth.lname}`
        const linkUrl = auth.avatar  ?  `${config.api}${auth.avatar.url}` : imgAvatar
        return <Post key={id} linkUrl={linkUrl} myPostsMode={true} avatarUrl={linkUrl} body={body} name={name} comments={comments} createdAt={createdAt} id={id} createdBy={createdBy} />
      })
    } else if (feedMode) {
      return feed.map(({ id, body, comments, createdAt, createdBy })=>{
        const myPost = auth.id === createdBy.id
        const name = `${createdBy.fname} ${createdBy.lname}`
        const { avatar } = myPost ? auth : createdBy
        const linkUrl = avatar ?  `${config.api}${avatar.url}` : null
        return <Post key={`${id}-feed`} linkUrl={linkUrl} feedMode={true} avatarUrl={linkUrl} body={body} name={name} comments={comments} createdAt={createdAt} id={id} createdBy={createdBy} />
      })
    } else if(profileMode) {
      return profilePosts.map(({ id, body, comments, createdAt, createdBy })=>{
        const myPost = auth.id === createdBy.id
        const name = `${createdBy.fname} ${createdBy.lname}`
        const { avatar } = myPost ? auth : createdBy
        const linkUrl = avatar ?  `${config.api}${avatar.url}` : null
        return <Post key={`${id}-profile`} profileMode={true} linkUrl={linkUrl} body={body} name={name} comments={comments} createdAt={createdAt} id={id} createdBy={createdBy} />
      })
    }
  }
    return ( 
      <Fragment> 
      {(props.posts && (props.myPostsMode || props.feed || props.profileMode)) 
        && renderQuery()}
      </Fragment>
        
    )
  }

function mapStateToProps({ posts, feed, profilePosts, auth }) {

  return { posts, feed, profilePosts, auth }
}

export default connect(mapStateToProps)(Posts)


