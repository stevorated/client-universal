import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Card, CardText, CardBody } from 'reactstrap'
import styled from 'styled-components'
import moment from 'moment'
import { timeAgo, elevation } from '../../Utils'

export default function Notification(props) {

  const [ redirect, setRedirect ] = useState(false)
  const { id, originId, createdAt,event,post, from, to, unread, type, lastAction } = props
  const setWhereTo = () => {
    switch (type) {
      case 'PostLikes':
      case 'Post':
      case 'Comment':
        return `/post/${post.id}`
      case 'EventFollowers':
      case 'Event':
        return `/event/${event.id}`
      case 'Profile':
        return `/profile/${from.id}`
      default:
        return '/notification/notfound'
    }
  }

  const whereTo = setWhereTo()
  
  
  const renderNotification = () => {
    // const toName = `${to.fname} ${to.lname}`
    const fromName = `${from.fname} ${from.lname}`
    const FromNameLink = () => <Link style={{fontWeight: '900'}} to={`/profile/${from.id}`}>{fromName}</Link>
    switch (type) {
      case 'PostLikes':
        if(lastAction === 'Unlike-Post') {
          const text = ` unliked ${to.fname} ${to.lname}'s post "${post.body}"`
          return <CardText><FromNameLink />{text} <br /><span className="lo-text">{timeAgo(Date.now(), createdAt)}</span></CardText>
        } else {
          const text = ` liked ${to.fname} ${to.lname}'s post "${post.body}"`
          return <CardText><FromNameLink />{text}<br /><span className="lo-text">{timeAgo(Date.now(), createdAt)}</span></CardText>
        }

      case 'Event': 
        const eventTimeString = moment(event.startDate).format('DD MMMM')
        if (lastAction === 'Create-Event') {
          const text = ` created a new event "${event.name}" that's on ${eventTimeString} Go Have a look inside.`
          return <CardText><FromNameLink />{text}<br /><span className="lo-text">{timeAgo(Date.now(), createdAt)}</span></CardText>
        } else {
          const text = ` deleted an event "${event.name}" that's was supose to be on ${eventTimeString}`
          return <CardText><FromNameLink />{text}<br /><span className="lo-text">{timeAgo(Date.now(), createdAt)}</span></CardText>
        }
      case 'EventFollowers':
        const timeString = moment(event.startDate).format('DD MMMM')
        if (lastAction === 'Unfollow-Event') {
          const text = ` unfollowed ${to.fname} ${to.lname}'s event "${event.name}" that's on ${timeString}`
          return <CardText><FromNameLink />{text}<br /><span className="lo-text">{timeAgo(Date.now(), createdAt)}</span></CardText>
        } else {
          const text = ` followed ${to.fname} ${to.lname}'s event "${event.name}" thats's on ${timeString}`
          return <CardText><FromNameLink />{text}<br /><span className="lo-text">{timeAgo(Date.now(), createdAt)}</span></CardText>
        }
      case 'Comment':
        if (lastAction === 'Create-Comment') {
          const text = `commented "${post.body}" on ${to.fname} ${to.lname}'s post `
          return <CardText><FromNameLink />{text}<br /><span className="lo-text">{timeAgo(Date.now(), createdAt)}</span></CardText>
        } else {
          const text = `uncommented "${post.body}" on ${to.fname} ${to.lname}'s post `
          return <CardText><FromNameLink />{text}<br /><span className="lo-text">{timeAgo(Date.now(), createdAt)}</span></CardText>
        }
      case 'Profile':
        const text = `new user joined: ${from.fname} ${from.lname}, wanne go greet him with your wisdom?`
        return <CardText>{text}<br /><span className="lo-text">{timeAgo(Date.now(), createdAt)}</span></CardText>
      case 'Post':
        if (lastAction === 'Create-Post') {
          const text = ` posted "${post.body}"`
          return <CardText><FromNameLink />{text}<br /><span className="lo-text">{timeAgo(Date.now(), createdAt)}</span></CardText>
        } else {
          const text = ` deleted his old wisdom: "${post.body}"`
          return <CardText><FromNameLink />{text}<br /><span className="lo-text">{timeAgo(Date.now(), createdAt)}</span></CardText>
        }
      case 'UserFollowers':
          if (lastAction === 'Follow-User') {
            const text = ` followed ${to.fname} ${to.lname}`
            return <CardText><FromNameLink />{text}<br /><span className="lo-text">{timeAgo(Date.now(), createdAt)}</span></CardText>
          } else {
            const text = ` unfollowed ${to.fname} ${to.lname}`
            return <CardText><FromNameLink />{text}<br /><span className="lo-text">{timeAgo(Date.now(), createdAt)}</span></CardText>
          }
      default:
        break;
    }
  }

  const count = props.auth.seen && props.auth.seen.length && props.auth.seen.filter((item)=> {
    return item.id === originId
  }).length
  const checkSeen = count ? true : false

  return redirect ? <Redirect to={whereTo} /> : (
    <HoverCard className={`mt-2 ${checkSeen ? '' : 'bgNewNotification'}`} style={{cursor: 'pointer'}} onClick={setRedirect}>
      <CardBody className="text-left">
        {!checkSeen && <div style={{fontWeight: '600'}} className="text-right">New!</div>}
        {renderNotification()}
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