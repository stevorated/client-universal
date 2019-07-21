import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button  } from 'reactstrap'
import { Loading , Posts } from '..'
import { Query } from 'react-apollo'
import { FETCH_USERS_POSTS } from '../../Store/Apollo/Queries'
import { fetchUsersPosts } from '../../Store/actions'
import { PostFormContainer } from '../Post'
import styled from 'styled-components'

function ProfileScrollContainer(props) {
  // const [ animation, setAnimation ] = useState('')
  const length = props.profilePosts.length
  // console.log(animation)
  return (
    // <div></div>
    <Query
    fetchPolicy='network-only' // IMPORTANT
    query={FETCH_USERS_POSTS}
    variables={{ id: props.id, limit:5, skip: 0 }}
    onCompleted={({getUsersPosts}) => props.fetchUsersPosts(getUsersPosts)}
    // refetchQueries={[{query:GET_MA_POSTS, variables:{limit: 10, skip: 0 }}]}
    >
    {({ loading, error, data, fetchMore }) => {
      if (loading) return <Loading />
      const handleFetchMore = () => {
        fetchMore({
          variables: {
            id: props.id,
            skip: length
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) { 
              return prev
            }
            props.fetchUsersPosts(
              [...fetchMoreResult.getUsersPosts]
            ) 
          }
        })
      }
      return (
        <StyledDiv className="text-center">
        <PostFormContainer 
        profileMode={true} 
        id={props.id} 
        myProfile={props.auth.id === props.id} 
        />
          <Posts profileMode={true} />
          <Button size="sm" className={`my-5 btn-mainclr`} onClick={handleFetchMore}>Load More</Button>
        </StyledDiv>
      );
    }}
  </Query>
  )
}

const mapStateToProps = ({ profilePosts, auth }) => {
  return { profilePosts, auth }
}
export default connect(mapStateToProps, { fetchUsersPosts })(ProfileScrollContainer)


const StyledDiv = styled.div `
  margin: 0;
  padding: 0;
  margin-bottom: 20rem;
`
