// import React, { Component } from 'react'
// import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap'
// import styled from 'styled-components'
// import { elevation, transition, orange, white, black } from '../Utils'
// export default class NavComponent extends Component {
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       dropdownOpen: false
//     };
//   }

//   toggle() {
//     this.setState({
//       dropdownOpen: !this.state.dropdownOpen
//     });
//   }

//   render() {
//     return (
//       <StyledNav  className="px-0 justify-content-center mt-5" >
//         <NavItem>
//           <StyledNavLink style={{color: orange, background: black, opacity: '.6'}} href="#">Tonight</StyledNavLink>
//         </NavItem>
//         <NavItem>
//           <StyledNavLink style={{color: orange, background: black, opacity: '.6'}} href="#">Tomorow</StyledNavLink>
//         </NavItem>
//         <NavItem>
//           <StyledNavLink style={{color: orange, background: black, opacity: '.6'}} href="#">This Week</StyledNavLink>
//         </NavItem>
//         <NavItem>
//           <StyledNavLink style={{color: orange, background: black, opacity: '.6'}} href="#">Past</StyledNavLink>
//         </NavItem>
//       </StyledNav>
//     )
//   }
// }

// const StyledNav = styled(Nav)`
// `

// const StyledNavItem = styled(NavItem)`
//   padding: 0;
//   margin: 0;
//   /* display: block;  */
// `

// const StyledNavLink = styled(NavLink)`
//   border-radius: 10px;
//   margin: .5rem;
//   padding: .5rem 1rem;
//   ${elevation[1]}
//   /* transition: all 3s ease; */
//   ${transition({
//         property: 'box-shadow'
//   })}
//   /* background: yellow; */
//   /* padding: 0 1rem; */
//   /* width: 2rem; */
//   /* display: block; */
  
// `
// const StyledDropdownToggle = styled(DropdownToggle)`
//   border-radius: 10px;
//   /* transition: all 3s ease; */
//   margin: .5rem;
//   padding: .5rem 1rem;
//   ${elevation[1]}
//   ${transition({
//         property: 'box-shadow'
//   })}
//   /* background: yellow; */
//   /* padding: 0 1rem; */
//   /* width: 2rem; */
//   /* display: block; */
  
// `
