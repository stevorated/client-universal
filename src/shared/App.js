import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import { renderRoutes } from 'react-router-config'
import { fetchCurrentUser } from './Store/actions'
import { black } from './Utils'
import ScrollToTop from './Elements/ScrollToTop'
// import Socket from './Store/sockets/socket'
// if (__isBrowser__) {
//   Socket('http://127.0.0.1:9999')
// }

function App(props) {
  const { auth, feed } = props
  // console.log(JSON.stringify(auth))
  // console.log(JSON.stringify(feed))
  // console.log(props)
  try {
    if (!props.auth) props.fetchCurrentUser()
  } catch (e) { console.log(e) }
  const { route } = props
  return (
    <Container
      fluid
      className="mx-0"
      style={{
        minHeight: '95vh',
        marginTop: '3.2rem',
        marginLeft: '0!important',
        marginRight: '0!important',
        padding: '0',
        color: `${black}`
      }}
    >
      <ScrollToTop>{renderRoutes(route.routes)}</ScrollToTop>
    </Container>
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
