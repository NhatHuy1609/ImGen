'use client'

import React from 'react'
import Image from 'next/image'
import BackButton from '@/components/back-button'
import { usePredictions } from '@/hooks/usePredictions'
import { predictionTypes } from '@/entities/prediction'

function page() {
  const predictions = usePredictions()

  return (
    <div>
      <header className='flex w-full items-center justify-between p-4'>
        <BackButton href='/ai-tool/image-generate' />
      </header>
      <section className='flex w-full flex-col'>
        <h4 className='text-xl font-medium text-white'>Favorite Images</h4>
        <div className='flex w-full flex-col gap-3'>
          {predictions.map((prediction) => (
            <PredictionItem key={prediction.predictionId} item={prediction} />
          ))}
        </div>
      </section>
    </div>
  )
}

function PredictionItem({ item }: { item: predictionTypes.Prediction }) {
  const { images, createdAt = '', prompt, model, aspectRatio } = item

  const createdDate = createdAt && new Date(createdAt)
  const formattedDate = createdDate ? createdDate.toISOString().slice(0, 16).replace('T', ' ') : ''

  return (
    <div className='w-full p-4'>
      <div className='flex w-full gap-2'>
        <span className='text-sm font-semibold text-white'>ImGen | AI Images</span>
        <span className='text-sm text-gray-400'>{formattedDate}</span>
      </div>

      <div className='flex w-full items-center gap-3'>
        <span className='text-sm text-gray-200'>{prompt}</span>
        <span className='block flex items-center justify-center rounded-sm border border-white/20 px-2 py-1 text-xs text-gray-300'>
          {model}
        </span>
        <span className='block flex items-center justify-center rounded-sm border border-white/20 px-2 py-1 text-xs text-gray-300'>
          {aspectRatio}
        </span>
      </div>

      <div className='flex w-full items-center gap-3'>
        {images.map((image, index) => (
          <Image
            className='size-[120px] rounded-md'
            src={image.url}
            key={image._id}
            width={300}
            height={300}
            alt='image'
          />
        ))}
      </div>
    </div>
  )
}

export default page
