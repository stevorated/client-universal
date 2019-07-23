import React, { Fragment } from 'react'

export default function EventTableItem(props) {

  return (
    <Fragment>

      <tr>
        <td className="lo-text" scope="row">{props.name}</td>
        <td className="lo-text">{props.venue}</td>
        <td className="lo-text">{props.startDate}</td>
      </tr>
    </Fragment>
  )
}
