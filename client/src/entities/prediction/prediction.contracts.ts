import { z } from 'zod'

export const PredictionSchema = z.object({
  aspectRatio: z.string(),
  createdAt: z.string().datetime(),
  model: z.string(),
  numOutputs: z.number(),
  outputFormat: z.string(),
  outputQuality: z.number(),
  predictionId: z.string(),
  prompt: z.string(),
  userId: z.string(),
  images: z.array(
    z.object({
    _id: z.string(),
    predictionId: z.string(),
    url: z.string().url(),
    favorite: z.boolean(),
  })),
})
