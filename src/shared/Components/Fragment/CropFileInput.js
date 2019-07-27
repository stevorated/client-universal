import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { uploadFile } from '../../Store/actions'
import { Image } from 'reactstrap'
import styled from 'styled-components'
import { black, elevation } from '../../Utils'
import ReactCrop from 'react-image-crop'
import '../../../assets/css/ReactCrop.css'

function CropFileInput(props) {
  const handleOnCrop = (crop) =>  {
    props.setCrop(crop)
  }
  const onDrop = useCallback(async (acceptedFiles) => {
    props.setValid(false)
    // console.log(acceptedFiles[0])
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
    const type = name.split('.').pop().toLowerCase()
    switch (props.uploadType) {
      case 'avatar':
      case 'eventImage':
        if (!allowed().includes(type)) {
          props.setError(`only files of type ${allowed().join(', ')} are allowed`)
        } else if (size > props.limit) {
          props.setError('File Too Big! (only filed under 4MB)')
        } else {
          props.setError('')
          props.setFileData({ file: rawFile, size: sizeString })
          const preview = URL.createObjectURL(rawFile)
          props.setPreview(preview)
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
  return (
    <div style={{minHeight: '400px'}} className="text-center">
      <div {...getRootProps()} style={{ cursor: 'pointer', minHeight: props.valid ? '50px' : '400px'}}>
        <input {...getInputProps()}  />
        {(!props.valid && props.showText) 
          ? <p className="text-capitalize">Drag and Drop here or Click to select a file</p> 
          : <p className="text-capitalize">now crop the file or choose another one by clicking here</p>}
        
        {!!props.error && <p>{props.error}</p> }
        
        </div>
        {props.valid && <ReactCrop imageStyle={{height:props.height, width: props.width}} src={props.preview} onChange={handleOnCrop} crop={props.crop} />}
      
      

    </div>

  )
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps, { uploadFile })(CropFileInput)


const PreviewBox = styled.div`
/* border-radius: 100%;
width: 310px;
height: 310px; */

${elevation[1]}
border: 2px solid lightgray;
`