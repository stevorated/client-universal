import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Card, CardImg, CardTitle, CardText, CardSubtitle, CardBody
} from 'reactstrap'
import styled from 'styled-components'
import { timeAgo, elevation } from '../../Utils'

export default function Notification(props) {
  // console.log(props.post)
  const { createdAt, body } = props
  const { fname, lname } = props.from
  const [ redirect, setRedirect ] = useState(false)
  // console.log(props.post, props.action)
  let whereTo = '/notification/notfound'
  if(props.action === 'Create-Post' || 'Create-Comment' && props.post) {
    whereTo = `/post/${props.post.id}`
  }
  if(props.action === 'Create-Event' && props.event) {whereTo = `/event/${props.event.id}`}
  return redirect ? <Redirect to={whereTo} /> : (
    <HoverCard className="mt-2" style={{cursor: 'pointer'}} onClick={setRedirect}>
      <CardBody>
        <CardText className="text-left"><strong>{fname} {lname}</strong> {body} <span className="lo-text">{timeAgo(Date.now(), createdAt)}</span></CardText>
      </CardBody>
    </HoverCard>
  )
}

const HoverCard = styled(Card)`
transition: all .2s ease-out;
&:hover {
  transform: translateY(-3px);
  ${elevation[2]}
}
`
// <CardTitle>{name}</CardTitle>
// <CardSubtitle className="small-text">{startDate} {startTime} at {venue} ({address})</CardSubtitle>