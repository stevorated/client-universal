import React from 'react'
import { Container, Col, Row } from 'reactstrap'
import { MenuCard } from '../Elements'
import {
  faBrain,
  faCookieBite,
  faUtensils,
  faCalendarAlt,
  faWrench,
  faAirFreshener,
  faUserAlt,
  faAnchor,
  // faSearch,
  // faAddressBook,
  // faAmericanSignLanguageInterpreting,
  // faAmbulance,
  // faMale,
  // faHome,
  // faScrewdriver

} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import MenuItem from '../Components/Feed/MenuItem'
import { orange } from '../Utils'
// import { black, white, elevation } from '../../Utils'

function Menu(props) {
  return (
    <MenuCard className="text-center mb-0" style={{borderRadius: 'none'}}>
      <h3 className="header-4 mt-3" style={{color: `${orange}`, fontWeight: '600'}}>Menu</h3>
      <hr className="lead mb-3" style={{ color: `${orange}`, borderWidth: '2px', borderColor: `${orange}` }} />
      <Container>
        <Row >
          <Col lg={12} xs={6} className="p-0">
            <StyledList className="p-0 m-0 pb-2">
              <MenuItem icon={faAnchor} text="Event Board" to="/event-board" />
              <MenuItem icon={faUtensils} text="Event Feed" to="/event-feed"/>
              <MenuItem icon={faCookieBite} text="Post Feed" to="/feed" />
              <MenuItem icon={faCalendarAlt} text="Calander" to="/calander" />
            </StyledList>
          </Col>
          <Col lg={12} xs={6} className="p-0 pb-2">
            <StyledList className="p-0 m-0">
              <MenuItem icon={faBrain} text="Engage Page" to="/engage-gauge"/>
              <MenuItem icon={faUserAlt} text="Profile" to="/my-profile" />
              <MenuItem icon={faWrench} text="Settings" to="/settings" />
              <MenuItem icon={faAirFreshener} text="Privacy" to="/privacy" />
            </StyledList>
          </Col>
        </Row>
      </Container>
    </MenuCard>
  )
}

const StyledList = styled.ul`
  display: block;
`

export default Menu

// <hr style={{ color: 'white', borderWidth: '2px', borderColor: 'white' }} />

// <MenuItem icon={faAmbulance} text="Logout" to="/logout" handleLogout={handleLogout} />