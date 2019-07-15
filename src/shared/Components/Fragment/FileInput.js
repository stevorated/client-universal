import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { uploadFile } from '../../Store/actions'
import { Image } from 'reactstrap'
import styled from 'styled-components'
import { black, elevation } from '../../Utils'
import ReactCrop from 'react-image-crop'

function FileInput(props) {
  const [ imgSrc, setImgSrc ] = useState(null)
  const [ crop, setCrop ] = useState({aspect: 1/1})

  const handleOnCrop = (crop) =>  {
    // console.log(crop)
    setCrop(crop)
    // console.log(crop)
  }
  const onDrop = useCallback(async (acceptedFiles) => {
    props.setValid(false)
    
    const preview = document.getElementById('preview')
    const previewLabel = document.getElementById('preview-label')
    const uploadSuccessSpan = document.getElementById('upload-success-span')
    const rawFile = acceptedFiles[0]
    // CREATE ALLOWED ARRAY
    const allowed = () => {
      switch (props.uploadType) {
        case 'avatar':
        case 'eventImage':
          return ['jpg', 'jpeg', 'png']
        default:
          break
      }
    }
    
    const { size, name } = rawFile
    const sizeString = `${size.toString()} Kb`
    const type = name.split('.').pop()
    // INIT
    previewLabel.innerHTML = ''
    preview.src = undefined
    uploadSuccessSpan.innerHTML = ''
    // CHOOSE VALIDATION TYPE
    switch (props.uploadType) {
      case 'avatar':
      case 'eventImage':
        if (!allowed().includes(type)) {
          previewLabel.innerHTML = `only files of type ${allowed().join(', ')} are allowed`
        } else if (size > props.limit) {
          previewLabel.innerHTML = 'File To Big'
        } else {
          uploadSuccessSpan.innerHTML = `Preview`
          props.setFileData({ file: rawFile, size: sizeString })
          preview.src = URL.createObjectURL(rawFile)
          setImgSrc(rawFile)

          props.setValid(true)
        }
        break
      default:
        break
    }
  }, [])
  // DROPZONE HOOK
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const borderRadius = props.round ? '100%' : 'none'
  // console.log(imgSrc)
  return (
    <div className="text-center">
      <div {...getRootProps()} className="" style={{ cursor: 'pointer'}}>
        <input {...getInputProps()} />
        {!props.valid && props.showText &&
          isDragActive ?
            <p>Drop the files here ...</p> :
            !props.valid && props.showText && <p>Drag 'n' drop some files here, or click to select files</p>
        }
        
        <label id="preview-label" htmlFor="preview"></label>
        <span id="upload-success-span"></span>
        <PreviewBox style={{borderRadius , width: `${props.width}px`, height: `${props.height}px`}} className="m-auto">
          <img style={{borderRadius, display: 'block'}} width={`${props.width*.985}px`} height={`${props.height*.988}px`} className="img" id="preview" alt="" />
        </PreviewBox>
        
      </div>
    </div>

  )
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps, { uploadFile })(FileInput)


const PreviewBox = styled.div`
/* border-radius: 100%;
width: 310px;
height: 310px; */

${elevation[1]}
border: 2px solid lightgray;
`