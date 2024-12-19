import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { FaAngleDown } from 'react-icons/fa6'
import AspectRatioList from './AspectRatioList'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

function IGFormAspectRatioControl() {
  const [isOpen, setOpen] = useState(true)

  return (
    <Collapsible open={isOpen} onOpenChange={setOpen} className='w-full'>
      <CollapsibleTrigger className='w-full'>
        <div className='flex w-full items-center justify-between'>
          <span className='text-sm font-medium text-white'>Aspect Ratio</span>
          <span className={cn('transition-all', isOpen && 'rotate-180')}>
            <FaAngleDown className='text-sm text-white' />
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className='mt-2 w-full'>
        <AspectRatioList />
      </CollapsibleContent>
    </Collapsible>
  )
}

export default IGFormAspectRatioControl
