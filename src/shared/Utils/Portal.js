import React , { Component } from 'react'
import reactDOM from 'react-dom'

const document = document || null

export default () => {
  if(document) {
    const portalRoot = document.getElementById('portal')
    class Portal extends Component {
  
      constructor() {
        super ()
        
        
      }
    
      componentDidMount = () => {
        this.el = document.createElement('div')
        portalRoot.append(this.el)
      }
    
      componentWillUnmount() {
        portalRoot.remove(this.el)
      }
    
      render() {
        const { children } = this.props
        return reactDOM.createPortal(children, this.el)
      }
    }
    return <Portal />
  } else {
    class Portal extends Component {
      render() {
        return (
          <div></div>
        )
      }
    }
    return <Portal />
  }
}

