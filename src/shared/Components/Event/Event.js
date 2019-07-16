import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  Card, CardImg, CardTitle, CardText, CardSubtitle, CardBody
} from 'reactstrap'
import styled from 'styled-components'
import { black, elevation, transition, timeAgo } from '../../Utils'
import config from '../../../../webConfig.json'

function Event(props) {
  console.log(props)
  const { id, coverPhoto, name, startDate, startTime, venue, address } = props
  const [redirect, setRedirect] = useState(false)
  return redirect ? <Redirect to={`/event/${id}`} /> : (
    <StyledCard className="p-1" onClick={ ()=>setRedirect(true) }>
      <CardImg style={{borderRadius: '5px 5px 0 0'}} top width="100%" src={coverPhoto && `${config.api}${coverPhoto.url}`} alt="card img" />
      <hr className="noPadding"/>
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <CardSubtitle className="small-text">{startDate} {startTime} at {venue} ({ address })</CardSubtitle>
        <CardText>{props.description}</CardText>
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
      padding: 0;
      margin: 0;
      background: whitesmoke;
      /* opacity: .9; */
      /* border-radius: .3rem; */
      /* margin: .1rem; */
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