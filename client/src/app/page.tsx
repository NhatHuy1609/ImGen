'use client'

import SidebarLayoutComp from '@/layouts/SidebarLayout'
import HomeToolMenu from './_features/home/HomeToolMenu'

export default function Home() {
  return (
    <SidebarLayoutComp>
      <HomeToolMenu />
    </SidebarLayoutComp>
  )
}
