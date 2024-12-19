'use client'

import React from 'react'
import Header from './components/Header'
import ImageGeneratorTool from '@/app/_features/image-generator'

function ImageGeneratorPage() {
  return (
    <main className='flex size-full flex-col gap-4 p-4'>
      <Header />
      <ImageGeneratorTool />
    </main>
  )
}

export default ImageGeneratorPage
