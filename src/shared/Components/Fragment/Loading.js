import React from 'react'
import { Spinner } from 'reactstrap'
import { orange } from '../../Utils';

export default function Loading(props) {
  const { size, margin, customLoader } = props
  const finalSize = size ? size : 3
  const finalMargin = margin ? margin : 8
  return (
    <div className="text-center" style={{margin: `${finalMargin}rem`}}>
      {customLoader ? <div style={{ width: `${finalSize}rem`, height: `${finalSize}rem` }} className="m-auto text-center loader"></div> :
      <Spinner style={{ color: orange, width: `${finalSize}rem`, height: `${finalSize}rem` }} { ...props } />}{finalSize < 6 && ' Loading...'}
    </div>
    )
  }
  
  // <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />