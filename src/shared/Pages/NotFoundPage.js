import React from 'react'
import { HelmetComponent } from '../Components'
import { Container } from 'reactstrap'

function NotFoundPage({ staticContext = {} }) {
  staticContext.notFound = true
  const title="Page Not Found"
  return (
    <div>
      <HelmetComponent pageTitle={title} ogTitle={title} />
      <h4><strong>Oops.. Page Not Found</strong></h4>
    </div>
  )
}

export default {
  component: NotFoundPage
}
