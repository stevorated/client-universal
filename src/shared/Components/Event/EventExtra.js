import React from 'react'
import { FlatCardStatic } from '../../Elements'
import { LittleMenu } from '../'
import { orange } from '../../Utils'
export default function EventExtra(props) {
  // console.log(props)
  return (
    <FlatCardStatic style={{ minHeight: '200px' }} className="px-0 mt-3  mr-lg-2">
      <div className="mx-2 text-center">
        <hr className="mx-2 noPadding" style={{ color: orange, borderWidth: '2px', borderColor: orange, opacity: '0.1' }} />
        <LittleMenu boardMode={props.boardMode} feedMode={props.feedMode} suggested={props.suggested} byCreatedAt={props.byCreatedAt} items={props.items} handleChangeState={props.handleChangeState} />
        <hr className="noPadding" style={{ color: orange, borderWidth: '2px', borderColor: orange, opacity: '0.5' }} />
        {props.children}
      </div>
    </FlatCardStatic>
  )
}
