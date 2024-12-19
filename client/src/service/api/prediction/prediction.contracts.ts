import { z } from 'zod'

// Requests
export const CreatePredictionDtoSchema = z.object({
  model: z.string(),
  prompt: z.string(),
  numOutputs: z.number(),
  aspectRatio: z.string(),
  outputFormat: z.string(),
  outputQuality: z.number()
}).describe("CreatePredictionDtoSchema")

// Responses
export const CreatePredictionResponseDtoSchema = z.object({
  aspectRatio: z.string(),
  createdAt: z.string().datetime(),
  model: z.string(),
  numOutputs: z.number(),
  outputFormat: z.string(),
  outputQuality: z.number(),
  predictionId: z.string(),
  prompt: z.string(),
  userId: z.string(),
  __v: z.number(),
  _id: z.string(),
});

const PredictionImageSchema = z.object({
  _id: z.string(),
  predictionId: z.string(),
  url: z.string().url(),
  favorite: z.boolean(),
});

export const PredictionsResponseDtoSchema = z.object({
  predictionId: z.string(),
  userId: z.string(),
  prompt: z.string(),
  model: z.string(),
  numOutputs: z.number(),
  outputQuality: z.number(),
  outputFormat: z.string(),
  aspectRatio: z.string(),
  createdAt: z.string().datetime(),
  images: z.array(PredictionImageSchema),
});

export const PredictionResponseDtoSchema = z.object({
  predictionId: z.string(),
  userId: z.string(),
  prompt: z.string(),
  model: z.string(),
  numOutputs: z.number(),
  outputQuality: z.number(),
  outputFormat: z.string(),
  aspectRatio: z.string(),
  createdAt: z.string().datetime(),
  images: z.array(PredictionImageSchema),
});