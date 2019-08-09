import React, { Fragment } from 'react'
import { Mutation, ApolloConsumer } from 'react-apollo'
import { Button } from 'reactstrap'
import styled from 'styled-components'
import { Loading } from '../'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faTired } from '@fortawesome/free-solid-svg-icons'
import { FOLLOW_USER_MUT } from '../../Store/Apollo/Mutaions'
import { orange } from '../../Utils'

function FollowUserMut(props) {
  const { iLike, user, followers, followUserAction, myId, handleAction } = props
  // console.log(props)
  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={FOLLOW_USER_MUT}
          variables={{ id: user }}
          onCompleted={async ({ follow }) => {
            handleAction('followUserAction', { follow, user })
          }}
        >
          {(follow, { loading, error, called }) => {
            if (loading) return <Loading margin=".4" size="1" />
            if (error) {
              for (let err of error.graphQLErrors) {
                // console.log(`${err.extensions.exception.errors}`)
              }
            }
            if (iLike)
              return (
                <LikeButtonOn
                  size="sm"
                  outline
                  className="text-capitalize mx-2 ml-1 animated flipInX"
                  onClick={follow}
                >
                  be tired
                  <UnlikeButtonIcon className="ml-2" icon={faTired} size="1x" />
                </LikeButtonOn>
              )
            return (
              <LikeButtonOff
                size="md"
                className="text-capitalize btn-mainclr ml-1 my-1 animated flipInX"
                onClick={follow}
              >
                be inspired
                <FontAwesomeIcon

                  color="yellow"
                  className="ml-2"
                  icon={faLightbulb}
                  size="lg"
                />
              </LikeButtonOff>
            )
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  )
}

export default FollowUserMut

const LikeButtonOff = styled(Button)`
  &:active {
    background: none !important;
  }
  &:focus {
    background: none;
  }

  &:hover {
    /* background: none; */
  }
`
const LikeButtonOn = styled(Button)`
  transition: all 0.1s ease;
  &:hover {
    font-size: 1rem;
  }
`

const UnlikeButtonIcon = styled(FontAwesomeIcon)`
  /* font-size: .2rem; */
`
