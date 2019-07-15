import React, { useEffect, Component } from 'react'
import { Container, Col, Row, Button } from 'reactstrap'
import { FlatCard } from '../../Elements'
export default class FeedExtraRight extends Component {
  render() {
    return (
      <div className="p-1">
        <FlatCard className='text-left pl-4 grow-on-hover-mild'>
          <Button size="sm" close></Button>
          <label className="small-text">Feed Update</label>
          <h6 className="small-text-header">bla bla bla<small> Posted an event </small>bla bla bla..bli bla blu..</h6>
        </FlatCard>
      </div>
    )
  }
}
