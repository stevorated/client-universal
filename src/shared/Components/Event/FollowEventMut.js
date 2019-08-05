import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { Mutation, ApolloConsumer } from 'react-apollo'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { Loading } from '../'
import { FOLLOW_EVENT_MUT } from '../../Store/Apollo/Mutaions'
import { followEventAction } from '../../Store/actions'
import { orange, black } from '../../Utils'

function FollowEventMut(props) {
  const { event, followers, myId } = props
  const iFollowStart = followers.filter((follow) => follow.id === myId).length ? true : false
  const [iFollow, setIFollow] = useState(iFollowStart)
  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={FOLLOW_EVENT_MUT}
          variables={{ event }}
          onCompleted={async ({ followEvent }) => {
            props.followEventAction(followEvent, event)
            setIFollow(!iFollow)
          }}
        // refetchQueries={[{ query: FETCH_FEED }, { query: GET_MA_POSTS }]}
        >
          {(followEvent, { loading, error, called }) => {
            if (loading) return <Loading customLoader size="1" margin="0" style={{ color: black , height: '1rem', width: '1rem' }} />
            // <Button style={{background: 'none', border: 'none'}} size="sm" onClick={followEvent}>
            // </Button>
            return iFollow 
              ? <StyledIcon size={props.size} className={props.className} style={props.style}  onClick={followEvent} size="lg" icon={faHeart} style={{color: orange, cursor: 'pointer'}} /> 
              : <FontAwesomeIcon size={props.size} className={props.className} style={props.style} onClick={followEvent} size="lg" icon={faHeart} style={{color: black, cursor: 'pointer'}} />
                
        
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  )
}


export default connect(undefined, { followEventAction })(FollowEventMut)

const StyledIcon = styled(FontAwesomeIcon)`
transition: all .3s ease-out;
&:hover {
  transform: scale(1.03)
}

`