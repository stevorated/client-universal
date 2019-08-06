import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Card, Button, CardImg, CardTitle, CardText, CardDeck, CardColumns,
  CardSubtitle, CardBody, Col
} from 'reactstrap'
import styled from 'styled-components'
import FollowEventMut from './FollowEventMut'
import { Line, DateSquare, DateSquareStyle } from '../../Elements'
import { black, elevation, transition, formatDateAndDay, formatDate } from '../../Utils'

function EventDetails(props) {
  const { auth } = props
  const { id, name, venue, address, description, startDate, startTime, coverPhoto, createdBy, followers } = props.data
  const date = formatDate(startDate)
  return (
    <StyledCard>
      <CardImg top src={coverPhoto && `${process.env.API_BASE}${coverPhoto.url}`} alt="card img" />
      <CardBody style={{minHeight: '50vh', position: 'relative'}}>
        <div style={{position: 'absolute', right: '1rem'}}>
          <FollowEventMut myId={auth.id} followers={followers} event={id} />
        </div>
        <div className="d-flex">
          <DateSquareStyle>
            <DateSquare day={date.day} month={date.month} />
          </DateSquareStyle>
          <div
          className="text-left"
          style={{
            marginLeft: '.4rem'

          }}
          >
            <CardTitle style={{
              fontWeight: '700',
              fontSize: '2rem',
              marginBottom: '0'
            }}>{name}</CardTitle>
            <CardSubtitle className="small-text">{startTime}, {formatDateAndDay(startDate)} at {venue} ({address})</CardSubtitle>
          </div>
        </div>
        <Line className="my-3" />
        <div className="text-left">
          <CardTitle style={{
            fontWeight: '700',
            fontSize: '1.1rem',
            marginBottom: '0'
          }}>Description</CardTitle>
          <CardText>hosted by: <Link to={`/profile/${createdBy.id}`}>{createdBy.fname} {createdBy.lname}</Link></CardText>
          <CardText>{description}</CardText>
        </div>
      </CardBody>
    </StyledCard> 
  )
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(EventDetails)

const CreatedAt = styled.p`
font-size: .6rem;
text-align: left;
`
const StyledCard = styled(Card)`
      /* min-height: 300px; */
      /* color: ${black}; */
      /* padding: 0; */
      /* margin: 0; */
      background: whitesmoke;
      /* opacity: .9; */
      /* border-radius: .3rem; */
      margin: .1rem;
      margin-bottom: 2rem;
      ${elevation[1]};
      ${transition({
  property: 'all'
})};
      &:hover {
        cursor: pointer;
        transform: translateY(-1px);
        ${elevation[3]};
      }
`