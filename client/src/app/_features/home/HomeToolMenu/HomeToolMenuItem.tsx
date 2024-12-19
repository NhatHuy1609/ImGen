import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { IHomeToolMenuItem } from './types'
import { Button } from '@/components/ui/button'
import { FaArrowRightLong } from 'react-icons/fa6'

export default function HomeToolMenuItem({ item }: { item: IHomeToolMenuItem }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)
  const { title, description, href, available = true } = item

  useEffect(() => {
    const container = containerRef.current
    const vignette = vignetteRef.current

    if (!container || !vignette) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()

      const relativeX = (e.clientX - rect.left - vignette.clientWidth / 2) / rect.width
      const relativeY = (e.clientY - rect.top - vignette.clientHeight / 2) / rect.height

      const xPos = relativeX * 100
      const yPos = relativeY * 100

      // Apply transform instead of directly setting top/left
      // vignette.style.transform = `translate(${xPos}%, ${yPos}%)`
      vignette.style.top = `${yPos}%`
      vignette.style.left = `${xPos}%`
    }

    const handleMouseLeave = () => {
      // Reset vignette position when mouse leaves
      // vignette.style.transform = 'translate(100%, 100%)'
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    // Cleanup function
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [containerRef, vignetteRef])

  return (
    <div
      ref={containerRef}
      style={{
        backgroundImage: 'linear-gradient(-20deg,rgb(15, 15, 15), 80%, rgb(67, 67, 67))'
      }}
      className='relative min-h-[168px] w-full overflow-hidden rounded-xl border border-sky-200 bg-black px-8 py-6'
    >
      <div
        style={{
          willChange: 'transform' // Optimize for animations
        }}
        ref={vignetteRef}
        className='absolute top-0 z-[1] size-[240px] rounded-full bg-white/10 blur-[64px]'
      ></div>
      <h3 className='text-2xl font-medium text-white'>{title}</h3>
      <h4 className='mt-2 text-base font-medium text-gray-400'>{description}</h4>
      <div className='mt-6 flex w-full items-center gap-4'>
        <GeneratorNavigationButton key={item.title} href={href} availableStatus={available} />
      </div>
    </div>
  )
}

function GeneratorNavigationButton({
  href,
  availableStatus
}: {
  href: string
  availableStatus: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative z-[2] flex h-full w-[180px] rounded-[12px] rounded-lg bg-white/20 px-8 py-3 text-base font-medium text-white hover:bg-white hover:text-black',
        !availableStatus && 'cursor-not-allowed select-none opacity-90 hover:bg-white/20'
      )}
    >
      <span className='group flex w-full items-center justify-center gap-2 transition-all duration-300'>
        {availableStatus && (
          <span className='flex w-6 -translate-x-10 justify-end opacity-0 transition-all duration-300 group-hover:w-16 group-hover:-translate-x-3 group-hover:opacity-100'>
            <FaArrowRightLong className='text-base text-black' />
          </span>
        )}
        <span
          className={cn(
            'relative left-[-12px] flex w-full items-center justify-center gap-2 text-base text-white transition-all duration-300 group-hover:text-black',
            !availableStatus && 'left-0 group-hover:text-white'
          )}
        >
          Generate
          {!availableStatus && (
            <span className='rounded-[10px_10px_10px_0px] bg-white/80 p-1 text-xs text-sky-600'>
              Beta
            </span>
          )}
        </span>
      </span>
    </Link>
  )
}
