import React, { useEffect, Component, createRef } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'
import { Transition } from 'react-transition-group'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { HelmetComponent, PrivacyPolicy, ScrollTo } from '../../Components'
import { elevation } from '../../Utils'

class PrivacyPolicyPage extends Component {
  constructor(props) {
    super(props)
    this.scroll = createRef()
    this.state = {
      animation: '',
      redirect: false,
      showArrow: false

    }
    this.title = 'privacy-policy'
  }

  handleScroll = async (e) => {
    if(window.pageYOffset > 700) {
      return this.setState({ showArrow: true, animation: 'animated flipInX faster' })
    } else {
      await this.setState({ animation: 'animated flipOutX faster' })
      setTimeout(() => {
        this.setState({ showArrow: false })
      }, 350);
      
    }
  }
  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll)
  }
  redirectBack = () => {
    this.setState({ redirect: true })
  }

  scrollToTop = () => {
    // console.log('scrolll')
    this.scroll.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start'
    })
  }

  render() {
    return (
      <div>
        <div style={{ position: 'absolute', top: '-10vh', height: '0' }}>
          <ScrollTo scroll={this.scroll} />
        </div>
        {this.state.showArrow && <FloatButton className={`text-center ${this.state.animation}`}>
          <Button
            style={{ borderRadius: '100%', padding: '.8rem 1rem' }}
            className="btn-mainclr ml-auto"
            onClick={() => this.scrollToTop()}
          >
            <FontAwesomeIcon icon={faArrowUp} size="lg" />
          </Button>
        </FloatButton>}
        <div className={`p-5 bg-light`}>
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
  position: fixed !important;
  bottom: 2vh;
  right: 2vw;
  border-radius: 100%;
  z-index: 100;
  ${elevation[5]}
`
