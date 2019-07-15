import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Card } from 'reactstrap'
import Comment from './Comment'
import AddCommentContainer from './AddCommentContainer'
import { Link, NavLink } from 'react-router-dom'
import config from '../../../../webConfig.json'

function Comments(props) {
  const { comments, id, auth } = props
  const [ showForm, setShowForm ] = useState(false)
  const [ showComments, setShowComments ] = useState(false)
  const openForm = () => {
    setShowForm(!showForm)
  }

  const toggleComments = () => {
    setShowComments(!showComments)
  }

  const renderQuery = () => {
    return comments.map(({ id, body, createdBy, createdAt })=>{
      const myComment = auth.id === createdBy.id
      const commentID = id
      const name = `${createdBy.fname} ${createdBy.lname}`
      const profileImgUrl = createdBy.avatar ? `${config.api}${createdBy.avatar.url}` : null

      return <Comment 
      key={commentID} 
      body={body} 
      createdAt={createdAt} 
      name={name} 
      createdBy={createdBy} 
      profileImgUrl={
        myComment & createdBy.avatar 
        ? `${config.api}${auth.avatar.url}` 
        : profileImgUrl} />
    })
  }
  return (
    <div  className="mx-2 p-2" style={{opacity: '0.8'}}>
      {renderQuery()}
      <Link to="#" onClick={openForm} className="ml-2">{showForm ? 'Hide' : 'Comment'}</Link>
      {showForm && <Card className="pt-3 mt-2" >
      <AddCommentContainer 
      id={id} 
      openForm={openForm} 
      setShowComments={setShowComments} 
      setShowForm={setShowForm}
      commentCount = {comments.length}
      />
      </Card>}
    </div>
  )
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}
export default connect(mapStateToProps)(Comments)