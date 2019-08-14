import React from 'react'
import { Alert, Button, Link } from 'reactstrap'

const AlertComponent = ({ alertText, style, className, setHideMessage }) => {
  const handleClick = (e) => {
    e.preventDefault()
    setHideMessage(true)
  }
  return (
    <div className="text-left">
      <Alert className={`${className}`} style={style} color="danger">
        {alertText} -
        <a href="" onClick={handleClick}> Got it</a>
      </Alert>
    </div>
  );
}

export default AlertComponent
