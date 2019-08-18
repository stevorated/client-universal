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
    title3,
    data4,
    title4,
    data5,
    title5,
    data6,
    title6,
    data7,
    title7,
    data8,
    title8,
    data9,
    title9
  } = props
  const [open, setOpen] = useState(false)
  const height = open ? '19rem' : '10rem'
  const toggle = () => setOpen(!open)
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
                {/* {open && (
                  <Fragment>
                    <span className="dash-box-count noBigView">{data4}</span>
                    <span className="dash-box-title noBigView">{title4}</span>
                    <span className="dash-box-count noBigView">{data5}</span>
                    <span className="dash-box-title noBigView">{title5}</span>
                  </Fragment>
                )} */}
              </div>
            </Col>
            <Col>
              <div style={{ height }} className="dash-box-body dash-box-body-secondary">
                <span className="dash-box-count">{data2}</span>
                <span className="dash-box-title">{title2}</span>
                {/* {open && (
                  <Fragment>
                    <span className="dash-box-count noBigView">{data6}</span>
                    <span className="dash-box-title noBigView">{title6}</span>
                    <span className="dash-box-count noBigView">{data7}</span>
                    <span className="dash-box-title noBigView">{title7}</span>
                  </Fragment>
                )} */}
              </div>
            </Col>
            <Col>
              <div style={{ height }} className="dash-box-body dash-box-body-secondary">
                <span className="dash-box-count">{data3}</span>
                <span className="dash-box-title">{title3}</span>
                {/* {open && (
                  <Fragment>
                    <span className="dash-box-count noBigView">{data8}</span>
                    <span className="dash-box-title noBigView">{title8}</span>
                    <span className="dash-box-count noBigView">{data9}</span>
                    <span className="dash-box-title noBigView">{title9}</span>
                  </Fragment>
                )} */}
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
