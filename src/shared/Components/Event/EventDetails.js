import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Card, Button, CardImg, CardTitle, CardText, CardDeck, CardColumns,
  CardSubtitle, CardBody, Col
} from 'reactstrap'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeer } from '@fortawesome/free-solid-svg-icons'
import { SmallProfileImg } from '../../Elements'
import { black, elevation, transition, timeAgo } from '../../Utils'

function Event(props) {
  const { name, venue, address, description, startDate, startTime, coverPhoto } = props.data
  return (
        <StyledCard  style={{minHeight: '100vh',  marginTop: '.2rem'}}>
          <CardImg top src={coverPhoto && `${process.env.API_BASE}${coverPhoto.url}`} alt="card img" />
          <hr className="noPadding"/>
          <CardBody style={{minHeight: '100vh'}}>
            <CardTitle>{name}</CardTitle>
            <CardSubtitle className="small-text">{startDate} {startTime} at {venue} ({address})</CardSubtitle>
            <CardText>{description}</CardText>
          </CardBody>
        </StyledCard> 


  )
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Event)

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