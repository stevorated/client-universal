import React from 'react'
import styled from 'styled-components'
import { elevation, transition } from '../../Utils'

export default function LittleMenu(props) {
  // console.log(props)
  
  
  const children = () => {
    return props.items.map(item => {
      const handleChange = () => {
        props.handleChangeState(item)
      }
      const check = (
        props.boardMode && props.suggested && item === 'suggested') 
      || 
      (props.boardMode && !props.suggested && item !== 'suggested')
      const check2 = (
        props.feedMode && props.byCreatedAt && item === 'new') 
        || 
        (props.feedMode && !props.byCreatedAt && item !== 'new')
        // console.log(item, check2)
      const active = check ? true : false
      const active2 = check2 ? true : false
      const activeStyle = active ? 'active-button' : ''
      const activeStyle2 = active2 ? 'active-button' : ''

      return (
        <MenuItemButton className={`text-capitalize ${activeStyle} ${activeStyle2}`} value={item} onClick={handleChange} key={item}>{item}</MenuItemButton>
      )
    })
  }
  return (
    <Menu className="d-flex justify-content-between align-items-start noPadding">
      
      {children()}
      
    </Menu>
  )
}

const Menu = styled.div`
  /* margin: .4rem; */
  
  border-radius: 2px 0 0 2px;
  border: .1px solid grey;
`
const MenuDiv = styled.div`
padding: 0;
margin: 0;
display: block;
width: 33%;


`

const MenuItemButton = styled.button`
/* display: block; */
width: 100%;
margin: 0;
padding: .75rem 1.5rem;
background: none;
border: none;
outline: none;
${transition({
  property: 'shodow'
})};
/* box-sizing: content-box; */
&:hover {
  background: rgba(0, 0, 0, 0.10);
  box-shadow: none;
}
`