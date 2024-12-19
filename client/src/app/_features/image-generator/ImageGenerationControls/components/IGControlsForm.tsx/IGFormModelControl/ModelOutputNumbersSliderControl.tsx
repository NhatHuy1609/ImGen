import React, { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { useIGControlsFormContext } from '../context'

function ModelOutputNumbersSliderControl() {
  const { setFormValue, numOutputs } = useIGControlsFormContext()
  const [numOutput, setNumOutputQuality] = useState(numOutputs)

  const handleValueChange = (value: number[]) => {
    setNumOutputQuality(value[0])
    setFormValue('numOutputs', value[0])
  }

  return (
    <div className='mt-4 w-full'>
      <h4 className='text-sm text-gray-300'>Number Of Output</h4>
      <div className='mt-2 flex w-full items-center justify-between gap-4'>
        <Slider
          min={1}
          max={2}
          step={1}
          defaultValue={[numOutput]}
          onValueChange={handleValueChange}
        />
        <span className='text-sm text-white'>{numOutput}</span>
      </div>
    </div>
  )
}

export default ModelOutputNumbersSliderControl
