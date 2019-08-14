import React, { useState }  from 'react'
import { Navbar, Alert } from 'reactstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mediaQueries } from '../../Utils'

function Footer () {
  return (
    <FooterDiv>
      <FooterNavbar color="dark" dark fixed="bottom">
        <StyledLink 
        className="nav-link text-white" 
        to="/">Wisdom Of De Crowd&copy;
        </StyledLink>
        {/* <StyledLink 
        className="nav-link text-white text-center" 
        to="/">plz confirm your email
        </StyledLink> */}

      </FooterNavbar>
    </FooterDiv>
  )
  }

export default Footer
const FooterDiv = styled.div`
  display: none;
  opacity:0.6;
  ${mediaQueries.lg`
    display: block;
  `}
`
const FooterNavbar = styled(Navbar)`
height: 2rem;
`
const StyledLink = styled(Link)`
opacity:0.6;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
font-size: 0.9rem;
padding: 0;
`