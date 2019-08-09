import React, { Fragment, useState, useEffect } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  Button
} from "reactstrap"
import styled from "styled-components"
import { black, elevation, transition, timeAgo } from "../../Utils"
import FollowEventMut from "./FollowEventMut"
import moment from "moment"

function Event(props) {
  // console.log(props)
  const {
    myId,
    id,
    coverPhoto,
    name,
    startDate,
    startTime,
    venue,
    address,
    followers
  } = props

  const when = moment(startDate).format("DD MMMM")
  const [redirect, setRedirect] = useState(false)
  
  return redirect ? (
    <Redirect to={`/event/${id}`} />
  ) : (
    <StyledCard className="p-1">
      <CardImg
        style={{ borderRadius: "5px 5px 0 0" }}
        top
        width="100%"
        src={coverPhoto && `${process.env.API_BASE}${coverPhoto.url}`}
        alt="card img"
      />
      <hr className="noPadding" />
      <CardBody>
        <CardTitle style={{ fontWeight: "700" }}>{name}</CardTitle>
        <CardSubtitle style={{ fontWeight: "500" }} className="small-text">
          {startTime}, {when} at {venue} ({address})
        </CardSubtitle>
        <CardText className="lo-text">{props.description}</CardText>
        <div className="d-flex">
          <Button
            size="sm"
            className="mr-auto"
            onClick={() => setRedirect(true)}
          >
            To Event
          </Button>
          <FollowEventMut
            handleAction={props.handleAction}
            className="ml-auto"
            size="2x"
            followers={followers || []}
            event={id}
            myId={myId}
          />
        </div>
      </CardBody>
    </StyledCard>
  )
}


export default Event

const CreatedAt = styled.p`
  font-size: 0.6rem;
  text-align: left;
`
const StyledCard = styled(Card)`
  padding: 0;
  margin: 0;
  background: whitesmoke;
  ${elevation[1]};
  ${transition({
    property: "all"
  })};
  &:hover {
    transform: translateY(-1px);
    ${elevation[3]};
  }
`
