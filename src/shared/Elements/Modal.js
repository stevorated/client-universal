import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Transition, animated } from 'react-spring/renderprops.cjs'

import Icon from './Icon' 
import { Portal, absolute } from '../Utils'
import { Card } from './Cards'

export default class Modal extends Component {
  render() {
    const { children, toggle, on } = this.props
    return (
      <Portal>
          <Fragment>
            <ModalWrapper >
            <ModalCard>
              <CloseBtn onClick={toggle}>
              <Icon name="close"/>
              </CloseBtn>
              <div>{children}</div>
            </ModalCard>
            <ModalBackground onClick={toggle}/>
          </ModalWrapper>
          
          </Fragment>
      </Portal>
    )
  }
}


const ModalWrapper = styled.div`
  ${absolute({})};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const animCard = Card.withComponent(animated.div)

const ModalCard = styled(animCard)`
  position: relative;
  z-index: 100;
  min-width: 20rem; 
  max-width: 80vw; 
  margin-bottom: 8rem;
`

const CloseBtn = styled.button`
  ${absolute({x: 'top', y: 'right'})};
  border: none;
  background: transparent;
  padding: .6rem; 
`
const ModalBackground = styled(animated.div)`
  ${absolute({})};
  width: 100%;  
  height: 100%;
  background: rgba(0, 0, 0, 0.62);
`


