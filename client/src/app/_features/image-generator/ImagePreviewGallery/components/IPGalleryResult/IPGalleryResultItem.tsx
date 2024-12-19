import React from 'react'
import LogoImage from 'public/logo.png'
import Image from 'next/image'
import { FaDownload } from 'react-icons/fa6'
import { FaBookmark } from 'react-icons/fa6'
import { Skeleton } from '@/components/ui/skeleton'
import { predictionTypes } from '@/entities/prediction'
import { useFavorImageMutation } from '@/hooks/mutations/useFavorImage'
import { toast } from 'sonner'

export default function IPGalleryResultItem({ item }: { item: predictionTypes.Prediction }) {
  const { prompt, model, createdAt = '', aspectRatio, images, numOutputs } = item

  const imageList = images.map((image) => ({
    imageUrl: image.url,
    aspectRatio,
    imageId: image._id,
    imageFavoriteStatus: image.favorite
  }))

  const createdDate = createdAt && new Date(createdAt)
  const formattedDate = createdDate ? createdDate.toISOString().slice(0, 16).replace('T', ' ') : ''

  return (
    <div className='flex w-full gap-2'>
      <Image src={LogoImage} className='size-8 rounded-full object-cover' alt='app-logo' />
      <div className='flex w-full flex-col gap-2'>
        <div className='flex w-full gap-2'>
          <span className='text-sm font-semibold text-white'>ImGen | AI Images</span>
          <span className='text-sm text-gray-400'>{formattedDate}</span>
        </div>

        <div className='flex w-full items-center gap-3'>
          <span className='text-sm text-gray-200'>{prompt}</span>
          <span className='block flex items-center justify-center rounded-sm border border-white/20 px-2 py-1 text-xs text-gray-300'>
            {model}
          </span>
          <span className='block flex items-center justify-center rounded-sm border border-white/20 px-2 py-1 text-xs text-gray-300'>
            {aspectRatio}
          </span>
        </div>

        <IPGalleryResultImageList
          images={imageList}
          numOutputs={numOutputs}
          aspectRatio={aspectRatio}
        />
      </div>
    </div>
  )
}

function IPGalleryResultImageList({
  images,
  numOutputs,
  aspectRatio
}: {
  numOutputs: number
  aspectRatio: string
  images: { imageUrl: string; aspectRatio: string; imageFavoriteStatus: boolean; imageId: string }[]
}) {
  if (images.length < 0) {
    const arr = new Array(numOutputs).fill(0)
    return arr.map((cur, index) => (
      <Skeleton
        key={index}
        style={{
          aspectRatio: aspectRatio.replace(':', '\\')
        }}
      />
    ))
  }

  return (
    <div className='grid w-full grid-cols-2 gap-1 overflow-hidden rounded-xl'>
      {images.map((image) => (
        <IPGalleryResultImageItem
          key={image.imageUrl}
          imageUrl={image.imageUrl}
          aspectRatio={image.aspectRatio}
          imageId={image.imageId}
          imageFavoriteStatus={image.imageFavoriteStatus}
        />
      ))}
    </div>
  )
}

function IPGalleryResultImageItem({
  imageUrl,
  aspectRatio,
  imageId,
  imageFavoriteStatus
}: {
  imageUrl: string
  aspectRatio: string
  imageId: string
  imageFavoriteStatus: boolean
}) {
  return (
    <div className='group relative w-2/3 cursor-pointer'>
      <div className='absolute inset-0 bg-transparent transition-all group-hover:bg-[rgba(0,0,0,0.1)]'></div>
      <Image
        className='size-full'
        style={{
          aspectRatio: aspectRatio.replace(':', '\\')
        }}
        src={imageUrl}
        alt='result-image'
        width={300}
        height={300}
      />

      <div className='x absolute right-4 top-4 z-[2] w-auto opacity-0 transition-all duration-300 group-hover:opacity-100'>
        <IPGalleryResultImageItemControls
          imageUrl={imageUrl}
          imageId={imageId}
          imageFavoriteStatus={imageFavoriteStatus}
        />
      </div>
    </div>
  )
}

function IPGalleryResultImageItemControls({
  imageUrl,
  imageId,
  imageFavoriteStatus
}: {
  imageUrl: string
  imageId: string
  imageFavoriteStatus: boolean
}) {
  const { mutate: favorImage } = useFavorImageMutation({
    onSuccess: (response) => {
      console.log(response)
      const status = response.status
      const { favorite } = response.data
      if (status === 200) {
        if (favorite) {
          toast.success('Operation completed successfully', {
            description: 'You successfully unfavor the photo'
          })
        } else {
          toast.success('Operation completed successfully', {
            description: 'You successfully favor the photo'
          })
        }
      }
    }
  })

  const handleToggleFavorImage = () => {
    favorImage(imageId)
  }

  return (
    <div className='size-full rounded-md border border-white/30 bg-[rgba(0,0,0,0.9)]'>
      <a
        download
        target='_blank'
        href={imageUrl}
        className='inline-flex aspect-square items-center justify-center p-2 hover:bg-white/20'
      >
        <FaDownload className='text-sm text-white' />
      </a>
      <a
        onClick={handleToggleFavorImage}
        className='inline-flex aspect-square items-center justify-center p-2 hover:bg-white/20'
      >
        <FaBookmark className='text-sm text-white' />
      </a>
    </div>
  )
}
