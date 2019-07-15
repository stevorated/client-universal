// import React, { Component } from 'react'
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
// import styled from 'styled-components'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus } from '@fortawesome/free-solid-svg-icons'
// import { black, orange } from '../../Utils'

// export default (Component) => {
//   class withModal extends Component {
//     constructor(props) {
//       super(props)
//       this.state = {
//         modal: false
//       }
//     }
  
//     toggle = () => {
//       this.setState(prevState => ({
//         modal: !prevState.modal
//       }))
//     }
  
//     render() {
//       const { buttonLabel, buttonSize, iconSize , icon, className, round } = this.props
//       return (
//         <div>
//           { 
//             round ? (
//             <RoundButton size={buttonSize} onClick={this.toggle}>
//             { labelbuttonLabel ? <span>labelbuttonLabel</span> : <StyledIcon size={iconSize} icon={faPlus} />}
//             {buttonLabel && <StyledIcon size={iconSize} icon={icon} />}
//           </RoundButton>
//           ) : (
//             <SquareButton size={buttonSize} onClick={this.toggle} text={buttonLabel}>
//             {buttonLabel}<StyledIcon size={iconSize} icon={faPlus} />
//           </SquareButton>
//             )
//           }
//           <Modal returnFocusAfterClose={false} isOpen={this.state.modal} toggle={this.toggle} className={className}>
//             <ModalHeader toggle={this.toggle}>{buttonLabel}</ModalHeader>
//             <ModalBody render={hoc => (<Component {...this.props} toggle={this.toggle} />)} />
//           </Modal>
//         </div>
//       )
//     }
//   }
//   return withModal
// }

// const RoundButton = styled(Button)`
//   /* position: absolute; */
//   background: ${black};
//   padding: .5rem .5rem;
//   z-index: 100;
//   border-radius: 100%;
// `
// const SquareButton = styled(Button)`

//   /* position: absolute; */
//   /* background: ${black}; */
//   /* padding: .5rem .5rem; */
//   /* z-index: 100; */
//   /* margin: 3rem; */
//   /* border-radius: 100%; */
// `


// const StyledIcon = styled(FontAwesomeIcon)`
// /* font-size: .7rem; */
// margin: 0 0 0 .6rem;

// color: ${orange};
// `