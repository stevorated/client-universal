import React, { useState, Fragment } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import CropFileInput from './CropFileInput'
import { connect } from 'react-redux'
import { uploadFile } from '../../Store/actions'
import { getCroppedImg } from '../../Utils'
import Loading from './Loading'

function FileInputContainer(props) {
  const reactCropPreview = document.getElementsByClassName('ReactCrop__image')
  const [valid, setValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fileData, setFileData] = useState({})
  const [preview, setPreview] = useState('')
  const [crop, setCrop] = useState({
    unit: 'px',
    width: 100,
    height: 100,
    aspect: props.round ? 1 / 1 : 16 / 9
  })

  const handleSubmitAvatar = async e => {
    e.preventDefault()
    if (valid && reactCropPreview.length > 0) {
      const previewWidth = reactCropPreview[0].width
      const previewHeight = reactCropPreview[0].height

      setValid(false)
      const img = new Image()
      img.src = preview

      img.onload = async e => {
        setLoading(true)
        const image = e.target
        const { unit, height, width, aspect, x, y } = crop

        const scaleX = Math.round((image.naturalWidth / previewWidth) * 10000)
        const scaleY = Math.round((image.naturalHeight / previewHeight) * 10000)

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

        return props
          .uploadFile(data)
          .then(setTimeout(() => props.toggle(), 2000))
      }
      // props.toggle()
    } else {
      setValid(false)
    }
  }
  return (
    <Container>
      {loading ? (
        <Loading size="7" customLoader={true} />
      ) : (
        <Fragment>
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
            <Button className="mt-2" disabled={!valid}>
              Confirm Upload
            </Button>
          </form>
        </Fragment>
      )}

      <div id="divik" />
    </Container>
  )
}

export default connect(
  undefined,
  { uploadFile }
)(FileInputContainer)
