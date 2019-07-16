import React from 'react'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { FETCH_USERS_POSTS } from '../../Apollo/Queries'
import { fetchUsersPosts } from '../../Store/actions'


function RefetchQuery(props) {
  return (
    <Query
    fetchPolicy='network-only' // IMPORTANT
    query={FETCH_USERS_POSTS}
    variables={{ id: props.id, limit:5, skip: 0 }}
    onCompleted={({getUsersPosts}) => {
      props.fetchUsersPosts(getUsersPosts)
    }}
    onError={()=> console.log('error referching more posts.. try later')}
    >
    {({ loading, error, data, fetchMore }) => {
      return ''
    }}
  </Query>
  )
}

const mapStateToProps = ({ profilePosts }) => {
  return {profilePosts}
}
export default connect(mapStateToProps, { fetchUsersPosts })(RefetchQuery)