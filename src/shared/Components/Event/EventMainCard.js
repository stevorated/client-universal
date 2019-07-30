import React from 'react'
import EventFormContainer from './EventFormContainer'
import { FlatCardStatic, SquareButton } from '../../Elements'
import NextUpFeedContainer from './NextUpFeedContainer'
import { orange } from '../../Utils'
import NextUpBoardContainer from './NextUpBoardContainer';
export default function EventMainCard(props) {
  return (
    <FlatCardStatic className="px-0 pt-3 mt-3">
      <div>
        <h6 className="sigmar-one ml-3 text-left">{props.header}</h6>
      </div>
      <hr />      
      <div className="mx-3" style={{ minHeight: '200px' }}>
        <p className="text-left lead mb-0" style={{fontWeight:'900'}}>{props.title}</p>
        <hr className="noPadding" style={{ color: orange, borderWidth: '2px', borderColor: orange, opacity: '0.5' }} />
        {props.feedMode ? <NextUpFeedContainer /> : <NextUpBoardContainer />} 
        <hr style={{ margin: '0' }} />
        <p className="text-left lead mt-4 mb-0" style={{fontWeight:'900'}}>Import from Facebook / Create an Event</p>
        <hr className="noPadding" style={{ color: orange, borderWidth: '2px', borderColor: orange, opacity: '0.5' }} />
        <div className="d-flex my-3 ml-3 justify-content-start">
          <EventFormContainer className="text-center mr-4" round={false} buttonLabel="Add Event" buttonSize="sm" />
          <SquareButton size="sm" style={{ background: '#3b5998' }} className="">From Facebook</SquareButton>
        </div>
      </div>    
    </FlatCardStatic>
  )
}
