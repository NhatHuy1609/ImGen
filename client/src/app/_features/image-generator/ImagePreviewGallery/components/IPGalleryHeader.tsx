import React from 'react'
import Link from 'next/link'
import { IoFolderOpen } from 'react-icons/io5'

function IPGalleryHeader() {
  return (
    <div className='flex h-12 w-full items-center justify-end border-b border-white/20 px-2 py-1'>
      <Link
        href='/ai-tool/asset'
        className='ml-6 flex size-8 items-center justify-center rounded-md border border-white/30 hover:bg-white/20'
      >
        <IoFolderOpen className='text-sm text-white' />
      </Link>
    </div>
  )
}

export default IPGalleryHeader
