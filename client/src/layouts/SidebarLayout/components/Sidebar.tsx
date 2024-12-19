import * as React from 'react'
import Image from 'next/image'
import LogoImage from 'public/logo.png'
import Link from 'next/link'
import { FaHome } from 'react-icons/fa'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface IMenuItem {
  icon: React.ReactNode
  href: string
  title: string
}

interface IMenuGroup {
  items: IMenuItem[]
}

export default function Sidebar() {
  const iconClass = 'text-white text-xl'

  const defaultMenuItems: Array<IMenuItem> = [{ icon: <FaHome className={iconClass} />, title: 'Home', href: '' }]

  return (
    <aside className='w-[78px] h-full bg-background border-r border-white/20 flex flex-col items-center px-5 py-4'>
      <Link href='/' className='block mb-10'>
        <Image src={LogoImage} alt='logo app' className='w-10' />
      </Link>
      <div className='w-full flex-col items-center'>
        <MenuGroup items={defaultMenuItems} />
      </div>
    </aside>
  )
}

function MenuGroup({ items }: IMenuGroup) {
  return (
    <ul className='w-full flex flex-col items-center'>
      {items.map((item) => (
        <MenuItem key={item.title} item={item} />
      ))}
    </ul>
  )
}

function MenuItem({ item }: { item: IMenuItem }) {
  const { icon, href, title } = item

  return (
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger className='aspect-square w-full rounded-md bg-white/10'>
          <li className='w-full flex'>
            <Link href={href} className='w-full flex items-center justify-center'>
              {icon}
            </Link>
          </li>
        </TooltipTrigger>
        <TooltipContent side='right'>{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
