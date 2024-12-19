import * as React from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

function SidebarLayoutComp({ children }: { children: React.ReactNode }) {
  return (
    <main className='size-full bg-background'>
      <Header />
      <div className='flex size-full'>
        <Sidebar />
        <div className='w-full min-h-full py-20 px-4'>{children}</div>
      </div>
    </main>
  )
}

export default SidebarLayoutComp
