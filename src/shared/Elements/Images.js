import { elevation, black } from '../Utils'
import styled from 'styled-components'

export const BigProfileImg = styled.img`
${elevation[2]};
/* filter: grayscale(20%); */
width: 3rem;
height: 3rem;
border-radius: 100%;

transition: all .4s ease;
&:hover {
  ${elevation[3]};
  filter: none;
}
`

export const SmallProfileImg = styled.img`
${elevation[2]};
background: green;  
width: 1.8rem;
height: 1.8rem;
border-radius: 100%;
transition: all .4s ease;
&:hover {
  ${elevation[3]};
}
`

