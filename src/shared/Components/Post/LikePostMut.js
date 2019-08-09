import React, { useState, Fragment } from "react"
import { connect } from "react-redux"
import { Mutation, ApolloConsumer } from "react-apollo"
import { Button } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBeer,
  faLightbulb,
  farLightbulb
} from "@fortawesome/free-solid-svg-icons"
import { Loading } from "../"
import { LIKE_POST_MUT } from "../../Store/Apollo/Mutaions"

function LikePostMut(props) {
  const { post, likes, myId } = props
  const iLikeStart = likes.filter(like => like.id === myId).length
    ? true
    : false
  const [iLike, setILike] = useState(iLikeStart)
  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={LIKE_POST_MUT}
          variables={{ id: post }}
          onCompleted={async ({ likePost }) => {
            props.handleAction('likePostAction', { data: likePost, post })
            // props.likePostAction(likePost, post)
            setILike(!iLike)
          }}
          // refetchQueries={[{ query: FETCH_FEED }, { query: GET_MA_POSTS }]}
        >
          {(likePost, { loading, error, called }) => {
            if (loading)
              return (
                <Button
                  size="sm"
                  className="btn-mainclr ml-2 px-2"
                  onClick={likePost}
                >
                  {likes.length} Cheers
                  {iLike ? (
                    <FontAwesomeIcon
                      data-test="likedIcon"
                      icon={faBeer}
                      className="ml-2 text-warning"
                    />
                  ) : (
                    <Fragment />
                  )}
                  <Loading
                    noloadingtext="true"
                    margin="0"
                    style={{
                      position: "fixed",
                      top: "30%",
                      right: "12%",
                      height: "1rem",
                      width: "1rem"
                    }}
                  />
                </Button>
              )
            if (error) {
              for (let err of error.graphQLErrors) {
                // console.log(`${err.extensions.exception.errors}`)
              }
            }
            return (
              <Fragment>
                <Button
                  data-test="likePostBtn"
                  size="sm"
                  className="btn-mainclr ml-2 px-2"
                  onClick={likePost}
                >
                  {likes.length} Cheers
                  {iLike ? (
                    <FontAwesomeIcon
                      data-test="likedIcon"
                      icon={faBeer}
                      className="ml-2 text-warning"
                    />
                  ) : (
                    <Fragment />
                  )}
                </Button>
              </Fragment>
            )
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  )
}

export default LikePostMut
