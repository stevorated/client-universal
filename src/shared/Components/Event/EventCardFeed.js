import React from 'react'
import styled from 'styled-components'
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
import {
  black,
  elevation,
  transition,
  formatDateAndDay,
  formatDate,
  sliceArray
} from "../../Utils"
const EventCardFeed = () => {
  return (
    <StyledCard style={{ marginTop: ".1rem", marginBottom: "5rem" }}>
      <CardBody style={{ minHeight: "40vh" }}>
        <div className="d-flex">
          <CardTitle>
          ya alla
          </CardTitle>

        </div>
        </CardBody>
    </StyledCard>
  )
}

export default EventCardFeed

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
