import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { black, orange, elevation, transition, timeAgo } from '../Utils'

export const StyledLink = styled(Link)`
color: ${black};
&:hover {
  color: ${black};
  text-decoration: none;
}
`
export const Line = ({className}) => <hr className={`noPadding ${className}`} style={{ color: orange, borderWidth: '2px', borderColor: orange, opacity: '0.5' }} />

export const DateSquareStyle  = styled.div`
width: 75px;
height: 75px;
background: red;
`