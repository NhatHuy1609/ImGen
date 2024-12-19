import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem
} from '@/components/ui/select'
import { useIGControlsFormContext } from '../context'

function IGFormOutputFormatControl() {
  const { outputFormat, setFormValue } = useIGControlsFormContext()
  const [selectedFormat, setSelectedFormat] = useState(outputFormat)

  const formats = ['jpg', 'png', 'webp']

  const handleSelectFormat = (value: string) => {
    setSelectedFormat(value)
    setFormValue('outputFormat', selectedFormat)
  }

  return (
    <div className='mt-2 w-full'>
      <h4 className='text-sm text-gray-300'>Output Format</h4>
      <Select value={selectedFormat} onValueChange={handleSelectFormat}>
        <SelectTrigger className='mt-2 w-full'>
          <SelectValue placeholder={selectedFormat} />
        </SelectTrigger>
        <SelectContent>
          {formats.map((format) => (
            <SelectItem value={format} key={format}>
              {format}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default IGFormOutputFormatControl
