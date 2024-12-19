import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { FaAngleDown } from 'react-icons/fa6'
import ModelSelectControl from './ModelSelectControl'
import ModelOutputNumbersSliderControl from './ModelOutputNumbersSliderControl'
import ModelOutputQualitySliderControl from './ModelOutputQualitySliderControl'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

function IGFormModelControls() {
  const [isOpen, setOpen] = useState(true)

  return (
    <Collapsible open={isOpen} onOpenChange={setOpen} className='w-full'>
      <CollapsibleTrigger className='w-full'>
        <div className='flex w-full items-center justify-between'>
          <span className='text-sm font-medium text-white'>Model</span>
          <span className={cn('transition-all', isOpen && 'rotate-180')}>
            <FaAngleDown className='text-sm text-white' />
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className='w-full'>
        <ModelSelectControl />
        <ModelOutputQualitySliderControl />
        <ModelOutputNumbersSliderControl />
      </CollapsibleContent>
    </Collapsible>
  )
}

export default IGFormModelControls
