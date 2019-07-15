import React from 'react'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { FETCH_USERS_POSTS } from '../../Apollo/Queries'
import { fetchUsersPosts } from '../../Store/actions'


function RefetchQuery(props) {
  console.log(props)
  return (
    // <div></div>
    <Query
    fetchPolicy='network-only' // IMPORTANT
    query={FETCH_USERS_POSTS}
    variables={{ id: props.id, limit:5, skip: 0 }}
    onCompleted={({getUsersPosts}) => {
      // console.log('completed')
      props.fetchUsersPosts(getUsersPosts)
    }}
    onError={()=> console.log('error')}
    // refetchQueries={[{query:GET_MA_POSTS, variables:{limit: 10, skip: 0 }}]}
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