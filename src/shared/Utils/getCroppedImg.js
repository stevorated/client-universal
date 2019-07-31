export default function getCroppedImg(imageFile, crop, fileName) {
  const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    const image = new Image() 
    image.onload = drawImageActualSize 

    image.src = URL.createObjectURL(imageFile)

    function drawImageActualSize() {
      canvas.width = this.naturalWidth
      canvas.height = this.naturalHeight
      const scaleX = this.naturalWidth / this.width
      const scaleY = this.naturalHeight / this.height

      ctx.drawImage(
        this, 
        // 100,
        // 100
        crop.x,
        crop.y,
        crop.width,
        crop.height,
      )
}

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      blob.name = fileName
      resolve(blob)
    }, 'image/jpeg')
  })
}