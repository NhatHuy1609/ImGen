export interface CreatePredictionDto {
  model: string
  prompt: string
  numOutputs: number
  aspectRatio: string
  outputFormat: string
  outputQuality: number
}