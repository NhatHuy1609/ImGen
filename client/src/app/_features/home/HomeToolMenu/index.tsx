import * as React from 'react'
import HomeToolMenuItem from './HomeToolMenuItem'
import { IHomeToolMenuItem } from './types'

export default function HomeToolMenu() {
  const menuItems: Array<IHomeToolMenuItem> = [
    {
      href: '/ai-tool/image-generate',
      title: 'Image generator',
      description: 'Turn your ideas into stunning images'
    },
    {
      href: '/',
      title: 'Video generator',
      description: 'Put your creativity in motion',
      available: false
    },
    {
      href: '/',
      title: 'Music generator',
      description: 'Create music effortlessly with AI',
      available: false
    }
  ]

  return (
    <div className='grid w-full grid-cols-3 items-center gap-4'>
      {menuItems.map((item) => (
        <HomeToolMenuItem key={item.title} item={item} />
      ))}
    </div>
  )
}
