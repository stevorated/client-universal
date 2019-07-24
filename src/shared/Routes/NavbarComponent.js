import React, { useState, Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Input, Button, Label } from 'reactstrap'
import { SearchBar } from '../Components'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell, faUtensils, faFeather
} from '@fortawesome/free-solid-svg-icons'
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
    <NavLink className='nav-link mt-md-0 mt-2' to="/logout" onClick={handleLogout}>Logout</NavLink>
  ) : (
      <div className="d-md-flex">
        <NavLink className='nav-link' to="/login" onClick={handleClick}  >Login</NavLink>
        <NavLink className='nav-link' to="/register" onClick={handleClick}  >Register</NavLink>
        <NavLink className='nav-link' to="/privacy" onClick={handleClick}>Privacy</NavLink>
      </div>
    )
  return (
    <Navbar className="text-capitalize " color="dark" style={elevationJs[4]} dark expand="md" fixed="top">
      <NavLink
        style={{ fontSize: '1.1rem', margin: '0', padding: '0' }}
        className="nav-link text-white"
        onClick={handleClick}
        to={auth ? '/event-board' : '/'}> <LogoImg className="ml-sm-0" src={linkLogo} alt="" />
      </NavLink>
      <NavbarToggler
        onClick={handleToggleNav}
      />
      <Collapse isOpen={collapsed} navbar>
      <StyledLine />
        {auth && <SearchBar
          setRedirect={setRedirect}
          setWhereTo={setWhereTo}
          whereTo={whereTo}
          handleClick={handleClick} />}
          <StyledLine />
        <Nav className="ml-auto pr-4" navbar>
          {auth && <Fragment>

            <NavItem>
              <NavLink
                className='nav-link'
                onClick={handleClick}
                to='/notifications'
              >
                <StyledIcon className="mr-2" icon={faBell} size={'lg'} /><StyledSpan>Notifications</StyledSpan>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className='nav-link'
                onClick={handleClick}
                to='/engage-gauge '
              >
                <StyledIcon className="mr-2" icon={faFeather} size={'lg'} /><StyledSpan>Engage Guage</StyledSpan>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className='nav-link'
                onClick={handleClick}
                to='/event-feed'
              >
                Events
            </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className='nav-link'
                onClick={handleClick}
                to='/feed'
              >
                Feed
          </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className='nav-link'
                onClick={handleClick}
                to='/my-profile'
              >
                Profile
          </NavLink>
            </NavItem>

            <NavItem>
              <StyledLine />
            </NavItem>
            <StyledNavItem>
              <NavLink
                className='nav-link'
                onClick={handleClick}
                to='/setings'
              >
                Setings
            </NavLink>
            </StyledNavItem>
            <StyledNavItem>
              <NavLink
                className='nav-link'
                onClick={handleClick}
                to='/prefrences'
              >
                Prefrences
            </NavLink>
            </StyledNavItem>
          </Fragment>}
          <NavItem>
            <StyledLine />
          </NavItem>
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

const StyledNavItem = styled(NavItem)`
    display: block;  
    ${mediaQueries.md`
    display: none;
  `}
`
const StyledIcon = styled(FontAwesomeIcon)`
    display: none;
    ${mediaQueries.md`
    display: block;  
  `}
`
const StyledSpan = styled.span`
    display: block; 
    ${mediaQueries.md`
     
    display: none;
  `}
`

const StyledLine = styled.hr`
    display: block; 
    background: white;
    /* border: 2px solid white; */
    /* width: 2px; */
    /* ${mediaQueries.md`
     
    display: none;
  `} */
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