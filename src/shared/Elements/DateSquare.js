import React, { Fragment } from 'react'

export const DateSquare =  ({ month = 'Jan', day ='2' }) => {
  return (
    <div>
      <div
        data-test="month"
        className="noPadding"
        style={{fontSize: '1.2rem'}}
        >
        {month}
      </div>
      <hr className="noPadding"/>
      <div
        data-test="day"
        style={{fontSize: '2rem'}}
        >
        {day}
      </div>
    </div>
  )
}

export default DateSquare