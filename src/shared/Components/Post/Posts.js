import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { Post } from "../../Components"
import Loading from "../Fragment/SmallLoading"
import Avatar from "../../../assets/logos/new_logo.png"
const defaultImg = Avatar.replace("build", "").replace("/public", "")

function Posts(props) {
  // console.log(props)
  const {
    myId,
    posts,
    mode,
    myAvatar,
    show
  } = props

  const renderQuery = () => {
    if (posts) {
      return posts.map((post) => {
        const { id, createdBy } = post
        // set common values
        const key = `${id}-${mode}`
        const name = `${createdBy.fname} ${createdBy.lname}`
        // set avatar url if my post render my avatar else post avatar (for refresh when updated)
        // if no avatar set give default image instead
        const { avatar } = createdBy
        const myAvatarUrl = myAvatar ? `${process.env.API_BASE}${props.myAvatar}` : null
        const postAvatarUrl = avatar ? `${process.env.API_BASE}${avatar.url}` : null
        const myPost = myId === createdBy.id
        const avatarUrl = myPost ? myAvatarUrl : postAvatarUrl
        return (
          <Post
            data-test="post"
            myId={props.myId}
            myAvatar={props.myAvatar}
            key={key}
            myPost={myPost}
            avatarUrl={avatarUrl ? avatarUrl : defaultImg}
            name={name}
            feedMode={true}
            post={post}
            mode={mode}
            show={show}
            handleAction={props.handleAction}

            // likePostAction={props.likePostAction}
            // deleteCommentAction={props.deleteCommentAction}
            // deletePostAction={props.deletePostAction}
            // pushComment={props.pushComment}
          />
        )
      })
    } else {
      return <Loading />
    }
  }
  return (
    <Fragment>
      {props.posts && renderQuery()}
    </Fragment>
  )
}

export default Posts

// if(myPostsMode) {
//   return props.posts.map(({ id, body, comments, createdAt, createdBy, likes })=>{
//     const name = `${auth.fname} ${auth.lname}`
//     const linkUrl = auth.avatar  ?  `${process.env.API_BASE}${auth.avatar.url}` : imgAvatar
//     return <Post key={id} linkUrl={linkUrl} myPostsMode={true} avatarUrl={linkUrl} body={body} name={name} comments={comments} createdAt={createdAt} id={id} createdBy={createdBy} likes={likes} />
//   })
// } else if (feedMode) {
//   return feed.map(({ id, body, comments, createdAt, createdBy, likes })=>{
//     const myPost = auth.id === createdBy.id
//     const name = `${createdBy.fname} ${createdBy.lname}`
//     const { avatar } = myPost ? auth : createdBy
//     const linkUrl = avatar ?  `${process.env.API_BASE}${avatar.url}` : null
//     return <Post key={`${id}-feed`} linkUrl={linkUrl} feedMode={true} avatarUrl={linkUrl} body={body} name={name} comments={comments} createdAt={createdAt} id={id} createdBy={createdBy} likes={likes} />
//   })} else if (singlePostMode) {
//     return singlePost.map(({ id, body, comments, createdAt, createdBy, likes })=>{
//       const myPost = auth.id === createdBy.id
//       const name = `${createdBy.fname} ${createdBy.lname}`
//       const { avatar } = myPost ? auth : createdBy
//       const linkUrl = avatar ?  `${process.env.API_BASE}${avatar.url}` : null
//       return <Post key={`${id}-feed`} show={props.show} linkUrl={linkUrl} feedMode={true} avatarUrl={linkUrl} body={body} name={name} comments={comments} createdAt={createdAt} id={id} createdBy={createdBy} likes={likes} />
//     })
// } else if(profileMode) {
//   return profilePosts.map(({ id, body, comments, createdAt, createdBy, likes })=>{
//     const myPost = auth.id === createdBy.id
//     const name = `${createdBy.fname} ${createdBy.lname}`
//     const { avatar } = myPost ? auth : createdBy
//     const linkUrl = avatar ?  `${process.env.API_BASE}${avatar.url}` : null
//     return <Post key={`${id}-profile`} profileMode={true} linkUrl={linkUrl} body={body} name={name} comments={comments} createdAt={createdAt} id={id} createdBy={createdBy} likes={likes} />
//   })
