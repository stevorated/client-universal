import React from 'react'
import { CSSTransition, Transition } from 'react-transition-group'

export default function FadeIn(props) {
  const duration = 300

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0
  }
  const transitionStyles = {
    entering: { opacity: 1, height: '100%' },
    entered: { opacity: 1, height: '100%' },
    exiting: { opacity: 0, height: '0' },
    exited: { opacity: 0, height: '0' }
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
