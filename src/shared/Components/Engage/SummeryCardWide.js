import React, { useState, Fragment } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'

export default function SummeryCardWide(props) {
  const {
    data1,
    title1,
    data2,
    title2,
    data3,
    title3
  } = props
  const [open, setOpen] = useState(false)
  const height = open ? '19rem' : '10rem'
  // const toggle = () => setOpen(!open)
  return (
    <CSSTransition timeout={1000}>
      <div className="dash-box  dash-box-color-2 mx-3">
        <div className="dash-box-icon">
          <FontAwesomeIcon
            className="ml-2 mt-1 coolClr"
            icon={faLightbulb}
            size="2x"
          />
        </div>
        <Container>
          <Row className="mx-2">
            <Col>
              <div style={{ height }} className="dash-box-body">
                <span className="dash-box-count">{data1}</span>
                <span className="dash-box-title">{title1}</span>
              </div>
            </Col>
            <Col>
              <div style={{ height }} className="dash-box-body dash-box-body-secondary">
                <span className="dash-box-count">{data2}</span>
                <span className="dash-box-title">{title2}</span>
              </div>
            </Col>
            <Col>
              <div style={{ height }} className="dash-box-body dash-box-body-secondary">
                <span className="dash-box-count">{data3}</span>
                <span className="dash-box-title">{title3}</span>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="dash-box-action">
          {/* <button onClick={toggle}>More Info</button> */}
        </div>
      </div>
    </CSSTransition>
  )
}
