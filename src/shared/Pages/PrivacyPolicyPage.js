import React, { useEffect, Component } from 'react'
import { Redirect } from 'react-router-dom'
import { HelmetComponent, PrivacyPolicy } from '../Components'
import { Button } from 'reactstrap'
import { Transition } from 'react-transition-group'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from  '@fortawesome/free-solid-svg-icons'
import { elevation } from '../Utils';

class PrivacyPolicyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animation: 'animated slideInRight fast',
      redirect: false
    }
    this.title = 'privacy-policy'
  }
  componentWillMount() {
    this.setState({ animation: 'animated slideInLeft' })
  }
  componentWillUnmount() {
    this.setState({ animation: 'animated fadeOut' })
  }
  redirectBack = () => {
    this.setState({ redirect: true })
  }
  render() {
    return (this.state.redirect ? <Redirect to="/" /> :
      <div>
        <FloatButton className="text-center animated flipInX">
          <Button style={{borderRadius: '100%', padding: '.7rem'}} className="btn-mainclr ml-auto" onClick={this.redirectBack}>
            <FontAwesomeIcon icon={faHome} size="2x" />
          </Button>
        </FloatButton>
        <div className={`p-5 bg-light ${this.state.animation}`}>
          <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
          <PrivacyPolicy />
        </div>
      </div>
    )

  }
}

export default {
  component: PrivacyPolicyPage
}

const FloatButton = styled.div`
  position: fixed!important;
  bottom: 3vh;
  right: 5vw;
  border-radius: 100%;
  z-index: 100;
  ${elevation[5]}
`