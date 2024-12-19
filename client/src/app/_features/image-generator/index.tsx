import React from 'react'
import ImagePreviewGallery from './ImagePreviewGallery'
import ImageGenerationControls from './ImageGenerationControls'

function ImageGeneratorTool() {
  return (
    <div className='grid size-full flex-1 grid-cols-[1fr_3fr] gap-2 overflow-hidden'>
      <ImageGenerationControls />
      <ImagePreviewGallery />
    </div>
  )
}

export default ImageGeneratorTool
