import { z } from 'zod'
import { PredictionSchema } from './prediction.contracts'

export type Prediction = z.infer<typeof PredictionSchema>
