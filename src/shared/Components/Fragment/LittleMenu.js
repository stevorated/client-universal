import React from 'react'
import styled from 'styled-components'

export default function LittleMenu(props) {
  
  const children = () => {
    return props.items.map(item => {
      return (
        <MenuItem key={item}>
          <MenuItemButton className="small-text">{item}</MenuItemButton>
        </MenuItem>
      )
    })
  }
  return (
    <Menu className="d-flex justify-content-between align-items-center">
      {children()}
    </Menu>
  )
}

const Menu = styled.div`
  margin: .4rem;
  
  border-radius: 2px 0 0 2px;
  border: .1px solid grey;
`
const MenuItem = styled.div`
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
/* box-sizing: content-box; */
&:hover {
  background: rgba(0, 0, 0, 0.10);
}
`