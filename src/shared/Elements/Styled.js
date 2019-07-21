import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { black, elevation, transition, timeAgo } from '../Utils'

export const StyledLink = styled(Link)`
color: ${black};
&:hover {
  color: ${black};
  text-decoration: none;
}
`