import React, { Fragment } from 'react'
import { HelmetComponent } from '../../Components'
import { Container } from 'reactstrap'
import NotFound from '../../Components/Fragment/NotFound'
import '../../../assets/css/404.css'

function NotFoundPage({ staticContext = {} }) {
  staticContext.notFound = true
  const title = "Page Not Found"
  return (
    <Fragment >
      <HelmetComponent pageTitle={title} ogTitle={title} />
      <NotFound />
    </Fragment>
  )
}

export default {
  component: NotFoundPage
}
