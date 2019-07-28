import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { fetchPost } from '../../Store/actions'
import { Posts } from '../Post'
import { Loading } from '../'
import { FETCH_FEED } from '../../Store/Apollo/Queries'
import styled from 'styled-components'

const SinglePostContainer = (props) => {
  return (
    <Query
      
      // fetchPolicy='network-only' // IMPORTANT
      query={FETCH_FEED}
      variables={{ id: props.id, limit: 1, skip: 0}}
      onCompleted={
        ({ getPosts }) => {
          props.fetchPost(getPosts)
        }
      }
    // refetchQueries={[{query:GET_MA_POSTS, variables:{limit: 10, skip: 0 }}]}
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <Loading />
        if (error) return <Loading />
        return (
          <StyledDiv className="text-center">
            <Posts singlePostMode={true} show />
          </StyledDiv>
        )
      }}
    </Query>
  )
}

const mapStateToProps = ({ singlePost }) => {
  return { singlePost }
}

export default connect(mapStateToProps, { fetchPost })(SinglePostContainer)

const StyledDiv = styled.div `
  margin: 0;
  padding: 0;
  display: block;
`


