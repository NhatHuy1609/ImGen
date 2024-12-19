import React from 'react'
import IGControlsHeader from './components/IGControlsHeader'
import IGControlsForm from './components/IGControlsForm.tsx'

function ImageGenerationControls() {
  return (
    <div className='size-full rounded-xl border border-white/30'>
      <IGControlsHeader />
      <IGControlsForm />
    </div>
  )
}

export default ImageGenerationControls
