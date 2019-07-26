import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import routes from './mainRoutes'
import NavbarComponent from './NavbarComponent'
import { Footer } from '../Components'

const MainContent = ({ whereTo, redirect, setRedirect }) => {
  
  const id = whereTo
  if (redirect && !id) {
    setRedirect(false)
    return <Redirect to={`/feed`} />
  }
  if (redirect) {
    setRedirect(false)
    return <Redirect to={`/profile/${id}`} />
  }
  return (
    <Container fluid>{renderRoutes(routes)}</Container>
  )
}

function Layout(props) {
  const [whereTo, setWhereTo] = useState('')
  const [redirect, setRedirect] = useState(false)
  return (
    <Fragment>
      <NavbarComponent
        setRedirect={setRedirect}
        setWhereTo={setWhereTo}
        whereTo={whereTo}
      />
      <MainContent
        redirect={redirect}
        setRedirect={setRedirect}
        setWhereTo={setWhereTo}
        whereTo={whereTo}
      />
      <Footer />

    </Fragment>
  )
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Layout)