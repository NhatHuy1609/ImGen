import React from 'react'
import IPGalleryHeader from './components/IPGalleryHeader'
import IPGalleryResult from './components/IPGalleryResult'

function ImagePreviewGallery() {
  return (
    <div className='size-full rounded-xl border border-white/20'>
      <IPGalleryHeader />
      <IPGalleryResult />
    </div>
  )
}

export default ImagePreviewGallery
