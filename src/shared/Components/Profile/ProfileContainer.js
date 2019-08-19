import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
import AddImageModal from './AddImageModal'
import { BigProfileImg, FlatCard } from '../../Elements'
import Loading from '../Fragment/Loading'
import styled from 'styled-components'
import FollowUserMut from './FollowUserMut'
import { mediaQueries, orange, elevation } from '../../Utils'
import Avatar from '../../../assets/logos/new_logo.png'
const imgAvatar = Avatar.replace('build', '').replace('/public', '')
const { API_BASE } = process.env
function ProfileContainer(props) {
  // console.log(props)
  const [ modalOpen, setModalOpen ] = useState(false)
  const toggle = () => setModalOpen(!modalOpen)
  const { details, auth, myId } = props
  if (details !== undefined) {
    const {
      id,
      fname,
      lname,
      username,
      posts,
      avatar,
      followers,
      following,
      bio
    } = details
    console.log()
    // check if this is my user's profile
    const myProfile = id === auth.id ? true : false
    // check if my is an avatar avalible else send the default one
    const myAvatarUrl = auth.avatar
      ? `${API_BASE}${auth.avatar.url}`
      : imgAvatar
    // check if the user (not me) has an avatar avalible else send the default one
    const avatarOfUser = avatar ? `${API_BASE}${avatar.url}` : imgAvatar
    // if my profile return my else return user's
    const imgUrl = myProfile ? myAvatarUrl : avatarOfUser
    let postCount = posts ? posts.length : 0
    let followersCount = followers ? followers.length : 0
    let followingCount = following ? following.length : 0
    const iLike =
      followers &&
      followers.length &&
      followers.filter(follow => {
        return follow.id === myId
      }).length > 0
        ? true
        : false
    if (!details.id) return <Loading margin="1" />
    return (
      <div className="m-0 text-left">
        {details !== undefined && (
          <FlatCard className="pt-2">
            <Container fluid className="px-2">
              <Row>
                <Col className="mt-4" xs="9" sm="8">
                  <div className="text-capitalize ml-3 mt-1 mb-0 pb-0">
                    <HeaderReactive className="noPadding font-weight-bold lg-text p-0">
                      {fname} {lname}
                      {iLike && (
                        <FontAwesomeIcon
                          color={orange}
                          className="mx-3 animated flipInX mt-0"
                          icon={faLightbulb}
                          size="lg"
                        />
                      )}
                    </HeaderReactive>
                  </div>
                  <div className="noPadding small-text ml-3">{username}</div>
                  <hr className="noPadding" />
                  <div className="small-text text-left mt-2 ml-3 font-weight-bold">
                    Bio
                  </div>
                </Col>
                <Col className="text-right mt-4" xs="3" sm="4">
                  
                  <div className="mt-1" style={{ position: 'relative'}}>
                  {myProfile && <AddImageModal toggle={toggle} modal={modalOpen} />}
                    <BigProfileImg
                      className="text-center mr-3"
                      src={imgUrl}
                      alt=""
                      onClick={toggle}
                    />
                    
                  </div>
                </Col>
              </Row>
              <p className="lo-text text-left ml-3">
                {bio}
              </p>
              <div className="d-flex justify-content-around lo-text">
                <div>{postCount} Wisdoms</div>
                <div>{followersCount} followers</div>
                <div>{followingCount} following</div>
              </div>
              <hr className="noPadding" />
              <div
                style={{ transition: 'all 1s ease' }}
                className="d-flex mb-2 small-text mt-2"
              >
                {!myProfile && (
                  <FollowUserMut
                    iLike={iLike}
                    user={id}
                    followersCount={followersCount}
                    followers={followers}
                    myId={auth.id}
                    handleAction={props.handleAction}
                  />
                )}
                {/* {myProfile && <StyledButton size="sm" className="btn-mainclr mt-2 ml-1">Update details</StyledButton>} */}
                <div className="ml-auto">
                  {/* <StyledButton size="sm" className="btn-mainclr mt-2 mr-2">Go to</StyledButton> */}
                </div>
              </div>
            </Container>
          </FlatCard>
        )}
      </div>
    )
  } else {
    return <Loading />
  }
}

export default ProfileContainer

const HeaderReactive = styled.h5`
  font-size: 1.1rem;
  ${mediaQueries.lg`
  font-size: .9rem;
  `}
  ${mediaQueries.xl`
  font-size: 1.1rem;
  `}
`
