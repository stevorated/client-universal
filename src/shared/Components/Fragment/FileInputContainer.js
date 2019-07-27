import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import CropFileInput from './CropFileInput'
import { connect } from 'react-redux'
import { uploadFile } from '../../Store/actions'
import { getCroppedImg } from '../../Utils'


function FileInputContainer(props) {
  const reactCropPreview = document.getElementsByClassName('ReactCrop__image')
  const [valid, setValid] = useState(false)
  const [error, setError] = useState('')
  const [fileData, setFileData] = useState({})
  const [preview, setPreview] = useState('')
  const [crop, setCrop] = useState({
    unit: 'px',
    width: 100,
    height: 100,
    aspect: props.round ? 1 / 1 : 16 / 9
  })

  const handleSubmitAvatar = async (e) => {
    e.preventDefault()
    if (valid && reactCropPreview.length > 0) {
      const previewWidth = reactCropPreview[0].width
      const previewHeight = reactCropPreview[0].height

      setValid(false)
      const img = new Image()
      img.src = preview

      img.onload = async (e) => {
        const image = e.target
        const { unit, height, width, aspect, x, y } = crop

        const scaleX = Math.round((image.naturalWidth / previewWidth)*10000)
        const scaleY = Math.round((image.naturalHeight / previewHeight)*10000)

        const data = {
          ...fileData,
          unit,
          aspect,
          height: Math.round(height),
          width: Math.round(width),
          x: Math.round(x),
          y: Math.round(y),
          scaleX,
          scaleY
        }
        const logs = document.getElementById('res')
        logs.append(`${data.file.name} `)
        logs.append(`${data.file.size} `)
        logs.append(`${data.file.type} `)
        const uploadedFile = await props.uploadFile(data)
        // if(uploadedFile) {
        //   // props.toggle()
        //   console.log(uploadedFile)
        //   
        //   console.log(logs)
        //   logs.append(`${data.file.name}, `)
        //   logs.append(`${data.file.size}, `)
        //   logs.append(`${data.file.type}, `)
        //   logs.append(uploadedFile)
          // data.file.map((item) => {
            
          // })
        // } else {
        // }
      }
      
      // props.toggle()
      
    } else {
      setValid(false)
    }

  }
  return (
    <Container >
    <p  style={{whiteSpace: 'pre-wrap'}} className = "lo-text" id="res"></p>
      <form onSubmit={handleSubmitAvatar}>
        <CropFileInput
          className="m-5"
          {...props}
          round={true}
          valid={valid}
          setValid={setValid}
          error={error}
          setError={setError}
          setFileData={setFileData}
          height={310}
          width={310}
          showText={true}
          fileData={fileData}
          setPreview={setPreview}
          preview={preview}
          setCrop={setCrop}
          crop={crop}
        />
        <Button className="mt-2" disabled={!valid}>Confirm Upload</Button>
        
      </form>
      <div id="divik"></div>
    </Container>
  )
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps, { uploadFile })(FileInputContainer)