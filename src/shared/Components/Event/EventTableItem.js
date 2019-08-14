import React, { Fragment } from 'react'
import moment from 'moment'

export default function EventTableItem(props) {
  // console.log(props)
  const when = moment(props.startDate).format('DD MMMM')
  return (
    <Fragment>

      <tr onClick={()=>props.handleAction('redirect', { id: props.id })}>
        <td className="lo-text" scope="row">{props.name}</td>
        <td className="lo-text">{props.venue}</td>
        <td className="lo-text">{when}</td>
      </tr>
    </Fragment>
  )
}
