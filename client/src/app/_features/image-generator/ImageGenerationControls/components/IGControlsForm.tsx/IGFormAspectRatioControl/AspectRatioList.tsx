import React, { useState, useEffect, SetStateAction } from 'react'
import { cn } from '@/lib/utils'
import { useIGControlsFormContext } from '../context'

interface IAspectRatioItem {
  widthRatio: number
  heightRatio: number
  itemWidth: number
}

export default function AspectRatioSelectList() {
  const { setFormValue, aspectRatio } = useIGControlsFormContext()
  const [selectedRatio, setSelectedRatio] = useState(aspectRatio)

  const ratioList: Array<IAspectRatioItem> = [
    { widthRatio: 21, heightRatio: 9, itemWidth: 32 },
    { widthRatio: 16, heightRatio: 9, itemWidth: 32 },
    { widthRatio: 3, heightRatio: 2, itemWidth: 28 },
    { widthRatio: 4, heightRatio: 3, itemWidth: 28 },
    { widthRatio: 1, heightRatio: 1, itemWidth: 20 },
    { widthRatio: 3, heightRatio: 4, itemWidth: 20 },
    { widthRatio: 2, heightRatio: 3, itemWidth: 18 },
    { widthRatio: 9, heightRatio: 16, itemWidth: 16 }
  ]

  useEffect(() => {
    setFormValue('aspectRatio', selectedRatio)
  }, [selectedRatio])

  return (
    <div>
      <h4 className='text-sm text-gray-300'>Aspect ratio</h4>
      <div className='mt-2 grid w-full grid-cols-4 gap-2'>
        {ratioList.map((ratio, index) => {
          const { widthRatio, heightRatio } = ratio
          const [selectedWidthRatio, selectedHeightRatio] = selectedRatio.split(':')
          const isSelected =
            widthRatio === +selectedWidthRatio && heightRatio === +selectedHeightRatio

          return (
            <AspectRationSelectItem
              key={index}
              item={ratio}
              selected={isSelected}
              setSelectedRatio={setSelectedRatio}
            />
          )
        })}
      </div>
    </div>
  )
}

function AspectRationSelectItem({
  item,
  selected = false,
  setSelectedRatio
}: {
  item: IAspectRatioItem
  selected: boolean
  setSelectedRatio: React.Dispatch<SetStateAction<string>>
}) {
  const { widthRatio, heightRatio, itemWidth } = item

  const handleSelectItem = () => {
    setSelectedRatio(`${widthRatio}:${heightRatio}`)
  }

  return (
    <div
      onClick={handleSelectItem}
      className={cn(
        'flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-white/20 hover:bg-white/30',
        selected && 'bg-white/30'
      )}
    >
      <div className='flex h-[32px] items-center justify-center'>
        <span
          style={{
            width: `${itemWidth}px`,
            aspectRatio: `${widthRatio}/${heightRatio}`
          }}
          className={`block rounded-sm border border-white/20 bg-white/80`}
        ></span>
      </div>
      <span className='text-[11px] text-gray-400'>{`${widthRatio}:${heightRatio}`}</span>
    </div>
  )
}
