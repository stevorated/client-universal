import React from 'react'
import { Container, Row, Col, Progress } from 'reactstrap'
import { FlatCardStatic } from './../../Elements'

const SummeryComponent = props => {
  const { header } = props
  const { wisdoms, likes, events, eventLikes } = props.state
  const max = wisdoms + likes + events + eventLikes
  return (
    <FlatCardStatic className="my-2">
      <Container className="text-center" style={{ fontSize: '1.4rem'}}>
        <h1>{header || 'Total'}</h1>
        <Row>
          <Col lg="3" xs="6">
            <div className="p-4 m-auto" style={{ height: '20vh' }} >
              <div>{wisdoms}</div>
              <div>wisdoms</div>
            </div>
          </Col>
          <Col lg="3" xs="6">
            <div className="p-4 m-auto" style={{ height: '20vh' }}>
              <div>{likes}</div>
              <div>likes</div>
            </div>
          </Col>
          <Col lg="3" xs="6">
            <div className="p-4 m-auto" style={{ height: '20vh' }}>
              <div>{events}</div>
              <div>events</div>
            </div>
          </Col>
          <Col lg="3" xs="6">
            <div className="p-4 m-auto" style={{ height: '20vh' }}>
              <div>{eventLikes}</div>
              <div>event likes</div>
            </div>
          </Col>
        </Row>
        <Row className="mx-lg-5 mx-2">
          <Col>
            <Progress multi className="my-3">
              <Progress bar animated value="wisdoms" value={wisdoms} max={max}>wisdoms</Progress>
              <Progress bar animated color="success" value={likes} max={max}>likes</Progress>
              <Progress bar animated color="warning" value={events} max={max}>events</Progress>
              <Progress bar animated color="danger" value={eventLikes} max={max}>event likes</Progress>
            </Progress>
          </Col>
        </Row>
      </Container>
    </FlatCardStatic>
  )
}

export default SummeryComponent