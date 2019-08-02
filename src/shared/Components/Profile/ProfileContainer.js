import React, { Fragment } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { connect } from 'react-redux'
import AddImageModal from './AddImageModal'
import { BigProfileImg, FlatCard } from '../../Elements'
import Loading from '../Fragment/Loading'
import styled from 'styled-components'
import FollowUserMut from './FollowUserMut'
import { mediaQueries } from '../../Utils'
import Avatar from '../../../assets/logos/new_logo.png'
import { array } from 'prop-types';
const imgAvatar = Avatar.replace('build', '').replace('/public', '')

function ProfileContainer({ auth, profilePosts, profileMode, profileDetails }) {
  let details
  const profileData = profileDetails ? profileDetails : null
  if (profileMode) {
    if (profileData) {
      details = profileData
    }
  } else if (!profileMode) {
    details = auth
  }
  if (details !== undefined) {
    let { id, fname, lname, username, posts, avatar, followers, following } = details
    // check if this is my user's profile
    const myProfile = id === auth.id ? true : false
    // check if my is an avatar avalible else send the default one
    const myAvatarUrl = auth.avatar ? `${process.env.API_BASE}${auth.avatar.url}` : imgAvatar
    // check if the user (not me) has an avatar avalible else send the default one
    const avatarOfUser = avatar ? `${process.env.API_BASE}${avatar.url}` : imgAvatar
    // if my profile return my else return user's
    const imgUrl = myProfile ? myAvatarUrl : avatarOfUser
    let postCount = posts ? posts.length : 0
    let followersCount = followers ? followers.length : 0
    let followingCount = following ? following.length : 0
    if (!details.id) return <Loading />
    return (
      <div className="m-0 text-left">
        {details !== undefined &&
          <FlatCard className="pt-2">
            <Container fluid className="px-2">
              <Row>
                <Col className="mt-4" xs="9" sm="8">
                  <div className="text-capitalize ml-3 mt-1 mb-0 pb-0">
                    <HeaderReactive className="noPadding font-weight-bold lg-text p-0">{fname} {lname}</HeaderReactive>
                  </div>
                  <div className="noPadding small-text ml-3">{username}</div>
                  <hr className="noPadding" />
                  <div className="small-text text-left mt-2 ml-3 font-weight-bold">Bio</div>
                </Col>
                <Col className="text-right mt-4" xs="3" sm="4">
                  {myProfile && <AddImageModal />}
                  <div className="mt-1">
                    <BigProfileImg
                      className="text-center mr-3"
                      src={imgUrl}
                      alt=""
                    />
                  </div>
                </Col>
              </Row>
              <p className="lo-text text-left ml-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, tenetur?</p>
              <div className="d-flex justify-content-around lo-text">
                <div>{postCount} Wisdoms</div>
                <div>{followersCount} followers</div>
                <div>{followingCount} following</div>
              </div>
              <hr className="noPadding" />
              <div className="d-flex mb-2 small-text mt-2">
                {!myProfile && <FollowUserMut user={id} followersCount={followersCount} followers={followers} myId={auth.id} />}
                {/* {myProfile && <StyledButton size="sm" className="btn-mainclr mt-2 ml-1">Update details</StyledButton>} */}
                <div className="ml-auto">
                  {/* <StyledButton size="sm" className="btn-mainclr mt-2 mr-2">Go to</StyledButton> */}
                </div>
              </div>
            </Container>
          </FlatCard>
        }
      </div>
    )
  } else {
    return <Loading />
  }
}
const mapStateToProps = ({ auth, profilePosts, profileDetails }) => ({ auth, profilePosts, profileDetails })
export default connect(mapStateToProps)(ProfileContainer)

const StyledButton = styled(Button)`
  font-size: .8rem;
  font-weight: 100!important;
  padding: .2rem .6rem;
  display: block;
`

const HeaderReactive = styled.h5`
font-size: 1.1rem;
  ${mediaQueries.lg`
  font-size: .9rem;
  `}
  ${mediaQueries.xl`
  font-size: 1.1rem;
  `}
`