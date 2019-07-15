import React from 'react'
import { Spinner } from 'reactstrap'

export default function Loading() {
  return (
    <div className="text-center" style={{margin: '8rem'}}>
    <Spinner style={{ width: '3rem', height: '3rem' }} />{' '}
    </div>
    )
  }
  
  // <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />