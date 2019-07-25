import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchCurrentUser } from '../Store/actions'
import { HelmetComponent, Loading } from '../Components'
import { Container } from 'reactstrap'

class FbLoginCheck extends Component {

  constructor(props) {
    super(props)
  }


  componentDidMount() {
    this.props.fetchCurrentUser()
  }
  render() {
    // return <Redirect to="/" />
    return (
      <Container className="p-4 text-center">
        <HelmetComponent pageTitle="admins" ogTitle="admins" />
        <Loading size="5" margin="5" />
        <Redirect to="/" />
      </Container>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default {
  component: connect(mapStateToProps, { fetchCurrentUser })(FbLoginCheck),
}


