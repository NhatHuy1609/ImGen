import React, { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { useIGControlsFormContext } from '../context'

function ModelOutputQualitySliderControl() {
  const { setFormValue, outputQuality } = useIGControlsFormContext()
  const [imageOutputQuality, setOutputQuality] = useState(outputQuality)

  const handleValueChange = (value: number[]) => {
    setOutputQuality(value[0])
    setFormValue('outputQuality', value[0])
  }

  return (
    <div className='mt-4 w-full'>
      <h4 className='text-sm text-gray-300'>Output Quality</h4>
      <div className='mt-2 flex w-full items-center justify-between gap-4'>
        <Slider
          min={60}
          max={100}
          step={1}
          defaultValue={[imageOutputQuality]}
          onValueChange={handleValueChange}
        />
        <span className='text-sm text-white'>{imageOutputQuality}</span>
      </div>
    </div>
  )
}

export default ModelOutputQualitySliderControl
