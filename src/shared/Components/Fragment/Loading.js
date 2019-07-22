import React from 'react'
import { Spinner } from 'reactstrap'

export default function Loading(props) {
  const { size, margin } = props
  const finalSize = size ? size : 3
  const finalMargin = margin ? margin : 8
  return (
    <div className="text-center" style={{margin: `${finalMargin}rem`}}>
    <Spinner style={{ width: `${finalSize}rem`, height: `${finalSize}rem` }} { ...props } />{' '}
    </div>
    )
  }
  
  // <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />