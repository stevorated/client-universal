import styled from 'styled-components'
import { Button } from 'reactstrap'
import { black, elevation, orange } from '../Utils'

export const RoundButton = styled(Button)`
/* position: absolute; */
background: ${black};
z-index: 100;
border-radius: 100%;
`

export const SquareButton = styled(Button)`
background: ${orange};
border: none;
transition: all .4s ease;
${elevation[2]};
&:hover {
  ${elevation[4]};
}
`