import React from 'react'
import { Container } from 'reactstrap'
import { renderRoutes } from 'react-router-config'
import { fetchCurrentUser } from './Store/actions'
import { black } from './Utils'
import ScrollToTop from './Elements/ScrollToTop'

function App({ route }) {
  return (
    <Container fluid className="mx-0" style={{minHeight: '95vh', marginTop: '3.2rem', marginLeft: '0!important', marginRight: '0!important', padding: '0', color: `${black}`}}>
    <ScrollToTop>
      {renderRoutes(route.routes)}
    </ScrollToTop>
    </Container>
  )
}

export default {
  component: App,
  loadData: ({dispatch}) => dispatch(fetchCurrentUser())
}