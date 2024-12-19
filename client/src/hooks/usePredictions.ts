import { useState, useEffect } from "react"
import { useAppSelector } from "@/store/hooks"
import type { predictionTypes } from "@/entities/prediction"
import { useQuery } from "@tanstack/react-query"
import { PredictionQueries } from "@/entities/prediction"

type PredictionItem = predictionTypes.Prediction

export const usePredictions = () => {
  const { data: fetchedPredictions } = useQuery({
    ...PredictionQueries.loggedInUserPredictionsQuery(),
    staleTime: Infinity
  })
  const [predictions, setPrediction] = useState<PredictionItem[]>(() => {
    return fetchedPredictions || []
  })
  const { latestCreatedPrediction, latestCreatedImages } = useAppSelector(state => state.predictions)

  useEffect(() => {
    if (fetchedPredictions) {
      setPrediction((prev) => {
        const oldPredictions = [...prev]
        return [...fetchedPredictions, ...oldPredictions]
      })
    }
  }, [fetchedPredictions])

  useEffect(() => {
    if (latestCreatedImages.predictionId && latestCreatedImages.predictionImages.length > 0) {
      setPrediction((prev) => {
        const oldPredictions = [...prev]

        const updatedPrediction = oldPredictions.filter(p => p.predictionId === latestCreatedImages.predictionId)[0]
        oldPredictions.length > 0 && oldPredictions.pop()

        const newPrediction = {
          ...updatedPrediction,
          images: latestCreatedImages.predictionImages
        }

        const newPredictions = [...oldPredictions, newPrediction]

        return newPredictions
      })
    }
  }, [latestCreatedImages])

  useEffect(() => {
    if (latestCreatedPrediction) {
      setPrediction(prev => {
        const newPrediction: PredictionItem = {
          ...(latestCreatedPrediction as Omit<predictionTypes.Prediction, 'images'>),
          images: []
        }

        return [...prev, newPrediction]
      })
    }
  }, [latestCreatedPrediction])

  return predictions
}