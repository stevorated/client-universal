import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { fetchMyNotifications } from '../../Store/actions'
import { Posts } from '../Post'
import { Loading } from '../'
import { FlatCardStatic } from '../../Elements'
import { GET_MY_NOTIFICATIONS } from '../../Store/Apollo/Queries'
import { PostFormContainer } from '../Post'
import styled from 'styled-components'
import Notifications from './Notifications'
import { orange } from '../../Utils'

const NotificationsContainer = (props) => {
  return (
    <Query
      // fetchPolicy='network-only' // IMPORTANT
      query={GET_MY_NOTIFICATIONS}
      variables={{ limit: 10, skip: 0}}
      onCompleted={
        ({ getMyNotifications }) => {
          props.fetchMyNotifications(getMyNotifications, props.myNotifications.length )
        }
      }
    // refetchQueries={[{query:GET_MA_POSTS, variables:{limit: 10, skip: 0 }}]}
    >
      {({ loading, error, data, fetchMore }) => {
        const handleFatchMore = () => {

          fetchMore({
            variables: {
              skip: props.myNotifications.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev
              props.fetchMyNotifications(
                [...fetchMoreResult.getMyNotifications]
              ) 
            }
          })
        }
        if (loading) return <Loading />
        if (error) return <Loading />
        return (
          <StyledDiv className="text-center">
            <FlatCardStatic>
              <p className="text-left lead mb-0 mt-lg-4" style={{fontWeight:'900'}}>Notifications</p>
              <hr className="noPadding" style={{ color: orange, borderWidth: '2px', borderColor: orange, opacity: '0.5' }} />
              <Notifications myNotifications={props.myNotifications} />
              <Button className="my-3" onClick={handleFatchMore}>More..</Button>
            </FlatCardStatic>
          </StyledDiv>
        )
      }}
    </Query>
  )
}

const mapStateToProps = ({ myNotifications }) => {
  return { myNotifications }
}

export default connect(mapStateToProps, { fetchMyNotifications })(NotificationsContainer)

const StyledDiv = styled.div `
  margin: 0;
  padding: 0;
  display: block;
`


