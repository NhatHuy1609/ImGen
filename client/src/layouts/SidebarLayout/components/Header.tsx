import * as React from 'react'
import UserInfoHeader from '@/layouts/shared/components/UserInfoHeader'

export default function Header() {
  return (
    <header className='w-full absolute flex items-center justify-end p-4'>
      <UserInfoHeader />
    </header>
  )
}
