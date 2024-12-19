'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { ClerkProvider } from '@clerk/nextjs'
import ReduxProvider from '@/providers/ReduxProvider'
import { QueryClientProvider } from '@/providers/QueryClientProvider'

const ThemeProviderComp = dynamic(() => import('@/providers/ThemeProvider'), {
  ssr: false
})

function RootLayoutComp({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <QueryClientProvider>
        <ReduxProvider>
          <ThemeProviderComp
            attribute='class'
            defaultTheme='dark'
            enableSystem={false}
            disableTransitionOnChange
          >
            <div className='h-screen w-full bg-background'>{children}</div>
          </ThemeProviderComp>
        </ReduxProvider>
      </QueryClientProvider>
    </ClerkProvider>
  )
}

export default RootLayoutComp
