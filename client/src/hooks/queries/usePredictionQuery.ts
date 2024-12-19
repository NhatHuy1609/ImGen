import { PredictionQueries } from "@/entities/prediction"
import { useQuery } from "@tanstack/react-query"

export const usePredictionQuery = (predictionId?: string, enabled: boolean = false) => {
  return useQuery({
    ...PredictionQueries.predictionQuery(predictionId || ''),
    refetchInterval: (data) => {
      const { images = [] } = data.state.data || {}
      return images?.length > 0 ? false : 2000
    },
    enabled,
    staleTime: Infinity
  })
}