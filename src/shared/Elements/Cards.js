import styled from 'styled-components'
import {
  elevation,
  transition,
  black,
  white,
  orange,
  mediaQueries
} from '../Utils'

export const Card = styled.div `
      color: ${black};
      background: whitesmoke;
      opacity: .9;
      border-radius: .3rem;
      padding: 0;
      margin-bottom: 1rem;
      ${elevation[3]};
      transition: all 3s ease;
      ${transition({
            property: 'box-shadow'
      })};
      &:hover {
            ${elevation[4]};
      }
    
`

export const FlatCard = styled.div `
      color: ${black};
      background: whitesmoke ;
      opacity: .9;
      border-radius: .3rem;
      padding: 0.5rem;
      /* margin-bottom: .3rem; */
      ${elevation[1]}
      transition: all 3s ease;
      ${transition({
            property: 'box-shadow'
      })};
      &:hover {
            ${elevation[2]};
      }
`

export const FlatCardStatic = styled.div `
      color: ${black};
      background: whitesmoke ;
      opacity: .9;
      border-radius: .3rem;
      padding: 0.5rem;
      /* margin-bottom: .3rem; */
      ${elevation[6]}
`

export const MenuCard = styled.div `
      color: ${orange};
      /* min-height: 50vh; */
      background: ${black};
      opacity: .5;
      /* border-radius: .3rem; */
      padding: 0.5rem;
      /* margin-bottom: .3rem; */
      ${elevation[1]}
      transition: all 3s ease;
      ${transition({
            property: 'box-shadow'
      })};
      &:hover {
            ${elevation[2]};
      }
      ${mediaQueries.lg`
      border-radius: .3rem;
      `}
`

