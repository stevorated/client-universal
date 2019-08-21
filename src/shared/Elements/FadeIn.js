import React from 'react'
import { CSSTransition, Transition } from 'react-transition-group'

export default function FadeIn(props) {
  const duration = 200

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0
  }
  const transitionStyles = {
    entering: { opacity: 1, height: '100%', margin: '0', zIndex: '0' },
    entered: { opacity: 1, height: '100%', margin: '0', zIndex: '0' },
    exiting: { opacity: 0, height: '0', padding: '0', margin: '0', zIndex: '0' },
    exited: { opacity: 0, height: '0', padding: '0', margin: '0', zIndex: '0' }
  }

  return (
    <Transition in={props.show} timeout={duration}>
      {state => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        >
          {props.children}
        </div>
      )}
    </Transition>
  )
}
