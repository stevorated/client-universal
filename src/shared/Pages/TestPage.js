import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'
import { fetchUsers } from '../Store/actions'
import { HelmetComponent} from '../Components'
import requireAuth from '../HOC/requireAuth'
import { Container } from 'reactstrap'
import FileInputContainer from '../Components/Fragment/FileInputContainer'
import Avatar from '../../assets/logos/new_logo.png'
const imgAvatar = Avatar.replace('build', '').replace('/public', '')

class TestPage extends Component {
  
  constructor(props) {
    super(props)
    console.log(this.props)
  }


  componentDidMount() {
    this.props.fetchUsers()
  }

  renderQuery() {
    return this.props.users.map(({ id, fname, lname, username})=>{
      return <h4 key={id}>{fname} {lname} {username}</h4>
    })
  }
  handleClick = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const image = new Image(60, 45); // Using optional size for image
    image.onload = drawImageActualSize; // Draw when image has loaded

    // Load an image of intrinsic size 300x227 in CSS pixels
    image.src = imgAvatar

    function drawImageActualSize() {
      // Use the intrinsic size of image in CSS pixels for the canvas element
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;

      // Will draw the image as 300x227, ignoring the custom size of 60x45
      // given in the constructor
      // ctx.drawImage(this, 0, 0);

      // To use the custom size we'll have to specify the scale parameters 
      // using the element's width and height properties - lets draw one 
      // on top in the corner:
      // ctx.fillRect(100, 0, 0, 0);
      ctx.drawImage(this, 10,10);
}

    // ctx.fillStyle = 'green';
    // ctx.fillRect(10, 10, 150, 100);
  }
  render() {
    // return <Redirect to="/" />
    // return (
    //   <Container className="p-4 text-center">
    //     <HelmetComponent pageTitle="admins" ogTitle="admins" />
        
    //     <canvas style={{background:'white', minHeight: '100px'}} id="canvas"></canvas>
    //     <button onClick={this.handleClick}>Draw</button>
    //     <h1>Protected list</h1>
    //     <h6>{this.props.auth.id}</h6>
        
    //     {this.renderQuery()} 
    //   </Container>
    // )
  }
}

function mapStateToProps({ users, auth }) {
  return { users, auth }
}

export default {
  component: connect(mapStateToProps, {fetchUsers})(requireAuth(TestPage)),
  loadData: ({ dispatch }) => dispatch(fetchUsers())
}


