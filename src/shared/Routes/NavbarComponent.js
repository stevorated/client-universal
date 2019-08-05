import React, { useState, Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Input, Button, Label } from 'reactstrap'
import { SearchBar, LiveNotificationCount } from '../Components'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell, faUtensils, faFeather, faCalendar, faCalendarAlt
} from '@fortawesome/free-solid-svg-icons'
import { elevationJs, orange, lightOrange, mediaQueries, white } from '../Utils'
import { logoutUser, clearNewNotifications } from '../Store/actions'
import Logo from '../../assets/logos/logo7.png'
const linkLogo = Logo.replace('build', '').replace('/public', '')
function NavbarComponent(props) {
  const { newNotificationsCount, auth, logoutUser, setRedirect, setWhereTo, whereTo, clearNewNotifications } = props

  const [collapsed, toggleNavbar] = useState(false)

  const handleToggleNav = () => toggleNavbar(!collapsed)

  const handleClick = () => {
    if (collapsed === true) {
      toggleNavbar(!collapsed)
    }
  }

  const handleClickAndClearNotifications = () => {
    clearNewNotifications()
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
    <NavLink className='nav-link mt-md-0 mt-0' to="/logout" onClick={handleLogout}>Logout</NavLink>
  ) : (
      <div className="d-md-flex mt-2 mt-md-0">
        <NavLink className='nav-link my-1 my-md-0' to="/login" onClick={handleClick}  >Login</NavLink>
        <NavLink className='nav-link my-1 my-md-0' to="/register" onClick={handleClick}  >Register</NavLink>
        <NavLink className='nav-link my-1 my-md-0' to="/privacy" onClick={handleClick}>Privacy</NavLink>
      </div>
    )
  return (
    <Fragment>
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
      {auth && <StyledLine />}
        {auth && <SearchBar
          setRedirect={setRedirect}
          setWhereTo={setWhereTo}
          whereTo={whereTo}
          handleClick={handleClick} />}
          {auth && <StyledLine />}
        <Nav className="ml-auto pr-4" navbar>
          {auth && <Fragment>

            <NavItem>
              <NavLink
                style={{position: 'relative'}}
                className='nav-link'
                onClick={handleClickAndClearNotifications}
                to='/notifications'
              >
                {newNotificationsCount > 0 && <div style={{
                  // padding: '10px',
                  color: 'black',
                  fontSize: '9px',
                  fontWeight: '900',
                  width: '14px',
                  height: '14px',
                  position: 'absolute',
                  zIndex: '10000000000',
                  top: '0',
                  left: '4px',
                  borderRadius: '100%',
                  background: orange
                  }}>
                    <div className="text-center">{newNotificationsCount < 10 ? newNotificationsCount : '10+'}</div> </div>}
                {auth && <LiveNotificationCount />}
                <StyledIcon className="mr-0" icon={faBell} size={'lg'} /><StyledSpan>Notifications</StyledSpan>
                
              </NavLink>
            </NavItem>

            {/* <NavItem>
              <NavLink
                className='nav-link'
                onClick={handleClick}
                to='/engage-gauge '
              >
                <StyledIcon className="mr-2" icon={faFeather} size={'lg'} /><StyledSpan>Engage Guage</StyledSpan>
              </NavLink>
            </NavItem> */}
            
            <NavItem>
              <NavLink
                className='nav-link'
                onClick={handleClick}
                to='/calander'
              >
                <StyledIcon className="mr-0" icon={faCalendarAlt} size={'lg'} /><StyledSpan>Calander</StyledSpan>
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
              <StyledLine className="noPadding mt-2" />
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
            <StyledLine className="noPadding"/>
          </NavItem>
          <NavItem>
            {authBtn}
          </NavItem>
        </Nav>
      </Collapse>
      
    </Navbar>
    {auth && <OpositeStyledLink 
      to="/notifications"
      onClick={handleClick}
    >
      
      <OpositeStyledIcon
        icon={faBell}
        onClick={handleClickAndClearNotifications}
        />
        {newNotificationsCount > 0 && <div style={{
                  // padding: '10px',
                  color: 'black',
                  fontSize: '10px',
                  fontWeight: '900',
                  width: '14px',
                  height: '14px',
                  position: 'fixed',
                  right: '95px',
                  top: '12px',
                  zIndex: '10000000000',
                  // top: '0',
                  // left: '0',
                  borderRadius: '100%',
                  background: orange
                  }}>
                  {newNotificationsCount > 0  && 
                    <div className="pl-1">{newNotificationsCount}</div> }</div>}
    </OpositeStyledLink>}
  </Fragment>  
  )
}

function mapStateToProps({ auth, newNotificationsCount }) {
  return { auth, newNotificationsCount }
}

export default connect(mapStateToProps, { logoutUser, clearNewNotifications })(NavbarComponent)

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

const OpositeStyledIcon = styled(FontAwesomeIcon)`
    font-size: 1.5rem;
    position: fixed;
    color: grey;
    z-index: 100000;
    right: 85px;
    top: 15px;
    display: block;
    ${mediaQueries.md`
    display: none;
  `}
`
const OpositeStyledLink = styled(Link)`
    
    display: block;
    ${mediaQueries.md`
    display: none;
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