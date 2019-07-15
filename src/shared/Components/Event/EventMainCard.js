import React from 'react'
import EventFormContainer from './EventFormContainer'
import EventCarousel from './EventCarousel'
import { FlatCardStatic, SquareButton } from '../../Elements'

export default function EventMainCard() {
  return (
    <FlatCardStatic className="px-0 pt-3 mt-3">
      <div>
        <h6 className="sigmar-one ml-3 text-left">Event Feed</h6>
      </div>
      <hr />
      <div className="ml-3 mr-3" style={{minHeight: '200px'}}>
        <p className="text-left">Next Up</p>
        
      </div>
      <hr style={{ margin: '0' }} />
      <div className="d-flex my-3">
        <EventFormContainer className="ml-3" round={false} buttonLabel="Add Event" buttonSize="sm" />
        <SquareButton size="sm" style={{ background: '#3b5998' }} className="ml-3">From Facebook</SquareButton>
      </div>
    </FlatCardStatic>
  )
}
