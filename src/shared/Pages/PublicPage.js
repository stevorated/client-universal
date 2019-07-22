import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { HelmetComponent } from '../Components'
import { Container, Row, Col } from 'reactstrap'
import { elevationJs, transition, elevation, orange, mediaQueries } from '../Utils'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'

import forceLoggedIn from '../HOC/forceLoggedIn'
import Logo from '../../assets/logos/logo5.png'
const linkLogo = Logo.replace('build', '').replace('/public', '')

const responseFacebook = (response) => {

}

function PublicPage(props) {
  // const [btnText, setBtnText] = useState('CLICK ME')
  // const [counter, setCounter] = useState(0)
  const [redirect, setRedirect] = useState(false)
  const [fadeOut, setFadeOut] = useState('')
  const [where, setWhere] = useState('')

  const title = "Public Page"
  const handleReg = () => {
    setWhere('/register')
    setFadeOut('animated rollOut')
    setTimeout(() => setRedirect(true), 1200)
  }
  const handleLogin = () => {
    setWhere('/login')
    setFadeOut('animated hinge')
    setTimeout(() => setRedirect(true), 1200)
  }
  const handleFB = () => {
    setWhere('/login')
    setFadeOut('animated rollOut')
    setTimeout(() => setRedirect(true), 1200)
  }
  return redirect ? <Redirect to={where} /> : (
    <Container style={{ minHeight: '90vh' }} className={`animated fadeIn slow text-center ${fadeOut}`}>
      <HelmetComponent pageTitle={title} ogTitle={title} />
      <div className="mt-5">
        <h1 className="welcome-to">- Welcome to -</h1>
        <LogoHeader className="logo-img" src={linkLogo} alt="" onClick={handleLogin} />
      </div>
      <Row className="mt-4">
        <Col md={4}>
          <StyledBigButton
            style={{ background: '#3b5998', color: 'white' }}
            onClick={handleFB}
            className="big-btn"
          >
            <FontAwesomeIcon className="mr-3" icon={faFacebookSquare} size="lg" />
            login with Facebook
          </StyledBigButton>
        </Col>
        <Col md={4}>
          <OrHeader className="mt-4 sigmar-one">- OR -</OrHeader>
          <StyledBigButton
            style={{ fontFamily: "'Sigmar One', cursive" }}
            onClick={handleLogin}
            className="big-btn"
          >
            Login
        </StyledBigButton>
        </Col>
        <Col md={4}>
          <StyledBigButton
            style={{ fontFamily: "'Sigmar One', cursive" }}
            onClick={handleReg}
            className="big-btn"
          >
            Register
          </StyledBigButton>
        </Col>
      </Row>
    </Container>
  )
}

export default {
  component: forceLoggedIn(PublicPage)
}

const LogoHeader = styled.img`
  margin-top: 1rem;
  padding: 1rem;
  width: 80vw;
  background: ${orange} ;
  ${elevation[3]}
  ${transition({
  property: 'box-shadow'
})};
`

const OrHeader = styled.h6`
display: block;
${mediaQueries.md`
 display: none;
`}
`
const StyledBigButton = styled.button`
  ${elevation[4]}
`

  // const handleClick = () => {

  //   if (counter === 0) {
  //     setBtnText('AND AGAIN')
  //     setCounter(1)
  //   }
  //   if (counter === 1) {
  //     setBtnText('ONE MORE TIME')
  //     setCounter(2)
  //   }
  //   if (counter === 2) {
  //     setBtnText('LAST TIME, COME ON!')
  //     setCounter(3)
  //   }
  //   if (counter === 3) {
  //     setBtnText('CLICK ME')
  //     setCounter(0)
  //     setFadeOut('animated rollOut')
  //     setTimeout(()=> setRedirect(true), 1200 )
  //   }
  // }