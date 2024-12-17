import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'

function RootLayoutComp({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <div className='w-full h-screen'>{children}</div>
    </ClerkProvider>
  )
}

export default RootLayoutComp
