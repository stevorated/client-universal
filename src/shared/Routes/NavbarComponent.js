import React, { useState, Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Input, Button, Label } from 'reactstrap'
import { SearchBar } from '../Components'
import styled from 'styled-components'

import { elevationJs, orange, lightOrange, mediaQueries } from '../Utils'
import { logoutUser } from '../Store/actions'
import Logo from '../../assets/logos/logo7.png'
const linkLogo = Logo.replace('build', '').replace('/public', '')
function NavbarComponent({ auth, logoutUser, setRedirect, setWhereTo, whereTo }) {

  const [collapsed, toggleNavbar] = useState(false)

  const handleToggleNav = () => toggleNavbar(!collapsed)

  const handleClick = () => {
    if (collapsed === true) {
      toggleNavbar(!collapsed)
    }
  }

  const handleLogout = async () => {
    const res = await logoutUser()
    if (collapsed === true) {
      toggleNavbar(!collapsed)
    }
  }

  const authBtn = auth ? (
      <StyledNavLink className='nav-link' to="/logout" onClick={handleLogout}>Logout</StyledNavLink>
  ) : (
      <div className="d-md-flex">
        <StyledNavLink className='nav-link' to="/privacy">Privacy</StyledNavLink>
        <StyledNavLink className='nav-link' to="/login" onClick={handleClick}  >Login</StyledNavLink>
        <StyledNavLink className='nav-link' to="/register" onClick={handleClick}  >Register</StyledNavLink>
      </div>
    )
  return (
    <Navbar className="text-capitalize " color="dark" style={elevationJs[4]} dark expand="md" fixed="top">
      <StyledNavLink
        style={{ fontSize: '1.1rem', margin: '0', padding: '0' }}
        className="nav-link text-white"
        onClick={handleClick}
        to={auth ? '/feed' : '/'}> <LogoImg className="ml-sm-0" src={linkLogo} alt=""/>
      </StyledNavLink>
      <NavbarToggler
        onClick={handleToggleNav}
      />
      <Collapse isOpen={collapsed} navbar>
        <SearchBar
          setRedirect={setRedirect}
          setWhereTo={setWhereTo}
          whereTo={whereTo}
          handleClick={handleClick} />
        <Nav className="ml-auto pr-4" navbar>
          {auth && <Fragment>
            <NavItem>
            <StyledNavLink
              className='nav-link'
              onClick={handleClick}
              to='/my-profile'
            >
              Profile
          </StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink
              className='nav-link'
              onClick={handleClick}
              to='/feed'
            >
              Feed
          </StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink
              className='nav-link'
              onClick={handleClick}
              to='/event-board'
            >
              Events
          </StyledNavLink>
          </NavItem>
          </Fragment>}

          <NavItem>
            {authBtn}
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps, { logoutUser })(NavbarComponent)

const StyledNavLink = styled(NavLink)`
/* color: ${lightOrange}; */
`

const LogoImg = styled.img`
  height: 2.2rem;
  ${mediaQueries.md`
  height: 3rem;
  `}
  `

  // <Switch>
// {routes.map(route => <Route key={route.name} {...route} />)}
// </Switch>