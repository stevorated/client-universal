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
      const check3 = (
        props.userProfileMode && props.showPosts && item === 'posts') 
        || 
        (props.userProfileMode && !props.showPosts && item !== 'posts')
      const active = check ? true : false
      const active2 = check2 ? true : false
      const active3 = check3 ? true : false
      const activeStyle = active ? 'active-button' : ''
      const activeStyle2 = active2 ? 'active-button' : ''
      const activeStyle3 = active3 ? 'active-button' : ''
      // console.log(item, activeStyle3)

      return (
        <MenuItemButton className={`text-capitalize ${activeStyle} ${activeStyle2} ${activeStyle3}`} value={item} onClick={handleChange} key={item}>{item}</MenuItemButton>
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