import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import { black, mediaQueries, orange } from '../../Utils'


function MenuItem({ icon, text, to = "/", handleLogout }) {
  const handleClick = to === '/logout' ? handleLogout : () => { }
  return (
  <StyledListItem className="text-center pl-3 m-2">
    <StyledNavLink to={to} onClick={handleClick} className="text-left py-1">
      <FontAwesomeIcon className="mx-3" icon={icon} size={'lg'} /><span>{text}</span> 
    </StyledNavLink>
  </StyledListItem>
  )
}

export default connect()(MenuItem)

const StyledListItem = styled.li`
  /* border: 5px solid black; */
  padding: 2px 4px;
  border: none;
  background: black;
  cursor: pointer;
  list-style: none;
  display: block;
  margin: .5rem .2rem .2rem 0rem ;
  transition: all .5s ease;
  ${mediaQueries.lg`
    border: none;
    background: none;
  `}
  &:hover {
    background: ${orange};
    color: black;
  }
  &:active {
    background: none!important;
  }
`

const StyledNavLink = styled(NavLink)`
  color: #c9783e;
  display: block;
  &:active {
    text-decoration: none;
  }
  &:hover {
    text-decoration: none;
    color: ${black}
  }
  
`