import React, { Fragment, useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import {
  Container,
  Row,
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardColumns,
  CardSubtitle,
  CardBody,
  Col
} from "reactstrap"
import styled from "styled-components"

import EventGoingRow from './EventGoingRow'
import { Line, DateSquare, BigProfileImg } from "../../Elements"
import {
  black,
  elevation,
  transition,
  formatDateAndDay,
  formatDate,
  sliceArray
} from "../../Utils"

import Avatar from "../../../assets/logos/new_logo.png"
const imgAvatar = Avatar.replace("build", "").replace("/public", "")

function EventGoing(props) {
  const { data } = props
  const { followers } = data
  const filteredFollowers = followers.filter((follower) => follower.id !== props.auth.id)
  const slicedFollowers = sliceArray(filteredFollowers, 4)
  const rowAllowed = 2
  let rowCount = 0
  const renderGoingRows = () => slicedFollowers.map(row => {
    rowCount ++
    if(rowCount <= 2) {
      return <EventGoingRow key={`row-start-with-${row[0] ? row[0].id : ''}`} followers={row} />
    }
    console.log('rowcount = ', rowCount)
  } )

  return (
    <StyledCard style={{ marginTop: ".1rem", marginBottom: "250px" }}>
      <CardBody style={{ minHeight: "40vh" }}>
        <div className="d-flex">
          <CardTitle
            className="text-left"
            style={{
              fontWeight: "700",
              fontSize: "1.1rem",
              marginBottom: "0"
            }}
          >
            Followers ({followers.length})
          </CardTitle>
          <span className="ml-2"><Link to={`/event/followers/$id`}>see more</Link></span>
        </div>
        {/* <Line /> */}
        <Container className="mt-2">
          {renderGoingRows()}
        </Container>
        </CardBody>
    </StyledCard>
  )
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(EventGoing)

const CreatedAt = styled.p`
  font-size: 0.6rem;
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
        property: "all"
      })};
      &:hover {
        cursor: pointer;
        transform: translateY(-1px);
        ${elevation[3]};
      }
`
