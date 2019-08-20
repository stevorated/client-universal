import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import { renderRoutes } from 'react-router-config'
import { fetchCurrentUser } from './Store/actions'
import { black } from './Utils'
import styled from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'

function App(props) {
  const { auth } = props
  try {
    if (!auth) props.fetchCurrentUser()
  } catch (e) {
    console.log(e)
  }
  const { route } = props
  return (
    <HelmetProvider>
      <AppContainer fluid className="mx-0">
        {renderRoutes(route.routes)}
      </AppContainer>
    </HelmetProvider>
  )
}

const mapStateToProps = ({ auth, feed }) => {
  return { auth, feed }
}

export default {
  component: connect(
    mapStateToProps,
    { fetchCurrentUser }
  )(App),
  loadData: ({ dispatch }) => dispatch(fetchCurrentUser())
}

const AppContainer = styled(Container)`
  min-height: 95vh;
  margin-top: 3.2rem;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding: 0;
  color: ${black};
`
