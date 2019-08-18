import React, { useState } from 'react'
import { Container, Row, Col, Progress } from 'reactstrap'
import { FlatCardStatic } from './../../Elements'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faCookieBite, faAnchor, faSplotch } from '@fortawesome/free-solid-svg-icons'
import { Line } from '../../Elements'
import SummeryCard from './SummeryCard'
import SummeryCardWide from './SummeryCardWide'

const SummeryComponent = props => {
  const {
    perWisdom,
    perLikeWisdom,
    perEvent,
    perEventLike,
    perSelfLike,
    perSelfEventLike,
    perSelfFollow
  } = props.state

  const {
    wisdoms,
    likes,
    events,
    eventLikes,
    selfLikes,
    selfEventLikes,
    selfFollows
  } = props.data

  const selfLikePoints = selfLikes * perSelfLike
  const selfEventLikePoints = selfEventLikes * perSelfEventLike
  const selfFollowPoints = selfFollows * perSelfFollow

  const wisdomPoints = wisdoms * perWisdom
  const likePoints = likes * perLikeWisdom
  const eventPoints = events * perEvent
  const eventLikePoints = eventLikes * perEventLike
  const total = (
    selfLikePoints +
    selfEventLikePoints +
    selfFollowPoints +
    wisdomPoints +
    likePoints +
    eventPoints +
    eventLikePoints
  ).toString()

  const totalWisdoms = (selfLikePoints + likePoints + wisdomPoints).toString()
  const totalEvents = (
    selfEventLikePoints +
    eventPoints +
    eventLikePoints
  ).toString()
  const activities = (selfLikes + selfEventLikes + selfFollows).toString()
  const likesPerWisdom = _.round(((likes / wisdoms) * 100) / 100, 1)
  const likesPerEvent = _.round(((eventLikes / events) * 100) / 100)

  return (
    <FlatCardStatic className="mr-lg-3" style={{ paddingBottom: '14rem' }}>
      <Container>
        <Row>
          <Col>
            <SummeryCardWide
              data1={totalWisdoms}
              title1="Total Wisdom Points"
              data2={total}
              title2="Total Points"
              data3={totalEvents}
              title3="Total Event Points"
            />
          </Col>
        </Row>
        <Row
        // style={{ maxHeight: '34vh' }}
        >
          <Col md="4">
            <SummeryCard
              styleColor="2"
              icon={faCookieBite}
              data1={wisdoms}
              title1="Wisdoms"
              data2={likes}
              title2="likes"
              data3={likesPerWisdom}
              title3="likes per wisdom"
            />
          </Col>
          <Col md="4">
            <SummeryCard
              styleColor="2"
              icon={faAnchor}
              data1={events}
              title1="events"
              data2={eventLikes}
              title2="likes"
              data3={likesPerEvent}
              title3="likes per wisdom"
            />
          </Col>
          <Col md="4">
            <SummeryCard
              styleColor="2"
              icon={faSplotch}
              data1={activities}
              title1="activities"
              data2={selfLikes}
              title2="on wisdoms"
              data3={selfEventLikes}
              title3="on events"
            />
          </Col>
        </Row>
      </Container>
    </FlatCardStatic>
  )
}

export default SummeryComponent
