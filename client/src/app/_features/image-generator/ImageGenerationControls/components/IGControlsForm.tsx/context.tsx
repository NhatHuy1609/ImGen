import { createContext, useContext } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { predictionTypesDto } from '@/service/api/prediction'

interface IControlsFormContext {
  setFormValue: UseFormSetValue<predictionTypesDto.CreatePredictionDto>
  model: string
  numOutputs: number
  aspectRatio: string
  outputQuality: number
  outputFormat: string
}

const IGControlsFormContext = createContext<IControlsFormContext>({
  setFormValue: () => {},
  model: '',
  aspectRatio: '21:9',
  numOutputs: 1,
  outputQuality: 80,
  outputFormat: 'jpg'
})

export const IGControlsFormProvider = IGControlsFormContext.Provider

export const useIGControlsFormContext = () => {
  return useContext(IGControlsFormContext)
}
