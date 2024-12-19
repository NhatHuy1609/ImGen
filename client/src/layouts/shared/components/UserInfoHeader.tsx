import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { SignOutButton } from '@clerk/nextjs'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { Skeleton } from '@/components/ui/skeleton'
import { FaCoins } from 'react-icons/fa6'

export default function UserInfoHeader() {
  const { data } = useCurrentUser()
  const { avatar = '', credits = 0 } = data ?? {}

  return (
    <div className='flex w-auto items-center gap-4'>
      <UserCreditsDisplay credits={credits} />
      <UserPopover imageUrl={avatar} />
    </div>
  )
}

function UserCreditsDisplay({ credits }: { credits: number }) {
  return (
    <div className='flex items-center gap-2 divide-x overflow-hidden rounded-full border border-white/20'>
      <div className='flex items-center justify-between gap-2 pl-4 pr-2'>
        <FaCoins className='text-base text-white' />
        <span className='text-base text-white'>{credits}</span>
      </div>
      <UpgradeAccountPlanButton />
    </div>
  )
}

function UpgradeAccountPlanButton() {
  return (
    <Button variant='ghost' className='w-full flex-1 rounded-none'>
      Upgrade to get credits
    </Button>
  )
}

function UserPopover({ imageUrl }: { imageUrl: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='auto' className='rounded-full'>
          <Avatar>
            <AvatarImage src={imageUrl} alt='user-avatar' />
            <AvatarFallback>
              <Skeleton className='size-full' />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuItem>
          <SignOutButton redirectUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_OUT_REDIRECT_URL}>
            Sign out
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
