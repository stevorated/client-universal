import React from 'react'
import { Spinner } from 'reactstrap'

export default function Loading() {
  return (
      <Spinner style={{ width: '1.5rem', height: '1.5rem' }} type="grow" />
  )
}
