import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import CropFileInput from './CropFileInput'
import { connect } from 'react-redux'
import { uploadFile } from '../../Store/actions'
import { getCroppedImg } from '../../Utils'


function FileInputContainer(props) {
  const reactCropPreview = document.getElementsByClassName('ReactCrop__image')
  // console.log(reactCropPreview)
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
  // console.log(crop)
  const handleSubmitAvatar = async (e) => {
    e.preventDefault()
    if (valid && reactCropPreview.length > 0) {
      const previewWidth = reactCropPreview[0].width
      const previewHeight = reactCropPreview[0].height
      // console.log(previewWidth, previewHeight)
      // console.log()
      setValid(false)
      const img = new Image()
      img.src = preview
      // console.log(img)
      img.onload = (e) => {
        const image = e.target
        const { unit, height, width, aspect, x, y } = crop
        // console.log(width)
        const scaleX = Math.round((image.naturalWidth / previewWidth)*10000)
        const scaleY = Math.round((image.naturalHeight / previewHeight)*10000)
        // console.log(scaleX, x, scaleX* x, image.naturalWidth )
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
        // console.log(data)
        props.uploadFile(data)
      }



      // console.log(data)

      props.toggle()

      // const div = document.getElementById('divik')
      // div.append(img)
    } else {
      setValid(false)
    }

  }
  return (
    <Container >
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