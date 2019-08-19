import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import routes from './mainRoutes'
import NavbarComponent from './NavbarComponent'
import { Footer, AlertComponent } from '../Components'
import styled from 'styled-components'
import { mediaQueries } from '../Utils'
const MainContent = ({ whereTo, redirect, setRedirect, hideMessage, email_confirmed, auth }) => {
  const id = whereTo
  const style = (hideMessage || email_confirmed) || auth === null ? { } : { marginTop: '7rem' }
  if (redirect && !id) {
    setRedirect(false)
    return <Redirect to={`/feed`} />
  }
  if (redirect) {
    setRedirect(false)
    return <Redirect to={`/profile/${id}`} />
  }
  return (
    <Container style={style} fluid>
    {/* <Container  fluid> */}
      {renderRoutes(routes)}
    </Container>
  )
}

function Layout(props) {
  const [hideMessage, setHideMessage] = useState(false)
  const [whereTo, setWhereTo] = useState('')
  const [redirect, setRedirect] = useState(false)
  return (
    <Fragment>
      <NavbarComponent
        setRedirect={setRedirect}
        setWhereTo={setWhereTo}
        whereTo={whereTo}
      />
      {props.auth && !props.auth.email_confirmed && (
        <StyledAlertComponent
          className={hideMessage ? 'animated slideOutUp faster' : ''}
          setHideMessage={setHideMessage}
          alertText="plz confirm your mail, without it you can't reset your password and get our special announcement"
        />
      )}
      <MainContent
        auth={props.auth}
        email_confirmed={props.auth && props.auth.email_confirmed}
        hideMessage={hideMessage}
        redirect={redirect}
        setRedirect={setRedirect}
        setWhereTo={setWhereTo}
        whereTo={whereTo}
      />
      {/* <Footer /> */}
    </Fragment>
  )
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Layout)

const StyledAlertComponent = styled(AlertComponent)`
position: absolute;
  top: 9%;
  /* left: 0%; */
  z-index: 1000;
  width: 100%;
  ${mediaQueries.lg`
  position: absolute;
  top: 10%;
  left: 24%;
  z-index: 1000;
  width: 100%;
  `}
`
