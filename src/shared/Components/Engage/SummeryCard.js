import React, { useState, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'
export default function SummeryCard(props) {
  const { data1, title1, data2, title2, data3, title3, icon, styleColor } = props
  const [open, setOpen] = useState(false)
  const height = open ? '19rem' : '10rem'
  const toggle = () => setOpen(!open)
  return (
    <div className={`dash-box dash-box-color-${styleColor}`}>
      <div className="dash-box-icon">
        <FontAwesomeIcon className="ml-1 mt-1 coolClr" icon={icon} size="2x" />
      </div>
      <CSSTransition timeout={1000}>
        <div style={{ height }} className="dash-box-body">
          <span className="dash-box-count">{data1}</span>
          <span className="dash-box-title">{title1}</span>
          {open && (
            <Fragment>
              <span className={`dash-box-count`}>{data2}</span>
              <span className={`dash-box-title`}>{title2}</span>
              <span className={`dash-box-count`}>{data3}</span>
              <span className={`dash-box-title`}>{title3}</span>
            </Fragment>
          )}
        </div>
      </CSSTransition>
      <div className="dash-box-action">
        <button onClick={toggle}>{open ? 'Less Info' : 'More Info'}</button>
      </div>
    </div>
  )
}
