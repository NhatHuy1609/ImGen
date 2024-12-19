import React, { useState, useEffect } from 'react'
import { predictionTypesDto, predictionContractsDto } from '@/service/api/prediction'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IGControlsFormProvider } from './context'
import { FaCoins } from 'react-icons/fa6'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import IGFormModelControls from './IGFormModelControl'
import { MODELS_PATH } from '@/service/flux-api/paths'
import IGFormAspectRatioControl from './IGFormAspectRatioControl'
import IGFormOutputFormatControl from './IGFormOutputFormatControl'
import { useGenerateImageMutation } from '../../../mutations/generate.mutation'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { usePredictionQuery } from '@/hooks/queries/usePredictionQuery'
import { predictionStoreLib } from '@/store/features/prediction'
import { createNewPrediction, createNewImages } from '@/store/features/prediction/prediction.slice'
import { queryClient } from '@/lib/react-query/query-client'
import { UserQueries } from '@/entities/user'
import { toast } from 'sonner'

type ControlsFormValue = predictionTypesDto.CreatePredictionDto

function IGControlsForm() {
  const dispatch = useAppDispatch()
  const latestCreatedPrediction = useAppSelector(
    (state) => state.predictions.latestCreatedPrediction
  )

  const form = useForm<ControlsFormValue>({
    resolver: zodResolver(predictionContractsDto.CreatePredictionDtoSchema),
    defaultValues: {
      model: MODELS_PATH['flux-schnell'],
      numOutputs: 1,
      outputQuality: 80,
      outputFormat: 'jpg',
      aspectRatio: '21:9'
    }
  })
  const [enabledPollingPrediction, setEnabledPollingPrediction] = useState(false)

  const { data } = usePredictionQuery(
    latestCreatedPrediction?.predictionId,
    !!latestCreatedPrediction?.predictionId && enabledPollingPrediction
  )

  console.log('PREDICTION IMAGES: ', data)

  useEffect(() => {
    if (data && data?.images?.length > 0) {
      const { images, predictionId } = data
      dispatch(
        createNewImages({
          predictionId: predictionId,
          predictionImages: [...images]
        })
      )

      setEnabledPollingPrediction(false)
    }
  }, [data])

  const { mutate: generateImage } = useGenerateImageMutation({
    onSuccess: (response) => {
      const { data } = response
      const latestCreatedPrediction = predictionStoreLib.mapCreatePredictionResponseToLatest(data)

      queryClient.invalidateQueries(UserQueries.loggedInUserQuery())
      dispatch(createNewPrediction(latestCreatedPrediction))
      setEnabledPollingPrediction(true)

      toast.success('Operation completed successfully', {
        description: 'Your have successfully created a new prediction!'
      })
    }
  })

  const { getValues, control, setValue, handleSubmit } = form

  const onSubmit = (data: ControlsFormValue) => {
    generateImage(data)
  }

  return (
    <IGControlsFormProvider
      value={{
        setFormValue: setValue,
        model: getValues('model'),
        numOutputs: getValues('numOutputs'),
        aspectRatio: getValues('aspectRatio'),
        outputFormat: getValues('outputFormat'),
        outputQuality: getValues('outputQuality')
      }}
    >
      <Form {...form}>
        <form
          className='relative flex h-[calc(100vh-148px)] w-full flex-col py-3'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='max-h-[calc(100vh-148px)] overflow-y-auto pb-16'>
            <div className='w-full space-y-6 px-3'>
              <FormField
                control={control}
                name='prompt'
                render={({ field }) => (
                  <FormItem>
                    <Textarea
                      {...field}
                      className='tex-sm h-32 w-full resize-none border-white/50'
                      placeholder='Describe the image you want to generate'
                    />
                  </FormItem>
                )}
              />
              <IGFormModelControls />
              <IGFormAspectRatioControl />
              <IGFormOutputFormatControl />
            </div>
          </div>

          <div className='absolute bottom-0 left-0 w-full bg-black px-4 py-3'>
            <Button type='submit' className='w-full rounded-lg'>
              Generate
              <span className='flex items-center gap-2'>
                <FaCoins className='text-sm text-black' />
                <span>5</span>
              </span>
            </Button>
          </div>
        </form>
      </Form>
    </IGControlsFormProvider>
  )
}

export default IGControlsForm
