import { z } from 'zod'
import { 
  CreatePredictionDtoSchema, 
  PredictionResponseDtoSchema,
  CreatePredictionResponseDtoSchema,
  PredictionsResponseDtoSchema
} from './prediction.contracts'

export type CreatePredictionDto = z.infer<typeof CreatePredictionDtoSchema>
export type PredictionResponseDto = z.infer<typeof PredictionResponseDtoSchema>
export type PredictionsResponseDto = Array<z.infer<typeof PredictionsResponseDtoSchema>>
export type CreatePredictionResponseDto = z.infer<typeof CreatePredictionResponseDtoSchema>