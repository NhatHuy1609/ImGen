import React from 'react'
import BackButton from '@/components/back-button'
import UserInfoHeader from '@/layouts/shared/components/UserInfoHeader'

function Header() {
  return (
    <header className='flex w-full items-center justify-between'>
      <BackButton href='/' />
      <UserInfoHeader />
    </header>
  )
}

export default Header
