import React from 'react'
import { usePredictions } from '@/hooks/usePredictions'
import IPGalleryResultItem from './IPGalleryResultItem'

export default function IPGalleryResultList() {
  const predictions = usePredictions()

  return (
    <div className='flex w-full flex-col gap-6'>
      {predictions.length > 0 &&
        predictions.map((prediction) => (
          <IPGalleryResultItem item={prediction} key={prediction.predictionId} />
        ))}
    </div>
  )
}
