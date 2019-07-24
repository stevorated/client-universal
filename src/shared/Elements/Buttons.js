import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
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

export const FbLogin = (props) => {
  return (
    <a href={process.env.FB_LOGIN_URL}>
    <StyledBigButton
      style={{ background: '#3b5998', color: 'white' }}
      className="big-btn"
      
    >
      <FontAwesomeIcon className="mr-3" icon={faFacebookSquare} size="lg" />
      {!props.register ? `login with Facebook` : `register with facebook`}
    </StyledBigButton>
  </a>
    
  )
}

export const StyledBigButton = styled.button`
  ${elevation[4]}
`