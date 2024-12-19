import React, { useState } from 'react'
import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import { MODELS_PATH } from '@/service/flux-api/paths'
import FluxSchnellImage from 'public/flux-schnell.jpg'
import FluxProImage from 'public/flux-pro.jpg'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useIGControlsFormContext } from '../context'

interface IModelItem {
  name: string
  path: string
  description: string
  image: StaticImageData | string
}

export default function ModelSelectControl() {
  const { setFormValue, model } = useIGControlsFormContext()
  const [selectedModel, setSelectedModel] = useState(model)

  const models: Array<IModelItem> = [
    {
      name: 'Flux Schnell',
      image: FluxSchnellImage,
      path: MODELS_PATH['flux-schnell'],
      description:
        'State-of-the-art image generation with top of the line prompt following, visual quality, image detail and output diversity.'
    },
    {
      name: 'Flux Pro',
      image: FluxProImage,
      path: MODELS_PATH['flux-pro'],
      description:
        'The fastest image generation model tailored for local development and personal use'
    }
  ]

  const handleValueChange = (value: string) => {
    setSelectedModel(value)
    setFormValue('model', value)
  }

  const selectedModelInfo = models.filter((model) => model.path === selectedModel)[0]

  return (
    <div className='mt-2 w-full'>
      <h4 className='text-sm text-gray-300'>Select Model</h4>
      <Select value={selectedModel} onValueChange={handleValueChange}>
        <SelectTrigger className='mt-2 max-h-14 min-h-14 w-full p-0'>
          <ModelSelectItem item={selectedModelInfo} />
        </SelectTrigger>
        <SelectContent side='right' className='flex -translate-y-1/2 flex-col gap-4 px-2 py-3'>
          {models.map((model, index) => {
            const { path } = model
            return (
              <SelectItem value={path} key={index} className='p-0'>
                <ModelSelectItem item={model} />
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}

function ModelSelectItem({ item }: { item: IModelItem }) {
  const { name, description, path, image } = item
  return (
    <div className='flex items-center gap-2 overflow-hidden rounded-sm'>
      <Image src={image} alt={name} className='aspect-square size-full h-14 object-cover' />
      <div className='flex w-full flex-col justify-center'>
        <span className='text-left text-sm font-medium text-white'>{name}</span>
        <p className='max-w-48 truncate text-xs text-gray-400'>{description}</p>
      </div>
    </div>
  )
}
