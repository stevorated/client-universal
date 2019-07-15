import React from 'react'
import { Container, Col, Row } from 'reactstrap'
import { FlatCard } from '../../Elements'
export default function InfoContainer() {
  return (
    <div className="p-1">
      <FlatCard className="p-1">
        <h6 className="ml-3 mt-1 small-text-header text-left">Somthing informative.. somthing smart</h6>
      </FlatCard>
    </div>

  )
}
