import React from 'react'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

function BackButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className='flex items-center gap-2 rounded-lg bg-white/30 px-4 py-2 transition-all hover:bg-white/20'
    >
      <FaArrowLeft className='text-sm' />
      <span className='text-sm text-white'>Back</span>
    </Link>
  )
}

export default BackButton
